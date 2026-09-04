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
  /** Where the piece was originally published. */
  linkedin: string;
  body: string;
}

const drafts: Draft[] = [
  {
    slug: "travel-agency-losing-leads-fixed-without-a-crm",
    date: "2026-04-05T09:00:00",
    title: "A travel agency was losing leads. I fixed it without a CRM.",
    excerpt:
      "They had traffic, a working form and leads arriving daily. What they did not have was any idea which of those leads had been called. A custom WordPress plugin solved it for the price of building it once.",
    readingTime: 8,
    cover: "/blog/lead-dashboard.svg",
    linkedin: "https://www.linkedin.com/pulse/travel-agency-losing-leads-i-fixed-without-crm-anup-kankale-13csf/",
    body: `
      <p>A travel agency came to me with a problem that sounds trivial until you see the cost of it. They were running WordPress with Forminator for lead capture. Enquiries arrived every day. Almost none of them were being handled properly.</p>
      <p>The forms worked. The traffic was real. The leaks were entirely in what happened after submit.</p>

      <h2>What I actually found</h2>
      <p>Before writing any code I sat with how the team worked. Six separate problems, each small, compounding into lost revenue:</p>
      <ul>
        <li><strong>No central system.</strong> Leads lived in three places at once: Forminator entries, an inbox, and a spreadsheet somebody maintained by hand.</li>
        <li><strong>No tracking.</strong> Nobody could say whether a given lead had been contacted, was interested, or had already booked.</li>
        <li><strong>Duplicate effort.</strong> Two sales reps regularly called the same person. Wasted time for the team, and a bad impression for the customer.</li>
        <li><strong>No context.</strong> When a caller said "I asked about the Goa package yesterday", the rep answering had nothing in front of them.</li>
        <li><strong>No reporting.</strong> The owner had zero visibility into lead volume, response time or conversion rate.</li>
        <li><strong>Budget.</strong> HubSpot and Zoho were priced well beyond what a small team could justify, for features they would never touch.</li>
      </ul>

      <h2>Why I did not recommend a CRM</h2>
      <p>The obvious move is to sell the client another SaaS subscription. I did not, for two reasons. The data already lived in WordPress, so a CRM would mean syncing two systems and maintaining that sync forever. And the team needed perhaps five percent of what a real CRM does, at a recurring cost that never stops.</p>
      <p>What they needed was a workflow, not a product.</p>

      <h2>What I built</h2>
      <p>A custom WordPress plugin, on PHP, JavaScript, MySQL and the standard plugin architecture. Eight pieces:</p>
      <ul>
        <li><strong>Lead dashboard.</strong> One admin screen showing every Forminator submission, with filtering, search and pagination.</li>
        <li><strong>A Sales Admin role.</strong> Built with the Roles and Capabilities API, it sees leads and nothing else. No posts, no plugins, no settings.</li>
        <li><strong>Status management.</strong> Database-driven states: New, Positive, Negative, Follow Up, Converted, Closed.</li>
        <li><strong>Activity logging.</strong> Every status change and action is written with a timestamp, so accountability is a matter of record rather than memory.</li>
        <li><strong>Internal notes.</strong> Reps add context to a lead, and the full history is visible to the whole team. This is what killed the "I asked yesterday" problem.</li>
        <li><strong>CSV export.</strong> One click, with columns generated from the form fields rather than hardcoded.</li>
        <li><strong>Email notifications.</strong> Automatic alerts the moment a lead arrives.</li>
        <li><strong>Auto-assignment.</strong> New leads route to a designated team member instead of sitting unclaimed.</li>
      </ul>

      <h2>Access, kept simple</h2>
      <p>Two roles, drawn tightly. The administrator gets the dashboard, leads, settings and user management. The Sales Admin can view leads, update statuses and add feedback. Nothing else in WordPress is reachable, which matters when the people using it every day are not WordPress users.</p>

      <h2>What changed</h2>
      <ul>
        <li>Response times improved noticeably, because a new lead now announces itself.</li>
        <li>Duplicate follow-ups stopped entirely, because status is visible before anyone picks up the phone.</li>
        <li>Conversion became trackable, so the owner can see what is actually happening.</li>
        <li>No recurring software cost. The build was paid for once.</li>
      </ul>

      <h2>The takeaway</h2>
      <p>Sometimes the best solution is not adding more tools. It is building a smarter workflow on top of what already exists. This plugin later became the basis of DevXpert Lead Dashboard, which is now free and open source on the WordPress.org plugin directory.</p>
    `,
  },
  {
    slug: "ai-powered-content-automation-for-wordpress",
    date: "2026-03-28T09:00:00",
    title: "An AI content pipeline that publishes to WordPress in 15 seconds",
    excerpt:
      "An end-to-end pipeline that writes an SEO-shaped article and publishes it to WordPress in ten to fifteen seconds, for no ongoing AI cost. Here is the architecture and the parts that were awkward.",
    readingTime: 7,
    cover: "/blog/ai-content-pipeline.svg",
    linkedin: "https://www.linkedin.com/pulse/just-built-ai-powered-content-automation-system-anup-kankale-b1dqf/",
    body: `
      <p>I built an end-to-end content pipeline that generates an SEO-optimised blog post and publishes it to WordPress in under fifteen seconds. The interesting part is not that AI wrote an article. It is the cost and latency profile that made it worth running at all.</p>

      <h2>The problem with the obvious approach</h2>
      <p>Content is expensive in two directions. Freelance writers cost per article and take days. Premium model APIs are quick but priced per call, roughly fifteen to fifty cents an article once you account for a decent prompt, and several of them carry monthly minimums. For a business that wants steady output across a handful of sites, neither shape works.</p>

      <h2>The stack</h2>
      <ul>
        <li><strong>n8n</strong> for workflow automation, self-hosted in Docker so there is no per-execution billing.</li>
        <li><strong>Groq running Llama 3.3-70B</strong> for generation. The free tier allows 14,400 requests a day, which is far more headroom than a content operation needs.</li>
        <li><strong>The WordPress REST API</strong> for publishing, so no custom endpoint or plugin is required on the receiving site.</li>
        <li><strong>PostgreSQL</strong> for state and record keeping.</li>
      </ul>

      <h2>What it achieves</h2>
      <ul>
        <li>Ten to fifteen seconds per article, against sixty or more through GPT-4.</li>
        <li>Zero AI cost, against fifty to five hundred dollars a month on the alternatives.</li>
        <li>Capacity for up to 14,400 articles a day, which is enough to keep forty blogs running around the clock.</li>
      </ul>
      <p>The speed difference matters more than it first appears. At sixty seconds a call you think of generation as a batch job. At twelve seconds it becomes something you can trigger from a webhook and wait on.</p>

      <h2>The engineering, not the prompt</h2>
      <p>The prompt was the easy half. What took the time:</p>
      <ul>
        <li><strong>Multiple REST integrations.</strong> Groq and WordPress speak different dialects of authentication and error reporting, and both need handling properly.</li>
        <li><strong>Webhook-driven execution</strong> so the pipeline reacts to events rather than polling on a timer.</li>
        <li><strong>Error handling and retries.</strong> Free tiers rate limit, networks fail, and a pipeline that gives up on the first non-200 is not a pipeline.</li>
        <li><strong>A modular workflow</strong> so a step can be swapped without rebuilding the chain.</li>
        <li><strong>Docker networking.</strong> Getting containers to reach each other and the outside world reliably was the single most annoying part of the build, and worth mentioning because it always is.</li>
      </ul>

      <h2>Where it goes next</h2>
      <p>V2 is in progress: automated image generation and upload, smart tag and category assignment, multi-language output, and scheduling so posts land on a calendar rather than all at once.</p>

      <h2>Why I am sharing it</h2>
      <p>Open-source tools give you room to build, experiment and eventually scale something into a product. The whole system is documented and running in production. If you are weighing up AI content workflows for WordPress, the lesson worth taking is that model choice is a cost decision as much as a quality one, and the free tier of a fast open model covers more ground than people expect.</p>
    `,
  },
  {
    slug: "b2b-visitor-intelligence-plugin-for-wordpress",
    date: "2026-04-12T09:00:00",
    title: "Building a B2B visitor intelligence plugin for WordPress",
    excerpt:
      "You have traffic. You do not know which companies it belongs to. This plugin uses reverse IP lookup to name the organisations reading your site, and keeps every byte of it inside your own database.",
    readingTime: 6,
    cover: "/blog/visitor-intelligence.svg",
    linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7439930796095778816/",
    body: `
      <p>Most B2B sites have a problem nobody says out loud. Traffic arrives, analytics counts it, and none of it tells you who is actually interested in what you sell.</p>

      <h2>The gap</h2>
      <p>You can see sessions and page views. You cannot see:</p>
      <ul>
        <li>Which companies are visiting.</li>
        <li>Which of those visitors are genuinely evaluating your services.</li>
        <li>Which are potential leads worth a call.</li>
        <li>When a high-intent company comes back and reads your pricing page for the third time.</li>
      </ul>
      <p>So a site with healthy traffic can still be losing B2B leads every day, quietly.</p>

      <h2>What the plugin does</h2>
      <p>It uses reverse IP lookup through an IP data provider to attach an organisation to a visit, then builds a picture from there:</p>
      <ul>
        <li>Identify the companies visiting the site.</li>
        <li>Track which pages each organisation views.</li>
        <li>Detect returning visitors across sessions.</li>
        <li>Resolve city and region level location.</li>
        <li>Measure engagement: bounce rate, session depth, visit frequency.</li>
        <li>Trigger alerts when a high-intent visitor appears.</li>
      </ul>

      <h2>Privacy first, and that is a design decision</h2>
      <p>Every piece of this data stays inside the site's own WordPress database. No third-party tracking service, no data leaving for someone else's analytics product. For a plugin whose entire job is watching visitors, where the data lives is not a footnote. It is the main architectural choice, and it is what makes the plugin defensible to a client's legal team.</p>

      <h2>Why it is useful</h2>
      <p>Instead of guessing which leads exist, you can see which companies have already shown interest. That changes outbound from cold to warm, and it changes which pages you decide to improve.</p>

      <h2>Current status</h2>
      <p>This is V1, and I am treating it as a learning and building phase. There are a few minor bugs and I am iterating actively. I am building it in public rather than waiting until it looks finished, because the useful feedback arrives while things are still changeable.</p>
      <p>If you work in digital marketing or B2B sales: what would make this genuinely valuable to you? Which signals would you want surfaced first? Those answers shape what gets built next.</p>
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

/** Where a placeholder post was originally published, if anywhere. */
export function fallbackPostSource(slug: string): string | null {
  return drafts.find((d) => d.slug === slug)?.linkedin ?? null;
}

/** Per-post 1200x630 social card, generated to match each headline. */
export function fallbackOgImage(slug: string): string | null {
  return drafts.some((d) => d.slug === slug) ? `/og/${slug}.png` : null;
}

/** Published date for a placeholder post, used in sitemap lastmod. */
export const fallbackPostIndex = drafts.map((d) => ({ slug: d.slug, date: d.date }));
