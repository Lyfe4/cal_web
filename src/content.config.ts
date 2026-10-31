import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * The case study's sections, in page order. Each is a `## ` heading in the
 * project's Markdown; Result is left out until there's something verifiable to say.
 */
export const caseSections = ['the-brief', 'what-i-built', 'how-its-built', 'result'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      name: z.string(),
      /** Display order on the home page; 1 is the featured project */
      order: z.number().int().positive(),
      /** The kind of work, e.g. "Client website", "Web app" */
      type: z.string(),
      status: z.enum(['live', 'in progress']),
      /** One plain line on what's coming next, shown under an "in progress" status */
      upNext: z.string().optional(),
      /** I still look after it, shown in the spec table */
      maintained: z.boolean().default(false),
      url: z.url(),
      /** One sentence, shown in the project list and under the case study's name */
      summary: z.string(),
      /** Mono facts shown beside the type, e.g. location or data source */
      tags: z.array(z.string()),
      client: z.string().optional(),
      /** The year the work started */
      year: z.number().int().min(2020),
      /** Main technologies, in the order a reader would recognise them */
      stack: z.array(z.string()).min(1),
      /** Public source code, if any */
      source: z.url().optional(),
      /** The case study's <title> and meta description */
      seo: z.object({
        title: z.string(),
        description: z.string().max(160),
      }),
      screenshot: z.object({
        src: image(),
        /** Describe what's on screen and the real data shown, not "screenshot of" */
        alt: z.string(),
      }),
      /** More real views, each framed beside the section it helps explain */
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            section: z.enum(caseSections),
          })
        )
        .default([]),
    }),
});

export const collections = { projects };
