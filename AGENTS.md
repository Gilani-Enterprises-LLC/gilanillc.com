# gilanillc.com

Static marketing site for **Gilani Enterprises**, built with **Astro** (static output) and deployed to **Cloudflare Workers Static Assets**. It was migrated from a Figma Make React/Vite SPA; the visual design and responsive behaviour were preserved.

## Commands (pnpm)

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies (pnpm version pinned in `package.json` / `.mise.toml`) |
| `pnpm dev` | Astro dev server (http://localhost:4321, or `$PORT`) |
| `pnpm build` | Pre-render every page to `dist/` |
| `pnpm preview` | Serve `dist/` with Astro |
| `pnpm check` | Generate Worker types, type-check `.astro`/`.ts` files (`astro check`) and the Worker (`tsc -p worker`) |
| `pnpm cf:types` | Regenerate `worker/worker-configuration.d.ts` after editing `wrangler.jsonc` |
| `pnpm cf:dev` | Build, then serve `dist/` through Wrangler exactly as Cloudflare will |
| `pnpm cf:dry-run` | Build and validate the Cloudflare deployment without uploading |
| `pnpm deploy` | Build and deploy with `wrangler deploy` |

## Project structure

- `astro.config.mjs` — `site`, static output, `trailingSlash: 'always'`, directory build format, inlined CSS, prefetch, Tailwind v4 Vite plugin
- `wrangler.jsonc` — Worker with static assets (`./dist`, `auto-trailing-slash`, `404-page`); only `/api/*` runs Worker code; `send_email` binding for the contact form
- `worker/index.ts` — `POST /api/contact`: validates the contact form and emails it to info@gilanillc.com via Cloudflare Email Service (Reply-To = visitor)
- `public/` — copied verbatim: `_headers` (security + cache headers), favicons, `og-image.png`, `site.webmanifest`
- `src/config/site.ts` — **single source of truth** for company facts, nav links, OG image, locations
- `src/lib/schema.ts` — Schema.org JSON-LD builders (Organization, WebSite, WebPage, BreadcrumbList, Service)
- `src/layouts/Layout.astro` — page shell (skip link, header, `<main id="main">`, footer, reduced-motion handler)
- `src/components/BaseHead.astro` — title, description, canonical, robots, Open Graph, Twitter card, icons, font preloads, JSON-LD
- `src/components/` — `Nav`, `Footer`, `Logo`, `SectionLabel`, `home/WorkflowViz`, `home/LocationArc`
- `src/pages/` — one file per route: `/`, `/services/`, `/about/`, `/insights/`, `/contact/`, `/contact/thank-you/` (noindex), `/privacy/`, `404`
- `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts` — generated at build time
- `src/styles/global.css` — Tailwind import, design tokens (CSS variables), fallback font metrics, a11y helpers
- `docs/design-references/` — Figma Make screenshots and the original website brief (not part of the build)

## Conventions

- **Static first.** Every page is pre-rendered. The only runtime code is `worker/index.ts` for `/api/*` (the contact form needs a server to send email). Do not add an SSR adapter unless a feature truly needs runtime rendering; document why if you do.
- **No framework runtime.** Pages and components are `.astro`. Interactivity (mobile menu, Insights filter, contact form) is small vanilla `<script>` progressive enhancement. Only add a React/other island (`client:*`) for a component with genuinely complex client state.
- **Links use trailing slashes** (`/services/`, not `/services`) to match canonical URLs and avoid redirects.
- **Typography:** use `var(--font-sans)` / `var(--font-serif)`; fonts are self-hosted via Fontsource (`Inter Variable`, `Instrument Serif`) — do not add Google Fonts `<link>`/`@import`.
- **Styling:** existing sections use inline `style={{…}}` objects (ported 1:1 from the Figma output) plus scoped `<style>` blocks for hover/focus states; Tailwind v4 utilities are available (`hidden md:flex`, etc.).
- **SEO per page:** pass `title`, `description`, `pageType`, `breadcrumbs` (and `schema` for extra JSON-LD) to `<Layout>`. Exactly one `<h1>` per page; keep a logical `h2`/`h3` outline.
- **Facts only:** never invent emails, phone numbers, street addresses, reviews, ratings or client names (site brief §13, §16). Insights posts are placeholders — do not emit `Article` schema until real articles exist.
- **Images:** put content images in `src/assets/` and render with `astro:assets` `<Image>`/`<Picture>` (AVIF/WebP, width/height, lazy loading). `public/` is only for files that need fixed URLs.
