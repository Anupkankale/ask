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
    slug: "travel-agency-losing-leads-fixed-without-a-crm",
    date: "2026-04-05T09:00:00",
    title: "A travel agency was losing leads. I fixed it without a CRM.",
    excerpt:
      "They had traffic, a working form and leads arriving daily. What they did not have was any idea which of those leads had been called. A custom WordPress plugin solved it for the price of building it once.",
    readingTime: 8,
    cover: "/blog/lead-dashboard.svg",
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
