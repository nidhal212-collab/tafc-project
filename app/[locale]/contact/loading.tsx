import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SkeletonBar, SkeletonBarInk } from "@/components/ui/skeleton-bar"

/**
 * Contact fallback. Tracks the restyled page: `bg-white` (it was `bg-slate-200`,
 * a flat grey nothing on the site uses), an ink hero band with the same
 * `pt-32 pb-16` paddings, and the three method cards sitting in normal flow
 * rather than floating on a `-mt-12` overlap.
 */
export default function ContactLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero band. */}
        <section className="relative isolate overflow-hidden bg-tafc-ink pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container-tafc">
            <div className="max-w-3xl space-y-6">
              <SkeletonBarInk className="h-11 w-2/3 md:h-14" />
              <SkeletonBarInk className="h-4 w-full max-w-xl" />
            </div>
          </div>
        </section>

        <div className="container-tafc section-y-tight">
          {/* Three contact methods. */}
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-tafc-ink/10 bg-white p-7">
                <SkeletonBar className="mb-6 size-12 rounded-xl" />
                <SkeletonBar className="h-6 w-40" />
                <SkeletonBar className="mt-3 h-3 w-28" />
                <SkeletonBar className="mt-6 h-6 w-36" />
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-start gap-8 lg:grid-cols-12">
            {/* Location panel + socials. */}
            <div className="space-y-5 lg:col-span-4">
              <div className="rounded-2xl bg-tafc-ink p-8 text-center">
                <SkeletonBarInk className="mx-auto mb-5 size-14 rounded-full" />
                <SkeletonBarInk className="mx-auto h-6 w-32" />
                <SkeletonBarInk className="mx-auto mt-3 h-3 w-24" />
                <div className="mt-5 space-y-2">
                  <SkeletonBarInk className="mx-auto h-3 w-full max-w-[16rem]" />
                  <SkeletonBarInk className="mx-auto h-3 w-4/5 max-w-[13rem]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-tafc-ink/10 bg-white p-6"
                  >
                    <SkeletonBar className="size-10 rounded-full" />
                    <SkeletonBar className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quote form. */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-tafc-ink/10 bg-white p-7 lg:p-10">
                <div className="mb-8 space-y-4 border-b border-tafc-ink/[0.08] pb-6">
                  <SkeletonBar className="h-3 w-32 rounded-full" />
                  <SkeletonBar className="h-9 w-64" />
                </div>

                <div className="space-y-6">
                  {[1, 2].map((row) => (
                    <div key={row} className="grid gap-6 md:grid-cols-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="space-y-2">
                          <SkeletonBar className="h-3 w-20" />
                          <SkeletonBar className="h-12 rounded-xl" />
                        </div>
                      ))}
                    </div>
                  ))}
                  <div className="space-y-2">
                    <SkeletonBar className="h-3 w-24" />
                    <SkeletonBar className="min-h-36 rounded-xl" />
                  </div>
                  <div className="flex justify-end pt-2">
                    <SkeletonBar className="h-13 w-44 rounded-full bg-tafc-action/20" />
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
