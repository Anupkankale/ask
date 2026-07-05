import type { WPPost } from "./types";

function makePost(input: {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  cover: string;
  content: string;
}): WPPost {
  return {
    id: input.id,
    slug: input.slug,
    date: input.date,
    modified: input.date,
    status: "publish",
    link: `/blog/${input.slug}`,
    featured_media: 0,
    title: { rendered: input.title },
    excerpt: { rendered: `<p>${input.excerpt}</p>` },
    content: { rendered: input.content },
    meta: {
      excerpt_custom: input.excerpt,
      reading_time: input.readingTime,
      cover_image: input.cover,
    },
  };
}

export const DUMMY_POSTS: WPPost[] = [
  makePost({
    id: 9001,
    slug: "headless-wordpress-with-tanstack-start",
    title: "Going headless: WordPress + TanStack Start",
    excerpt:
      "Why I moved my portfolio to a headless setup with WordPress as the CMS and TanStack Start on the frontend, and what I learned along the way.",
    date: "2026-06-14T10:00:00",
    readingTime: 6,
    cover:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1600&q=80",
    content: `
      <p>Headless WordPress gets a lot of hype, but it is genuinely a great fit for a small content-driven site. I keep WordPress for the editor, media library and roles, and let a modern React frontend do the rendering.</p>
      <h2>The stack</h2>
      <ul>
        <li>WordPress as a pure content backend, no theme.</li>
        <li>REST API and optional WPGraphQL for reads.</li>
        <li>TanStack Start for routing, SSR and server functions.</li>
      </ul>
      <p>Editors still get the classic WordPress experience. Visitors get a fast, statically-rendered React site.</p>
    `,
  }),
  makePost({
    id: 9002,
    slug: "wpgraphql-vs-rest-api",
    title: "WPGraphQL vs the REST API: which one should you use?",
    excerpt:
      "Both APIs ship for free with WordPress plugins. Here is how I decide between them on real client projects.",
    date: "2026-05-28T09:30:00",
    readingTime: 5,
    cover:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
    content: `
      <p>The REST API is built in and zero-config. WPGraphQL is a free plugin that gives you a typed schema and lets you fetch exactly the fields you need in one request.</p>
      <h2>My rule of thumb</h2>
      <p>Simple lists and single-post pages: REST is fine. Deeply nested content, custom post types with lots of meta, or a design system that pulls from many sources: GraphQL usually wins.</p>
    `,
  }),
  makePost({
    id: 9003,
    slug: "automating-wordpress-with-n8n",
    title: "Automating boring WordPress tasks with n8n",
    excerpt:
      "From publishing hooks to weekly SEO reports, here is how I glue WordPress to the rest of my toolbelt with n8n.",
    date: "2026-05-05T14:15:00",
    readingTime: 7,
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    content: `
      <p>n8n is my favourite automation runner. It runs on a tiny VPS and connects everything I use: WordPress, GitHub, Notion, Slack and various AI providers.</p>
      <h2>Workflows I ship on almost every project</h2>
      <ul>
        <li>New post published, ping Slack and post a summary to LinkedIn.</li>
        <li>Weekly cron that pulls Search Console data into a Google Sheet.</li>
        <li>Contact form submission, enrich with AI, then create a CRM entry.</li>
      </ul>
    `,
  }),
  makePost({
    id: 9004,
    slug: "ai-features-worth-building-into-a-website",
    title: "AI features actually worth building into a website",
    excerpt:
      "Not every site needs a chatbot. A short list of AI features I have shipped that clients keep using.",
    date: "2026-04-18T08:00:00",
    readingTime: 4,
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    content: `
      <p>Most AI features on marketing sites are demos. Here are the few that survive past launch week.</p>
      <h2>The short list</h2>
      <ul>
        <li>Smart internal search that understands intent, not keywords.</li>
        <li>Auto-generated meta titles and descriptions from post content.</li>
        <li>Draft-to-summary for long-form articles, reviewed by a human.</li>
      </ul>
    `,
  }),
];

export function findDummyPost(slug: string): WPPost | null {
  return DUMMY_POSTS.find((p) => p.slug === slug) ?? null;
}