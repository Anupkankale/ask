import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/page-hero";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Anup Kankale" },
      { name: "description", content: "Notes on WordPress, open source contributions, AI integrations and freelance dev life." },
      { property: "og:title", content: "Blog — Anup Kankale" },
      { property: "og:description", content: "Notes on WordPress, open source and AI." },
    ],
  }),
  component: Blog,
});

const drafts = [
  { date: "Coming soon", title: "My journey to becoming a WordPress Core contributor", excerpt: "How I went from filing my first Trac ticket to landing a credit in the WordPress 7.0 release." },
  { date: "Coming soon", title: "AI + WordPress: the future of website building", excerpt: "Practical patterns for embedding LLMs into WordPress without breaking the editorial experience." },
  { date: "Coming soon", title: "Building custom WordPress plugins that don&apos;t age badly", excerpt: "Architecture, testing and the boring habits that keep a plugin alive for years." },
  { date: "Coming soon", title: "WordCamp Asia — what I took home", excerpt: "Talks, hallway conversations and ideas worth bringing back to client work." },
];

function Blog() {
  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title={<>Notes from the <span className="text-accent">WordPress &amp; AI world.</span></>}
        lead="A slow blog. I write roughly every couple of weeks about things I actually use at work."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 space-y-6">
        {drafts.map((d) => (
          <article key={d.title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-accent">
            <p className="font-display text-xs tracking-widest text-accent">{d.date}</p>
            <h2 className="mt-2 text-xl text-primary" dangerouslySetInnerHTML={{ __html: d.title }} />
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: d.excerpt }} />
          </article>
        ))}
        <p className="text-center text-sm text-muted-foreground">
          Want an email when the first post lands? <a href="mailto:hello@anupkankale.com" className="text-accent font-semibold">Drop me a line.</a>
        </p>
      </section>
    </>
  );
}