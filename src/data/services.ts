import { formatPrice, pricing } from './site.ts';

export interface Service {
  /** Anchor on /services */
  id: string;
  name: string;
  summary: string;
  includes: string[];
  /** A real project that shows this service, linked to its case study */
  example: { href: string; before: string; link: string; after: string };
  /** Mono price line */
  price: string;
  link: { href: string; label: string };
}

export const services: Service[] = [
  {
    id: 'websites',
    name: 'Websites',
    summary:
      'A custom site for a small business, built from scratch to load fast on any phone and be easy to find on Google.',
    includes: [
      'Designed for your business, not a template',
      'Contact form that sends enquiries to your inbox',
      'Set up to be found on Google: page titles, descriptions and a sitemap',
    ],
    example: {
      href: '/work/lenbuild',
      before: 'Like the site I built for ',
      link: 'LenBuild',
      after: ' in Guyra.',
    },
    price: `From ${formatPrice(pricing.starter.from)} · Professional from ${formatPrice(pricing.professional.from)}`,
    link: { href: '/services#websites', label: 'Website packages and prices' },
  },
  {
    id: 'apps',
    name: 'Apps & integrations',
    summary:
      'Frontend work on web apps, new or existing, and connecting your site to the tools you already use.',
    includes: [
      'The front end of a new web app, in React and TypeScript',
      'Connecting APIs, a CMS, payments, bookings or a CRM',
      'Fixing or improving an existing codebase, or contract work alongside your team',
    ],
    example: {
      href: '/work/fuel-finder',
      before: 'Like ',
      link: 'Fuel Finder',
      after: ', built on live NSW FuelCheck data.',
    },
    price: pricing.apps.note,
    link: { href: '/services#apps', label: 'More on apps and integrations' },
  },
];
