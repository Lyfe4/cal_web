export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export interface CaseSection {
  id: string;
  title: string;
  /** The section's rendered HTML, without its own heading */
  html: string;
}

const h2 = /<h2\b[^>]*>[\s\S]*?<\/h2>/g;

/**
 * Splits a case study's rendered Markdown into one section per `## ` heading,
 * so the page can give each the numbered section head and place screenshots
 * beside it. Titles come from the heading metadata rather than the HTML, so
 * entities like "it&#x27;s" never need decoding here.
 */
export const splitCaseSections = (html: string, headings: Heading[]): CaseSection[] => {
  const [intro = '', ...bodies] = html.split(h2);
  const titles = headings.filter((h) => h.depth === 2);

  if (intro.trim()) {
    throw new Error('Case study text must start with a "## " section heading.');
  }
  if (titles.length !== bodies.length) {
    throw new Error(`Found ${bodies.length} sections but ${titles.length} "## " headings.`);
  }

  return titles.map((heading, i) => ({
    id: heading.slug,
    title: heading.text,
    html: (bodies[i] ?? '').trim(),
  }));
};
