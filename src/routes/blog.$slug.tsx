import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { pageHead } from "../lib/seo";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { getPostBySlug } from "../lib/wp/content.functions";
import { findFallbackPost, fallbackOgImage } from "../lib/wp/fallback-posts";
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

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <Link to="/blog" className="text-xs font-semibold tracking-widest text-accent">
        ← BACK TO BLOG
      </Link>
      <p className="mt-6 font-display text-xs tracking-widest text-accent">
        {date}
        {post.acf?.reading_time ? ` · ${post.acf.reading_time} MIN READ` : ""}
      </p>
      <h1
        className="mt-3 text-4xl text-primary md:text-5xl"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      {post.acf?.excerpt_custom ? (
        <p className="mt-4 text-lg text-muted-foreground">{post.acf.excerpt_custom}</p>
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
        className="post-body mt-10"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
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