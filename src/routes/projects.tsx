import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { listProjects } from "../lib/wp/content.functions";
import { getFeaturedImage, normaliseStringList, plainText } from "../lib/wp/types";

const projectsQueryOptions = queryOptions({
  queryKey: ["wp", "projects"],
  queryFn: () => listProjects(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Anup Kankale" },
      { name: "description", content: "Selected WordPress, plugin and AI integration projects shipped by Anup Kankale." },
      { property: "og:title", content: "Projects — Anup Kankale" },
      { property: "og:description", content: "Selected WordPress, plugin and AI integration projects." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(projectsQueryOptions);
  },
  component: Projects,
});

const fallbackProjects = [
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
  const { data: wpProjects } = useSuspenseQuery(projectsQueryOptions);

  const items =
    wpProjects.length > 0
      ? wpProjects.map((p) => {
          const cover = getFeaturedImage(p);
          const tech = normaliseStringList(p.acf?.tech_stack);
          return {
            id: String(p.id),
            tag: (p.acf?.tag || p.acf?.role || "PROJECT").toString().toUpperCase(),
            title: p.title.rendered,
            body: plainText(p.excerpt.rendered, 220) || plainText(p.content.rendered, 220),
            cover,
            tech,
            liveUrl: p.acf?.live_url,
            repoUrl: p.acf?.repo_url,
            isHtml: true,
          };
        })
      : fallbackProjects.map((p) => ({
          id: p.title,
          tag: p.tag,
          title: p.title,
          body: p.body,
          cover: null as string | null,
          tech: [] as string[],
          liveUrl: undefined as string | undefined,
          repoUrl: undefined as string | undefined,
          isHtml: false,
        }));

  return (
    <>
      <PageHero
        eyebrow="SELECTED WORK"
        title={<>A few things I&apos;ve <span className="text-accent">shipped.</span></>}
        lead="A small sample of recent client and open-source work. Want more detail on any of these? Reach out and I&apos;ll happily walk you through them."
      />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-6 md:grid-cols-2">
        {items.map((p) => (
          <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-accent">
            <p className="font-display text-xs tracking-widest text-accent">{p.tag}</p>
            {p.isHtml ? (
              <h2 className="mt-3 text-2xl text-primary" dangerouslySetInnerHTML={{ __html: p.title }} />
            ) : (
              <h2 className="mt-3 text-2xl text-primary">{p.title}</h2>
            )}
            {p.cover ? (
              <img src={p.cover} alt="" loading="lazy" className="mt-4 aspect-[16/9] w-full rounded-xl object-cover" />
            ) : null}
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            {p.tech.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {(p.liveUrl || p.repoUrl) ? (
              <div className="mt-5 flex gap-3 text-xs font-semibold">
                {p.liveUrl ? (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    Live →
                  </a>
                ) : null}
                {p.repoUrl ? (
                  <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                    Repo →
                  </a>
                ) : null}
              </div>
            ) : null}
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