import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHero } from "../components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Anup Kankale" },
      { name: "description", content: "Get in touch with Anup Kankale for WordPress development, custom plugins or AI integration projects." },
      { property: "og:title", content: "Contact | Anup Kankale" },
      { property: "og:description", content: "Get in touch about WordPress, plugins or AI projects." },
    ],
  }),
  component: Contact,
});

const links = [
  { label: "Email", value: "hello@anupkankale.com", href: "mailto:hello@anupkankale.com" },
  { label: "WordPress.org", value: "profiles.wordpress.org/anupkankale", href: "https://profiles.wordpress.org/anupkankale/" },
  { label: "LinkedIn", value: "in.linkedin.com/in/anupkankale", href: "https://in.linkedin.com/in/anupkankale" },
  { label: "Gravatar", value: "gravatar.com/anupkankale", href: "https://gravatar.com/anupkankale" },
];

const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a bit more (10+ characters)").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source_page: typeof window !== "undefined" ? window.location.pathname : "/contact",
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setStatus("error");
        setErrorMessage(body.error || "Couldn't send your message. Please try again.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={<>Let&apos;s talk about your <span className="text-accent">next project.</span></>}
        lead="Tell me what you&apos;re building. I usually reply within a day or two."
      />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <p className="font-display text-xs tracking-widest text-accent">{l.label.toUpperCase()}</p>
                <p className="mt-1 text-primary font-medium break-all">{l.value}</p>
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based in Mumbai, India · Working with clients worldwide (IST / UTC+5:30)
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="name" className="font-display text-xs tracking-widest text-accent">
              YOUR NAME
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register("name")}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-primary outline-none focus:border-accent"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="font-display text-xs tracking-widest text-accent">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-primary outline-none focus:border-accent"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="font-display text-xs tracking-widest text-accent">
                PHONE <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                {...register("phone")}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-primary outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="font-display text-xs tracking-widest text-accent">
              MESSAGE
            </label>
            <textarea
              id="message"
              rows={6}
              {...register("message")}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-primary outline-none focus:border-accent resize-y"
              aria-invalid={errors.message ? "true" : "false"}
              placeholder="Project description, timeline, links, anything useful…"
            />
            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
          </div>

          {/* Honeypot — hidden from humans */}
          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send message →"}
            </button>
            {status === "success" && (
              <p className="text-sm text-accent">Thanks! Your message is on its way.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Submissions are saved as private posts in your WordPress backend. I read every message.
          </p>
        </form>
      </section>
    </>
  );
}