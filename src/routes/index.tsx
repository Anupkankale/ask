import { createFileRoute, Link } from "@tanstack/react-router";
import anupHeroJpg from "../assets/anup-hero-wordcamp.jpg";
import anupHeroWebp from "../assets/anup-hero-wordcamp.webp";
import { pageHead } from "../lib/seo";

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
  { title: "WordPress Development", body: "Custom themes, full-site editing and editorial workflows that your team will actually enjoy." },
  { title: "Custom Plugins", body: "Purpose-built plugins, Gutenberg blocks and REST API endpoints tailored to your business logic." },
  { title: "AI Integrations", body: "Chatbots, content assistants and LLM features that plug straight into your existing stack." },
  { title: "Automation Workflows", body: "n8n and API-based automations that quietly remove the busywork from your day." },
  { title: "Performance Optimization", body: "Core Web Vitals, caching, image strategy. Make your WordPress site genuinely fast." },
  { title: "Maintenance & Support", body: "Reliable updates, monitoring and a developer on call when something breaks." },
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

const marqueeItems = [
  "WORDPRESS CORE CONTRIBUTOR",
  "PHP 8",
  "CUSTOM PLUGINS",
  "GUTENBERG BLOCKS",
  "FULL-SITE EDITING",
  "HOOKS & FILTERS",
  "CUSTOM POST TYPES",
  "REST API",
  "HEADLESS WORDPRESS",
  "WOOCOMMERCE",
  "ELEMENTOR",
  "WP-CRON",
  "TYPESCRIPT",
  "VUE.JS",
  "NUXT.JS",
  "TAILWIND CSS",
  "JAVASCRIPT",
  "MYSQL",
  "DOCKER",
  "GIT & GITHUB",
  "COMPOSER",
  "PHPUNIT",
  "PHPCS",
  "AI INTEGRATIONS",
  "AI CHATBOTS",
  "OPENAI API",
  "RAG ARCHITECTURE",
  "n8n AUTOMATIONS",
  "AI CONTENT PIPELINES",
  "CORE WEB VITALS",
  "PERFORMANCE OPTIMIZATION",
  "TECHNICAL SEO",
  "PLUGIN SECURITY",
  "cPANEL & DEPLOYMENT",
  "MAINTENANCE & SUPPORT",
];

// Rendered twice inside .marquee; the second copy is aria-hidden so screen
// readers hear the list once.
function MarqueeTrack({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <div className="marquee-track" aria-hidden={ariaHidden}>
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-10">
          {item}
          <span className="text-accent">★</span>
        </span>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="relative z-10">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AVAILABLE FOR FREELANCE WORK
            </span>
            <h1 className="mt-6 text-5xl text-primary md:text-7xl">
              WordPress &amp; AI <span className="text-accent">solutions,</span> no matter your requirements.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              I&apos;m a WordPress developer, open source contributor and AI enthusiast. I build fast websites,
              custom plugins and automations for businesses, startups and individuals. A new build or an
              existing site that needs work, both are welcome.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Currently building at{" "}
              <a
                href="https://www.devxpertlabs.com/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent"
              >
                Devxpertlabs
              </a>{" "}
              alongside freelance projects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition">
                View my work
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition">
                Get in touch →
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 mx-auto h-[420px] w-[420px] max-w-full rounded-full bg-[radial-gradient(circle_at_center,_var(--highlight),_transparent_65%)] blur-2xl" />
            <picture>
              <source srcSet={anupHeroWebp} type="image/webp" />
              <img
                src={anupHeroJpg}
                alt="Anup Kankale speaking at a WordCamp, standing at a WordPress-branded podium"
                width={900}
                height={1126}
                fetchPriority="high"
                decoding="async"
                className="mx-auto w-full max-w-md rounded-3xl object-cover shadow-[0_30px_60px_-30px_oklch(0.28_0.11_265/0.55)]"
              />
            </picture>
          </div>
        </div>
        <div className="border-y border-border bg-primary text-primary-foreground">
          <div className="marquee py-4 font-display text-sm tracking-widest">
            <MarqueeTrack />
            <MarqueeTrack aria-hidden />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-display text-sm tracking-widest text-accent">WHAT I DO</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">A little bit of everything around WordPress.</h2>
          <p className="mt-4 text-muted-foreground">From a single Gutenberg block to a 90-page enterprise site, here&apos;s how I usually help clients ship.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_40px_-20px_oklch(0.7_0.21_25/0.4)]">
              <span className="font-display text-4xl text-muted-foreground/30">0{i + 1}</span>
              <h3 className="mt-2 text-xl text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="font-display text-sm tracking-widest text-accent">A LITTLE BIT ABOUT ME</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Open source is where I feel at home.</h2>
          </div>
          <div className="space-y-4 text-primary-foreground/80 leading-relaxed">
            <p>I&apos;m passionate about open source, WordPress and emerging AI technologies. As a contributor to the WordPress project, I enjoy helping shape the platform that powers over 40% of the web.</p>
            <p>Alongside client work, I participate in the WordPress community through Core contributions, WordCamps and small open-source experiments. When I&apos;m not coding, I&apos;m usually reading about AI, automation and how technology can solve real-world problems.</p>
            <Link to="/about" className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">Read more about me →</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="font-display text-sm tracking-widest text-accent">GIVING BACK</p>
            <h2 className="mt-3 text-4xl text-primary md:text-5xl">Contributing to the community, no strings attached.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Before I ship anything of my own, I give back. These are the places I contribute time and code to the
              open web, freely.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {givingBack.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_40px_-20px_oklch(0.7_0.21_25/0.4)]"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-display text-xs tracking-widest text-accent">{item.kind}</span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-3 text-2xl text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:underline">
                  {item.cta} <span aria-hidden="true">&#8594;</span>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-12 max-w-3xl border-l-2 border-accent pl-6 text-lg text-muted-foreground leading-relaxed">
            This part matters to me most. I contribute to WordPress core and open source without expecting anything
            back, because the tools I build my work on were given to me the same way. This is how I pay that forward.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-display text-sm tracking-widest text-accent">FROM THE COMMUNITY</p>
          <h2 className="mt-3 text-4xl text-primary md:text-5xl">KubeCon India, in conversation.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Conversations recorded at KubeCon + CloudNativeCon India with the people building and running open-source
            infrastructure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {kubeconVideos.map((video) => (
            <article key={video.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-video w-full bg-primary/5">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg text-primary leading-snug">{video.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{video.blurb}</p>
                <a
                  href={`https://youtu.be/${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  Watch on YouTube <span aria-hidden="true">&#8594;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-24 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[oklch(0.96_0.04_80)] p-10 md:p-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl text-primary md:text-5xl">Let&apos;s build something amazing together.</h2>
            <p className="mt-4 text-muted-foreground">Have a WordPress project, an AI idea or an internal tool that needs a developer? I&apos;d love to hear about it.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">Start a conversation →</Link>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
      </section>
      </div>
    </div>
  );
}