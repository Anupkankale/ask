import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { pageHead } from "../lib/seo";
import { listPosts } from "../lib/wp/content.functions";
import { fallbackPosts } from "../lib/wp/fallback-posts";
import { getFeaturedImage, getAcfImage, plainText } from "../lib/wp/types";

const postsQueryOptions = queryOptions({
  queryKey: ["wp", "posts"],
  queryFn: () => listPosts(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/blog")({
  head: () =>
    pageHead({
      title: "Blog | Anup Kankale",
      description:
        "Notes on WordPress, open source contributions, AI integrations and freelance dev life.",
      path: "/blog",
    }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(postsQueryOptions);
  },
  component: Blog,
});

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
  const posts = wpPosts.length > 0 ? wpPosts : fallbackPosts;

  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title={<>Notes from the <span className="text-accent">WordPress &amp; AI world.</span></>}
        lead="A slow blog. I write roughly every couple of weeks about things I actually use at work."
      />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const cover = getAcfImage(post.acf?.cover_image) ?? getFeaturedImage(post);
            const excerpt = post.acf?.excerpt_custom ?? plainText(post.excerpt.rendered, 220);
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
                    alt=""
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
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-accent group-hover:underline">
                    Read post <span aria-hidden="true">&#8594;</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}