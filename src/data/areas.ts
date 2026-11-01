import { businessId, type SchemaNode } from './schema.ts';
import { formatPrice, pricing, siteUrl } from './site.ts';

const fromPrice = formatPrice(pricing.starter.from);

export interface LocalPage {
  /** Where the page is served, e.g. "/web-design-armidale" */
  href: `/${string}`;
  /** Short name for the footer and in-text links */
  name: string;
  /** The page's h1, which is also its WebPage name in structured data */
  heading: string;
  title: string;
  /** At most 160 characters, so search results show it whole */
  description: string;
  /** The place the page is about. It must also be in the business's areaServed. */
  place: { type: 'City' | 'AdministrativeArea'; name: string };
}

/**
 * The local pages. Each one is written separately, since a page per town with
 * only the name swapped is a doorway page; this holds what they share with the
 * footer, other pages' links and structured data.
 */
export const localPages = {
  armidale: {
    href: '/web-design-armidale',
    name: 'Armidale',
    heading: 'Web design and development in Armidale',
    title: 'Web design and development in Armidale',
    description: `Websites and web apps for Armidale businesses, from a frontend developer based in Armidale. We can meet in person. Websites from ${fromPrice}.`,
    place: { type: 'City', name: 'Armidale' },
  },
  tamworth: {
    href: '/web-design-tamworth',
    name: 'Tamworth',
    heading: 'Web design and development for Tamworth businesses',
    title: 'Web design and development for Tamworth businesses',
    description: `Custom websites and web app work for Tamworth businesses, from a frontend developer in Armidale. Websites from ${fromPrice}, replies within one business day.`,
    place: { type: 'City', name: 'Tamworth' },
  },
  newEngland: {
    href: '/web-design-new-england',
    name: 'New England',
    heading: 'Web design and development across New England',
    title: 'Web design and development in New England, NSW',
    description:
      'Websites and web apps for businesses in Armidale, Guyra, Uralla, Walcha, Glen Innes, Inverell and Tamworth, from a developer based in Armidale.',
    place: { type: 'AdministrativeArea', name: 'New England, NSW' },
  },
} as const satisfies Record<string, LocalPage>;

/** Footer order: the two towns, then the region that holds them. */
export const areaLinks: LocalPage[] = [
  localPages.armidale,
  localPages.tamworth,
  localPages.newEngland,
];

/** A WebPage node for a local page, about the sitewide business rather than a copy of it. */
export const localPageSchema = (page: LocalPage): SchemaNode => {
  const url = new URL(page.href, siteUrl).href;
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.heading,
    description: page.description,
    inLanguage: 'en-AU',
    about: { '@id': businessId },
    spatialCoverage: { '@type': page.place.type, name: page.place.name },
  };
};
