import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonProductCard } from "@/components/ui/skeleton-bar"

/**
 * Product detail fallback.
 *
 * Follows the rewritten view: square hairline photograph with the origin/type
 * `<dl>` beneath it, then title block, deck, CTAs, the two ruled spec lists and
 * the variant row, closing on the related rail. Breadcrumb stays on `top-20` to
 * match the header's `h-20`/`h-18`, and the mobile CTA bar is reserved with the
 * same `pb-24` the real page uses so the last spec row is never hidden under it.
 */
export default function ProductDetailLoading() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-tafc-salt pb-24 md:pb-0">
        {/* ---- Breadcrumb rail --------------------------------------------- */}
        <nav className="sticky top-20 z-30 hidden border-b border-tafc-ink/12 bg-tafc-salt/85 backdrop-blur-xl md:block">
          <div className="container-tafc flex h-12 items-center gap-3">
            <SkeletonBar className="h-2.5 w-16" />
            <SkeletonBar className="size-2.5" />
            <SkeletonBar className="h-2.5 w-20" />
            <SkeletonBar className="size-2.5" />
            <SkeletonBar className="h-2.5 w-28" />
          </div>
        </nav>

        <main className="container-tafc pt-24 pb-12 md:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* ---- Photograph + origin/type ----------------------------- */}
            <div className="h-fit space-y-5 lg:sticky lg:top-36">
              <div className="aspect-square animate-pulse border border-tafc-ink/12 bg-tafc-ink/[0.07]" />

              {/* Desktop origin / type, as one ruled two-cell dl. */}
              <div className="hidden grid-cols-2 border-t border-tafc-ink/12 lg:grid">
                <div className="pt-4">
                  <SkeletonBar className="h-2.5 w-16" />
                  <SkeletonBar className="mt-2 h-6 w-28" />
                </div>
                <div className="border-s border-tafc-ink/12 ps-5 pt-4">
                  <SkeletonBar className="h-2.5 w-14" />
                  <SkeletonBar className="mt-2 h-6 w-24" />
                </div>
              </div>
            </div>

            {/* ---- Details ---------------------------------------------- */}
            <div className="flex flex-col gap-8">
              <div>
                <SkeletonBar className="h-2.5 w-28" />
                <SkeletonBar className="mt-6 h-10 w-4/5 md:h-14" />
                <SkeletonBar className="mt-2 h-6 w-1/2" />
                <SkeletonBar className="mt-5 h-2.5 w-36" />
              </div>

              <div className="space-y-2.5">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
                <SkeletonBar className="h-4 w-4/6" />
              </div>

              {/* Mobile origin / type. */}
              <div className="grid grid-cols-2 border-t border-tafc-ink/12 lg:hidden">
                <div className="pt-4">
                  <SkeletonBar className="h-2.5 w-16" />
                  <SkeletonBar className="mt-2 h-6 w-24" />
                </div>
                <div className="border-s border-tafc-ink/12 ps-5 pt-4">
                  <SkeletonBar className="h-2.5 w-14" />
                  <SkeletonBar className="mt-2 h-6 w-20" />
                </div>
              </div>

              {/* Desktop CTAs. The WhatsApp button keeps its green here so the
                  bar does not change colour when the page resolves. */}
              <div className="hidden gap-4 md:flex">
                <SkeletonBar className="h-14 flex-1 bg-[#25D366]/25" />
                <SkeletonBar className="h-14 flex-1" />
              </div>

              {/* Usage + packaging, as ruled lists. */}
              <div className="grid gap-8 border-t border-tafc-ink/12 pt-8 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, col) => (
                  <div key={col}>
                    <SkeletonBar className="mb-4 h-2.5 w-40" />
                    <ul className="border-t border-tafc-ink/12">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className="border-b border-tafc-ink/12 py-3">
                          <SkeletonBar className="h-3.5 w-4/5" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Variant row. */}
              <div>
                <SkeletonBar className="mb-4 h-2.5 w-36" />
                <div className="flex flex-wrap gap-2.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonBar key={i} className="h-11 w-28" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- Related rail ------------------------------------------ */}
          <section className="mt-24 border-t border-tafc-ink/12 pt-16 md:mt-32">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <SkeletonBar className="h-2.5 w-24" />
                <SkeletonBar className="mt-6 h-8 w-56 md:h-10" />
              </div>
              <SkeletonBar className="h-4 w-28" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          </section>
        </main>

        {/* ---- Mobile CTA bar ---------------------------------------------- */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-tafc-ink/12 bg-tafc-salt/85 p-4 backdrop-blur-xl md:hidden">
          <SkeletonBar className="h-12 flex-1 bg-[#25D366]/25" />
          <SkeletonBar className="h-12 flex-1" />
        </div>
      </div>
      <Footer />
    </>
  )
}
