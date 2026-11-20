// Server component, so the SSR entry is used: the package root is marked
// "use client" and would otherwise pull this page into a client bundle.
import { ArrowLeft } from "@phosphor-icons/react/ssr"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

/**
 * Product 404.
 *
 * Copy is translated per locale (was hardcoded French under /en and /ar). Same
 * composition as the locale 404: the status code in the quiet display numeral,
 * no circular icon medallion.
 */
export default function ProductNotFound() {
  const t = useTranslations("notFound")

  return (
    <>
      <Header />
      <main
        id="main-content"
        className="flex min-h-[70svh] items-center bg-tafc-salt pt-32 pb-24"
      >
        <div className="container-tafc">
          <div className="container-narrow">
            <p
              aria-hidden="true"
              className="font-display text-display leading-none font-normal text-tafc-ink/12 tabular"
            >
              404
            </p>

            <h1 className="mt-6 font-display text-h2 text-balance text-tafc-ink">{t("title")}</h1>

            <p className="mt-6 max-w-md text-deck text-pretty text-tafc-ink/65">
              {t("description")}
            </p>

            <Button asChild size="xl" variant="ink" className="mt-10">
              <Link href="/products">
                <ArrowLeft aria-hidden="true" className="size-4 rtl:rotate-180" />
                {t("back")}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
