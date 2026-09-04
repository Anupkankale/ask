import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="border-b border-border bg-[oklch(0.97_0.02_80)]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-display text-sm tracking-widest text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-primary md:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">{lead}</p>}
      </div>
    </section>
  );
}