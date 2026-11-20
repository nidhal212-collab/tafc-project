import { Header } from "@/components/layout/header"
import { SkeletonBar } from "@/components/ui/skeleton-bar"

/**
 * Homepage fallback.
 *
 * Mirrors the rebuilt order — editorial split hero on salt, the ruled ticker,
 * then the ranges index on paper. The old version drew a full-bleed navy hero
 * with a coral pill, which is the one thing the homepage no longer has; a
 * fallback that disagrees with the page is worse than none, because the
 * reader watches the layout rebuild itself.
 *
 * Same `calc(100svh-5rem)` and the same `ps-[max(...)]` gutter as the real
 * hero, so the copy column starts on the container edge here too and nothing
 * shifts sideways when the page resolves.
 */
export default function HomeLoading() {
  return (
    <>
      <Header />
      <main>
        {/* ---- Hero: split, salt, photograph bleeding off the outer edge ---- */}
        <section className="relative isolate bg-tafc-salt">
          <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center px-6 pt-14 pb-16 lg:order-1 lg:pt-28 lg:pb-24 lg:pe-16 lg:ps-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]">
              {/* Headline, two lines. */}
              <div className="space-y-3">
                <SkeletonBar className="h-11 w-full md:h-16" />
                <SkeletonBar className="h-11 w-4/5 md:h-16" />
              </div>
              <div className="measure mt-7 space-y-2.5">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-3/4" />
              </div>
              {/* One solid ink CTA plus one quiet link. */}
              <div className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9">
                <SkeletonBar className="h-14 w-48" />
                <SkeletonBar className="h-4 w-32" />
              </div>
            </div>

            <div className="order-1 h-[38svh] min-h-[280px] animate-pulse bg-tafc-ink/[0.07] lg:order-2 lg:h-auto lg:min-h-0" />
          </div>
        </section>

        {/* ---- Claim ticker ------------------------------------------------ */}
        <div className="flex items-center gap-14 overflow-hidden border-b border-tafc-ink/12 bg-tafc-salt px-7 py-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBar key={i} className="h-2.5 w-32 shrink-0" />
          ))}
        </div>

        {/* ---- Ranges index on paper --------------------------------------- */}
        <section className="section-y bg-tafc-paper">
          <div className="container-tafc">
            <div className="max-w-2xl space-y-5">
              <SkeletonBar className="h-2.5 w-28" />
              <SkeletonBar className="h-9 w-72 md:h-11" />
              <SkeletonBar className="h-4 w-full max-w-md" />
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
              {/* Sticky pane. */}
              <div className="hidden lg:col-span-5 lg:block">
                <div className="aspect-[4/5] animate-pulse bg-tafc-ink/[0.07]" />
              </div>

              {/* Six ruled rows: numeral, phone thumbnail, name. */}
              <div className="lg:col-span-7">
                <ul className="border-t border-tafc-ink/12">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-4 border-b border-tafc-ink/12 py-7 sm:gap-6"
                    >
                      <SkeletonBar className="h-3.5 w-6 shrink-0" />
                      <SkeletonBar className="size-16 shrink-0 lg:hidden" />
                      <SkeletonBar className="h-5 w-2/5" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
