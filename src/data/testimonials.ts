export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Owner, LenBuild" */
  role: string;
  /** Slug of the project it's about, linking to /work/<slug> */
  project?: string;
}

/**
 * Real testimonials only, quoted with permission. The home page renders the
 * section, and numbers it, only when this list isn't empty.
 */
export const testimonials: Testimonial[] = [];
