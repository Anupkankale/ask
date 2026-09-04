import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group">
          <span className="logo-mark text-primary">Anup Kankale</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-primary/80 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="i">≡</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-primary/80 hover:text-accent"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-primary">ANUP KANKALE.</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Freelance WordPress development, custom plugins and AI-powered web experiences, built from Mumbai and shipped worldwide.
          </p>
        </div>
        <div>
          <p className="font-display text-sm tracking-widest text-accent">EXPLORE</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-primary/80 hover:text-accent">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-sm tracking-widest text-accent">ELSEWHERE</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a className="hover:text-accent" href="https://profiles.wordpress.org/anupkankale/" target="_blank" rel="noreferrer">WordPress.org profile</a></li>
            <li><a className="hover:text-accent" href="https://in.linkedin.com/in/anupkankale" target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a className="hover:text-accent" href="https://gravatar.com/anupkankale" target="_blank" rel="noreferrer">Gravatar</a></li>
            <li><a className="hover:text-accent" href="mailto:anupkankaleak47@gmail.com">anupkankaleak47@gmail.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Anup Kankale. Built with WordPress love.</span>
          <span>Mumbai · India</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}