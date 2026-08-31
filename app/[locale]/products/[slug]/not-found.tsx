import { Fish, ArrowLeft } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

/**
 * Product 404.
 *
 * Three fixes, no copy changes: it was the last consumer of `tafc-bg-light`,
 * `tafc-border`, `tafc-text-*` and `tafc-coral` (all off the TAFC palette, and
 * `tafc-bg-light` was never even registered as a utility); it used `next/link`,
 * so "Retour au catalogue" dropped the active locale and bounced an Arabic or
 * English visitor onto the default; and the button hand-rolled the coral
 * treatment that `variant="action"` now owns.
 */
export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[70svh] items-center justify-center bg-tafc-shell pt-32 pb-24">
        <div className="container-tafc text-center">
          <span className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-white ring-1 ring-tafc-ink/[0.08]">
            <Fish aria-hidden="true" className="size-9 text-tafc-accent" />
          </span>

          <h1 className="font-display text-h2 text-balance text-tafc-ink">Produit non trouvé</h1>

          <p className="mx-auto mt-5 max-w-md text-deck text-pretty text-tafc-ink/65">
            Le produit que vous recherchez n&apos;existe pas ou a été retiré de notre catalogue.
          </p>

          <Button asChild size="xl" variant="action" className="mt-10">
            <Link href="/products">
              <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
              Retour au catalogue
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
