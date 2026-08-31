import { Header } from "@/components/layout/header"
import { SkeletonBar, SkeletonBarInk } from "@/components/ui/skeleton-bar"

/**
 * Homepage fallback. Mirrors the rebuilt order — full-bleed ink hero
 * (`min-h-svh`) → marquee rail → light Categories band — so the shell that
 * appears matches what resolves into it.
 */
export default function HomeLoading() {
  return (
    <>
      <Header />
      <main>
        {/* Hero: full-bleed ink, same `min-h-svh` as the real section. */}
        <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-tafc-ink">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 start-1/4 size-[36rem] rounded-full bg-tafc-accent/[0.07] blur-[120px]"
          />
          <div className="container-tafc relative z-10 py-32">
            <div className="max-w-3xl space-y-8">
              <SkeletonBarInk className="h-3 w-40 rounded-full" />
              <div className="space-y-4">
                <SkeletonBarInk className="h-14 w-3/4 md:h-20" />
                <SkeletonBarInk className="h-14 w-2/3 bg-tafc-accent/15 md:h-20" />
                <SkeletonBarInk className="h-14 w-1/2 md:h-20" />
              </div>
              <div className="max-w-2xl space-y-3 pt-2">
                <SkeletonBarInk className="h-4 w-full" />
                <SkeletonBarInk className="h-4 w-4/5" />
              </div>
              {/* One coral CTA + one quiet link, matching the real hero. */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <SkeletonBarInk className="h-13 w-52 rounded-full bg-tafc-action/25" />
                <SkeletonBarInk className="h-4 w-36" />
              </div>
            </div>
          </div>
        </section>

        {/* Marquee rail. */}
        <div className="flex items-center gap-10 overflow-hidden border-b border-white/[0.08] bg-tafc-ink py-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonBarInk key={i} className="h-3 w-32 shrink-0" />
          ))}
        </div>

        {/* Categories: light band, centred intro, portrait 4/5 cards. */}
        <section className="section-y bg-white">
          <div className="container-tafc">
            <div className="mx-auto mb-14 max-w-2xl space-y-5 text-center">
              <SkeletonBar className="mx-auto h-3 w-32 rounded-full" />
              <SkeletonBar className="mx-auto h-10 w-72" />
              <SkeletonBar className="mx-auto h-4 w-full max-w-md" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonBar key={i} className="aspect-[4/5] rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
