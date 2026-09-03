import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Globe, Linkedin, Mail, Menu, UserRound, X } from "lucide-react";

const socials = [
  { label: "About.me", href: "https://about.me/anupkankale", icon: UserRound },
  { label: "GitHub", href: "https://github.com/Anupkankale", icon: Github },
  { label: "LinkedIn", href: "https://in.linkedin.com/in/anupkankale", icon: Linkedin },
  { label: "Gravatar", href: "https://gravatar.com/anupkankale", icon: Globe },
  { label: "Email", href: "mailto:anupkankaleak47@gmail.com", icon: Mail },
] as const;

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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="text-[15px] font-semibold tracking-tight text-foreground">
          Anup Kankale
        </Link>

        <nav className="hidden items-center gap-8 text-[12px] font-normal text-foreground/80 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 transition hover:bg-secondary md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-[17px] text-foreground/90 last:border-0 hover:text-accent"
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
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-foreground">Anup Kankale</p>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              WordPress &amp; PHP development, custom plugins, frontend work and AI-powered automations, built from Mumbai and shipped worldwide.
            </p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-foreground">Explore</p>
            <ul className="mt-3 space-y-2 text-[13px]">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-foreground">Elsewhere</p>
            <div className="mt-3 flex items-center gap-2.5">
              {socials.map((s) => {
                const Icon = s.icon;
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    title={s.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-2 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row">
          <span>Copyright © {new Date().getFullYear()} Anup Kankale. All rights reserved.</span>
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
