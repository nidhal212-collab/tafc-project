import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar } from "@/components/ui/skeleton-bar"

/**
 * Product detail fallback.
 *
 * Two things were wrong beyond the palette: it drew a `bg-slate-900` "price
 * block", and TAFC never shows prices — the page is quote-driven, so that block
 * has no counterpart in the real view. And the breadcrumb rail was pinned to
 * `top-[80px]` as a literal while the header is now `h-20`/`h-18`; both use
 * `top-20` so they stay in sync.
 */
export default function ProductDetailLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-tafc-shell">
        {/* Breadcrumb rail. */}
        <nav className="sticky top-20 z-30 hidden border-b border-tafc-ink/[0.08] bg-white/85 backdrop-blur-md md:block">
          <div className="container-tafc flex h-12 items-center gap-3">
            <SkeletonBar className="h-3 w-20" />
            <SkeletonBar className="size-3" />
            <SkeletonBar className="h-3 w-24" />
            <SkeletonBar className="size-3" />
            <SkeletonBar className="h-3 w-32" />
          </div>
        </nav>

        <main className="container-tafc py-8 md:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image column. */}
            <div className="space-y-4 lg:sticky lg:top-36">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-tafc-ink/[0.08]">
                <div className="absolute inset-0 animate-pulse bg-tafc-ink/[0.07]" />
                <div className="absolute start-6 top-6 flex gap-2">
                  <SkeletonBar className="h-6 w-20 rounded-full bg-tafc-ink/15" />
                  <SkeletonBar className="h-6 w-16 rounded-full bg-tafc-ink/15" />
                </div>
              </div>

              {/* Origin / type panels. */}
              <div className="hidden grid-cols-2 gap-3 lg:grid">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="space-y-2 rounded-xl border border-tafc-ink/[0.08] bg-white p-4"
                  >
                    <SkeletonBar className="h-3 w-14" />
                    <SkeletonBar className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Detail column. */}
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <SkeletonBar className="h-3 w-28 rounded-full" />
                <SkeletonBar className="h-12 w-4/5 md:h-16" />
                <SkeletonBar className="h-5 w-1/3" />
                <SkeletonBar className="h-3 w-24" />
              </div>

              <div className="space-y-2">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
                <SkeletonBar className="h-4 w-4/6" />
              </div>

              {/* Mobile origin / type. */}
              <div className="grid grid-cols-2 gap-3 lg:hidden">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="space-y-2 rounded-xl border border-tafc-ink/[0.08] bg-white p-3.5"
                  >
                    <SkeletonBar className="h-3 w-12" />
                    <SkeletonBar className="h-4 w-20" />
                  </div>
                ))}
              </div>

              {/* Variant pills. */}
              <div className="space-y-3">
                <SkeletonBar className="h-3 w-24" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3].map((i) => (
                    <SkeletonBar key={i} className="h-10 w-24 rounded-full" />
                  ))}
                </div>
              </div>

              {/* CTAs. */}
              <div className="hidden gap-3 sm:flex">
                <SkeletonBar className="h-13 flex-1 rounded-full bg-[#25D366]/20" />
                <SkeletonBar className="h-13 flex-1 rounded-full" />
              </div>

              <div className="h-px bg-tafc-ink/[0.08]" />

              {/* Usage + packaging spec rows. */}
              <div className="grid gap-8 md:grid-cols-2">
                {[1, 2].map((col) => (
                  <div key={col} className="space-y-4">
                    <SkeletonBar className="h-5 w-36" />
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <SkeletonBar
                          key={i}
                          className="h-12 rounded-xl border border-tafc-ink/[0.08] bg-white"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related products. */}
          <section className="mt-20 border-t border-tafc-ink/[0.08] pt-14 md:mt-28">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="space-y-3">
                <SkeletonBar className="h-3 w-24 rounded-full" />
                <SkeletonBar className="h-9 w-56" />
              </div>
              <SkeletonBar className="h-4 w-28" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
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
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Mobile fixed CTA bar. */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-tafc-ink/[0.08] bg-white/95 p-3 backdrop-blur-md sm:hidden">
          <SkeletonBar className="h-12 flex-1 rounded-full bg-[#25D366]/20" />
          <SkeletonBar className="h-12 flex-1 rounded-full" />
        </div>
      </div>
      <Footer />
    </>
  )
}
