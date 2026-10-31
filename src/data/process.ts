import { formatPrice, pricing, serviceAreas } from './site.ts';

export interface Step {
  name: string;
  detail: string;
}

/** How a project runs, start to finish. One person throughout: no account managers. */
export const process: Step[] = [
  {
    name: 'Call',
    detail: `We talk through what you need, by phone or video, or in person ${serviceAreas.inPerson}. You're talking to the person who will build it.`,
  },
  {
    name: 'Quote',
    detail:
      'I send a written quote that says what is included and what it costs, before any work starts.',
  },
  {
    name: 'Build',
    detail:
      'You see the site on a private preview link as it comes together, and your feedback comes straight to me.',
  },
  {
    name: 'Launch',
    detail:
      "I set up hosting on Netlify's free plan, connect your domain and check everything on real phones before it goes live. You own and pay for the domain; I can help you buy it.",
  },
  {
    name: 'Support',
    detail: `Updates, fixes and small changes for ${formatPrice(pricing.support.monthly)} a month or ${formatPrice(pricing.support.yearly)} a year. Optional.`,
  },
];
