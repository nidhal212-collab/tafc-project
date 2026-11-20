import { products } from "@/lib/products-data"

export type Category = {
  slug: string
  name: string
  description: string
  image: string
  /**
   * How many catalogue references this range actually holds. Derived, never
   * typed — see `categoryCount` below.
   */
  count: number
}

/**
 * Counts the products filed under a range.
 *
 * These were previously hardcoded display strings — `"12+ produits"`,
 * `"8+ produits"`, `"20+ produits"` — against real totals of 7, 3 and 14. The
 * mollusques range read `"10+ produits"` and holds one. They were also written
 * in French, so `/en` and `/ar` rendered "produits" too.
 *
 * The number now comes from the data, so it cannot drift and cannot overstate.
 * The unit word is supplied by the caller from `productsData.ui.productsCount`.
 */
function categoryCount(slug: string): number {
  return products.filter((product) => product.categorySlug === slug).length
}

const RANGES = [
  {
    slug: "crevettes-crustaces",
    name: "Crevettes & Crustacés",
    description: "Crevettes blanches, rouges, gambas et crustacés de qualité premium méditerranéenne.",
    image: "/giant-prawns-shrimp-on-ice-premium.jpg",
  },
  {
    slug: "calamars-poulpes",
    name: "Calamars & Poulpes",
    description: "Calamars tubes, tentacules, poulpes entiers et préparations de fruits de mer.",
    image: "/fresh-calamari-squid-mediterranean-seafood-ice.jpg",
  },
  {
    slug: "poissons-mediterranee",
    name: "Poissons Méditerranée",
    description: "Bar, dorade, merlan, sardines et poissons nobles de la Méditerranée.",
    image: "/fresh-sea-bream-dorade-fish-on-ice.jpg",
  },
  {
    slug: "saumon-thon",
    name: "Saumon & Thon",
    description: "Filets, pavés et blocs de saumon atlantique et thon de qualité export.",
    image: "/fresh-salmon-fillet-premium-seafood-ice.jpg",
  },
  {
    slug: "caviar-haute-gastronomie",
    name: "Caviar & Haute Gastronomie",
    description: "Caviar d'exception et produits de luxe pour les établissements prestigieux.",
    image: "/luxury-caviar-premium-gourmet-seafood.jpg",
  },
  {
    slug: "oeufs-de-poisson-boutargue",
    name: "Œufs de poisson & Boutargue",
    description: "Œufs de poisson frais, congelés et séchés (boutargue), destinés aux professionnels et à l’export.",
    image: "/fish-roe-boutargue-premium-seafood.jpg",
  },
] as const

export const categories: Category[] = RANGES.map((range) => ({
  ...range,
  count: categoryCount(range.slug),
}))
