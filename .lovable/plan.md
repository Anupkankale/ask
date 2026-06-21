# Free Headless WordPress Plan (No Paid Plugins)

Drop ACF/ACF-to-REST-API (Pro features) and use only free plugins. Two options for structured fields — pick one:

## Option A — REST API + Native Custom Fields (simplest, recommended)

**Free plugins only:**
- **Custom Post Type UI** (free) — register `projects`, `services` CPTs
- **Meta Box Lite** (free) OR **WordPress core "Custom Fields" panel** — add meta fields
- **Register Meta in REST** — small `functions.php` snippet (provided) to expose meta keys via `/wp-json/wp/v2/...?_fields=meta`
- **Featured images & categories** — built into core REST API
- **Contact form** — no plugin needed; we write a custom REST endpoint via `functions.php` that saves submissions to a private CPT `contact_submission`

No ACF, no paid add-ons. Everything ships with WP core or free plugins.

## Option B — WPGraphQL (free, more powerful queries)

**Free plugins only:**
- **Custom Post Type UI** + **CPT UI extension for WPGraphQL** (free)
- **WPGraphQL** (free) — single `/graphql` endpoint
- **WPGraphQL for Custom Fields (Meta Box)** OR **WPGraphQL Meta** (free)
- Contact form via a WPGraphQL mutation or a small custom REST endpoint

Better for nested queries (post + meta + featured image in one call), but adds a GraphQL client on the frontend.

---

## Recommendation

Go with **Option A (REST + native meta)**. It reuses everything already scaffolded in `src/lib/wp/` and only requires:

1. Removing ACF assumptions from `types.ts` and `content.functions.ts` — read fields from `post.meta.*` instead of `post.acf.*`.
2. A `functions.php` snippet (in `WORDPRESS_SETUP.md`) that:
   - Registers post meta with `show_in_rest => true` for each CPT
   - Adds CORS headers
   - Registers a `POST /wp-json/site/v1/contact` endpoint that creates `contact_submission` posts (no auth required, with honeypot + rate-limit)
3. Contact form no longer needs WP Application Password — the custom endpoint is public + spam-protected, so we can drop `WP_APP_USER` / `WP_APP_PASSWORD` secrets entirely. Only `WP_API_URL` and `CONTACT_NOTIFICATION_EMAIL` remain.
4. Rewrite `WORDPRESS_SETUP.md` to list only free plugins and include the full `functions.php` snippet.

## Files to update (frontend, in build mode)

- `src/lib/wp/types.ts` — replace `acf` shape with `meta` shape
- `src/lib/wp/content.functions.ts` — fetch with `?_embed&_fields=...,meta` and map `post.meta.*`
- `src/routes/blog.$slug.tsx`, `projects.tsx`, `services.tsx` — read from `meta` not `acf`
- `src/routes/api/public/contact.ts` — POST to `/wp-json/site/v1/contact` (no Basic Auth) + email via Lovable Cloud
- `WORDPRESS_SETUP.md` — rewrite for free-only stack with the PHP snippet
- `README.md` — update env vars (remove `WP_APP_USER`, `WP_APP_PASSWORD`)

## What you'll need to do on WordPress

1. Install free plugins: **Custom Post Type UI**, **Meta Box Lite** (optional, for nicer admin UI)
2. Paste the `functions.php` snippet from `WORDPRESS_SETUP.md` into your theme's `functions.php` (or use **Code Snippets** free plugin)
3. Create the CPTs in CPT UI
4. Add `WP_API_URL` secret in Lovable (and `CONTACT_NOTIFICATION_EMAIL` if you want email notifications)

No paid plugins. No Application Passwords. No ACF.

---

Approve to switch to **Option A**, or reply "Option B" if you'd rather use WPGraphQL.
