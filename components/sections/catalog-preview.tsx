"use client"

import { useTranslations, useMessages } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "@phosphor-icons/react"
import { products, getTranslatedProducts } from "@/lib/products-data"
import { ProductCard } from "@/components/ui/product-card"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { DataLabel } from "@/components/ui/spec"

const PREVIEW_COUNT = 6

/**
 * Catalogue grid — the third and last product showcase, and deliberately the
 * quietest. The ranges index navigates, the featured rail sells, and this one
 * just lists: paper cards on salt, a hairline spec line, no colour.
 *
 * Its header carries the count of what is being previewed against the full
 * catalogue (`06 / 32`), which is the one thing a grid of six cards cannot say
 * for itself. Two quiet routes lead to /products — a count-anchored link in the
 * header and an outline "see more" button under the grid — neither a solid fill,
 * so this stays the calmest of the three showcases. The cards run in `compact`
 * mode (no per-card quote button) and two-up on mobile, which keeps each plate
 * to a teaser size rather than a full-height photo.
 */
export function CatalogPreview() {
  const t = useTranslations("catalog")
  const messages = useMessages()
  const translations = messages.productsData as unknown as Parameters<typeof getTranslatedProducts>[1]
  const previewProducts = getTranslatedProducts(products.slice(0, PREVIEW_COUNT), translations)

  return (
    <SectionShell tone="salt">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionIntro
          title={t("title")}
          deck={t("description")}
          className="max-w-2xl"
        />

        <Reveal delay={0.08} className="shrink-0 lg:pb-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 lg:flex-col lg:items-start">
            <div>
              <DataLabel>{t("references")}</DataLabel>
              <p className="mt-2 font-display text-h3 text-tafc-ink tabular">
                {String(PREVIEW_COUNT).padStart(2, "0")}
                <span className="text-tafc-ink/65"> / {products.length}</span>
              </p>
            </div>

            <Button
              asChild
              size="inline"
              variant="quiet"
              className="font-medium text-tafc-ink/70 rtl:hover:[&_svg]:-translate-x-1"
            >
              <Link href="/products">
                {t("viewAll")}
                <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3 lg:gap-10">
        {previewProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} compact />
        ))}
      </div>

      {/* Explicit route to the full shop. The header link is the quiet,
          count-anchored version; this is the plain "there is more" affordance a
          scanning visitor expects at the foot of a teaser grid. Outline, not a
          solid fill, so the section keeps its accent-free weight. */}
      <div className="mt-12 flex justify-center lg:mt-16">
        <Button asChild variant="onLight" size="lg">
          <Link href="/products">
            {t("seeMore")}
            <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  )
}
