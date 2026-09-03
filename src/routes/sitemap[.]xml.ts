import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE_URL } from "../lib/seo";

interface SitemapEntry { path: string; changefreq?: string; priority?: string }

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.8" },
          { path: "/projects", changefreq: "monthly", priority: "0.8" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
        ];
        // <loc> must be an absolute URL; relative paths make the whole
        // sitemap invalid and it gets discarded.
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls = entries.map((e) => `  <url>\n    <loc>${SITE_URL}${e.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});