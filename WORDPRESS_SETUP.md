# Headless WordPress Backend Setup (Free Stack)

This frontend reads its content from a WordPress install via the **core
WordPress REST API + native post meta**. No paid plugins. No ACF. No
Application Passwords.

You only need:

1. WordPress (self-hosted or any WP host)
2. One free plugin: **Custom Post Type UI** (to register CPTs in the admin)
3. A single snippet pasted into your theme's `functions.php` (or the free
   **Code Snippets** plugin) — it registers meta fields, adds CORS headers,
   and exposes the public contact-form endpoint.

---

## 1. Install the plugin

- **Custom Post Type UI** — free, from the WordPress.org plugin directory.

(Optional, only if you don't want to edit `functions.php` directly:
install **Code Snippets** — also free — and paste the snippet from step 3
as a new "PHP snippet, run everywhere".)

## 2. Register the Custom Post Types (CPT UI)

In WP Admin → **CPT UI → Add/Edit Post Types**, create:

### `project`
- Post Type Slug: `project`
- Plural / Singular Label: Projects / Project
- Public: **true**
- Show in REST API: **true**
- REST API base slug: `projects`
- Supports: title, editor, excerpt, thumbnail, custom-fields, page-attributes

### `service`
- Post Type Slug: `service`
- Plural / Singular Label: Services / Service
- Public: **true**
- Show in REST API: **true**
- REST API base slug: `services`
- Supports: title, editor, excerpt, thumbnail, custom-fields, page-attributes

### `contact_submission`
- Post Type Slug: `contact_submission`
- Plural / Singular Label: Contact Submissions / Contact Submission
- Public: **false**
- Show UI: **true**
- Show in REST API: **false** (writes happen through our custom endpoint)
- Supports: title, editor, custom-fields

> Make sure **custom-fields** is checked under "Supports" for all three.

## 3. Paste this snippet into `functions.php`

This single block does everything: registers meta keys so they appear in
REST responses, adds CORS headers, and creates a public
`POST /wp-json/site/v1/contact` endpoint with honeypot + rate-limit.

```php
<?php
/* =========================================================
 * Headless frontend integration — REST meta + contact form
 * ========================================================= */

// --- 1. Expose meta fields on Posts / Projects / Services in REST ---
add_action('init', function () {

  $string = ['type' => 'string', 'single' => true, 'show_in_rest' => true];
  $number = ['type' => 'number', 'single' => true, 'show_in_rest' => true];

  // Blog post meta
  foreach ([
    'excerpt_custom', 'cover_image', 'seo_title', 'seo_description'
  ] as $key) register_post_meta('post', $key, $string);
  register_post_meta('post', 'reading_time', $number);

  // Project meta
  foreach ([
    'client', 'role', 'tech_stack', 'live_url',
    'repo_url', 'gallery', 'tag'
  ] as $key) register_post_meta('project', $key, $string);
  register_post_meta('project', 'featured_order', $number);

  // Service meta
  foreach ([
    'icon_name', 'short_description', 'features', 'price_from'
  ] as $key) register_post_meta('service', $key, $string);
  register_post_meta('service', 'order', $number);

  // Page meta (optional, for hero blocks)
  foreach (['hero_title', 'hero_subtitle'] as $key)
    register_post_meta('page', $key, $string);
});

// --- 2. CORS for the REST API (lock down origin in production) ---
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    header('Access-Control-Allow-Origin: *'); // replace * with your frontend origin
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    return $value;
  });
}, 15);

// --- 3. Public contact-form endpoint: POST /wp-json/site/v1/contact ---
add_action('rest_api_init', function () {
  register_rest_route('site/v1', '/contact', [
    'methods'  => 'POST',
    'permission_callback' => '__return_true',
    'callback' => function (WP_REST_Request $req) {

      $name    = sanitize_text_field($req->get_param('name'));
      $email   = sanitize_email($req->get_param('email'));
      $phone   = sanitize_text_field((string) $req->get_param('phone'));
      $message = sanitize_textarea_field((string) $req->get_param('message'));
      $source  = sanitize_text_field((string) $req->get_param('source_page'));

      if (!$name || !$email || !is_email($email) || strlen($message) < 10) {
        return new WP_Error('invalid', 'Invalid submission', ['status' => 400]);
      }

      // Simple per-IP rate limit: max 5 submissions / hour
      $ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
      $key = 'contact_rl_' . md5($ip);
      $hits = (int) get_transient($key);
      if ($hits >= 5) {
        return new WP_Error('rate_limited', 'Too many submissions', ['status' => 429]);
      }
      set_transient($key, $hits + 1, HOUR_IN_SECONDS);

      $post_id = wp_insert_post([
        'post_type'    => 'contact_submission',
        'post_status'  => 'private',
        'post_title'   => 'Message from ' . $name,
        'post_content' => $message,
        'meta_input'   => [
          'email'        => $email,
          'phone'        => $phone,
          'source_page'  => $source,
          'submitted_at' => current_time('mysql'),
        ],
      ], true);

      if (is_wp_error($post_id)) {
        return new WP_Error('save_failed', 'Could not save', ['status' => 500]);
      }

      // Email notification to site admin
      $admin = get_option('admin_email');
      wp_mail(
        $admin,
        'New contact submission from ' . $name,
        "Name: $name\nEmail: $email\nPhone: $phone\nPage: $source\n\n$message",
        ['Reply-To: ' . $email]
      );

      return ['id' => $post_id, 'ok' => true];
    },
  ]);
});
```

## 4. Add the meta fields when editing posts

With **custom-fields** support enabled on each CPT, you'll see a
**Custom Fields** panel below the editor. (If you don't, open the editor's
three-dot menu → Preferences → Panels → enable "Custom Fields".)

For each post / project / service, add a row using the **exact meta key
name** listed in the snippet, e.g.:

- `cover_image` → paste the image URL
- `tech_stack` → `React, WordPress, n8n`
- `features` → one per line, or comma-separated
- `live_url` → `https://example.com`

Featured images and categories work the standard WordPress way — no meta
field needed.

## 5. Set the secret in your hosting environment

The frontend only needs **one** environment variable:

| Variable | Example | Notes |
| --- | --- | --- |
| `WP_API_URL` | `https://yoursite.com/wp-json` | No trailing slash |

Add it under **Lovable → Project Settings → Secrets** (or in a local
`.env` file). No username, no password, no API key.

## 6. Verify

- `https://yoursite.com/wp-json/wp/v2/posts` → JSON with a `meta` object
- `https://yoursite.com/wp-json/wp/v2/projects` → JSON list
- `https://yoursite.com/wp-json/wp/v2/services` → JSON list
- Submit `/contact` on the frontend → a private **Contact Submission**
  appears in WP Admin and an email lands in the admin inbox.

## Tighten security before going live

- Replace `Access-Control-Allow-Origin: *` with your actual frontend origin.
- The contact endpoint already has a per-IP rate limit + length check; add a
  Cloudflare Turnstile / reCAPTCHA token check if you get spam.

---

## Optional: Enable GraphQL (WPGraphQL)

If you'd rather query WordPress with GraphQL instead of REST, install the
free **WPGraphQL** plugin. The frontend automatically prefers GraphQL when
`WP_GRAPHQL_URL` is set and silently falls back to REST otherwise — you can
turn it on or off with a single env var, no code changes.

### 1. Install free plugins

- **WPGraphQL** — https://wordpress.org/plugins/wp-graphql/
- **WPGraphQL for Custom Post Type UI** — exposes the `project` and
  `service` CPTs you already created to the GraphQL schema with one click
  (in CPT UI, edit each CPT and set **Show in GraphQL = true**, GraphQL
  Single Name = `Project` / `Service`, Plural = `Projects` / `Services`).

### 2. Expose meta fields on the GraphQL schema

WPGraphQL doesn't ship native post meta as queryable fields out of the box.
Paste this snippet alongside the one above in `functions.php` to add a
generic `metaValue(key:)` field on every CPT we use:

```php
add_action('graphql_register_types', function () {
  $types = ['Post', 'Project', 'Service', 'Page'];
  foreach ($types as $type) {
    register_graphql_field($type, 'metaValue', [
      'type'    => 'String',
      'args'    => ['key' => ['type' => ['non_null' => 'String']]],
      'resolve' => function ($post, $args) {
        $v = get_post_meta($post->databaseId, $args['key'], true);
        return is_scalar($v) ? (string) $v : null;
      },
    ]);
  }
});
```

### 3. Confirm the endpoint

Default URL is `https://yoursite.com/graphql`. Test with:

```bash
curl -X POST https://yoursite.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ posts(first:3){ nodes{ slug title } } }"}'
```

### 4. Set the env var

Add to your hosting environment (or Lovable Project Settings → Secrets):

| Variable | Example |
| --- | --- |
| `WP_GRAPHQL_URL` | `https://yoursite.com/graphql` |

That's it — the frontend will start using GraphQL on the next request. Unset
the variable to switch back to REST.