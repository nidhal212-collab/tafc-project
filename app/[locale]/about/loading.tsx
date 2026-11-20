import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonBarInk } from "@/components/ui/skeleton-bar"

/**
 * About fallback.
 *
 * Tracks the recomposed page: a bottom-aligned hero over one flat scrim, two
 * editorial left/right blocks (the second on paper), the values index on ink,
 * and the closing vision band. The previous version drew a centred hero and the
 * three-panel expanding gallery, neither of which exists any more.
 */
export default function AboutLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-tafc-salt">
        {/* ---- Hero: photograph under a flat scrim, copy at the bottom ---- */}
        <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-tafc-ink pt-32 pb-16 md:min-h-[85svh] md:pb-20">
          <div className="container-tafc relative">
            <div className="max-w-3xl">
              <SkeletonBarInk className="h-2.5 w-28" />
              <div className="mt-6 space-y-3">
                <SkeletonBarInk className="h-11 w-full md:h-16" />
                <SkeletonBarInk className="h-11 w-2/3 md:h-16" />
              </div>
              <div className="mt-7 max-w-xl space-y-2.5">
                <SkeletonBarInk className="h-4 w-full" />
                <SkeletonBarInk className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </section>

        {/* ---- Presentation: copy left, portrait 3/4 photograph right ----- */}
        <section className="section-y">
          <div className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
              <div className="w-full flex-1">
                <SkeletonBar className="h-2.5 w-32" />
                <div className="mt-6 space-y-3">
                  <SkeletonBar className="h-9 w-3/4 md:h-12" />
                  <SkeletonBar className="h-9 w-1/2 md:h-12" />
                </div>
                <div className="mt-7 max-w-xl space-y-2.5">
                  <SkeletonBar className="h-4 w-full" />
                  <SkeletonBar className="h-4 w-5/6" />
                  <SkeletonBar className="h-4 w-4/6" />
                </div>
                <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 border-t border-tafc-ink/12 pt-7">
                  <SkeletonBar className="h-2.5 w-28" />
                  <SkeletonBar className="h-2.5 w-28" />
                </div>
              </div>
              <div className="w-full flex-1">
                <SkeletonBar className="mx-auto aspect-[3/4] w-full max-w-sm md:max-w-md lg:ms-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* ---- Mission + advantage on paper, photograph flipped left ------ */}
        <section className="border-t border-tafc-ink/12 bg-tafc-paper section-y">
          <div className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row-reverse lg:gap-24">
              <div className="w-full flex-1">
                <div className="mb-14">
                  <SkeletonBar className="h-8 w-2/3 md:h-10" />
                  {/* Accent-hairline quote marker. */}
                  <div className="mt-6 space-y-2.5 border-s border-tafc-accent ps-6">
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-4/5" />
                  </div>
                </div>
                <div>
                  <SkeletonBar className="h-8 w-1/2 md:h-10" />
                  <div className="mt-6 space-y-2.5">
                    <SkeletonBar className="h-4 w-full" />
                    <SkeletonBar className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
              <div className="w-full flex-1">
                <SkeletonBar className="mx-auto aspect-square w-full max-w-sm md:max-w-md lg:me-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* ---- Values: numbered index on ink ------------------------------ */}
        <section className="bg-tafc-ink section-y">
          <div className="container-tafc">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <SkeletonBarInk className="h-10 w-64 md:h-14" />
              <SkeletonBarInk className="h-4 w-72" />
            </div>

            <ol className="mt-16 border-t border-white/10 md:mt-20">
              {Array.from({ length: 3 }).map((_, i) => (
                <li
                  key={i}
                  className="grid gap-x-10 gap-y-5 border-b border-white/10 py-10 md:grid-cols-12 md:py-14"
                >
                  <SkeletonBarInk className="h-3.5 w-6 md:col-span-1" />
                  <div className="md:col-span-4">
                    <SkeletonBarInk className="h-8 w-3/4" />
                    <SkeletonBarInk className="mt-3 h-2.5 w-1/2" />
                  </div>
                  <div className="space-y-2.5 md:col-span-7">
                    <SkeletonBarInk className="h-4 w-full" />
                    <SkeletonBarInk className="h-4 w-5/6" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- Vision: closing ink band ----------------------------------- */}
        <section className="border-t border-white/10 bg-tafc-ink section-y">
          <div className="container-tafc">
            <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <SkeletonBarInk className="h-2.5 w-28" />
                <div className="mt-6 space-y-3">
                  <SkeletonBarInk className="h-10 w-full md:h-14" />
                  <SkeletonBarInk className="h-10 w-2/3 md:h-14" />
                </div>
              </div>
              <div>
                <div className="space-y-2.5">
                  <SkeletonBarInk className="h-4 w-full" />
                  <SkeletonBarInk className="h-4 w-full" />
                  <SkeletonBarInk className="h-4 w-3/4" />
                </div>
                <div className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9">
                  <SkeletonBarInk className="h-14 w-48" />
                  <SkeletonBarInk className="h-4 w-32" />
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
