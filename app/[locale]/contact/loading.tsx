import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonBarInk } from "@/components/ui/skeleton-bar"
import { cn } from "@/lib/utils"

/**
 * Contact fallback.
 *
 * Tracks the restyled page: a salt hero band with a hairline, the three direct
 * channels as ruled columns inside one `border-y` block, then the ink location
 * panel plus two social squares beside the quote form. The old version drew
 * soft-cornered cards with icon tiles and a coral submit pill, none of which
 * survives.
 */
export default function ContactLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-tafc-salt">
        {/* ---- Hero band --------------------------------------------------- */}
        <section className="border-b border-tafc-ink/12 bg-tafc-salt pt-28 pb-14 md:pt-32 md:pb-18">
          <div className="container-tafc">
            <div className="max-w-3xl">
              <SkeletonBar className="h-2.5 w-28" />
              <div className="mt-6 space-y-3">
                <SkeletonBar className="h-9 w-3/4 md:h-12" />
                <SkeletonBar className="h-9 w-1/2 md:h-12" />
              </div>
              <div className="mt-6 max-w-xl space-y-2.5">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        </section>

        <div className="container-tafc section-y-tight">
          {/* ---- Three direct channels, as ruled columns ------------------ */}
          <div className="grid border-y border-tafc-ink/12 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col border-b border-tafc-ink/12 py-8 last:border-b-0 md:border-b-0",
                  i > 0 && "md:border-s md:border-tafc-ink/12 md:ps-10"
                )}
              >
                <SkeletonBar className="h-2.5 w-24" />
                <SkeletonBar className="mt-2 h-3.5 w-36" />
                <SkeletonBar className="mt-6 h-6 w-40" />
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-start gap-8 lg:grid-cols-12">
            {/* ---- Location panel + socials ------------------------------ */}
            <div className="space-y-4 lg:col-span-4">
              <div className="bg-tafc-ink p-8 md:p-10">
                <SkeletonBarInk className="h-2.5 w-28" />
                <SkeletonBarInk className="mt-6 h-6 w-36" />
                <div className="mt-4 space-y-2">
                  <SkeletonBarInk className="h-3.5 w-full" />
                  <SkeletonBarInk className="h-3.5 w-4/5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-sm border border-tafc-ink/15 bg-tafc-paper px-5 py-4"
                  >
                    <SkeletonBar className="size-5 shrink-0" />
                    <SkeletonBar className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* ---- Quote form ------------------------------------------- */}
            <div className="lg:col-span-8">
              <div className="rounded-sm border border-tafc-ink/12 bg-tafc-paper p-7 lg:p-10">
                <div className="mb-8 border-b border-tafc-ink/12 pb-6">
                  <SkeletonBar className="h-2.5 w-32" />
                  <SkeletonBar className="mt-6 h-8 w-64 md:h-10" />
                </div>

                <div className="space-y-6">
                  {/* name / company, then email / phone. */}
                  {Array.from({ length: 2 }).map((_, row) => (
                    <div key={row} className="grid gap-6 md:grid-cols-2">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i}>
                          <SkeletonBar className="mb-2 h-2.5 w-20" />
                          <SkeletonBar className="h-12" />
                        </div>
                      ))}
                    </div>
                  ))}
                  <div>
                    <SkeletonBar className="mb-2 h-2.5 w-24" />
                    <SkeletonBar className="min-h-36" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <SkeletonBar className="h-14 w-full sm:w-44" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
