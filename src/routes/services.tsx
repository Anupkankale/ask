import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { listServices } from "../lib/wp/content.functions";
import { normaliseStringList, plainText } from "../lib/wp/types";

const servicesQueryOptions = queryOptions({
  queryKey: ["wp", "services"],
  queryFn: () => listServices(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | WordPress, AI & Automation | Anup Kankale" },
      { name: "description", content: "WordPress development, custom plugins, AI integrations, n8n automation workflows, performance optimization and ongoing maintenance." },
      { property: "og:title", content: "Services | Anup Kankale" },
      { property: "og:description", content: "WordPress development, custom plugins, AI integrations and automation workflows." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(servicesQueryOptions);
  },
  component: Services,
});

const fallbackGroups = [
  {
    title: "WordPress Development",
    items: [
      "Custom themes & block themes (FSE)",
      "Gutenberg blocks and block patterns",
      "Headless WordPress with REST / GraphQL",
      "Complex editorial workflows and roles",
    ],
  },
  {
    title: "Custom Plugins & Features",
    items: [
      "Business-logic plugins tailored to your stack",
      "REST API endpoints and integrations",
      "WooCommerce extensions and tweaks",
      "Migration tools and one-off scripts",
    ],
  },
  {
    title: "AI & Automation",
    items: [
      "AI chatbots embedded in WordPress",
      "LLM-powered content & search features",
      "n8n workflows for ops and marketing",
      "Internal tools to reduce repetitive work",
    ],
  },
  {
    title: "Performance & Care",
    items: [
      "Core Web Vitals audits and fixes",
      "Caching, CDN and image strategy",
      "Security hardening and updates",
      "Ongoing maintenance retainers",
    ],
  },
];

function Services() {
  const { data: wpServices } = useSuspenseQuery(servicesQueryOptions);

  const groups =
    wpServices.length > 0
      ? wpServices.map((s) => ({
          id: String(s.id),
          title: s.title.rendered,
          isHtml: true,
          items: normaliseStringList(s.meta?.features),
          summary: s.meta?.short_description || plainText(s.excerpt.rendered, 180),
          priceFrom: s.meta?.price_from,
        }))
      : fallbackGroups.map((g) => ({
          id: g.title,
          title: g.title,
          isHtml: false,
          items: g.items,
          summary: "",
          priceFrom: undefined as string | number | undefined,
        }));

  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title={<>How I can <span className="text-accent">help you ship.</span></>}
        lead="A short menu of the things I do most often. If your project doesn&apos;t quite fit a box, send me a note anyway. Most good work doesn&apos;t."
      />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-8 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.id} className="rounded-2xl border border-border bg-card p-8">
            {g.isHtml ? (
              <h2 className="text-2xl text-primary" dangerouslySetInnerHTML={{ __html: g.title }} />
            ) : (
              <h2 className="text-2xl text-primary">{g.title}</h2>
            )}
            {g.summary ? (
              <p className="mt-2 text-sm text-muted-foreground">{g.summary}</p>
            ) : null}
            <ul className="mt-5 space-y-3">
              {g.items.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            {g.priceFrom ? (
              <p className="mt-5 text-xs font-semibold tracking-widest text-accent">
                FROM {g.priceFrom}
              </p>
            ) : null}
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center">
        <h2 className="text-3xl text-primary md:text-4xl">Not sure where to start?</h2>
        <p className="mt-3 text-muted-foreground">A quick 20-minute call usually clears things up. No obligations, no pitch.</p>
        <Link to="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">Book a chat →</Link>
      </section>
    </>
  );
}