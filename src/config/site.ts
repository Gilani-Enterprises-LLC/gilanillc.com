/**
 * Single source of truth for site-wide facts used in navigation, metadata and
 * structured data. Only verified information belongs here — the site brief
 * forbids inventing emails, phone numbers, street addresses, reviews, etc.
 */
export const SITE = {
  name: 'Gilani Enterprises',
  legalName: 'Gilani Enterprises',
  url: 'https://gilanillc.com',
  locale: 'en_US',
  language: 'en',
  tagline: 'Practical AI. Exceptional Talent. Smarter Business.',
  defaultTitle: 'Gilani Enterprises — AI Consulting & Global Technology Talent',
  defaultDescription:
    'Gilani Enterprises helps U.S. small businesses put AI to practical use and build stronger technology teams through intelligent workflow redesign, automation and global talent.',
  /** Factual entity statement (brief §17) used in Organization schema. */
  entityDescription:
    'Gilani Enterprises is a technology consulting company serving small businesses in the United States. The company specializes in AI-assisted workflow redesign, AI agents and technology staff augmentation through teams in the United States and Pakistan.',
  ogImage: {
    path: '/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Gilani Enterprises — AI-Powered Workflows. Global Technology Talent.',
  },
  /** Public contact inbox — contact-form submissions are delivered here. */
  email: 'info@gilanillc.com',
  logoPath: '/icon-512.png',
  themeColor: '#0C6E58',
  locations: [
    {
      name: 'Oklahoma City, USA',
      locality: 'Oklahoma City',
      region: 'OK',
      country: 'US',
      role: 'U.S. Operations & Consulting',
    },
    {
      name: 'Gujrat, Pakistan',
      locality: 'Gujrat',
      region: 'Punjab',
      country: 'PK',
      role: 'Technology Talent & Delivery',
    },
  ],
  knowsAbout: [
    'AI consulting',
    'AI workflow automation',
    'Business process automation with AI',
    'AI agents for business',
    'Technology staff augmentation',
    'Offshore software development in Pakistan',
    'Dedicated development teams',
  ],
} as const;

export const NAV_LINKS = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Build an absolute URL on the production origin. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}
