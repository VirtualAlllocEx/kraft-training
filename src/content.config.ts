import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const uebungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/uebungen' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['aufwaermen', 'passspiel', 'torabschluss', 'spielform', 'halle', 'kondition']),
    image: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { uebungen };
