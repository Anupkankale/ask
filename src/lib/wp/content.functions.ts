// Server functions exposing WordPress content to the app. Each handler
// gracefully returns an empty list when WP is not yet configured, so the
// frontend can render fallback content without errors.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { wpFetch, WPNotConfiguredError } from "./client.server";
import type { WPPost, WPProject, WPService } from "./types";

const slugSchema = z.object({ slug: z.string().min(1).max(200) });

async function safeList<T>(path: string, query: Record<string, string | number>): Promise<T[]> {
  try {
    return await wpFetch<T[]>({ path, query });
  } catch (err) {
    if (err instanceof WPNotConfiguredError) return [];
    console.error(`[wp] list failed for ${path}:`, err);
    return [];
  }
}

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  return safeList<WPPost>("/wp/v2/posts", {
    per_page: 20,
    _embed: "wp:featuredmedia,author,wp:term",
    status: "publish",
  });
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator(slugSchema)
  .handler(async ({ data }) => {
    const results = await safeList<WPPost>("/wp/v2/posts", {
      slug: data.slug,
      _embed: "wp:featuredmedia,author,wp:term",
      status: "publish",
    });
    return results[0] ?? null;
  });

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  return safeList<WPProject>("/wp/v2/projects", {
    per_page: 50,
    _embed: "wp:featuredmedia",
    orderby: "menu_order",
    order: "asc",
    status: "publish",
  });
});

export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  return safeList<WPService>("/wp/v2/services", {
    per_page: 50,
    _embed: "wp:featuredmedia",
    orderby: "menu_order",
    order: "asc",
    status: "publish",
  });
});