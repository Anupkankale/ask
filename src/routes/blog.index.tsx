import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { pageHead } from "../lib/seo";
import { CtaCard, ctaPrimary, ctaSecondary } from "../components/cta-card";
import { listPosts } from "../lib/wp/content.functions";
import { fallbackPosts } from "../lib/wp/fallback-posts";
import {
  getFeaturedImage,
  getAcfImage,
  getPostTags,
  plainText,
  type PostTag,
} from "../lib/wp/types";

const postsQueryOptions = queryOptions({
  queryKey: ["wp", "posts"],
  queryFn: () => listPosts(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Blog | Anup Kankale",
      description:
        "Notes on WordPress, open source contributions, AI integrations and freelance dev life.",
      path: "/blog",
    }),
  // ?tag=<slug> filters the list. Kept in the URL so a filtered view can be
  // shared and survives back/forward; the canonical drops it, so filtered
  // views never compete with /blog in search.
  validateSearch: (search: Record<string, unknown>): { tag?: string } => ({
    tag: typeof search.tag === "string" && search.tag ? search.tag : undefined,
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(postsQueryOptions);
  },
  component: Blog,
});

const chipBase =
  "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition";
const chipActive = `${chipBase} border-primary bg-primary text-primary-foreground`;
const chipIdle = `${chipBase} border-border bg-card text-primary hover:border-accent hover:text-accent`;
const chipCount = "text-xs opacity-70";

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return value;
  }
}

function Blog() {
  const { data: wpPosts } = useSuspenseQuery(postsQueryOptions);
  // WordPress wins whenever it has anything to serve; these only fill the gap.
  const allPosts = wpPosts.length > 0 ? wpPosts : fallbackPosts;
  const { tag: activeTag } = Route.useSearch();

  // Every tag in use, most-used first, with how many posts carry it.
  const tagCounts = new Map<string, PostTag & { count: number }>();
  for (const post of allPosts) {
    for (const t of getPostTags(post)) {
      const entry = tagCounts.get(t.slug) ?? { ...t, count: 0 };
      entry.count += 1;
      tagCounts.set(t.slug, entry);
    }
  }
  const tags = [...tagCounts.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
  const activeName = activeTag ? tagCounts.get(activeTag)?.name : undefined;
  const posts = activeTag
    ? allPosts.filter((post) => getPostTags(post).some((t) => t.slug === activeTag))
    : allPosts;

  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title={
          <>
            Notes from the <span className="text-accent">WordPress &amp; AI world.</span>
          </>
        }
        lead="A slow blog. I write roughly every couple of weeks about things I actually use at work."
      />
      <section className="mx-auto max-w-6xl px-6 py-20">
        {tags.length > 0 ? (
          <nav aria-label="Filter posts by topic" className="mb-10">
            <p className="font-display text-xs tracking-widest text-accent">BROWSE BY TOPIC</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              <li>
                <Link
                  to="/blog"
                  search={{}}
                  activeOptions={{ exact: true }}
                  aria-current={!activeTag ? "page" : undefined}
                  className={!activeTag ? chipActive : chipIdle}
                >
                  All <span className={chipCount}>{allPosts.length}</span>
                </Link>
              </li>
              {tags.map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/blog"
                    search={{ tag: t.slug }}
                    activeOptions={{ exact: true }}
                    aria-current={activeTag === t.slug ? "page" : undefined}
                    className={activeTag === t.slug ? chipActive : chipIdle}
                  >
                    {t.name} <span className={chipCount}>{t.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {activeTag && posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <p className="text-lg text-primary">
              No posts tagged &ldquo;{activeName ?? activeTag}&rdquo; yet.
            </p>
            <Link
              to="/blog"
              search={{}}
              activeOptions={{ exact: true }}
              className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline"
            >
              See all posts
            </Link>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const cover = getAcfImage(post.acf?.cover_image) ?? getFeaturedImage(post);
            const excerpt = post.acf?.excerpt_custom ?? plainText(post.excerpt.rendered, 220);
            const postTags = getPostTags(post);
            return (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_40px_-20px_oklch(0.7_0.21_25/0.4)]"
              >
                {cover ? (
                  <img
                    src={cover}
                    alt={plainText(post.title.rendered, 200)}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                ) : (
                  // Keeps every card the same shape when a post has no cover.
                  <div className="aspect-[16/9] w-full bg-[radial-gradient(circle_at_30%_20%,_var(--highlight),_transparent_70%)]" />
                )}

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-xs tracking-widest text-accent">
                    {formatDate(post.date)}
                    {post.acf?.reading_time ? ` \u00b7 ${post.acf.reading_time} MIN READ` : ""}
                  </p>
                  <h2
                    className="mt-2 text-xl text-primary leading-snug"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="mt-3 line-clamp-4 text-sm text-muted-foreground leading-relaxed">
                    {excerpt}
                  </p>
                  {postTags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
                      {postTags.map((t) => (
                        <li
                          key={t.slug}
                          className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {t.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-accent group-hover:underline">
                    Read post <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <CtaCard
        eyebrow="ENJOYED THE NOTES?"
        title="Have a problem like these?"
        body="Most of these posts started as a real client problem. If you have one of your own, I would like to hear about it."
      >
        <Link to="/contact" className={ctaPrimary}>
          Start a conversation <span aria-hidden="true">&#8594;</span>
        </Link>
        <Link to="/projects" className={ctaSecondary}>
          See my work
        </Link>
      </CtaCard>
    </>
  );
}
