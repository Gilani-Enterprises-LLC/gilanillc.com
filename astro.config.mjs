// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
//
// Fully static build (output: 'static'). Every public route is pre-rendered
// to HTML at build time and served from Cloudflare Workers Static Assets
// (see wrangler.jsonc). No server adapter is needed.
//
// URLs use trailing slashes (/services/, /about/ …) as specified in the site
// brief. `build.format: 'directory'` emits /services/index.html, and
// Cloudflare's `html_handling: "auto-trailing-slash"` serves it at /services/
// and 307-redirects /services → /services/.
export default defineConfig({
  site: 'https://gilanillc.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline all CSS (~15 KB, ~4 KB gzipped) so first paint needs no extra
    // render-blocking request — best for LCP on a small static site.
    inlineStylesheets: 'always',
  },
  // Prefetch internal links on hover/focus for near-instant navigation.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  server: {
    // Honour $PORT when set (e.g. Figma Make's preview runner), else Astro's default.
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
