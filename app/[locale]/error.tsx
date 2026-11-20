"use client"

import { useEffect } from "react"

import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

/**
 * Root error boundary for the locale segment.
 *
 * Copy stays hardcoded English: an error boundary can render before the message
 * bundle is available, so it cannot depend on `next-intl`. The warning triangle
 * in a white circle is gone — a page whose whole job is to say "this failed" does
 * not need a glyph repeating it.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Report to analytics/monitoring once available
    console.error(error)
  }, [error])

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex min-h-[70svh] items-center bg-tafc-salt pt-32 pb-24"
      >
        <div className="container-tafc">
          <div className="container-narrow">
            <p className="eyebrow-rule inline-flex items-center text-eyebrow text-tafc-ink/65 uppercase">
              Error
            </p>

            <h1 className="mt-6 font-display text-h2 text-balance text-tafc-ink">
              Something went wrong
            </h1>

            <p className="mt-6 max-w-md text-deck text-pretty text-tafc-ink/65">
              An unexpected error occurred. Please try again.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button size="xl" variant="ink" onClick={reset}>
                Try again
              </Button>
              <Button asChild size="xl" variant="quiet">
                <Link href="/">Back home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
