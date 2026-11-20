import { ProductsSkeleton } from "@/components/ui/products-skeleton"

/**
 * Catalogue fallback. The shape lives in one place and is shared with the page's
 * own `<Suspense>` boundary, so the two cannot drift apart.
 */
export default function ProductsLoading() {
  return <ProductsSkeleton />
}
