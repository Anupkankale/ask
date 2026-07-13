import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BellRing,
  BookOpenCheck,
  BrainCircuit,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/treadstrome")({
  head: () => ({
    meta: [
      { title: "Treadstrome — Trade your rules, not your feelings." },
      {
        name: "description",
        content:
          "Treadstrome is a personal trading terminal for Indian F&O. It watches only the setups you trade, alerts on high-conviction confluence, journals every decision, and reflects with AI. Join the early-access waitlist.",
      },
      { property: "og:title", content: "Treadstrome — Trade your rules, not your feelings." },
      {
        property: "og:description",
        content: "A trading terminal that enforces discipline in code. Join the early-access waitlist.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TreadstromeLanding,
});

const WAITLIST =
  "mailto:tradestrome@gmail.com?subject=Treadstrome%20early%20access&body=I%27d%20like%20early%20access%20to%20Treadstrome.";

const valueProps = [
  {
    icon: BellRing,
    title: "Silent until it matters",
    body: "No blinking dashboards, no noise. Four detectors watch the market and only speak when your rules agree — most days, that's silence.",
  },
  {
    icon: ShieldCheck,
    title: "Discipline enforced in code",
    body: "A risk engine that refuses to log a trade over the grade's premium cap. Overrides are typed, logged and counted. The rules can't be quietly bent.",
  },
  {
    icon: BookOpenCheck,
    title: "A ledger that compounds",
    body: "Every trade recorded with its grade, entry filters and a one-line lesson. Over time it becomes the dataset that answers every “should I hold?”.",
  },
  {
    icon: BrainCircuit,
    title: "AI that reflects, never trades",
    body: "Claude reviews each trade against your rulebook and writes an honest weekly report — from your data, not your memory. It never touches an order.",
  },
];

const setups = [
  { grade: "A+", color: "oklch(0.6 0.18 155)", bg: "oklch(0.95 0.05 155)", title: "Confluence", body: "Sector, stock, chart and OI all agree. Rare, highest expectancy — full size." },
  { grade: "A", color: "oklch(0.58 0.17 254)", bg: "oklch(0.95 0.04 254)", title: "Momentum", body: "A ±2% mover with OI agreement. The bread-and-butter setup — standard size." },
  { grade: "B", color: "oklch(0.62 0.15 70)", bg: "oklch(0.95 0.05 80)", title: "Reversal", body: "Price action plus RSI divergence. Counter-trend, patient — smaller size." },
  { grade: "C", color: "oklch(0.6 0.22 20)", bg: "oklch(0.95 0.04 20)", title: "Scalp", body: "Index expiry-day gamma, Tue/Thu only. Highest variance — smallest cap." },
];

const steps = [
  { n: "01", title: "It watches", body: "Detectors poll the option chain every few seconds during market hours and grade every opportunity against your filters." },
  { n: "02", title: "It alerts", body: "A single Telegram message when a setup clears its threshold. You get the grade, the filters and the level — nothing else." },
  { n: "03", title: "You journal & reflect", body: "Log the trade in two taps. The risk engine keeps you honest; Claude reviews it and rolls it into your weekly report." },
];

const audience = [
  "Indian F&O options traders who already know their edge",
  "Traders bleeding P&L to over-trading, not to bad reads",
  "People who want a journal that's actually used, automatically",
  "Anyone who trusts a rulebook more than a gut feeling at 9:20 a.m.",
];

const eyebrow = "text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground";
const ctaPrimary =
  "inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-[15px] font-medium text-background transition hover:opacity-90";
const ctaGhost =
  "inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-[15px] font-medium text-foreground transition hover:border-accent hover:text-accent";

function TreadstromeLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="flex items-center gap-2 text-[18px] font-semibold tracking-tight text-foreground">
            <span className="h-2 w-2 rounded-[2px] bg-[oklch(0.6_0.18_155)]" />
            Treadstrome
          </span>
          <nav className="hidden items-center gap-7 text-[13.5px] font-medium text-muted-foreground md:flex">
            <a href="#what" className="transition hover:text-foreground">What it is</a>
            <a href="#how" className="transition hover:text-foreground">How it works</a>
            <a href="#setups" className="transition hover:text-foreground">Setups</a>
            <a href="#access" className="transition hover:text-foreground">Early access</a>
          </nav>
          <a href={WAITLIST} className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-[13.5px] font-medium text-accent-foreground transition hover:opacity-90">
            Join waitlist
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10 hero-wash" />
        <div className="mx-auto max-w-3xl px-6 pb-20 pt-20 text-center md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Early access · Personal trading terminal for Indian F&amp;O
          </span>
          <h1 className="mt-7 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-foreground md:text-[4.25rem]">
            Trade your rules.
            <br />
            <span className="text-accent">Not your feelings.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground">
            Treadstrome watches only the setups you actually trade, alerts you the moment your rules agree,
            journals every decision, and reflects with AI at the end of each day. Built to make discipline the
            default, not the exception.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={WAITLIST} className={ctaPrimary}>Get early access</a>
            <a href="#how" className={ctaGhost}>See how it works</a>
          </div>
          <p className="mt-5 text-[13px] text-muted-foreground">
            No card required · Built in public ·{" "}
            <Link to="/treadstromeplanv1" className="text-accent hover:underline">
              Read the technical build plan →
            </Link>
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm font-semibold text-accent">The problem</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-[2.5rem] md:leading-[1.1]">
          Most retail accounts don&apos;t die from bad reads. They die from good reads, traded badly.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The data is fine. The chart is fine. What breaks is discipline under adrenaline — one extra trade,
          one moved stop, one “just this once”. No indicator fixes that. Software that enforces your own rules
          can.
        </p>
      </section>

      {/* WHAT IT IS / value props */}
      <section id="what" className="bg-secondary">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-accent">What it is</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              One terminal that does four hard things well.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {valueProps.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group rounded-3xl bg-background p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.22)]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-accent">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Watch. Alert. Reflect.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps, and only one of them needs you.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border border-border bg-background p-8 shadow-sm">
              <span className="font-mono text-sm font-bold text-accent">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SETUPS */}
      <section id="setups" className="bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-accent">Conviction, sized automatically</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Four setups, graded and sized for you.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every alert carries a grade. The grade decides the size and the risk cap — so the rare, high-conviction
              trade gets respected and the marginal one stays small.
            </p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            {setups.map((s) => (
              <div key={s.title} className="flex items-start gap-4 rounded-2xl border border-border bg-background p-5 shadow-sm">
                <span
                  className="flex h-11 min-w-11 items-center justify-center rounded-xl px-3 text-base font-bold"
                  style={{ color: s.color, backgroundColor: s.bg }}
                >
                  {s.grade}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-foreground">{s.title}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <p className="text-sm font-semibold text-accent">Who it&apos;s for</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-[3rem] md:leading-[1.08]">
              For traders who already have an edge — and want to stop giving it back.
            </h2>
          </div>
          <ul className="space-y-4">
            {audience.map((a) => (
              <li key={a} className="flex items-start gap-3 text-lg leading-relaxed text-muted-foreground">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-4 w-4" />
                </span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* EARLY ACCESS / pricing */}
      <section id="access" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[oklch(0.58_0.17_254)] to-[oklch(0.53_0.2_285)] px-8 py-20 text-center text-white md:py-24">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-medium">
              <Activity className="h-3.5 w-3.5" />
              Limited early access
            </span>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
              Be first on the terminal.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">
              Treadstrome is being built in public, one weekend at a time. Join the waitlist to shape the early
              build, lock in founding-user pricing, and get in the day it opens.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={WAITLIST}
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-accent transition hover:opacity-90"
              >
                Join the waitlist
              </a>
              <Link
                to="/treadstromeplanv1"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                Read the build plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 px-6 py-10 text-[13px] text-muted-foreground sm:flex-row">
          <span>Treadstrome · a personal terminal, built in public. Not a signal service. Not investment advice.</span>
          <a href="https://anupkankale.com" className="text-muted-foreground transition hover:text-foreground">
            by anupkankale.com
          </a>
        </div>
      </footer>
    </div>
  );
}
