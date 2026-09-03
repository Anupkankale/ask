import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, BookOpen, Brain, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/treadstromeplanv1")({
  head: () => ({
    meta: [
      { title: "Treadstrome — Build Plan v1 (technical)" },
      {
        name: "description",
        content:
          "A personal trading terminal for Indian F&O — four setups, one ledger, discipline enforced in code. An upcoming project by Anup Kankale.",
      },
      // Hidden, unannounced project — keep it out of search engines.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Treadstrome" },
      { property: "og:description", content: "A personal trading terminal, built in public." },
    ],
  }),
  component: Treadstrome,
});

const modules = [
  {
    icon: Bell,
    label: "Module 01",
    title: "Signals",
    body: "Four detectors run every 3 seconds during market hours. A Telegram alert fires when a grade clears its threshold. Nothing else in your face.",
  },
  {
    icon: BookOpen,
    label: "Module 02",
    title: "Edge Ledger",
    body: "Every trade logged with grade, entry filters, tags and a one-line lesson. The dataset that eventually replaces every “should I hold?” question.",
  },
  {
    icon: ShieldCheck,
    label: "Module 03",
    title: "Risk Engine",
    body: "Grade-based premium caps, a daily loss floor, per-grade trade counts. Overrides require a typed reason and get counted in the weekly report.",
  },
  {
    icon: Brain,
    label: "Module 04",
    title: "Reflection",
    body: "Claude Haiku reviews each trade against the rulebook. A larger model writes the weekly report — from data, not memory.",
  },
];

const setups = [
  {
    grade: "A+",
    color: "oklch(0.6 0.18 155)",
    bg: "oklch(0.95 0.05 155)",
    title: "Confluence",
    meta: "Sector → Stock → Chart → OI",
    body: "Five filters agree. Rare, highest expectancy. Full size, longer hold.",
  },
  {
    grade: "A",
    color: "oklch(0.58 0.17 254)",
    bg: "oklch(0.95 0.04 254)",
    title: "Momentum",
    meta: "±2% mover with OI agreement",
    body: "Four filters. The bread-and-butter setup. Standard size.",
  },
  {
    grade: "B",
    color: "oklch(0.62 0.15 70)",
    bg: "oklch(0.95 0.05 80)",
    title: "Reversal",
    meta: "Price action + RSI divergence",
    body: "Counter-trend. Structure stop above the divergence high. Smaller size, patience.",
  },
  {
    grade: "C",
    color: "oklch(0.6 0.22 20)",
    bg: "oklch(0.95 0.04 20)",
    title: "Scalp",
    meta: "Index expiry-day gamma",
    body: "Tue/Thu only. Highest variance, tightest containment. Smallest per-trade cap.",
  },
];

const roadmap = [
  {
    week: "WK 1",
    state: "now" as const,
    title: "See one bar move.",
    body: "Docker Compose · Postgres + TimescaleDB · Dhan poller · one live OI-delta chart in Nuxt.",
  },
  {
    week: "WK 2",
    state: "" as const,
    title: "First traffic light.",
    body: "Momentum detector · signal publisher · Telegram alerts · SSE dashboard.",
  },
  {
    week: "WK 3",
    state: "" as const,
    title: "Journal + guardrails.",
    body: "Trade form · risk engine · Claude Haiku trade review · ledger listing.",
  },
  {
    week: "WK 4",
    state: "" as const,
    title: "Full setup coverage.",
    body: "Confluence · Reversal · Scalp detectors · weekly report generator · backups + monitoring.",
  },
];

const stack: [string, string][] = [
  ["Frontend", "Nuxt 3 · Vue 3 · TypeScript · Tailwind · Nuxt UI"],
  ["Charts", "lightweight-charts · vue-echarts"],
  ["Realtime", "Server-Sent Events over Postgres NOTIFY"],
  ["Backend", "Node/TypeScript · Nuxt server routes"],
  ["Data", "Dhan v2 REST (option chain) · NSE indices (sectors)"],
  ["Database", "Postgres 16 + TimescaleDB extension"],
  ["AI layer", "Claude Haiku (per-trade) · larger model (weekly)"],
  ["Alerts", "Telegram Bot API"],
  ["Deploy", "Docker Compose · Caddy TLS · one VPS"],
  ["Backup", "Nightly pg_dump → Backblaze B2"],
];

const rules = [
  ["Signals only, never orders.", "The app never touches the broker."],
  ["Deterministic detectors, reflective AI.", "Claude never runs on ticks."],
  ["The risk engine can't be silently overridden.", "Overrides are typed, logged, counted."],
  ["The ledger is the product.", "Backed up nightly. Nothing else is."],
  ["Keys stay on the server.", "Anthropic and Dhan credentials never see the browser."],
];

const eyebrow = "text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground";

function Treadstrome() {
  return (
    <div className="min-h-screen bg-background">
      {/* Minimal standalone top bar — intentionally not the portfolio nav */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-6">
          <Link to="/treadstrome" className="flex items-center gap-2 text-[17px] font-semibold tracking-tight text-foreground">
            <span className="h-2 w-2 rounded-[2px] bg-[oklch(0.6_0.18_155)]" />
            Treadstrome
            <span className="ml-1 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
              Plan v1
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] font-medium text-muted-foreground sm:flex">
            <a href="#thesis" className="transition hover:text-foreground">Thesis</a>
            <a href="#modules" className="transition hover:text-foreground">Modules</a>
            <a href="#setups" className="transition hover:text-foreground">Setups</a>
            <a href="#stack" className="transition hover:text-foreground">Stack</a>
            <Link to="/treadstrome" className="text-accent transition hover:underline">← Product</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 hero-wash" />
        <div className="mx-auto max-w-3xl px-6 pb-16 pt-16 md:pt-20">
          <p className={eyebrow}>Personal trading terminal · Indian F&amp;O · v0.1</p>
          <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[3.5rem]">
            The software my <span className="text-accent">2023 notebook</span> was begging for.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Treadstrome watches four setups I actually trade, fires only when the rules I actually wrote
            agree, journals every decision, and reflects with Claude at day and week end. Built for one
            trader &mdash; me &mdash; first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background transition hover:opacity-90"
            >
              See the build log
            </a>
            <a
              href="#thesis"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-[15px] font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Read the thesis
            </a>
          </div>

          {/* Origin note */}
          <figure className="mt-10 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
            <figcaption className="text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
              Origin note · 16 May 2023
            </figcaption>
            <blockquote className="mt-3 text-lg italic leading-relaxed text-foreground/90">
              &ldquo;Believe in price action · Take only 2 trades of target or SL · Check OI build-up on the
              side for buy · Always choose in-the-money &mdash; ATM has highest time value.&rdquo;
            </blockquote>
            <p className="mt-3 text-[13px] text-muted-foreground">
              &mdash; pen-and-paper OI tracking, three years before the app existed
            </p>
          </figure>
        </div>
      </section>

      {/* THESIS */}
      <section id="thesis" className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-sm font-semibold text-accent">The thesis</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Why this app exists
        </h2>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted-foreground">
          <p>
            Most trading tools show you data and let you decide. That&apos;s how most retail accounts die
            &mdash; the data is fine, the decisions aren&apos;t. The gap between{" "}
            <span className="text-foreground">&ldquo;correct market reading&rdquo;</span> and{" "}
            <span className="text-foreground">&ldquo;a P&amp;L that survives&rdquo;</span> is discipline under
            adrenaline, and no chart fixes that.
          </p>
          <p>
            Treadstrome is the opposite bet. The reading is already done &mdash; encoded as four setup
            detectors that only fire when the filters agree. The discipline is enforced in code &mdash; a
            risk engine that refuses to log a trade above the grade&apos;s premium cap. What&apos;s left for
            the trader is the one thing software can&apos;t do: press the button and honor the exit.
          </p>
          <p>
            The result is boring, on purpose. Most trading days, the app shows nothing. The occasional green
            light &mdash; <span className="text-foreground">Confluence</span>, when sector, stock, chart and
            OI all agree &mdash; is worth waiting for precisely because it&apos;s rare.
          </p>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-semibold text-accent">What&apos;s inside</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Four modules, one database, one purpose.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="rounded-3xl bg-background p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                    {m.label}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SETUPS */}
      <section id="setups" className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold text-accent">The four setups</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Named by purpose. Ranked by conviction.
        </h2>
        <div className="mt-10 space-y-3">
          {setups.map((s) => (
            <div
              key={s.title}
              className="flex items-center gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm"
            >
              <span
                className="flex h-12 min-w-12 items-center justify-center rounded-xl px-3 text-base font-bold"
                style={{ color: s.color, backgroundColor: s.bg }}
              >
                {s.grade}
              </span>
              <div>
                <p className="text-[15px] font-semibold text-foreground">
                  {s.title} <span className="font-normal text-muted-foreground">· {s.meta}</span>
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-sm font-semibold text-accent">Build log</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Four weekends to a working terminal.
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">Data first, features second.</p>
          <div className="mt-10 space-y-3">
            {roadmap.map((r) => (
              <div
                key={r.week}
                className="flex items-baseline gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm"
              >
                <span
                  className={[
                    "rounded-lg px-2.5 py-1 text-[12px] font-bold",
                    r.state === "now"
                      ? "bg-accent/10 text-accent"
                      : "bg-secondary text-muted-foreground",
                  ].join(" ")}
                >
                  {r.week}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-sm font-semibold text-accent">Stack</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Boring on purpose.
        </h2>
        <p className="mt-3 text-[15px] text-muted-foreground">
          Upgradeable when the data proves it needs to be.
        </p>
        <dl className="mt-10 rounded-3xl border border-border bg-card p-7 font-mono text-[13.5px] leading-loose">
          {stack.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 border-b border-border/60 py-2 last:border-0 sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 text-muted-foreground">{k}</dt>
              <dd className="text-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Non-negotiables */}
        <div className="mt-8 rounded-3xl bg-foreground p-8 text-background">
          <h3 className="text-xl font-semibold tracking-tight text-background">Five non-negotiables</h3>
          <ol className="mt-5 space-y-3 text-[14.5px]">
            {rules.map(([head, tail], i) => (
              <li key={head} className="flex gap-3">
                <span className="font-mono text-background/50">{i + 1}.</span>
                <span>
                  <span className="font-semibold text-background">{head}</span>{" "}
                  <span className="text-background/70">{tail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 text-[13px] text-muted-foreground">
          Treadstrome · a personal terminal, built in public. Not a signal service. Not investment advice.
        </div>
      </footer>
    </div>
  );
}
