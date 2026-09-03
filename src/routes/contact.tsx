import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
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

const ABOUT_ME = "https://about.me/anupkankale";

const links = [
  { label: "About.me", value: "about.me/anupkankale", href: ABOUT_ME },
  { label: "Email", value: "anupkankaleak47@gmail.com", href: "mailto:anupkankaleak47@gmail.com" },
  { label: "Phone", value: "+91 93099 05702", href: "tel:+919309905702" },
  { label: "GitHub", value: "github.com/Anupkankale", href: "https://github.com/Anupkankale" },
  { label: "LinkedIn", value: "in.linkedin.com/in/anupkankale", href: "https://in.linkedin.com/in/anupkankale" },
  { label: "Gravatar", value: "gravatar.com/anupkankale", href: "https://gravatar.com/anupkankale" },
];

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title={<>Let&apos;s talk about your <span className="text-accent">next project.</span></>}
        lead="Tell me what you're building. The quickest way to reach me is right here."
      />
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:items-start">
        {/* Primary call to action: about.me */}
        <div className="rounded-3xl bg-gradient-to-br from-[oklch(0.58_0.17_254)] to-[oklch(0.53_0.2_285)] p-8 text-white shadow-lg shadow-accent/20 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Everything, in one link.</h2>
          <p className="mt-3 max-w-md leading-relaxed text-white/85">
            My about.me page has all my profiles and the easiest way to start a conversation. Say hello and
            I&apos;ll usually reply within a day or two.
          </p>
          <a
            href={ABOUT_ME}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-accent transition hover:opacity-90"
          >
            Connect on about.me
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <p className="mt-5 text-[13px] text-white/70">
            Prefer email? Reach me at{" "}
            <a href="mailto:anupkankaleak47@gmail.com" className="font-medium text-white underline underline-offset-2">
              anupkankaleak47@gmail.com
            </a>
          </p>
        </div>

        {/* Direct links */}
        <div className="space-y-3">
          {links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.label}
                href={l.href}
                target={external ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_14px_40px_-18px_rgba(0,0,0,0.22)]"
              >
                <span>
                  <span className="block text-[12px] font-semibold text-accent">{l.label}</span>
                  <span className="mt-0.5 block break-all font-medium text-foreground">{l.value}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            );
          })}
          <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
            Based in Mumbai, India · Working with clients worldwide (IST / UTC+5:30)
          </p>
        </div>
      </section>
    </>
  );
}
