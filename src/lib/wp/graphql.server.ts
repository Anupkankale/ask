// Server-only WPGraphQL client. Activated when WP_GRAPHQL_URL is set.
// Never import from client code — the `.server.ts` suffix blocks it from
// client bundles.

import process from "node:process";

export class WPGraphQLNotConfiguredError extends Error {
  constructor() {
    super("WP_GRAPHQL_URL is not configured");
    this.name = "WPGraphQLNotConfiguredError";
  }
}

export class WPGraphQLError extends Error {
  errors: unknown;
  constructor(errors: unknown) {
    super("WPGraphQL returned errors");
    this.name = "WPGraphQLError";
    this.errors = errors;
  }
}

function getEndpoint(): string | null {
  const raw = process.env.WP_GRAPHQL_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

export function isWPGraphQLConfigured(): boolean {
  return getEndpoint() !== null;
}

export async function gqlFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  timeoutMs = 8000,
): Promise<T> {
  const endpoint = getEndpoint();
  if (!endpoint) throw new WPGraphQLNotConfiguredError();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`WPGraphQL HTTP ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) throw new WPGraphQLError(json.errors);
  return json.data as T;
}