import { createFileRoute, Link } from "@tanstack/react-router";
import anupHero from "../assets/anup-hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anup Kankale — WordPress Developer & AI Integration Specialist" },
      { name: "description", content: "Freelance WordPress development, custom plugins and AI integrations. Building powerful web experiences from Mumbai, India." },
      { property: "og:title", content: "Anup Kankale — WordPress & AI Developer" },
      { property: "og:description", content: "Freelance WordPress development, custom plugins and AI integrations — no matter your requirements." },
    ],
  }),
  component: Home,
});

const services = [
  { title: "WordPress Development", body: "Custom themes, full-site editing and editorial workflows that your team will actually enjoy." },
  { title: "Custom Plugins", body: "Purpose-built plugins, Gutenberg blocks and REST API endpoints tailored to your business logic." },
  { title: "AI Integrations", body: "Chatbots, content assistants and LLM features that plug straight into your existing stack." },
  { title: "Automation Workflows", body: "n8n and API-based automations that quietly remove the busywork from your day." },
  { title: "Performance Optimization", body: "Core Web Vitals, caching, image strategy — make your WordPress site genuinely fast." },
  { title: "Maintenance & Support", body: "Reliable updates, monitoring and a developer on call when something breaks." },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AVAILABLE FOR FREELANCE WORK
            </span>
            <h1 className="mt-6 text-5xl text-primary md:text-7xl">
              WordPress &amp; AI<br />
              <span className="text-accent">solutions,</span>
              <br />no matter your<br />requirements.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              My name is <strong className="text-primary">Anup Kankale</strong>, and I&apos;m a WordPress Developer,
              Open Source Contributor and AI enthusiast. I help businesses, startups and individuals build
              modern websites, automate workflows and create powerful digital experiences — whether
              you&apos;re launching something new or improving what you already have.
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
            <img src={anupHero} alt="Illustration of Anup Kankale waving" width={1024} height={1024} className="mx-auto w-full max-w-md" />
          </div>
        </div>
        <div className="border-y border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl overflow-hidden px-6 py-4 flex flex-wrap gap-x-10 gap-y-2 whitespace-nowrap font-display text-sm tracking-widest">
            <span>WORDPRESS CORE CONTRIBUTOR</span>
            <span className="text-accent">★</span>
            <span>AI INTEGRATIONS</span>
            <span className="text-accent">★</span>
            <span>CUSTOM PLUGINS</span>
            <span className="text-accent">★</span>
            <span>PERFORMANCE</span>
            <span className="text-accent">★</span>
            <span>n8n AUTOMATIONS</span>
            <span className="text-accent">★</span>
            <span>REST API</span>
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { num: "7.0", label: "WordPress release with contribution credit" },
            { num: "90+", label: "Pages shipped on a single enterprise WP project" },
            { num: "∞", label: "Cups of chai per plugin shipped" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-8 text-center">
              <p className="font-display text-6xl text-accent">{stat.num}</p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-[oklch(0.96_0.04_80)] p-10 md:p-16">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl text-primary md:text-5xl">Let&apos;s build something amazing together.</h2>
            <p className="mt-4 text-muted-foreground">Have a WordPress project, an AI idea or an internal tool that needs a developer? I&apos;d love to hear about it.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">Start a conversation →</Link>
          </div>
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        </div>
      </section>
    </>
  );
}