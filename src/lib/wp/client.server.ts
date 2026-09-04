// Server-only WordPress REST client. Reads WP_API_URL inside each call so
// Cloudflare Workers' per-request env binding works. Never import this
// module from client code; the `.server.ts` suffix blocks it from client
// bundles.

import process from "node:process";

export interface WPFetchOptions {
  // path relative to /wp-json, e.g. "/wp/v2/posts"
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  // Use Application Password credentials (write endpoints)
  authenticated?: boolean;
  // ms; default 8000
  timeoutMs?: number;
}

export class WPNotConfiguredError extends Error {
  constructor() {
    super("WP_API_URL is not configured");
    this.name = "WPNotConfiguredError";
  }
}

export class WPRequestError extends Error {
  status: number;
  body: string;
  constructor(status: number, body: string) {
    super(`WP request failed (${status})`);
    this.name = "WPRequestError";
    this.status = status;
    this.body = body;
  }
}

function getBaseUrl(): string | null {
  const raw = process.env.WP_API_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

function buildAuthHeader(): string | null {
  const user = process.env.WP_APP_USER?.trim();
  const pass = process.env.WP_APP_PASSWORD?.trim();
  if (!user || !pass) return null;
  return `Basic ${btoa(`${user}:${pass}`)}`;
}

export async function wpFetch<T>(opts: WPFetchOptions): Promise<T> {
  const base = getBaseUrl();
  if (!base) throw new WPNotConfiguredError();

  const url = new URL(`${base}${opts.path.startsWith("/") ? "" : "/"}${opts.path}`);
  if (opts.query) {
    for (const [k, v] of Object.entries(opts.query)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";

  if (opts.authenticated) {
    const auth = buildAuthHeader();
    if (!auth) {
      throw new Error("WP_APP_USER and WP_APP_PASSWORD must be set for authenticated requests");
    }
    headers["Authorization"] = auth;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 8000);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: opts.method ?? "GET",
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new WPRequestError(res.status, text.slice(0, 500));
  }

  return (await res.json()) as T;
}

export function isWPConfigured(): boolean {
  return getBaseUrl() !== null;
}