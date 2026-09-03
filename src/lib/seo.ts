// Single source of truth for the site's public identity and per-page metadata.
//
// Canonical tags, og:url and sitemap <loc> entries are all ignored by search
// engines unless they are absolute URLs, so everything here is built from one
// origin. Set VITE_SITE_URL in the deploy environment; the fallback only keeps
// local development sane.

const FALLBACK_SITE_URL = "https://anupkankale.com";

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/+$/, "");

export const SITE_NAME = "Anup Kankale";

// 1200x630 social card. Absolute URLs are required: crawlers fetching og:image
// do not resolve relative paths.
export const DEFAULT_OG_IMAGE = "/og/default.png";

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export interface PageSeoOptions {
  title: string;
  description: string;
  /** Route path, e.g. "/about". Used for the canonical URL and og:url. */
  path: string;
  image?: string;
  type?: "website" | "article";
  /** Keep thin or duplicate pages out of the index. */
  noindex?: boolean;
}

/**
 * Builds the meta + link tags for one page. Every route should use this so no
 * page ships without a canonical URL or a social card.
 */
export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
}: PageSeoOptions) {
  const url = absoluteUrl(path);

  // NOTE: the canonical <link> is deliberately not returned here. Route links
  // merge parent into child, so a parent emitting one would put two canonicals
  // on every nested page. CanonicalLink in __root.tsx emits exactly one.
  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),

      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: absoluteUrl(image) },
      { property: "og:image:alt", content: title },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },

      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl(image) },
    ],
  };
}
