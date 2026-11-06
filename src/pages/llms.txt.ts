import type { APIRoute } from 'astro';
import { SITE, absoluteUrl } from '../config/site';

/** Static discovery file; company facts come from the shared site configuration. */
export const GET: APIRoute = () => {
  const link = (name: string, path: string, description: string) =>
    '- [' + name + '](' + absoluteUrl(path) + '): ' + description;
  const content = [
    '# ' + SITE.name,
    '',
    '> ' + SITE.entityDescription,
    '',
    'Locations: ' + SITE.locations.map((location) => location.name + ' (' + location.role + ')').join('; ') + '.',
    'Contact email: ' + SITE.email + '.',
    'Insights currently contains illustrative placeholders, not published articles.',
    '',
    '## Company and services',
    '',
    link('Home', '/', 'Company overview and approach to practical AI and global technology talent.'),
    link('Services', '/services/', 'AI consulting, workflow automation, AI agents and technology staff augmentation.'),
    link('AI consulting', '/services/#ai-consulting', 'Workflow assessment and AI adoption with human oversight.'),
    link('Staff augmentation', '/services/#staff-augmentation', 'Individual specialists, dedicated teams and project teams based in Pakistan.'),
    link('About', '/about/', 'Company background and teams in the United States and Pakistan.'),
    link('Contact', '/contact/', 'Contact form and business locations.'),
    '',
    '## Optional',
    '',
    link('Privacy policy', '/privacy/', 'Handling of contact submissions and website data.'),
    link('Sitemap', '/sitemap.xml', 'Indexable website pages.'),
    '',
  ].join('\n');
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
