import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const uebungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/uebungen' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['aufwaermen', 'passspiel', 'torabschluss', 'spielform', 'halle', 'kondition']),
    image: z.string(),
    order: z.preprocess((v) => (v === null || v === undefined || v === '' ? 0 : v), z.number().default(0)),
    description: z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().optional()),
    videoUrl: z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().optional()),
    duration: z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().optional()),
    playerCount: z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().optional()),
  }),
});

export const collections = { uebungen };
