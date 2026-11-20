import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonProductCard } from "@/components/ui/skeleton-bar"

/**
 * Catalogue fallback, shared by two consumers that have to agree: the route-level
 * `app/[locale]/products/loading.tsx` and the `<Suspense>` boundary inside the
 * page itself (the page reads `useSearchParams`, so it needs one).
 *
 * They were separate copies, and the copies had already drifted. Keeping one
 * definition is the only way a fallback stays the same shape as what resolves
 * into it, which is the whole point of a skeleton.
 *
 * Mirrors `ProductsContent` beat for beat: salt hero band, paper trust row,
 * hairline-ruled filter rail, search field, then the default grouped grid.
 */

/** Mirrors `CARD_GRID` in the catalogue page. */
const CARD_GRID = "grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"

export function ProductsSkeleton() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-tafc-salt">
        {/* Hero band. Type and a hairline, no navy block standing in for a
            photograph that is no longer there. */}
        <div className="border-b border-tafc-ink/12 bg-tafc-salt pt-28 pb-14 md:pt-32 md:pb-18">
          <div className="container-tafc">
            <div className="max-w-3xl">
              <SkeletonBar className="h-3 w-28" />
              <div className="mt-6 space-y-3">
                <SkeletonBar className="h-9 w-full md:h-12" />
                <SkeletonBar className="h-9 w-2/3 md:h-12" />
              </div>
              <div className="mt-6 max-w-2xl space-y-2.5">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Trust row. */}
        <div className="border-b border-tafc-ink/12 bg-tafc-paper">
          <div className="container-tafc py-5">
            <SkeletonBar className="h-4 w-64" />
          </div>
        </div>

        <section className="section-y-tight">
          <div className="container-tafc">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-14">
              {/* Filter rail: "all" plus the six ranges, as ruled rows. */}
              <aside className="hidden shrink-0 lg:block lg:w-60">
                <div className="lg:sticky lg:top-28">
                  <SkeletonBar className="mb-4 h-3 w-24" />
                  <div className="border-t border-tafc-ink/12">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="border-b border-tafc-ink/12 py-3">
                        <SkeletonBar className="h-4 w-4/5" />
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="min-w-0 flex-1">
                <div className="mb-10 space-y-4">
                  <SkeletonBar className="h-13 max-w-2xl" />
                  {/* Filter + sort, phones only. */}
                  <div className="flex gap-3 lg:hidden">
                    <SkeletonBar className="h-12 flex-1" />
                    <SkeletonBar className="h-12 flex-1" />
                  </div>
                </div>

                {/* Default view is grouped by range, so the first group's heading
                    is part of the shape. */}
                <SkeletonBar className="mb-10 h-8 w-52" />
                <div className={CARD_GRID}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonProductCard key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
