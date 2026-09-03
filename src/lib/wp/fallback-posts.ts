// Placeholder posts shown when WordPress has nothing to serve, either because
// WP_API_URL is unset or the site has no published posts yet. They use the same
// WPPost shape as the REST response, so the blog routes render them through the
// exact same code path. As soon as real posts exist, those win and these vanish.

import type { WPPost } from "./types";

interface Draft {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  readingTime: number;
  cover: string;
  body: string;
}

const drafts: Draft[] = [
  {
    slug: "what-contributing-to-wordpress-core-actually-looks-like",
    date: "2026-08-14T09:00:00",
    title: "What contributing to WordPress Core actually looks like",
    excerpt:
      "Getting credited on a release sounds grand. In practice it is a lot of reading, a lot of waiting, and one small patch that finally lands.",
    readingTime: 7,
    cover: "/blog/wordpress-core.svg",
    body: `
      <p>I got my name on two WordPress releases, 7.0 "Armstrong" and 7.1 "Mary Lou". People assume that means I rewrote something important. I did not. I fixed small things carefully, and that turned out to be the whole job.</p>
      <h2>Start by reading, not patching</h2>
      <p>My first month in Trac was spent reading tickets I had no intention of touching. It is the fastest way to learn what maintainers care about: reproducibility, backwards compatibility, and whether a change is worth the risk it introduces. Most rejected patches are not wrong, they are just unaware of that context.</p>
      <h2>Pick a component and stay there</h2>
      <p>I ended up around the HTML API, Block Supports, and the CSS formatting functions. Staying in one area meant I started recognising the same reviewers and the same failure modes. That familiarity is worth more than a scattering of drive-by patches across ten components.</p>
      <h2>Write the test first</h2>
      <p>A patch with a failing test attached is a different conversation to a patch without one. The test proves the bug is real, and it survives long after anyone remembers why the fix was written that way.</p>
      <h2>Expect the timeline to be slow</h2>
      <p>Weeks pass. A ticket goes quiet, then a release lead sweeps through and it moves in an afternoon. None of this is personal, and treating silence as rejection is the quickest way to give up too early.</p>
      <p>The credit line at the end is nice. The genuinely useful part is that I now read core code as something I can change rather than something that just exists.</p>
    `,
  },
  {
    slug: "shipping-a-rag-chatbot-inside-a-wordpress-plugin",
    date: "2026-07-02T09:00:00",
    title: "Shipping a RAG chatbot inside a WordPress plugin",
    excerpt:
      "Wiring an LLM into WordPress is the easy part. Grounding it in real business content, and keeping the API key safe, is where the actual work lives.",
    readingTime: 9,
    cover: "/blog/rag-chatbot.svg",
    body: `
      <p>I built and deployed an AI chatbot plugin for a client, with two variants: a standard conversational assistant and a retrieval-augmented one aimed at talent acquisition. Here is what mattered.</p>
      <h2>The naive version is a demo, not a product</h2>
      <p>Passing a user's question straight to an LLM produces something that sounds confident and knows nothing about the business. Useful answers need retrieval: pull the relevant content first, then ask the model to answer using only that.</p>
      <h2>WordPress is already your content store</h2>
      <p>Posts, pages and custom post types are the corpus. There is no need for a separate content pipeline at small scale. Chunk the content, store embeddings in a custom table, and query by similarity at request time.</p>
      <h2>Never let the key reach the browser</h2>
      <p>Every request goes through an authenticated admin-ajax or REST endpoint on the server. If your API key is readable in devtools, the plugin is not finished. Nonces on the endpoint, capability checks on the settings screen, sanitising on the way in and escaping on the way out.</p>
      <h2>Give non-developers a settings screen</h2>
      <p>The model, the system prompt, the temperature and the retrieval depth all need tuning after launch, and the person tuning them should not need a deploy. A proper admin settings panel is what turns a clever prototype into something a team can own.</p>
      <h2>Budget for the boring parts</h2>
      <p>Rate limiting, timeouts, a graceful message when the API is down, and logging you can actually debug from. These take longer than the AI integration and they are what stop the feature embarrassing you in production.</p>
    `,
  },
  {
    slug: "core-web-vitals-on-a-90-page-wordpress-build",
    date: "2026-05-20T09:00:00",
    title: "Core Web Vitals on a 90 page WordPress build",
    excerpt:
      "A page builder, a slider plugin, and an enterprise content brief. Here is what actually moved LCP and CLS, and what turned out to be superstition.",
    readingTime: 8,
    cover: "/blog/core-web-vitals.svg",
    body: `
      <p>The site was 90+ pages, built in Elementor Pro with Slider Revolution doing the heavy visual sections. Not the stack a performance purist would choose. It still had to pass Core Web Vitals.</p>
      <h2>Find the LCP element before touching anything</h2>
      <p>On almost every template it was the hero image, and on a few it was a heading blocked by a webfont. Those are two completely different fixes. Guessing wastes days.</p>
      <h2>Preload the hero, lazy load everything else</h2>
      <p>The hero image should never be lazy loaded, and it benefits from an explicit high fetch priority. Every image below the fold should be. Getting this backwards is the single most common mistake I see on WordPress sites.</p>
      <h2>CLS is nearly always missing dimensions</h2>
      <p>Width and height attributes on images, reserved space for ad slots and embeds, and font fallbacks with matched metrics. Layout shift is rarely mysterious once you record the session and watch what jumps.</p>
      <h2>Audit what the page builder loads</h2>
      <p>Page builders enqueue assets globally by default. Most templates used a fraction of them. Dequeuing per template was worth more than any caching plugin setting.</p>
      <h2>Caching is the last step, not the first</h2>
      <p>A cache makes a slow page slow less often. It does not make the page fast. Fix the payload first, then cache it.</p>
    `,
  },
  {
    slug: "when-headless-wordpress-is-the-wrong-answer",
    date: "2026-04-08T09:00:00",
    title: "When headless WordPress is the wrong answer",
    excerpt:
      "Headless is a real architecture with real costs. Most sites that ask for it want two or three specific things they could have without it.",
    readingTime: 6,
    cover: "/blog/headless.svg",
    body: `
      <p>I build headless WordPress and I like it. I also talk clients out of it fairly often, because the reasons given for wanting it usually do not survive a follow-up question.</p>
      <h2>What you give up</h2>
      <p>Live preview, the block editor rendering what the visitor sees, most of the plugin ecosystem, and a simple mental model for the person publishing content. Those are not small losses, and they land on the editorial team rather than on the developer.</p>
      <h2>What you actually gain</h2>
      <p>A frontend you fully control, in a component framework, deployed independently of WordPress. If your interface genuinely needs that, headless earns its cost.</p>
      <h2>The middle ground is underrated</h2>
      <p>Block themes, full-site editing and a handful of custom blocks cover a lot of what people think they need headless for. Faster to build, and the editor still works the way WordPress users expect.</p>
      <h2>A reasonable test</h2>
      <p>If the answer to "why headless" is performance, measure the existing site first. If it is "the developers prefer React", that is a legitimate answer, but say it out loud so the editorial cost is a decision rather than a surprise.</p>
    `,
  },
  {
    slug: "the-automation-i-would-set-up-first",
    date: "2026-03-11T09:00:00",
    title: "The automation I would set up first",
    excerpt:
      "Before any AI workflow, automate the thing a human currently copies from one tab into another. It is almost always lead handling.",
    readingTime: 5,
    cover: "/blog/automation.svg",
    body: `
      <p>Every business I work with has one process where somebody reads a value off one screen and types it into another. That is the first thing to automate, and it rarely needs AI at all.</p>
      <h2>Follow the copy and paste</h2>
      <p>Form submission arrives by email. Someone reads it, adds a row to a spreadsheet, pings a colleague, then remembers to follow up in three days. Four handoffs, each one a place to lose a lead.</p>
      <h2>Build the boring version first</h2>
      <p>Form submission writes to a database table, a notification fires to the right person, and the record carries a status. That alone removes most of the loss. n8n or a few well placed hooks are enough.</p>
      <h2>Then add intelligence, narrowly</h2>
      <p>Once the data is structured, an LLM can do something genuinely useful: summarise a long enquiry, suggest a priority, draft a first reply for a human to approve. Note that "for a human to approve" is doing a lot of work in that sentence.</p>
      <h2>Instrument it</h2>
      <p>If you cannot see how many leads came in, how fast they were answered and where they stalled, you have not automated a process, you have hidden it.</p>
    `,
  },
];

function toPost(draft: Draft, index: number): WPPost {
  return {
    id: -(index + 1), // negative ids so they can never collide with real WP posts
    slug: draft.slug,
    date: draft.date,
    modified: draft.date,
    status: "publish",
    title: { rendered: draft.title },
    content: { rendered: draft.body.trim() },
    excerpt: { rendered: `<p>${draft.excerpt}</p>` },
    featured_media: 0,
    link: `/blog/${draft.slug}`,
    acf: {
      excerpt_custom: draft.excerpt,
      reading_time: draft.readingTime,
      cover_image: draft.cover,
    },
  };
}

export const fallbackPosts: WPPost[] = drafts.map(toPost);

export function findFallbackPost(slug: string): WPPost | null {
  return fallbackPosts.find((post) => post.slug === slug) ?? null;
}

/** Per-post 1200x630 social card, generated to match each headline. */
export function fallbackOgImage(slug: string): string | null {
  return drafts.some((d) => d.slug === slug) ? `/og/${slug}.png` : null;
}

/** Published date for a placeholder post, used in sitemap lastmod. */
export const fallbackPostIndex = drafts.map((d) => ({ slug: d.slug, date: d.date }));
