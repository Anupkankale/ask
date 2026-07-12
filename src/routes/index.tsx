import { createFileRoute, Link } from "@tanstack/react-router";
import { Blocks, Bot, Gauge, Github, Languages, Layout, Puzzle, Rocket, Sparkles, Workflow } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anup Kankale | WordPress Developer & AI Integration Specialist" },
      { name: "description", content: "Freelance WordPress development, custom plugins and AI integrations. Building powerful web experiences from Mumbai, India." },
      { property: "og:title", content: "Anup Kankale | WordPress & AI Developer" },
      { property: "og:description", content: "Freelance WordPress development, custom plugins and AI integrations for any requirements." },
    ],
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

const stack = ["WordPress", "PHP", "Vue.js", "Nuxt.js", "JavaScript", "Tailwind CSS", "WooCommerce", "REST API"];

const highlights = [
  { icon: Github, title: "Open source at heart", body: "A free WordPress chatbot plugin and an AI content pipeline, both public and shipping on GitHub." },
  { icon: Languages, title: "Trilingual", body: "I collaborate fluently in English, Hindi and Marathi, so nothing gets lost in translation." },
  { icon: Gauge, title: "Fast & findable", body: "Core Web Vitals, caching and on-page SEO are baked into every build, not bolted on later." },
  { icon: Sparkles, title: "AI-first mindset", body: "Chatbots and automations that remove real busywork for your team, not gimmicks." },
];

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-accent-foreground transition hover:opacity-90";
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
          <h1 className="mt-7 text-[3.25rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[5.25rem]">
            WordPress, PHP &amp; AI,
            <br />
            <span className="text-accent">beautifully engineered.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-[1.375rem]">
            I&apos;m <span className="text-foreground">Anup Kankale</span>, a WordPress &amp; PHP developer and
            frontend specialist from Mumbai. I build responsive websites, custom plugins and themes, and
            AI-powered automations that ship real results.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            <Link to="/projects" className={btnPrimary}>View my work</Link>
            <Link to="/contact" className={btnText}>Get in touch ›</Link>
          </div>
        </div>

        {/* Tech stack strip */}
        <div className="mx-auto max-w-4xl px-6 pt-14 pb-20">
          <p className="text-center text-[13px] font-medium uppercase tracking-widest text-muted-foreground/70">
            Tools I build with
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {stack.map((t) => (
              <span key={t} className="rounded-full border border-border bg-secondary px-4 py-1.5 text-[13px] font-medium text-foreground/80">
                {t}
              </span>
            ))}
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
