// Server functions exposing WordPress content to the app. Each handler
// gracefully returns an empty list when WP is not yet configured, so the
// frontend can render fallback content without errors.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { wpFetch, WPNotConfiguredError } from "./client.server";
import { gqlFetch, isWPGraphQLConfigured } from "./graphql.server";
import {
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  SERVICES_QUERY,
} from "./queries";
import type { WPPost, WPProject, WPService } from "./types";

const slugSchema = z.object({ slug: z.string().min(1).max(200) });

// ---- GraphQL -> REST shape mappers ----------------------------------------

interface GqlImage {
  node?: {
    sourceUrl?: string;
    altText?: string;
    mediaDetails?: {
      sizes?: Array<{ name: string; sourceUrl: string; width: number; height: number }>;
    };
  } | null;
}

interface GqlBaseNode {
  databaseId: number;
  slug: string;
  date: string;
  modified: string;
  status: string;
  link: string;
  title?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: GqlImage | null;
  [extra: string]: unknown;
}

function mapImage(img: GqlImage | null | undefined) {
  const node = img?.node;
  if (!node?.sourceUrl) return undefined;
  const sizes: Record<string, { source_url: string; width: number; height: number }> = {};
  for (const s of node.mediaDetails?.sizes ?? []) {
    sizes[s.name] = { source_url: s.sourceUrl, width: s.width, height: s.height };
  }
  return {
    id: 0,
    source_url: node.sourceUrl,
    alt_text: node.altText ?? "",
    media_details: { sizes },
  };
}

function mapBase(n: GqlBaseNode) {
  const media = mapImage(n.featuredImage);
  return {
    id: n.databaseId,
    slug: n.slug,
    date: n.date,
    modified: n.modified,
    status: (n.status ?? "publish").toLowerCase(),
    link: n.link,
    featured_media: 0,
    title: { rendered: n.title ?? "" },
    content: { rendered: n.content ?? "" },
    excerpt: { rendered: n.excerpt ?? "" },
    _embedded: media ? { "wp:featuredmedia": [media] } : undefined,
  };
}

function pickMeta<T extends Record<string, string>>(node: Record<string, unknown>, map: T) {
  const out: Record<string, unknown> = {};
  for (const [outKey, gqlKey] of Object.entries(map)) {
    const v = node[gqlKey];
    if (v !== undefined && v !== null && v !== "") out[outKey] = v;
  }
  return out;
}

function mapPost(n: GqlBaseNode): WPPost {
  return {
    ...mapBase(n),
    meta: pickMeta(n, {
      excerpt_custom: "excerptCustom",
      reading_time: "readingTime",
      cover_image: "coverImage",
      seo_title: "seoTitle",
      seo_description: "seoDescription",
    }),
  };
}

function mapProject(n: GqlBaseNode): WPProject {
  return {
    ...mapBase(n),
    meta: pickMeta(n, {
      client: "client",
      role: "role",
      tech_stack: "techStack",
      live_url: "liveUrl",
      repo_url: "repoUrl",
      gallery: "gallery",
      featured_order: "featuredOrder",
      tag: "tag",
    }),
  };
}

function mapService(n: GqlBaseNode): WPService {
  return {
    ...mapBase(n),
    meta: pickMeta(n, {
      icon_name: "iconName",
      short_description: "shortDescription",
      features: "features",
      price_from: "priceFrom",
      order: "order",
    }),
  };
}

async function safeList<T>(path: string, query: Record<string, string | number>): Promise<T[]> {
  try {
    return await wpFetch<T[]>({ path, query });
  } catch (err) {
    if (err instanceof WPNotConfiguredError) return [];
    console.error(`[wp] list failed for ${path}:`, err);
    return [];
  }
}

async function tryGraphQL<T>(fn: () => Promise<T>): Promise<T | null> {
  if (!isWPGraphQLConfigured()) return null;
  try {
    return await fn();
  } catch (err) {
    console.error("[wp/graphql] falling back to REST:", err);
    return null;
  }
}

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const gql = await tryGraphQL(async () => {
    const data = await gqlFetch<{ posts: { nodes: GqlBaseNode[] } }>(POSTS_QUERY, { first: 20 });
    return data.posts.nodes.map(mapPost);
  });
  if (gql) return gql;
  return safeList<WPPost>("/wp/v2/posts", {
    per_page: 20,
    _embed: "wp:featuredmedia,author,wp:term",
    status: "publish",
  });
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator(slugSchema)
  .handler(async ({ data }) => {
    const gql = await tryGraphQL(async () => {
      const res = await gqlFetch<{ post: GqlBaseNode | null }>(POST_BY_SLUG_QUERY, { slug: data.slug });
      return res.post ? mapPost(res.post) : null;
    });
    if (gql !== null) return gql;
    const results = await safeList<WPPost>("/wp/v2/posts", {
      slug: data.slug,
      _embed: "wp:featuredmedia,author,wp:term",
      status: "publish",
    });
    return results[0] ?? null;
  });

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const gql = await tryGraphQL(async () => {
    const data = await gqlFetch<{ projects: { nodes: GqlBaseNode[] } }>(PROJECTS_QUERY, { first: 50 });
    return data.projects.nodes.map(mapProject);
  });
  if (gql) return gql;
  return safeList<WPProject>("/wp/v2/projects", {
    per_page: 50,
    _embed: "wp:featuredmedia",
    orderby: "menu_order",
    order: "asc",
    status: "publish",
  });
});

export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  const gql = await tryGraphQL(async () => {
    const data = await gqlFetch<{ services: { nodes: GqlBaseNode[] } }>(SERVICES_QUERY, { first: 50 });
    return data.services.nodes.map(mapService);
  });
  if (gql) return gql;
  return safeList<WPService>("/wp/v2/services", {
    per_page: 50,
    _embed: "wp:featuredmedia",
    orderby: "menu_order",
    order: "asc",
    status: "publish",
  });
});