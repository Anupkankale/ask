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

| Tool | Minimum Version | Notes |
|------|----------------|-------|
| [Bun](https://bun.sh/) | 1.1+ | **Recommended** — ships with its own fast JS runtime and package manager |
| Node.js | 20+ | Only needed if you prefer `npm` / `npx` over Bun |

> **No Python is required** — this is a pure TypeScript / React project.

### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Install dependencies

**With Bun (recommended):**
```bash
bun install
```

**With npm:**
```bash
npm install
```

### 3. Environment variables

This project does **not require any environment variables** for basic local development.

If you later add server-side features (e.g., a database, API keys), create a `.env` file in the project root:

```bash
# Example — only needed once you add external services
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=your_stripe_key
```

> **Important:** Public values that must reach the browser must use the `VITE_` prefix (e.g., `VITE_PUBLIC_URL`). Never put secrets in `VITE_` variables — they ship to the client.

### 4. Run the development server

**With Bun:**
```bash
bun run dev
```

**With npm:**
```bash
npm run dev
```

The site will be available at **`http://localhost:8080`** by default.

### 5. Build for production

**With Bun:**
```bash
bun run build
```

**With npm:**
```bash
npm run build
```

### 6. Preview the production build locally

**With Bun:**
```bash
bun run preview
```

**With npm:**
```bash
npm run preview
```

The preview server also starts on `http://localhost:8080` (or the next available port).

### Troubleshooting

| Issue | Solution |
|-------|----------|
| `bun: command not found` | Install Bun: `curl -fsSL https://bun.sh/install \| bash` |
| Port 8080 already in use | The dev server will auto-pick the next port, or set `PORT=3000 bun run dev` |
| `Cannot find module '@/*'` | Make sure `vite-tsconfig-paths` resolved correctly — re-run `bun install` |

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
