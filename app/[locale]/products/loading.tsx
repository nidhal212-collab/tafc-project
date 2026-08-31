import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonBarInk } from "@/components/ui/skeleton-bar"

const CARD_GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"

/**
 * Catalog fallback. The previous version drew a split two-column hero, which no
 * longer exists — the catalog hero is a single ink band now, and the cards are
 * portrait `aspect-[4/5]` rather than `aspect-[4/3]`.
 */
export default function ProductsLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-tafc-shell">
        {/* Hero band — same paddings as the real one, so nothing shifts. */}
        <section className="relative isolate overflow-hidden bg-tafc-ink pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-tafc">
            <div className="max-w-3xl space-y-6">
              <SkeletonBarInk className="h-3 w-32 rounded-full" />
              <div className="space-y-3">
                <SkeletonBarInk className="h-10 w-3/4 md:h-14" />
                <SkeletonBarInk className="h-10 w-1/2 bg-tafc-accent/15 md:h-14" />
              </div>
              <div className="max-w-2xl space-y-2">
                <SkeletonBarInk className="h-4 w-full" />
                <SkeletonBarInk className="h-4 w-5/6" />
              </div>
              {/* Trust line. */}
              <div className="border-t border-white/15 pt-6">
                <SkeletonBarInk className="h-3 w-56" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-y-tight">
          <div className="container-tafc">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-14">
              {/* Sidebar filters. */}
              <aside className="hidden shrink-0 lg:block lg:w-60">
                <div className="space-y-3 lg:sticky lg:top-28">
                  <SkeletonBar className="h-3 w-24" />
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonBar key={i} className="h-11 w-full rounded-lg" />
                  ))}
                </div>
              </aside>

              <div className="min-w-0 flex-1">
                {/* Search pill. */}
                <SkeletonBar className="mb-10 h-13 max-w-2xl rounded-full" />

                <div className={CARD_GRID}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl border border-tafc-ink/[0.08] bg-white"
                    >
                      <div className="aspect-[4/5] animate-pulse bg-tafc-ink/[0.07]" />
                      <div className="space-y-4 p-5">
                        <SkeletonBar className="h-3 w-20" />
                        <SkeletonBar className="h-5 w-3/4" />
                        <div className="flex gap-2">
                          <SkeletonBar className="h-6 w-20 rounded-full" />
                          <SkeletonBar className="h-6 w-24 rounded-full" />
                        </div>
                        <div className="flex items-center justify-between border-t border-tafc-ink/[0.06] pt-4">
                          <SkeletonBar className="h-4 w-24" />
                          <SkeletonBar className="h-9 w-28 rounded-full" />
                        </div>
                      </div>
                    </div>
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
