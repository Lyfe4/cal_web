import { formatPrice, pricing, serviceAreas, type EnquiryPackage } from './site.ts';

export interface WebsitePackage {
  key: Extract<EnquiryPackage, 'starter' | 'professional'>;
  name: string;
  from: number;
  /** One sentence on what it is */
  summary: string;
  bestFor: string;
  /** Shown above the list, e.g. "Everything in Starter, plus:" */
  intro?: string;
  includes: string[];
}

/** The two fixed-price website packages. Prices come from site.ts only. */
export const websitePackages: WebsitePackage[] = [
  {
    key: 'starter',
    name: 'Starter',
    from: pricing.starter.from,
    summary: 'A two-page website that gets a new business online properly.',
    bestFor: 'New businesses and sole traders',
    includes: [
      'Two pages, designed around your business',
      'Works on phones, tablets and desktops',
      'Enquiry form that sends straight to your inbox',
      'Set up to be found on Google: page titles, descriptions and a sitemap',
      "Hosting set up on Netlify's free plan, and the site launched",
      'One round of revisions',
      'Two weeks of support after launch',
    ],
  },
  {
    key: 'professional',
    name: 'Professional',
    from: pricing.professional.from,
    summary: 'A multi-page website with room to show your work, services and reviews.',
    bestFor: 'Established businesses',
    intro: 'Everything in Starter, plus:',
    includes: [
      'Up to seven pages',
      'A more detailed design built around your brand',
      'Custom features such as photo galleries or project filters',
      'Google Business Profile set up for local search',
      'Three rounds of revisions',
      'Two months of support',
    ],
  },
];

/** What "Apps & integrations" covers. Quoted per project, so no prices here. */
export const appsWork: string[] = [
  'The front end of a new web app or internal tool, in React and TypeScript',
  'Integrations: connecting APIs, a CMS, payments, bookings or a CRM',
  'Fixing or improving an existing codebase',
  'Contract frontend work alongside your team',
];

/** How app and contract work is priced. */
export const appsPricing = `${pricing.apps.note}. Contract work by the day, the sprint or the project.`;

/** Extras and support, for the dot-leader spec sheet. */
export const extras = [
  { label: pricing.extraPage.label, value: `${formatPrice(pricing.extraPage.each)} each` },
  { label: pricing.customFeature.label, value: pricing.customFeature.note },
  { label: 'Monthly support', value: `${formatPrice(pricing.support.monthly)}/mo` },
  { label: 'Annual support', value: `${formatPrice(pricing.support.yearly)}/yr` },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'How long does a website take?',
    a: 'Most Starter sites are ready in about a week, and Professional sites in two to three weeks, depending on how quickly content and feedback come through. You get a timeline with the quote.',
  },
  {
    q: 'Do you only work with businesses around Armidale?',
    a: `No. I meet in person around ${serviceAreas.inPerson}, and work remotely with businesses anywhere in Australia by phone, video and email.`,
  },
  {
    q: 'What do you need from me to get started?',
    a: "An idea of what the site needs to do, any logo, photos or wording you already have, and a few sites you like. If you don't have it all yet, I'll help you work it out.",
  },
  {
    q: 'Do you handle hosting and domains?',
    a: "Yes. I set up hosting on Netlify's free plan, so most small sites have no ongoing hosting cost. You own and pay for your domain, and I can help you buy one.",
  },
  {
    q: 'What happens after launch?',
    a: `Each package includes a support period for fixes and small changes. After that, support is optional: ${formatPrice(pricing.support.monthly)} a month or ${formatPrice(pricing.support.yearly)} a year, or ask for changes when you need them.`,
  },
  {
    q: 'Do you take on contract or ongoing development work?',
    a: 'Yes. I work with teams that need frontend help, building features in an existing product or taking on part of a larger project. That work is quoted by the day, the sprint or the project.',
  },
  {
    q: 'How does payment work?',
    a: 'Usually a deposit to start and the balance when the work is done, before launch. Everything is agreed in writing before any work starts.',
  },
];
