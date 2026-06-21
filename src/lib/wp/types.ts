// Shared WordPress REST response types. Uses native post meta (no ACF /
// no paid plugins). Field names mirror the meta keys registered via
// `register_post_meta(... 'show_in_rest' => true ...)` in functions.php.

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

// Meta shapes (mirrors the meta keys registered in functions.php — see
// WORDPRESS_SETUP.md). All fields optional; missing values come back as
// "" / 0 from WP, so callers must guard.
export interface PostMeta {
  excerpt_custom?: string;
  reading_time?: number | string;
  cover_image?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface ProjectMeta {
  client?: string;
  role?: string;
  // Comma- or pipe-separated list of techs, e.g. "React, WordPress, n8n"
  tech_stack?: string;
  live_url?: string;
  repo_url?: string;
  // Comma-separated list of image URLs
  gallery?: string;
  featured_order?: number;
  tag?: string;
}

export interface ServiceMeta {
  icon_name?: string;
  short_description?: string;
  // Newline- or pipe-separated feature list
  features?: string;
  price_from?: string | number;
  order?: number;
}

export interface PageMeta {
  hero_title?: string;
  hero_subtitle?: string;
}

export type WPPost = WPBase & { meta?: PostMeta };
export type WPProject = WPBase & { meta?: ProjectMeta };
export type WPService = WPBase & { meta?: ServiceMeta };
export type WPPage = WPBase & { meta?: PageMeta };

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

export function getMetaImage(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normaliseStringList(
  value: string | undefined,
): string[] {
  if (!value) return [];
  return value
    .split(/[,|\n]/)
    .map((s) => s.trim())
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