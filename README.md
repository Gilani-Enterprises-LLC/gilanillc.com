# gilanillc.com — Gilani Enterprises website

Static Astro site deployed to Cloudflare Workers Static Assets.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # → dist/
pnpm cf:dev     # serve dist/ via Wrangler (Cloudflare runtime), http://localhost:8787
```

Requires Node ≥ 22.12 and pnpm 10 (see `.mise.toml`).

## Deploying to Cloudflare Workers (Static Assets)

The site is an **assets-only Worker** — no server code. `wrangler.jsonc` points the Worker at `./dist`:

- `html_handling: "auto-trailing-slash"` → `/services/` serves `services/index.html`; `/services` 307-redirects to `/services/`.
- `not_found_handling: "404-page"` → unknown URLs return `dist/404.html` with HTTP 404.
- `public/_headers` → security headers on every response, `immutable` caching for fingerprinted `/_astro/*` files.

### Option A — Cloudflare Workers Builds (Git integration, recommended)

1. Cloudflare dashboard → **Workers & Pages → Create → Import a repository** and select this repo.
2. Build command: `pnpm run build` · Deploy command: `npx wrangler deploy` · Root directory: `/`.
3. Build environment variable: `NODE_VERSION=22` (pnpm is picked up from `packageManager` in `package.json`).
4. After the first deploy, add the custom domain `gilanillc.com` (Worker → Settings → Domains & Routes), or uncomment `routes` in `wrangler.jsonc`.
5. Add a **Redirect Rule** `www.gilanillc.com/*` → `https://gilanillc.com/${1}` (301) so only one host is indexed.

### Option B — from your machine / CI

```bash
pnpm dlx wrangler login        # or set CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
pnpm cf:dry-run                # validate
pnpm deploy                    # build + wrangler deploy
```

## Contact form email

The form on `/contact/` POSTs to `/api/contact`, handled by `worker/index.ts` (the only request path that runs Worker code — `run_worker_first: ["/api/*"]`). The Worker validates the submission and emails it to **info@gilanillc.com** via the [Cloudflare Email Service](https://developers.cloudflare.com/email-service/) `send_email` binding, from `website@gilanillc.com`, with **Reply-To set to the visitor** so you can answer directly.

- Spam protection: same-origin check, hidden honeypot field, 3-second minimum fill time, strict field validation and length limits.
- Without JavaScript the form still works: the Worker 303-redirects to `/contact/thank-you/`.
- The binding is locked to one recipient (`destination_address`) and one sender (`allowed_sender_addresses`) in `wrangler.jsonc`, so it cannot be abused to email anyone else.

**One-time setup in the Cloudflare dashboard** (requires the gilanillc.com zone to use Cloudflare DNS):

1. **Compute → Email Service → Email Sending → Onboard Domain** → choose `gilanillc.com`. Cloudflare adds SPF/DKIM/DMARC records and MX records on the `cf-bounce` subdomain only — your existing mailbox MX records for info@gilanillc.com are not changed. (If you already have an SPF or DMARC record, review the merge Cloudflare proposes.)
2. Add **info@gilanillc.com as a verified destination address** and click the verification link sent to that inbox. Sending to verified addresses in your own account is free on all plans. (Email Sending is currently a beta product.)
3. Deploy (`pnpm deploy`). Submit a test message on the live site and check the inbox (and spam folder the first time).

**Testing locally:** `pnpm cf:dev` → http://localhost:8787/contact/. Emails are *simulated*: Wrangler prints the From/To/Subject in the terminal and saves the text/HTML bodies under `.wrangler/tmp/email/`. `pnpm dev` (Astro only) serves pages but not `/api/contact`. To send real email from local dev, add `"remote": true` to the binding.

To change the recipient, update `destination_address` and `CONTACT_TO` in `wrangler.jsonc` (and verify the new address), then run `pnpm cf:types`.

## SEO & performance features

- Every route pre-rendered to static HTML at build time (no client-side routing, no React runtime).
- Per-page `<title>`, meta description, canonical URL, Open Graph + Twitter card (`public/og-image.png`, 1200×630).
- JSON-LD `@graph`: Organization (with locations and ContactPoint), WebSite, WebPage/AboutPage/ContactPage/CollectionPage, BreadcrumbList, and Service nodes on `/services/`.
- `/sitemap.xml` and `/robots.txt` generated at build from the pages directory and `site` in `astro.config.mjs`.
- Self-hosted fonts (Fontsource) with preloads for the above-the-fold faces and metric-matched fallbacks (no layout shift on swap); all CSS inlined.
- A few KB of JavaScript total (mobile menu, Insights filter, contact form, reduced-motion handler, link prefetch).
- Accessibility: skip link, landmarks, `aria-current`, keyboard/Escape support for the mobile menu, visible focus styles, reduced-motion support for the SVG animations, WCAG AA contrast fixes in the footer and CTAs.

## Before launch — open items

1. **Contact form email setup** (one-time, see "Contact form email" above) — until it's done, submissions on the live site return an error that points visitors to info@gilanillc.com.
2. **Privacy policy** (`/privacy/`) was written to match what the site does today (no cookies/analytics). Have it reviewed, and update it if analytics or a form processor are added.
3. **Insights** shows placeholder article cards (clearly labelled, as the brief requires). Replace with real articles (Astro content collections recommended) and add `Article` schema then.
4. **Hero "Explore Our Services" button** (white on `#10B981`) is 2.5:1 contrast — kept to preserve the design; darken the green (e.g. `#047857`) if you want full WCAG AA.
