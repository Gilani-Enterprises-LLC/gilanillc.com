/**
 * /robots.txt — generated at build time so the Sitemap URL always matches the
 * `site` configured in astro.config.mjs.
 *
 * The Figma Make preview config (.figma/make/site.json) set robots.index=false
 * for its sandbox preview; the production site is intentionally indexable.
 */
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap.xml', site).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
