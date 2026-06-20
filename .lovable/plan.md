## Goal

Turn the site into a **headless frontend** powered by **WordPress + ACF** via the WP REST API. Blog, Projects, Services, and key Pages will be editable from WP. The Contact form will save submissions to WP **and** send an email confirmation.

Since the WP backend isn't set up yet, this plan covers both:
1. **WordPress backend setup** (instructions you'll run on your WP host)
2. **Frontend integration** in this app (what I'll build)

---

## Part 1 — WordPress backend setup (you do this)

You'll need a WordPress install (any host: Hostinger, Bluehost, WP Engine, local LocalWP for testing). Then:

**Plugins to install:**
- **Advanced Custom Fields (ACF)** — free version is enough
- **ACF to REST API** — exposes `acf` field in REST responses
- **Custom Post Type UI** — to register `projects` and `services` CPTs
- **JWT Authentication for WP REST API** *(optional, only if we later need auth writes beyond contact)*
- **Application Passwords** (built-in WP 5.6+) — for the contact-form submission write

**Custom Post Types** (via CPT UI):
- `project` — slug `projects`, public, show in REST (`rest_base: projects`)
- `service` — slug `services`, public, show in REST (`rest_base: services`)
- `contact_submission` — private (not public), show in REST, used for storing form submissions

**ACF Field Groups** (all set "Show in REST API: Yes"):
- **Post (Blog)**: `excerpt_custom`, `reading_time`, `cover_image`, `seo_title`, `seo_description`
- **Project**: `client`, `role`, `tech_stack` (repeater/text), `live_url`, `repo_url`, `gallery` (gallery), `featured_order` (number)
- **Service**: `icon_name`, `short_description`, `features` (repeater: `feature_text`), `price_from`, `order`
- **Page** (for About/Home content blocks): `hero_title`, `hero_subtitle`, `body_blocks` (flexible content)
- **Contact Submission**: `email`, `phone`, `message`, `submitted_at`, `source_page`

**CORS:** Add to your theme's `functions.php` so the Lovable app can fetch:
```php
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Authorization, Content-Type');
    return $value;
  });
}, 15);
```

**Application Password** for contact-form writes:
- WP Admin → Users → Your user → Application Passwords → create one named "Lovable Contact Form" → save the generated password.

You'll give me:
- `WP_API_URL` (e.g. `https://yoursite.com/wp-json`)
- `WP_APP_USER` (your WP username)
- `WP_APP_PASSWORD` (the application password)

---

## Part 2 — Frontend integration (I build this)

### Enable Lovable Cloud
Required to securely store the WP credentials and send the contact email. Stored as runtime secrets, never shipped to the browser.

### WordPress client layer
- `src/lib/wp/client.ts` — typed fetch wrapper (base URL, error handling, query builder)
- `src/lib/wp/types.ts` — TypeScript types for `WPPost`, `WPProject`, `WPService`, `WPPage`, ACF shapes
- `src/lib/wp/*.functions.ts` — server functions that fetch posts/projects/services/pages from WP (server-side, so credentials and base URL stay private; also fixes CORS edge cases)

### Routes wired to WP (replace hardcoded content)
- `src/routes/blog.tsx` — list of posts (title, excerpt, cover, date) using `useSuspenseQuery`
- `src/routes/blog.$slug.tsx` — single post page (new file) with full content + ACF fields + SEO meta from ACF
- `src/routes/projects.tsx` — pulls from `projects` CPT with ACF (client, tech stack, gallery, live/repo links)
- `src/routes/services.tsx` — pulls from `services` CPT with ACF (icon, features, price)
- `src/routes/about.tsx` & `src/routes/index.tsx` — optionally pull hero/body blocks from a WP Page via ACF flexible content (kept simple: just hero text + a few rich-text blocks for now)

All loaders use TanStack Query `ensureQueryData` → component `useSuspenseQuery` (per project conventions). SEO `head()` per route uses ACF `seo_title`/`seo_description` when present.

### Contact form (`src/routes/contact.tsx`)
- React Hook Form + Zod validation (name, email, phone optional, message; length limits, trim, email format)
- Submits to a new server route: `src/routes/api/public/contact.ts`
  - Validates input again with Zod
  - **Writes** to WP as a `contact_submission` post (using Application Password basic auth) with ACF fields populated
  - **Sends** an email confirmation to the submitter + a notification to you, via **Lovable Emails** (built-in, no extra provider needed) — two React Email templates: `contact-confirmation.tsx` (to submitter) and `contact-notification.tsx` (to you)
  - Returns `{ ok: true }` on success; clear errors on failure
- Basic rate limiting via an idempotency key + short cache to prevent spam double-submits

### Secrets stored in Lovable Cloud
- `WP_API_URL`
- `WP_APP_USER`
- `WP_APP_PASSWORD`
- `CONTACT_NOTIFICATION_EMAIL` (your inbox)

### Caching strategy
- Public WP reads: server functions cached via TanStack Query with a 60s stale time, plus optional revalidation on navigation.
- Featured image / gallery: use WP-provided sizes; lazy load.

---

## Technical details

**Why server functions for WP reads:** keeps the WP base URL configurable via env, avoids browser CORS surprises, lets us add a private API key later without refactoring, and matches the project's TanStack Start conventions.

**Why `/api/public/contact` for the form:** public POST endpoint (no app auth needed), but the handler validates input, writes to WP with server-only credentials, and triggers Lovable Emails. The `/api/public/*` prefix is the documented pattern for unauthenticated external POSTs.

**ACF field rendering:** the `acf` object on each WP response is typed in `src/lib/wp/types.ts` so route components get autocomplete. Flexible content blocks on Pages render via a small switch (`hero`, `rich_text`, `cta`) — easy to extend later.

**Email infrastructure:** if no Lovable email domain is configured yet, I'll prompt the email-setup dialog before scaffolding templates. Sends happen via the queued `/lovable/email/transactional/send` route.

---

## File summary

**Create:**
- `src/lib/wp/client.ts`, `src/lib/wp/types.ts`
- `src/lib/wp/posts.functions.ts`, `projects.functions.ts`, `services.functions.ts`, `pages.functions.ts`
- `src/routes/blog.$slug.tsx`
- `src/routes/api/public/contact.ts`
- `src/lib/email-templates/contact-confirmation.tsx`, `contact-notification.tsx`
- `WORDPRESS_SETUP.md` (step-by-step WP setup with the PHP snippet, CPT/ACF config, and the values you need to give me)

**Edit:**
- `src/routes/blog.tsx`, `projects.tsx`, `services.tsx`, `about.tsx`, `index.tsx`, `contact.tsx`
- `src/lib/email-templates/registry.ts`
- `README.md` (add "Headless WordPress backend" section + required env vars)

**No design/visual changes** — only data sources and the contact form behavior change. Existing styling stays.

---

## What I need from you before I build

1. Confirm you want me to proceed with this plan.
2. Enable Lovable Cloud (I'll trigger it when build starts).
3. After Part 1 setup, paste the 4 secrets (`WP_API_URL`, `WP_APP_USER`, `WP_APP_PASSWORD`, `CONTACT_NOTIFICATION_EMAIL`) when I prompt — they go into secure storage, not the codebase.

If you don't have WP set up yet, I can still build everything; the site will show empty states until you point it at a live WP instance.
