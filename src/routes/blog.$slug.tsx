import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { pageHead } from "../lib/seo";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getPostBySlug } from "../lib/wp/content.functions";
import { findFallbackPost, fallbackOgImage, fallbackPostSource } from "../lib/wp/fallback-posts";
import { absoluteUrl, SITE_NAME, SITE_URL } from "../lib/seo";
import { getFeaturedImage, getAcfImage, plainText } from "../lib/wp/types";

const postQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["wp", "post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(postQueryOptions(params.slug));
    if (!post && !findFallbackPost(params.slug)) throw notFound();
  },
  head: ({ loaderData: _loaderData, params }) => {
    // The loader returns void, so the post body is not available here. Derive a
    // readable title from the slug and mark the page as an article so it still
    // ships a canonical URL and a complete social card.
    // A known placeholder post carries a real title and excerpt; otherwise fall
    // back to title-casing the slug, which is all the loader gives us here.
    const placeholder = findFallbackPost(params.slug);
    const title =
      placeholder?.title.rendered ??
      params.slug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
    const description =
      placeholder?.acf?.excerpt_custom ??
      `${title}: notes on WordPress, open source and AI by Anup Kankale.`;

    const path = `/blog/${params.slug}`;
    const image = fallbackOgImage(params.slug) ?? undefined;
    const head = pageHead({ title: `${title} | Anup Kankale`, description, path, type: "article", image });

    return {
      ...head,
      meta: [
        ...head.meta,
        { property: "article:author", content: SITE_NAME },
        ...(placeholder ? [{ property: "article:published_time", content: placeholder.date }] : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${absoluteUrl(path)}#post`,
                headline: title,
                description,
                url: absoluteUrl(path),
                mainEntityOfPage: absoluteUrl(path),
                ...(placeholder ? { datePublished: placeholder.date, dateModified: placeholder.modified } : {}),
                ...(image ? { image: absoluteUrl(image) } : {}),
                author: { "@id": `${SITE_URL}/#person` },
                publisher: { "@id": `${SITE_URL}/#person` },
                inLanguage: "en",
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
                  { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
                  { "@type": "ListItem", position: 3, name: title },
                ],
              },
            ],
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
  errorComponent: PostError,
});


// Pulls the h2s out of the post HTML and gives each one an id, so the table of
// contents can link to them. Done here rather than stored, so it stays correct
// for real WordPress content too.
function withHeadingIds(html: string) {
  const headings: Array<{ id: string; text: string }> = [];
  const used = new Set<string>();

  const withIds = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_match, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    let n = 2;
    while (used.has(id)) id = `${id}-${n++}`;
    used.add(id);
    headings.push({ id, text });
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });

  return { html: withIds, headings };
}

function PostPage() {
  const { slug } = Route.useParams();
  const { data: wpPost } = useSuspenseQuery(postQueryOptions(slug));
  const post = wpPost ?? findFallbackPost(slug);
  if (!post) return <PostNotFound />;

  const cover = getAcfImage(post.acf?.cover_image) ?? getFeaturedImage(post);
  const date = (() => {
    try {
      return new Date(post.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return post.date;
    }
  })();

  const { html: bodyHtml, headings } = withHeadingIds(post.content.rendered);
  const source = fallbackPostSource(slug);
  const lead = post.acf?.excerpt_custom ?? plainText(post.excerpt.rendered, 240);

  return (
    <div>
      {/* HERO, mirroring the section rhythm used on the homepage */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Link to="/blog" className="font-display text-xs tracking-widest text-accent hover:underline">
            BACK TO BLOG
          </Link>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="font-display text-xs tracking-widest text-accent">
                {date}
                {post.acf?.reading_time ? ` \u00b7 ${post.acf.reading_time} MIN READ` : ""}
              </p>
              <h1
                className="mt-3 text-4xl text-primary md:text-5xl"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{lead}</p>
              {source ? (
                <a
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  Read the original on LinkedIn <span aria-hidden="true">&#8594;</span>
                </a>
              ) : null}
            </div>
            {cover ? (
              <img
                src={cover}
                alt=""
                width={1200}
                height={630}
                fetchPriority="high"
                className="w-full rounded-2xl object-cover"
              />
            ) : null}
          </div>
        </div>
      </section>

      {/* BODY with a sticky table of contents */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[220px_1fr]">
          {headings.length > 1 ? (
            <aside className="md:sticky md:top-24 md:self-start">
              <p className="font-display text-xs tracking-widest text-accent">ON THIS PAGE</p>
              <nav aria-label="Table of contents" className="mt-4 border-l border-border">
                <ol className="space-y-2.5">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="-ml-px block border-l-2 border-transparent pl-4 text-sm leading-snug text-muted-foreground transition hover:border-accent hover:text-accent"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          ) : (
            <div className="hidden md:block" />
          )}

          <div>
            <div className="post-body max-w-2xl" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

            {source ? (
              <div className="mt-14 max-w-2xl rounded-2xl border border-border bg-card p-6">
                <p className="font-display text-xs tracking-widest text-accent">ORIGINALLY PUBLISHED</p>
                <p className="mt-2 text-muted-foreground">
                  This piece first appeared on LinkedIn. The version there has the original comments and
                  discussion.
                </p>
                <a
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  View it on LinkedIn <span aria-hidden="true">&#8594;</span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* CTA, the same block the homepage closes with */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[oklch(0.96_0.04_80)] p-10 md:p-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl text-primary md:text-5xl">Got a project like this one?</h2>
            <p className="mt-4 text-muted-foreground">
              If any of the above sounds like a problem you have, I would like to hear about it. WordPress
              builds, custom plugins, AI features and automations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
              >
                Start a conversation <span aria-hidden="true">&#8594;</span>
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Read more posts
              </Link>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
      </section>
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <meta name="robots" content="noindex, nofollow" />
      <h1 className="text-3xl text-primary">Post not found</h1>
      <p className="mt-3 text-muted-foreground">
        This post may have been moved or hasn't been published yet.
      </p>
      <Link
        to="/blog"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
      >
        Back to blog
      </Link>
    </div>
  );
}

function PostError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl text-primary">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">Couldn't load this post.</p>
      <button
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
      >
        Try again
      </button>
    </div>
  );
}