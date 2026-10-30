import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
      url: z.url(),
      /** One sentence, shown in the project list and as the page description */
      summary: z.string(),
      /** Mono facts shown beside the type, e.g. location or data source */
      tags: z.array(z.string()),
      client: z.string().optional(),
      screenshot: z.object({
        src: image(),
        /** Describe what's on screen and the real data shown, not "screenshot of" */
        alt: z.string(),
      }),
    }),
});

export const collections = { projects };
