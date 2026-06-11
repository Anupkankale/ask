import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/page-hero";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Anup Kankale" },
      { name: "description", content: "Selected WordPress, plugin and AI integration projects shipped by Anup Kankale." },
      { property: "og:title", content: "Projects — Anup Kankale" },
      { property: "og:description", content: "Selected WordPress, plugin and AI integration projects." },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    tag: "ENTERPRISE WORDPRESS",
    title: "90+ page corporate website",
    body: "Designed and built a large-scale WordPress site with custom Gutenberg blocks, multilingual content and a workflow editors actually enjoy using.",
  },
  {
    tag: "AI INTEGRATION",
    title: "AI chatbot embedded into WordPress",
    body: "Connected an LLM-powered assistant to a content-heavy WordPress site, with role-aware answers and full conversation logging.",
  },
  {
    tag: "CUSTOM PLUGIN",
    title: "Business automation plugin suite",
    body: "Built a plugin family for lead capture, workflow management and reporting — eliminating hours of manual ops every week.",
  },
  {
    tag: "OPEN SOURCE",
    title: "WordPress Core contributions",
    body: "Code, bug fixes and testing for the WordPress project, credited in the 7.0 release and ongoing dev cycles.",
  },
  {
    tag: "AUTOMATION",
    title: "n8n workflow stack for SMB",
    body: "End-to-end automation between WordPress forms, CRM, email and Slack — replacing a tangled mess of Zaps and spreadsheets.",
  },
  {
    tag: "PERFORMANCE",
    title: "Core Web Vitals turnaround",
    body: "Took a struggling WordPress site from failing CWV to all-green with caching, image strategy and a leaner theme.",
  },
];

function Projects() {
  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title={<>A few things I&apos;ve <span className="text-accent">shipped.</span></>}
        lead="A small sample of recent client and open-source work. Want more detail on any of these? Reach out and I&apos;ll happily walk you through them."
      />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article key={p.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-accent">
            <p className="font-display text-xs tracking-widest text-accent">{p.tag}</p>
            <h2 className="mt-3 text-2xl text-primary">{p.title}</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="text-3xl text-primary md:text-4xl">Have a project in mind?</h2>
        <Link to="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">Let&apos;s talk →</Link>
      </section>
    </>
  );
}