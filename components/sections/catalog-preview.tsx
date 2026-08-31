"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/products-data"
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
 * just lists: white cards, spec chips, no accent colour beyond the tags.
 *
 * Its header carries the count of what is being previewed against the full
 * catalogue (`06 / 32`), which is the one thing a grid of six cards cannot say
 * for itself, and the route through to /products is an arrow link in that header
 * rather than a fourth coral button. `catalog.viewAll` is a link, not a download.
 */
export function CatalogPreview() {
  const t = useTranslations("catalog")
  const previewProducts = products.slice(0, PREVIEW_COUNT)

  return (
    <SectionShell tone="light">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionIntro
          eyebrow={t("badge")}
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
                <span className="text-tafc-ink/35"> / {products.length}</span>
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

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {previewProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </SectionShell>
  )
}
