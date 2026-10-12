import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Shared button styles so every CTA card's actions read the same.
export const ctaPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90";
export const ctaSecondary =
  "inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground";

/**
 * The warm closing card every page ends with. Pass the buttons as children,
 * styled with ctaPrimary / ctaSecondary.
 */
export function CtaCard({
  eyebrow,
  title,
  body,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto max-w-6xl px-6 pb-24", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-[oklch(0.96_0.04_80)] p-10 md:p-16">
        <div className="relative z-10 max-w-2xl">
          {eyebrow ? (
            <p className="font-display text-sm tracking-widest text-accent">{eyebrow}</p>
          ) : null}
          <h2 className={cn("text-4xl text-primary md:text-5xl", eyebrow && "mt-3")}>{title}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        </div>
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      </div>
    </section>
  );
}
