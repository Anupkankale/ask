// Shared WordPress REST + ACF response types. Kept narrow — extend as
// new ACF fields are added on the WP side. Optional fields handle the
// case where ACF returns `false` or omits keys for empty values.

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaSize {
  source_url: string;
  width: number;
  height: number;
}

export interface WPEmbeddedMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, WPMediaSize>;
  };
}

export interface WPEmbedded {
  "wp:featuredmedia"?: WPEmbeddedMedia[];
  "wp:term"?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
  author?: Array<{ id: number; name: string; url?: string }>;
}

export interface WPBase {
  id: number;
  slug: string;
  date: string;
  modified: string;
  status: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  link: string;
  _embedded?: WPEmbedded;
}

// ACF shapes (mirrors the field groups documented in WORDPRESS_SETUP.md)
export interface PostAcf {
  excerpt_custom?: string;
  reading_time?: number | string;
  cover_image?: string | { url: string } | false;
  seo_title?: string;
  seo_description?: string;
}

export interface ProjectAcf {
  client?: string;
  role?: string;
  tech_stack?: string | Array<{ tech?: string } | string>;
  live_url?: string;
  repo_url?: string;
  gallery?: Array<{ url: string; alt?: string } | string> | false;
  featured_order?: number;
  tag?: string;
}

export interface ServiceAcf {
  icon_name?: string;
  short_description?: string;
  features?: Array<{ feature_text?: string } | string> | false;
  price_from?: string | number;
  order?: number;
}

export interface PageAcf {
  hero_title?: string;
  hero_subtitle?: string;
  body_blocks?: unknown;
}

export type WPPost = WPBase & { acf?: PostAcf };
export type WPProject = WPBase & { acf?: ProjectAcf };
export type WPService = WPBase & { acf?: ServiceAcf };
export type WPPage = WPBase & { acf?: PageAcf };

// ---- Helpers --------------------------------------------------------------

export function getFeaturedImage(item: Pick<WPBase, "_embedded">): string | null {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  const sizes = media.media_details?.sizes;
  return (
    sizes?.large?.source_url ||
    sizes?.medium_large?.source_url ||
    sizes?.medium?.source_url ||
    media.source_url ||
    null
  );
}

export function getAcfImage(value: PostAcf["cover_image"]): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "url" in value) return value.url;
  return null;
}

export function normaliseStringList(
  value: ProjectAcf["tech_stack"] | ServiceAcf["features"],
): string[] {
  if (!value) return [];
  if (typeof value === "string") {
    return value
      .split(/[,|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();
      if (entry && typeof entry === "object") {
        if ("feature_text" in entry && entry.feature_text) return String(entry.feature_text).trim();
        if ("tech" in entry && entry.tech) return String(entry.tech).trim();
      }
      return "";
    })
    .filter(Boolean);
}

export function plainText(html: string | undefined, maxLength = 200): string {
  if (!html) return "";
  const stripped = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/\s+/g, " ")
    .trim();
  return stripped.length > maxLength ? `${stripped.slice(0, maxLength - 1)}…` : stripped;
}