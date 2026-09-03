# Optional WPGraphQL Integration

Add a second, opt-in data path that talks to WordPress via the free **WPGraphQL** plugin. The existing REST layer (`src/lib/wp/*`) stays as the default fallback, so nothing breaks if GraphQL isn't enabled.

## How it switches

A new env var `WP_GRAPHQL_URL` (e.g. `https://yoursite.com/graphql`) activates GraphQL. When set, content server functions prefer GraphQL; when unset, they fall back to the existing REST calls, which in turn fall back to static content. No code changes needed to toggle.

## What gets built

### 1. WordPress side — `WORDPRESS_SETUP.md`
Add a new section: **"Option B: Enable GraphQL (optional)"**
- Install free plugins: **WPGraphQL**, **WPGraphQL CPT** (or register CPTs with `show_in_graphql => true`), **WPGraphQL Meta Query** (optional, for native post meta exposure)
- PHP snippet to expose the custom post meta fields (project/service/post meta) on the GraphQL schema via `register_graphql_field`
- CORS note (WPGraphQL respects standard CORS headers from the existing snippet)
- Confirm the endpoint with a sample query

### 2. Client layer — `src/lib/wp/graphql.server.ts` (new)
- Tiny `gqlFetch(query, variables)` wrapper using `fetch` against `process.env.WP_GRAPHQL_URL`
- Throws on GraphQL errors; returns typed `data`
- Server-only (no auth, no secrets)

### 3. Query definitions — `src/lib/wp/queries.ts` (new)
- `POSTS_QUERY`, `POST_BY_SLUG_QUERY`, `PROJECTS_QUERY`, `SERVICES_QUERY` as plain string constants
- Mirror the fields already consumed by the UI (title, slug, excerpt, content, featured image, meta fields)

### 4. Content functions — update `src/lib/wp/content.functions.ts`
For each of `listPosts`, `getPostBySlug`, `listProjects`, `listServices`:
- If `WP_GRAPHQL_URL` is set → call `gqlFetch` with the matching query, map the GraphQL response into the existing `WPPost` / `WPProject` / `WPService` shapes
- Else → keep current REST path
- On any error, fall back to REST, then to static content (existing behavior preserved)

Mapping happens inside the handler so the UI components (`blog.tsx`, `blog.$slug.tsx`, `projects.tsx`, `services.tsx`) need **zero changes**.

### 5. Docs — `README.md`
- Add `WP_GRAPHQL_URL` to env vars table as optional
- One-line note: "Set this to enable GraphQL; leave unset to keep using REST"

## Files touched

- new: `src/lib/wp/graphql.server.ts`
- new: `src/lib/wp/queries.ts`
- edit: `src/lib/wp/content.functions.ts`
- edit: `WORDPRESS_SETUP.md`
- edit: `README.md`

No UI changes, no new dependencies (native `fetch` is enough — no Apollo/urql needed since calls are server-side only).

## Out of scope

- Client-side GraphQL (Apollo/urql) — not needed; server functions already shield the client
- Mutations via GraphQL — contact form keeps using the existing REST `/site/v1/contact` endpoint
- Auth'd queries — all queries are public read-only
