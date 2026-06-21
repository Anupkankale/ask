import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "../components/page-hero";
import { listPosts } from "../lib/wp/content.functions";
import { getFeaturedImage, getMetaImage, plainText } from "../lib/wp/types";

const postsQueryOptions = queryOptions({
  queryKey: ["wp", "posts"],
  queryFn: () => listPosts(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Anup Kankale" },
      { name: "description", content: "Notes on WordPress, open source contributions, AI integrations and freelance dev life." },
      { property: "og:title", content: "Blog — Anup Kankale" },
      { property: "og:description", content: "Notes on WordPress, open source and AI." },
    ],
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
  const { data: posts } = useSuspenseQuery(postsQueryOptions);

  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title={<>Notes from the <span className="text-accent">WordPress &amp; AI world.</span></>}
        lead="A slow blog. I write roughly every couple of weeks about things I actually use at work."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 space-y-6">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-xs tracking-widest text-accent">COMING SOON</p>
            <h2 className="mt-3 text-xl text-primary">No posts published yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The blog is connected to a headless WordPress backend. Once posts go live there, they will appear here automatically.
            </p>
          </div>
        ) : (
          posts.map((post) => {
            const cover = getMetaImage(post.meta?.cover_image) ?? getFeaturedImage(post);
            const excerpt = post.meta?.excerpt_custom || plainText(post.excerpt.rendered, 220);
            return (
              <Link
                key={post.id}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-accent"
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
          })
        )}
      </section>
    </>
  );
}