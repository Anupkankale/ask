import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/page-hero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Anup Kankale" },
      { name: "description", content: "WordPress Core contributor and AI-focused developer based in Mumbai. Learn about my background, values and how I work." },
      { property: "og:title", content: "About Anup Kankale" },
      { property: "og:description", content: "WordPress Core contributor and AI-focused developer based in Mumbai." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ME"
        title={<>Hi, I&apos;m Anup — <span className="text-accent">a developer who loves the open web.</span></>}
        lead="I help businesses build modern WordPress websites and add intelligent, AI-powered features without losing the simplicity that makes WordPress great."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>I&apos;m based in <strong className="text-primary">Mumbai, India</strong> and have spent the last several years building with WordPress, from small business sites to enterprise platforms with 90+ pages and complex editorial workflows.</p>
        <p>I&apos;m a proud <strong className="text-primary">WordPress Core contributor</strong>, credited in the WordPress 7.0 release for code and bug fixes. Beyond contributions, I actively participate in the community through WordCamps and open-source projects on GitHub.</p>
        <p>My current obsession is the intersection of <strong className="text-primary">WordPress and AI</strong> — chatbots, LLM-powered content tools, and n8n automations that quietly take care of repetitive work so teams can focus on the meaningful parts of their job.</p>
        <p>I believe great websites should be <strong className="text-primary">fast, accessible and easy to manage</strong>. That&apos;s the bar I try to hit on every project, big or small.</p>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-display text-sm tracking-widest text-accent">HOW I WORK</p>
            <h2 className="mt-3 text-3xl text-primary md:text-4xl">Calm, clear, and shipped on time.</h2>
          </div>
          <ul className="space-y-5">
            {[
              ["Honest scoping", "I&apos;d rather tell you something is the wrong fit than over-promise."],
              ["Plain-language updates", "No jargon walls. You&apos;ll always know what&apos;s happening and why."],
              ["WordPress-first thinking", "I lean on the platform&apos;s strengths instead of fighting them."],
              ["Built to hand off", "Clean code, documentation and editorial UX your team can actually maintain."],
            ].map(([h, b]) => (
              <li key={h} className="flex gap-4">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="font-semibold text-primary">{h}</p>
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: b }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl text-primary md:text-4xl">Like what you read?</h2>
        <p className="mt-3 text-muted-foreground">Tell me about your project. I read every message.</p>
        <Link to="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">Get in touch →</Link>
      </section>
    </>
  );
}