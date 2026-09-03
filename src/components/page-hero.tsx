import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 hero-wash" />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <p className="text-sm font-semibold tracking-tight text-accent">{eyebrow}</p>
        <h1 className="mt-3 text-[2.75rem] font-semibold leading-[1.06] tracking-tight text-foreground md:text-6xl">{title}</h1>
        {lead && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>}
      </div>
    </section>
  );
}
