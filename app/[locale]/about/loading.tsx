import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonBarInk } from "@/components/ui/skeleton-bar"

/**
 * About fallback.
 *
 * This file used to hand-roll its own fake header and footer instead of
 * importing the real ones — the only route that did, so its shell disagreed with
 * every other page. It uses the actual `Header` / `Footer` now, which also means
 * the nav does not visibly rebuild when the page resolves.
 */
export default function AboutLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero — same `85vh` / `95vh` as the real parallax section. */}
        <section className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden bg-tafc-ink md:h-[95vh]">
          <div className="container-tafc relative z-10 mt-16 text-center md:mt-0">
            <div className="mx-auto max-w-2xl space-y-5">
              <SkeletonBarInk className="mx-auto h-14 w-3/4 md:h-24" />
              <SkeletonBarInk className="mx-auto h-12 w-1/2 bg-tafc-accent/15 md:h-20" />
              <div className="space-y-2 pt-6">
                <SkeletonBarInk className="mx-auto h-4 w-full max-w-md" />
                <SkeletonBarInk className="mx-auto h-4 w-2/3" />
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-24 bg-white pt-20 pb-24 md:space-y-36 md:pt-32">
          {/* Presentation — editorial left/right. */}
          <section className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
              <div className="w-full flex-1 space-y-6">
                <SkeletonBar className="h-3 w-32 rounded-full" />
                <div className="space-y-3">
                  <SkeletonBar className="h-11 w-3/4" />
                  <SkeletonBar className="h-11 w-1/2" />
                </div>
                <div className="space-y-3 pt-2">
                  <SkeletonBar className="h-4 w-full" />
                  <SkeletonBar className="h-4 w-5/6" />
                  <SkeletonBar className="h-4 w-4/6" />
                </div>
                <div className="flex gap-8 border-t border-tafc-ink/[0.08] pt-7">
                  <SkeletonBar className="h-3 w-28" />
                  <SkeletonBar className="h-3 w-28" />
                </div>
              </div>
              <div className="w-full flex-1">
                <SkeletonBar className="mx-auto aspect-[3/4] w-full max-w-sm rounded-2xl md:max-w-md" />
              </div>
            </div>
          </section>

          {/* Mission & advantage — editorial right/left. */}
          <section className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row-reverse lg:gap-24">
              <div className="w-full flex-1 space-y-12">
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-5">
                    <SkeletonBar className="h-9 w-2/3" />
                    <div className="space-y-2">
                      <SkeletonBar className="h-4 w-full" />
                      <SkeletonBar className="h-4 w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full flex-1">
                <SkeletonBar className="mx-auto aspect-square w-full max-w-sm rounded-2xl md:max-w-md" />
              </div>
            </div>
          </section>

          {/* Values — the expanding gallery band. */}
          <section className="overflow-hidden bg-tafc-ink py-24 md:py-32">
            <div className="container-tafc mb-16">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <SkeletonBarInk className="h-11 w-56" />
                <SkeletonBarInk className="h-4 w-64" />
              </div>
            </div>
            <div className="container-tafc flex h-[600px] flex-col gap-4 md:flex-row">
              {[1, 2, 3].map((i) => (
                <SkeletonBarInk key={i} className="h-[400px] flex-1 rounded-2xl md:h-full" />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
