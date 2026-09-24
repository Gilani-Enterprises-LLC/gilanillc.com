/**
 * Schema.org JSON-LD builders. Every page emits one @graph containing the
 * Organization and WebSite entities plus a WebPage (and optional
 * BreadcrumbList / Service nodes). Entities reference each other by @id so
 * search engines and AI systems see one consistent "Gilani Enterprises" entity.
 *
 * Deliberately NOT emitted (brief §16): reviews, ratings, street addresses,
 * awards, FAQPage (no qualifying FAQ content), Article (Insights posts are
 * placeholders, not published articles).
 */
import { SITE, absoluteUrl } from '../config/site';

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export type PageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

export interface Crumb {
  name: string;
  path: string;
}

export type JsonLdNode = Record<string, unknown>;

export function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE.url}/#logo`,
      url: absoluteUrl(SITE.logoPath),
      width: 512,
      height: 512,
      caption: SITE.name,
    },
    image: { '@id': `${SITE.url}/#logo` },
    description: SITE.entityDescription,
    slogan: SITE.tagline,
    email: SITE.email,
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [...SITE.knowsAbout],
    location: SITE.locations.map((loc) => ({
      '@type': 'Place',
      name: loc.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: loc.locality,
        addressRegion: loc.region,
        addressCountry: loc.country,
      },
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      url: absoluteUrl('/contact/'),
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  };
}

export function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.defaultDescription,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbNode(url: string, crumbs: Crumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function webPageNode(opts: {
  url: string;
  type: PageType;
  title: string;
  description: string;
  hasBreadcrumb: boolean;
}): JsonLdNode {
  return {
    '@type': opts.type,
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(SITE.ogImage.path) },
    ...(opts.hasBreadcrumb ? { breadcrumb: { '@id': `${opts.url}#breadcrumb` } } : {}),
  };
}

export function serviceNode(opts: {
  id: string;
  name: string;
  serviceType: string;
  description: string;
  url: string;
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(opts.url)}#${opts.id}`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.url),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
  };
}

/** Serialize for a <script type="application/ld+json"> tag, escaping `<`. */
export function serializeJsonLd(graph: JsonLdNode[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
