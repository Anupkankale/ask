# Headless WordPress Backend Setup

This frontend (TanStack Start) reads its content from a WordPress install via
the WordPress REST API + ACF. Follow this guide once on your WP site, then
drop the three credentials into your hosting environment.

## 1. Install plugins

| Plugin | Why |
| --- | --- |
| Advanced Custom Fields (ACF) | Custom fields on Posts, Projects, Services, Pages |
| ACF to REST API | Exposes the `acf` object in REST responses |
| Custom Post Type UI | Register the `projects`, `services`, `contact_submission` CPTs without code |

> ACF Pro is not required. The free version works.

## 2. Register Custom Post Types (CPT UI)

Create three CPTs in **CPT UI → Add/Edit Post Types**:

### `project`
- Post Type Slug: `project`
- Plural / Singular Label: Projects / Project
- Public: **true**
- Show in REST API: **true**
- REST API base slug: `projects`
- Supports: title, editor, excerpt, thumbnail, page-attributes (for menu_order)

### `service`
- Post Type Slug: `service`
- Plural / Singular Label: Services / Service
- Public: **true**
- Show in REST API: **true**
- REST API base slug: `services`
- Supports: title, editor, excerpt, thumbnail, page-attributes

### `contact_submission`
- Post Type Slug: `contact_submission`
- Plural / Singular Label: Contact Submissions / Contact Submission
- Public: **false**
- Show UI: **true**
- Show in REST API: **true** ← needed so the contact form can POST
- REST API base slug: `contact_submission`
- Supports: title, editor

## 3. Create ACF Field Groups

For each group, set **Show in REST API: Yes** under the "REST API" tab.

### Posts (Blog)
Location rule: `Post Type = Post`
- `excerpt_custom` — Text
- `reading_time` — Number
- `cover_image` — Image (Return: Image URL)
- `seo_title` — Text
- `seo_description` — Textarea

### Projects
Location rule: `Post Type = Project`
- `client` — Text
- `role` — Text
- `tech_stack` — Text (comma-separated) **or** Repeater with `tech` subfield
- `live_url` — URL
- `repo_url` — URL
- `gallery` — Gallery (Return: Array)
- `featured_order` — Number
- `tag` — Text (e.g. "ENTERPRISE WORDPRESS")

### Services
Location rule: `Post Type = Service`
- `icon_name` — Text (lucide icon name)
- `short_description` — Textarea
- `features` — Repeater with subfield `feature_text` (Text)
- `price_from` — Text (e.g. "$500")
- `order` — Number

### Pages (Home / About)
Location rule: `Post Type = Page`
- `hero_title` — Text
- `hero_subtitle` — Textarea
- `body_blocks` — Flexible Content (optional, for future use)

### Contact Submission
Location rule: `Post Type = Contact Submission`
- `email` — Email
- `phone` — Text
- `message` — Textarea
- `source_page` — Text
- `submitted_at` — Text (ISO datetime, written automatically)

## 4. Enable CORS for the REST API

Add this to your active theme's `functions.php` (or a small mu-plugin):

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

## 5. Create an Application Password

The contact form writes a private `contact_submission` post. WP requires HTTP
Basic Auth credentials for this:

1. Log in to WP Admin → **Users → Profile**
2. Scroll to **Application Passwords**
3. Name it `Lovable Contact Form` and click **Add New Application Password**
4. Copy the generated password (you only see it once)

## 6. Set the three secrets in your hosting environment

The frontend reads these as server-side environment variables:

| Variable | Example | Notes |
| --- | --- | --- |
| `WP_API_URL` | `https://yoursite.com/wp-json` | No trailing slash |
| `WP_APP_USER` | `anup` | Your WP username |
| `WP_APP_PASSWORD` | `xxxx xxxx xxxx xxxx xxxx xxxx` | The Application Password (spaces OK) |

On Lovable, store these under **Project Settings → Secrets** (or enable Lovable
Cloud — see the Cloud docs). Locally, drop them into a `.env` file (already
gitignored).

## 7. Verify

- Visit `https://yoursite.com/wp-json/wp/v2/posts` → JSON list of posts.
- Visit `https://yoursite.com/wp-json/wp/v2/projects` → JSON list (may be empty).
- Visit `/blog`, `/projects`, `/services` on the frontend → content appears.
- Submit the contact form → a new private `Contact Submission` appears in WP Admin.

## What's not included yet

- **Email notifications** on contact-form submit. This requires Lovable Cloud +
  an email domain. Once enabled, the `/api/public/contact` route will be wired
  to send a confirmation to the submitter and a notification to you.
- **Page builder content** for Home / About is still hardcoded. The
  `pages` ACF group is defined so we can wire it up next when you're ready.