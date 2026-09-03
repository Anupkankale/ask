import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "../lib/seo";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { listPosts } from "../lib/wp/content.functions";
import { getFeaturedImage, getMetaImage, plainText } from "../lib/wp/types";
import { DUMMY_POSTS } from "../lib/wp/dummy-posts";

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
  const { data: fetched } = useSuspenseQuery(postsQueryOptions);
  const posts = fetched.length > 0 ? fetched : DUMMY_POSTS;
  const isDummy = fetched.length === 0;

  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title={<>Notes from the <span className="text-accent">WordPress &amp; AI world.</span></>}
        lead="A slow blog. I write roughly every couple of weeks about things I actually use at work."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 space-y-6">
        {isDummy ? (
          <p className="text-center font-display text-xs tracking-widest text-accent">
            SAMPLE POSTS · SHOWN UNTIL WORDPRESS IS CONNECTED
          </p>
        ) : null}
        {posts.map((post) => {
            const cover = getMetaImage(post.meta?.cover_image) ?? getFeaturedImage(post);
            const excerpt = post.meta?.excerpt_custom || plainText(post.excerpt.rendered, 220);
            return (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block rounded-3xl bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)]"
              >
                <p className="font-display text-xs tracking-widest text-accent">
                  {formatDate(post.date)}
                  {post.meta?.reading_time ? ` · ${post.meta.reading_time} MIN READ` : ""}
                </p>
                <h2
                  className="mt-2 text-xl text-primary"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                {cover ? (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    className="mt-4 aspect-[16/9] w-full rounded-xl object-cover"
                  />
                ) : null}
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{excerpt}</p>
              </Link>
            );
          })}
      </section>
    </>
  );
}