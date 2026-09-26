import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** ISO date. Used for ordering and the <time> element. */
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Optional: defaults to /writing */
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    /** Renders larger in the writing index. Use for the piece you're proudest of. */
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
