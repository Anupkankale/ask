import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { pageHead } from "../lib/seo";
import { CtaCard, ctaPrimary, ctaSecondary } from "../components/cta-card";
import { listServices } from "../lib/wp/content.functions";
import { normaliseStringList, plainText } from "../lib/wp/types";

const servicesQueryOptions = queryOptions({
  queryKey: ["wp", "services"],
  queryFn: () => listServices(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead({
      title: "Services: WordPress, AI & Automation | Anup Kankale",
      description:
        "WordPress development, custom plugins, AI integrations, n8n automation workflows, performance optimization and ongoing maintenance.",
      path: "/services",
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
          items: normaliseStringList(s.acf?.features),
          summary: s.acf?.short_description || plainText(s.excerpt.rendered, 180),
          priceFrom: s.acf?.price_from,
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
        title={
          <>
            How I can <span className="text-accent">help you ship.</span>
          </>
        }
        lead="A short menu of the things I do most often. If your project doesn't quite fit a box, send me a note anyway. Most good work doesn't."
      />
      <section className="mx-auto max-w-6xl px-6 py-20 grid gap-8 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.id} className="rounded-2xl border border-border bg-card p-8">
            {g.isHtml ? (
              <h2 className="text-2xl text-primary" dangerouslySetInnerHTML={{ __html: g.title }} />
            ) : (
              <h2 className="text-2xl text-primary">{g.title}</h2>
            )}
            {g.summary ? <p className="mt-2 text-sm text-muted-foreground">{g.summary}</p> : null}
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

      <CtaCard
        eyebrow="NOT SURE WHERE TO START?"
        title={<>Tell me what you need. I&apos;ll point you the right way.</>}
        body="A quick message usually clears things up. No obligations, no pitch, just an honest view of how I would approach it."
      >
        <Link to="/contact" className={ctaPrimary}>
          Send me a message <span aria-hidden="true">&#8594;</span>
        </Link>
        <Link to="/projects" className={ctaSecondary}>
          See my work
        </Link>
      </CtaCard>
    </>
  );
}
