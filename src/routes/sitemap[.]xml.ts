import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE_URL } from "../lib/seo";
import { wpFetch } from "../lib/wp/client.server";
import { fallbackPostIndex } from "../lib/wp/fallback-posts";

interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
  lastmod?: string;
}

// Published WordPress posts, newest first. An unconfigured or unreachable WP
// just means the sitemap lists the fallback posts alone.
async function wpPostIndex(): Promise<Array<{ slug: string; modified: string }>> {
  try {
    return await wpFetch<Array<{ slug: string; modified: string }>>({
      path: "/wp/v2/posts",
      query: { per_page: 100, status: "publish", _fields: "slug,modified" },
    });
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // WordPress wins on a shared slug, matching the blog routes.
        const posts = new Map<string, string>();
        for (const post of fallbackPostIndex) posts.set(post.slug, post.date);
        for (const post of await wpPostIndex()) posts.set(post.slug, post.modified);

        // Static pages carry no lastmod: stamping today's date on every request
        // teaches crawlers to ignore the field entirely.
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/projects", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          // Individual posts, so they are discoverable without relying on
          // crawlers walking the listing page.
          ...[...posts].map(([slug, date]) => ({
            path: `/blog/${slug}`,
            changefreq: "yearly",
            priority: "0.6",
            lastmod: date.slice(0, 10),
          })),
        ];
        // <loc> must be an absolute URL; relative paths make the whole
        // sitemap invalid and it gets discarded.
        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${e.path}</loc>`,
            ...(e.lastmod ? [`    <lastmod>${e.lastmod}</lastmod>`] : []),
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            "  </url>",
          ].join("\n"),
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
