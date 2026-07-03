import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const uebungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/uebungen' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['aufwaermen', 'passspiel', 'torabschluss', 'spielform', 'halle', 'kondition']),
    image: z.string(),
    order: z.preprocess((v) => {
      if (v === null || v === undefined || v === '') return 0;
      if (typeof v === 'string') {
        const n = parseInt(v, 10);
        return Number.isNaN(n) ? 0 : n;
      }
      return v;
    }, z.number().default(0)),
    description: z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().optional()),
    videoUrl: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.string().refine(
        (v) => {
          try {
            const u = new URL(v);
            return u.protocol === 'http:' || u.protocol === 'https:';
          } catch {
            return false;
          }
        },
        'Video-Link muss mit http:// oder https:// beginnen'
      ).optional()
    ),
    duration: z.preprocess(
      (v) => (v === null || v === undefined || v === '' ? undefined : String(v)),
      z.string().optional()
    ),
    playerCount: z.preprocess(
      (v) => (v === null || v === undefined || v === '' ? undefined : String(v)),
      z.string().optional()
    ),
  }),
});

export const collections = { uebungen };
