import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/page-hero";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact | Anup Kankale",
      description:
        "Get in touch with Anup Kankale for WordPress development, custom plugins or AI integration projects.",
      path: "/contact",
    }),
  component: Contact,
});

// Digits only for wa.me and tel:; the spaced form is for display.
const WHATSAPP_NUMBER = "+918446165950";
const WHATSAPP_DISPLAY = "+91 84 46 16 59 50";
const WHATSAPP_URL =
  "https://wa.me/918446165950?text=" +
  encodeURIComponent("Hi Anup, I found your site and would like to talk about a project.");

const links = [
  { label: "WhatsApp", value: WHATSAPP_DISPLAY, href: WHATSAPP_URL },
  { label: "Email", value: "anupkankaleak47@gmail.com", href: "mailto:anupkankaleak47@gmail.com" },
  { label: "WordPress.org", value: "profiles.wordpress.org/anupkankale", href: "https://profiles.wordpress.org/anupkankale/" },
  { label: "LinkedIn", value: "in.linkedin.com/in/anupkankale", href: "https://in.linkedin.com/in/anupkankale" },
  { label: "Gravatar", value: "gravatar.com/anupkankale", href: "https://gravatar.com/anupkankale" },
];


function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={<>Let&apos;s talk about your <span className="text-accent">next project.</span></>}
        lead="Tell me what you&apos;re building. WhatsApp is the quickest way to reach me."
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

        <div className="rounded-2xl border border-border bg-card p-6 md:p-10">
          <p className="font-display text-xs tracking-widest text-accent">FASTEST WAY TO REACH ME</p>
          <h2 className="mt-3 text-3xl text-primary md:text-4xl">Message me on WhatsApp.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Tell me what you are building and I will come back to you, usually the same day. No form to fill
            in, no waiting on an inbox.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            Contact now on WhatsApp <span aria-hidden="true">&#8594;</span>
          </a>

          <p className="mt-5 text-sm text-muted-foreground">
            Or save the number:{" "}
            <a href={`tel:${WHATSAPP_NUMBER}`} className="font-medium text-primary hover:text-accent">
              {WHATSAPP_DISPLAY}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}