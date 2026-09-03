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

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader, SiteFooter } from "../components/site-layout";

import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, absoluteUrl } from "../lib/seo";

const OG_IMAGE = absoluteUrl(DEFAULT_OG_IMAGE);
const SITE_TITLE = "Anup Kankale · WordPress & PHP Developer | Frontend & AI";
const SITE_DESCRIPTION =
  "Anup Kankale is a WordPress & PHP developer and frontend specialist from Mumbai, building responsive websites, custom plugins and themes, and AI-powered automations.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <meta name="robots" content="noindex, nofollow" />
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
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "author", content: "Anup Kankale" },
      { name: "keywords", content: "Anup Kankale, WordPress developer, PHP developer, frontend developer, Vue.js, Nuxt.js, AI integration, automation, WordPress plugin developer, custom themes, Mumbai" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#0071e3" },
      // Open Graph
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: SITE_TITLE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Kalam:wght@700&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
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
              email: "mailto:anupkankaleak47@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
              nationality: { "@type": "Country", name: "India" },
              worksFor: { "@type": "Organization", name: "Devxpertlabs", url: "https://www.devxpertlabs.com/" },
              alumniOf: [{ "@type": "CollegeOrUniversity", name: "Sant Gadge Baba Amravati University" }],
              knowsAbout: [
                "WordPress", "PHP", "Gutenberg", "Vue.js", "Nuxt.js", "TypeScript",
                "AI integrations", "Automation", "REST API", "WooCommerce",
              ],
              sameAs: [
                "https://profiles.wordpress.org/anupkankale/",
                "https://github.com/Anupkankale",
                "https://in.linkedin.com/in/anupkankale",
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

// Query strings and hashes are dropped so tracking parameters never fragment
// the canonical URL.
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
  // Standalone pages (e.g. the unlisted /treadstrome) render without the
  // portfolio's shared header/footer so they read as self-contained.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = pathname.startsWith("/treadstrome");

  return (
    <QueryClientProvider client={queryClient}>
      {bare ? (
        // Required: nested routes render here. Removing <Outlet /> breaks all child routes.
        <Outlet />
      ) : (
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
      )}
    </QueryClientProvider>
  );
}
