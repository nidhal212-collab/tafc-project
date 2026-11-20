import { getTranslations } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"

/**
 * Locale-aware 404 for any route that falls through inside /[locale].
 * Previously invalid locales and paths rendered Next's default 404.
 *
 * The decorative fish in a white circle is gone. The status code set large and
 * quiet in the display voice is the same numeral device the ranges index and the
 * process band use, so even the error pages speak the site's language.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound")

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
              <Link href="/">{t("backHome")}</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
