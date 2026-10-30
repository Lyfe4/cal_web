import { formatPrice, pricing } from './site.ts';

export interface Service {
  /** Anchor on /services */
  id: string;
  name: string;
  summary: string;
  includes: string[];
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
      'Contact form that lands in your inbox',
      'Page titles, descriptions and a sitemap for search',
      'Hosting and your domain set up for you',
    ],
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
      'Fixing or improving an existing codebase',
      'Contract work alongside your team',
    ],
    price: pricing.apps.note,
    link: { href: '/services#apps', label: 'More on apps and integrations' },
  },
];
