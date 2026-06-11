import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anup Kankale" },
      { name: "description", content: "Get in touch with Anup Kankale for WordPress development, custom plugins or AI integration projects." },
      { property: "og:title", content: "Contact — Anup Kankale" },
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

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={<>Let&apos;s talk about your <span className="text-accent">next project.</span></>}
        lead="Tell me what you&apos;re building. I usually reply within a day or two."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
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
        <div className="text-muted-foreground leading-relaxed">
          <p>The fastest way to reach me is email, but I&apos;m happy to chat anywhere you&apos;re comfortable — LinkedIn DMs and WordPress.org Slack both work.</p>
          <p className="mt-4">When you write, it helps if you can include:</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• A short description of your project or problem</li>
            <li>• Your rough timeline and budget range (even ballpark is fine)</li>
            <li>• Any links — current site, brief, references</li>
          </ul>
          <p className="mt-6 text-sm">Based in Mumbai, India · Working with clients worldwide (IST / UTC+5:30)</p>
        </div>
      </section>
    </>
  );
}