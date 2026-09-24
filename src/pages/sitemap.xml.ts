/**
 * /sitemap.xml — generated at build time from the pages in src/pages.
 * Any new .astro page is picked up automatically; list routes to exclude in
 * EXCLUDE (e.g. error pages or noindex pages).
 */
import type { APIRoute } from 'astro';

const EXCLUDE = new Set(['/404/', '/contact/thank-you/']);

// Discover every page component at build time.
const pageModules = import.meta.glob('./**/*.astro');

function toRoute(file: string): string {
  const path = file
    .replace(/^\.\//, '/')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '/');
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs to build the sitemap.');

  const routes = Object.keys(pageModules)
    .map(toRoute)
    .filter((route) => !route.includes('[') && !EXCLUDE.has(route))
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

  const urls = routes
    .map((route) => `  <url>\n    <loc>${new URL(route, site).href}</loc>\n  </url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
