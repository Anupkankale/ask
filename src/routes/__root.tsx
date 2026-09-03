import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { SITE_NAME, SITE_URL, absoluteUrl } from "../lib/seo";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "../components/site-layout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Anup Kankale | WordPress Developer & AI Integration Specialist" },
      { name: "description", content: "Anup Kankale builds fast WordPress websites, custom plugins and AI-powered automations. WordPress Core contributor from Mumbai, India." },
      { name: "author", content: "Anup Kankale" },
      { property: "og:title", content: "Anup Kankale | WordPress Developer & AI Integration Specialist" },
      { property: "og:description", content: "Anup Kankale builds fast WordPress websites, custom plugins and AI-powered automations. WordPress Core contributor from Mumbai, India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_IN" },
      { name: "theme-color", content: "#ffffff" },
      { name: "twitter:title", content: "Anup Kankale | WordPress Developer & AI Integration Specialist" },
      { name: "twitter:description", content: "Anup Kankale builds fast WordPress websites, custom plugins and AI-powered automations. WordPress Core contributor from Mumbai, India." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/399dad85-1d41-41f3-b3e0-6c250ee5c8fe/id-preview-f3097db2--2ef4790a-ae46-4cfe-add8-c43513b5ad2a.lovable.app-1781418172995.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/399dad85-1d41-41f3-b3e0-6c250ee5c8fe/id-preview-f3097db2--2ef4790a-ae46-4cfe-add8-c43513b5ad2a.lovable.app-1781418172995.png" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=Kalam:wght@700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              name: SITE_NAME,
              url: SITE_URL,
              jobTitle: "WordPress Developer & AI Integration Specialist",
              address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
              knowsAbout: [
                "WordPress",
                "PHP",
                "Gutenberg",
                "Nuxt.js",
                "Vue.js",
                "TypeScript",
                "AI integrations",
                "Automation",
                "REST API",
                "WooCommerce",
              ],
              alumniOf: [
                { "@type": "CollegeOrUniversity", name: "Sant Gadge Baba Amravati University" },
              ],
              worksFor: { "@type": "Organization", name: "Yallo Group" },
              sameAs: [
                "https://profiles.wordpress.org/anupkankale/",
                "https://github.com/Anupkankale",
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: SITE_NAME,
              inLanguage: "en",
              publisher: { "@id": `${SITE_URL}/#person` },
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// One canonical per page, derived from the current path. Query strings and
// hashes are dropped so tracking parameters never fragment the canonical.
function CanonicalLink() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const normalised = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return <link rel="canonical" href={absoluteUrl(normalised)} />;
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <CanonicalLink />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
