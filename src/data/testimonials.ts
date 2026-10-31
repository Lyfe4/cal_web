export interface Testimonial {
  /** Word for word from the source, including its punctuation; never edited or shortened */
  quote: string;
  /** The reviewer's name exactly as the source shows it */
  name: string;
  /** Who they are, e.g. "LenBuild, Guyra NSW" */
  from: string;
  /** Where it was published, linked so anyone can check it */
  source: { label: string; href: string };
  /** Stated in text, never as star icons */
  rating?: { value: number; max: number };
  /** Slug of the project it's about, linking to /work/<slug> */
  project?: string;
}

/** The Google Business Profile for Calvin R Development, by its stable place ID. */
export const googleProfileUrl = 'https://www.google.com/maps?cid=11741284259708591017';

/**
 * Real testimonials only. The home page renders the section, and numbers it,
 * only when this list isn't empty. No Review or AggregateRating schema: Google
 * treats reviews a business publishes about itself as ineligible for rich results.
 */
export const testimonials: Testimonial[] = [
  {
    // Google review on the Calvin R Development profile, copied 31 Oct 2026.
    // "stress‑free" uses a non-breaking hyphen (U+2011), as Google shows it.
    quote:
      'We are extremely pleased with the website Calvin developed for us. From the beginning, we had very little understanding of how to create a website, but Calvin made the entire process simple and stress‑free. His communication, expertise, and attention to detail were outstanding. The finished website is modern, functional, and exactly what we needed. We highly recommend Calvin’s services.',
    name: 'Dan',
    from: 'LenBuild, Guyra NSW',
    source: { label: 'Google review', href: googleProfileUrl },
    rating: { value: 5, max: 5 },
    project: 'lenbuild',
  },
];

/**
 * Splits a quote after its first sentence, so the opening can be set large and
 * the rest at lede size. Joining the parts with a space gives back the quote.
 */
export const splitLead = (quote: string): { lead: string; rest: string } => {
  const match = /^(.+?[.!?])\s+(\S[\s\S]*)$/.exec(quote);
  return match ? { lead: match[1] ?? quote, rest: match[2] ?? '' } : { lead: quote, rest: '' };
};
