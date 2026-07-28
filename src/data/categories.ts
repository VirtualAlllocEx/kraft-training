/** Single source of truth for exercise categories (nav, pages, schema enum). */
export const CATEGORIES = [
  { slug: 'aufwaermen', name: 'Aufwärmen' },
  { slug: 'passspiel', name: 'Passspiel' },
  { slug: 'torabschluss', name: 'Torabschluss' },
  { slug: 'spielform', name: 'Spielform' },
  { slug: 'halle', name: 'Halle' },
  { slug: 'kondition', name: 'Kondition' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CATEGORY_SLUGS: CategorySlug[] = CATEGORIES.map((c) => c.slug);

export const categoryMap: Record<CategorySlug, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.name]),
) as Record<CategorySlug, string>;
