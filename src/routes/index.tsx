import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "../lib/seo";
import { Blocks, Bot, Gauge, Github, Languages, Layout, Puzzle, Rocket, Sparkles, Workflow } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Anup Kankale | WordPress Developer & AI Integration Specialist",
      description:
        "Freelance WordPress development, custom plugins and AI integrations. Building powerful web experiences from Mumbai, India.",
      path: "/",
    }),
  component: Home,
});

const services = [
  { icon: Blocks, title: "WordPress Development", body: "Custom themes, plugins and full-site editing built on clean, maintainable code your team will enjoy." },
  { icon: Puzzle, title: "Plugins & Themes", body: "Purpose-built WordPress plugins, custom themes and Gutenberg blocks tailored to your business logic." },
  { icon: Bot, title: "AI Chatbots & Integrations", body: "Lightweight chatbots and LLM features that engage visitors, capture leads and plug into your stack." },
  { icon: Workflow, title: "Automation Workflows", body: "Custom automations and AI content pipelines that quietly remove the repetitive busywork from your day." },
  { icon: Layout, title: "Frontend Development", body: "Responsive, user-friendly interfaces with Vue.js, Nuxt.js, JavaScript and Tailwind CSS." },
  { icon: Rocket, title: "High-Converting Landing Pages", body: "Fast, high-scaling landing pages for Google and Meta ad campaigns, engineered to turn clicks into conversions." },
  { icon: Gauge, title: "Performance & SEO", body: "Core Web Vitals, caching, image strategy and on-page SEO that make your site fast and findable." },
];

const stack = [
  "WordPress", "PHP 8", "Custom Plugins", "Gutenberg Blocks", "Full-Site Editing",
  "Hooks & Filters", "Custom Post Types", "REST API", "Headless WordPress", "WooCommerce",
  "Elementor", "WP-Cron", "TypeScript", "Vue.js", "Nuxt.js", "Tailwind CSS", "JavaScript",
  "MySQL", "Docker", "Git & GitHub", "Composer", "PHPUnit", "PHPCS",
  "AI Integrations", "AI Chatbots", "OpenAI API", "RAG Architecture", "n8n Automations",
  "AI Content Pipelines", "Core Web Vitals", "Performance Optimization", "Technical SEO",
  "Plugin Security", "cPanel & Deployment", "Maintenance & Support",
];

// Rendered twice inside .marquee; the duplicate is aria-hidden so screen
// readers announce the list once.
function StackTrack({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <div className="marquee-track" aria-hidden={ariaHidden}>
      {stack.map((t) => (
        <span
          key={t}
          className="rounded-full border border-border bg-secondary px-4 py-1.5 text-[13px] font-medium text-foreground/80"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const givingBack = [
  {
    kind: "WordPress Core",
    status: "Contributor",
    title: "WordPress 7.0 \u201cArmstrong\u201d",
    body: "Credited among 875-plus contributors on a WordPress core release used by millions of sites. Code that helps everyone, owned by no one.",
    cta: "See the release credits",
    href: "https://wordpress.org/news/2026/05/armstrong/",
  },
  {
    kind: "WordPress Core",
    status: "Contributor",
    title: "WordPress 7.1 \u201cMary Lou\u201d",
    body: "A second consecutive core release credit, with work landing in the HTML API, Block Supports and the CSS formatting functions.",
    cta: "See the release credits",
    href: "https://wordpress.org/news/2026/08/mary-lou/",
  },
  {
    kind: "Free plugin \u00b7 WordPress.org",
    status: "Live \u00b7 5 stars",
    title: "DevXpert Lead Dashboard",
    body: "A free, open-source (GPL) plugin on the official directory. Built for a real problem, given to the whole WordPress community to install and use.",
    cta: "View on WordPress.org",
    href: "https://wordpress.org/plugins/devxpert-lead-dashboard-for-forminator/",
  },
  {
    kind: "Open source",
    status: "Contributor",
    title: "NudgeBee v1.3.0",
    body: "Contributing to open-source tooling beyond WordPress: an AI and Kubernetes automation platform, pitching in on its agentic workflow builder and task runner.",
    cta: "View the release",
    href: "https://github.com/nudgebee/nudgebee/releases/tag/v1.3.0",
  },
];

const kubeconVideos = [
  {
    id: "oDu5vqCKDbM",
    title: "How Intuit Built Argo CD & Open-Sourced It",
    blurb: "The story of a tool that started as an internal Intuit project and became CNCF-graduated infrastructure the whole industry runs on.",
  },
  {
    id: "Fz9iCwfjaCk",
    title: "Different Clouds. Same Kubernetes.",
    blurb: "Nepal at KubeCon India, on why the portability promise is what makes Kubernetes worth the learning curve.",
  },
  {
    id: "W-fBoowd_fs",
    title: "From Nepal to KubeCon India",
    blurb: "DevOps Kathmandu on crossing a border to reach the community, and what a regional user group gets out of it.",
  },
];

const highlights = [
  { icon: Github, title: "Open source at heart", body: "A free WordPress chatbot plugin and an AI content pipeline, both public and shipping on GitHub." },
  { icon: Languages, title: "Trilingual", body: "I collaborate fluently in English, Hindi and Marathi, so nothing gets lost in translation." },
  { icon: Gauge, title: "Fast & findable", body: "Core Web Vitals, caching and on-page SEO are baked into every build, not bolted on later." },
  { icon: Sparkles, title: "AI-first mindset", body: "Chatbots and automations that remove real busywork for your team, not gimmicks." },
];

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-foreground transition hover:opacity-90";
const btnSecondary =
  "inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-[15px] font-medium text-foreground transition hover:border-accent hover:text-accent";
const btnText =
  "inline-flex items-center gap-1 text-[15px] font-medium text-accent transition hover:underline";

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 hero-wash" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-10 text-center md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.17_150)]" />
            Open to work · Mumbai, India
          </span>
          <h1 className="mt-7 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[4.5rem]">
            Full-Stack Web Solutions,
            <br />
            <span className="text-accent">no matter your requirements.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-[1.375rem]">
            I&apos;m <span className="text-foreground">Anup Kankale</span>, a WordPress &amp; PHP developer and
            frontend specialist from Mumbai. I build responsive websites, custom plugins and themes, and AI-powered
            automations that ship real results.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/about" className={btnPrimary}>About Me</Link>
            <Link to="/contact" className={btnSecondary}>Let&apos;s Talk</Link>
          </div>
        </div>

        {/* Tech stack strip */}
        <div className="pt-14 pb-20">
          <p className="text-center text-[13px] font-medium uppercase tracking-widest text-muted-foreground/70">
            Tools I build with
          </p>
          <div className="marquee mt-5">
            <StackTrack />
            <StackTrack aria-hidden />
          </div>
        </div>
      </section>

      {/* SERVICES: bento grid */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-accent">What I do</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Everything around WordPress, done well.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From a single Gutenberg block to a full site build, here&apos;s how I help clients ship.
            </p>
          </div>

          <div className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              const featured = i === 0 || i === services.length - 1;
              return (
                <div
                  key={s.title}
                  className={[
                    "group relative overflow-hidden rounded-3xl p-8 transition duration-300 hover:-translate-y-1",
                    featured
                      ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[oklch(0.6_0.17_254)] to-[oklch(0.55_0.19_285)] text-white shadow-lg shadow-accent/20"
                      : "bg-background shadow-sm hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                      featured ? "bg-white/20 text-white" : "bg-accent/10 text-accent",
                    ].join(" ")}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className={["mt-5 font-semibold tracking-tight", featured ? "text-2xl md:text-3xl" : "text-xl"].join(" ")}>
                    {s.title}
                  </h3>
                  <p className={["mt-2 leading-relaxed", featured ? "max-w-md text-[15px] text-white/85" : "text-[15px] text-muted-foreground"].join(" ")}>
                    {s.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURE statement */}
      <section className="mx-auto max-w-5xl px-6 py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold text-accent">A little bit about me</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-[3.25rem] md:leading-[1.06]">
              Building for the open web, one project at a time.
            </h2>
            <Link to="/about" className={`${btnText} mt-6`}>Read more about me ›</Link>
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>I&apos;m a passionate WordPress &amp; PHP developer from Mumbai, currently building at <span className="text-foreground">Devxpertlab</span> and taking on freelance work. I love crafting responsive, user-friendly websites and web applications that feel effortless to use.</p>
            <p>My focus is the intersection of WordPress, modern frontend (Vue.js &amp; Nuxt.js) and AI: from custom plugins and themes to automations and LLM-powered content pipelines. When I&apos;m not coding, I&apos;m reading about AI, automation and how technology solves real-world problems.</p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-accent">Why work with me</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Built to ship, made to last.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="group rounded-3xl bg-background p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{h.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{h.body}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-10 text-center text-[15px] text-muted-foreground">
            …and an uncountable number of cups of chai. ☕
          </p>
        </div>
      </section>

      {/* GIVING BACK */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">Giving back</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Contributing to the community, no strings attached.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Before I ship anything of my own, I give back. These are the places I contribute time and code to the
            open web, freely.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {givingBack.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-3xl bg-background p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)]"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-sm font-semibold text-accent">{item.kind}</span>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-[13px] text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-[15px] font-medium text-accent group-hover:underline">
                {item.cta} <span aria-hidden="true">&#8594;</span>
              </span>
            </a>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
          This part matters to me most. I contribute to WordPress core and open source without expecting anything
          back, because the tools I build my work on were given to me the same way.
        </p>
      </section>

      {/* FROM THE COMMUNITY */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-accent">From the community</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              KubeCon India, in conversation.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Conversations recorded at KubeCon + CloudNativeCon India with the people building and running
              open-source infrastructure.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {kubeconVideos.map((video) => (
              <article key={video.id} className="overflow-hidden rounded-3xl bg-background shadow-sm">
                <div className="aspect-video w-full bg-secondary">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">{video.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{video.blurb}</p>
                  <a
                    href={`https://youtu.be/${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline"
                  >
                    Watch on YouTube <span aria-hidden="true">&#8594;</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[oklch(0.58_0.17_254)] to-[oklch(0.53_0.2_285)] px-8 py-20 text-center text-white md:py-24">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">Let&apos;s build something amazing.</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Have a WordPress project, an AI idea or an internal tool that needs a developer? I&apos;d love to hear about it.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-accent transition hover:opacity-90">
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
