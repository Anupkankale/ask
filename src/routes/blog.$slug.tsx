import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getPostBySlug } from "../lib/wp/content.functions";
import { getFeaturedImage, getMetaImage, plainText } from "../lib/wp/types";

const postQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["wp", "post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(postQueryOptions(params.slug));
    if (!post) throw notFound();
  },
  head: ({ loaderData: _loaderData, params }) => {
    // Loader returns void; we don't have data here. Defer detailed meta to the
    // component-level fallback. This still emits a sensible title from slug.
    const fallbackTitle = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${fallbackTitle} — Anup Kankale` },
        { property: "og:title", content: `${fallbackTitle} — Anup Kankale` },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: PostNotFound,
  errorComponent: PostError,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQueryOptions(slug));
  if (!post) return <PostNotFound />;

  const cover = getMetaImage(post.meta?.cover_image) ?? getFeaturedImage(post);
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link to="/blog" className="text-xs font-semibold tracking-widest text-accent">
        ← BACK TO BLOG
      </Link>
      <p className="mt-6 font-display text-xs tracking-widest text-accent">
        {date}
        {post.meta?.reading_time ? ` · ${post.meta.reading_time} MIN READ` : ""}
      </p>
      <h1
        className="mt-3 text-4xl text-primary md:text-5xl"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      {post.meta?.excerpt_custom ? (
        <p className="mt-4 text-lg text-muted-foreground">{post.meta.excerpt_custom}</p>
      ) : (
        <p className="mt-4 text-lg text-muted-foreground">
          {plainText(post.excerpt.rendered, 240)}
        </p>
      )}
      {cover ? (
        <img
          src={cover}
          alt=""
          className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
        />
      ) : null}
      <div
        className="prose prose-invert mt-10 max-w-none text-muted-foreground prose-headings:text-primary prose-a:text-accent"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}

function PostNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
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