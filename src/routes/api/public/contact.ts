// Public POST endpoint for the contact form. Validates input, then writes
// a private `contact_submission` custom post to WordPress using an
// Application Password. Email notifications will be added once Lovable
// Cloud + an email domain are configured.

import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { wpFetch, WPNotConfiguredError, WPRequestError } from "@/lib/wp/client.server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
} as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Message is too short").max(2000),
  source_page: z.string().trim().max(200).optional(),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS_HEADERS }),

      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json(400, { ok: false, error: "Invalid JSON body" });
        }

        const parsed = contactSchema.safeParse(payload);
        if (!parsed.success) {
          return json(400, {
            ok: false,
            error: "Validation failed",
            details: parsed.error.flatten().fieldErrors,
          });
        }

        const { name, email, phone, message, source_page, website } = parsed.data;
        // Honeypot tripped — pretend success to avoid signalling bots
        if (website) return json(200, { ok: true });

        try {
          const created = await wpFetch<{ id: number; link: string }>({
            path: "/wp/v2/contact_submission",
            method: "POST",
            authenticated: true,
            body: {
              title: `Message from ${name}`,
              status: "private",
              content: message,
              acf: {
                email,
                phone: phone || "",
                message,
                source_page: source_page || "",
                submitted_at: new Date().toISOString(),
              },
            },
          });

          return json(200, { ok: true, id: created.id });
        } catch (err) {
          if (err instanceof WPNotConfiguredError) {
            console.error("[contact] WP_API_URL is not configured");
            return json(503, {
              ok: false,
              error: "Could not deliver your message. Please try again or email directly.",
            });
          }
          if (err instanceof WPRequestError) {
            console.error("[contact] WP write failed", err.status, err.body);
            return json(502, {
              ok: false,
              error: "Could not deliver your message. Please try again or email directly.",
            });
          }
          console.error("[contact] unexpected error", err);
          return json(500, { ok: false, error: "Unexpected error" });
        }
      },
    },
  },
});