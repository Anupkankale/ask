# Anup Kankale — Personal Portfolio

> Freelance WordPress Developer & AI Integration Specialist  
> Live site: [anupkankale.lovable.app](https://anupkankale.lovable.app)

A fast, modern portfolio website built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **shadcn/ui**. Designed to showcase services, projects, blog posts, and make it easy for potential clients to get in touch.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) (full-stack React) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Components | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| Icons | [Lucide React](https://lucide.dev/) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Carousel | Embla Carousel |
| Build Tool | Vite 7 |
| Package Manager | Bun |

---

## Project Structure

```text
src/
  routes/              # File-based routing (TanStack Router)
    index.tsx          # Homepage
    about.tsx          # About page
    services.tsx       # Services overview
    projects.tsx       # Project showcase
    blog.tsx           # Blog / articles
    contact.tsx        # Contact form
    sitemap[.]xml.ts   # Dynamic sitemap.xml route
    __root.tsx         # Root layout (head, providers)
  components/          # Reusable UI components
  assets/              # Images, fonts, static files
  styles.css            # Global styles & Tailwind entry
  router.tsx           # Router configuration
public/                # Static public assets
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Install dependencies

```bash
bun install
```

### Run the development server

```bash
bun run dev
```

The site will be available at `http://localhost:8080` by default.

### Build for production

```bash
bun run build
```

### Preview the production build

```bash
bun run preview
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start the Vite dev server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |

---

## Key Features

- **Homepage** — Hero section, services grid, stats, and CTA
- **About** — Background, skills, and open-source contributions
- **Services** — Detailed breakdown of WordPress, AI, and automation offerings
- **Projects** — Portfolio of past work
- **Blog** — Articles and insights
- **Contact** — Easy way to reach out for freelance work
- **SEO** — Semantic HTML, meta tags, Open Graph, dynamic sitemap.xml

---

## License

This project is personal and proprietary. All rights reserved.

---

**Built with care by Anup Kankale.**  
Want to work together? [Get in touch](https://anupkankale.lovable.app/contact).
