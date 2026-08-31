"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton"
import { SpecChips } from "@/components/ui/spec-chips"
import type { Product, TranslatedProduct } from "@/lib/products-data"

interface ProductCardProps {
  product: Product | TranslatedProduct
  index?: number
}

const whatsappNumber = "+21698621128"

/** "frais-congele" → "Frais & congele". Presentation only; the data is untouched. */
function formatType(type?: string) {
  if (!type) return undefined
  const spaced = type.replace("-", " & ")
  return spaced.charAt(0).toUpperCase() + spaced.slice(1)
}

/**
 * The one product card, used on the homepage, the listing page and the related
 * rail.
 *
 * Three changes carry most of the premium shift:
 * 1. **Portrait `4/5` crop** instead of `4/3`. Every exporter studied frames
 *    product photography portrait or 2:3 — landscape tiles read as e-commerce.
 * 2. **Whole card is one target.** A stretched absolute anchor covers the card,
 *    so the image, name and "view product" row all activate the same link
 *    without nesting anchors. The WhatsApp quote sits above it as the single
 *    competing action.
 * 3. **Spec chips.** Origin / chilled-frozen / caliber surfaced at card level —
 *    none of the seven leading exporters does this, and TAFC already stores the
 *    fields, so a buyer can qualify a product without opening it.
 */
export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const t = useTranslations("productsData.ui")
  const tNav = useTranslations("nav")

  const whatsappMessage = encodeURIComponent(
    `${tNav("whatsappMessage")} - ${product.name} (Réf: ${product.id})`
  )

  return (
    <Reveal as="article" delay={index * 0.06} y={20} duration={0.6} className="group h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-tafc-ink/10 bg-white transition-[border-color,box-shadow] duration-500 hover:border-tafc-accent/45 hover:shadow-[0_26px_60px_-34px_rgba(4,38,53,0.45)]">
        {/* Stretched anchor: whole-card target, no nested links. */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent"
        >
          <span className="sr-only">{product.name}</span>
        </Link>

        {/* ---- Image --------------------------------------------------- */}
        <div className="relative aspect-[4/5] overflow-hidden bg-tafc-shell">
          <ImageWithSkeleton
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-tafc-ink/55 via-tafc-ink/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95"
          />

          <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
            {product.tags.includes("Premium") && (
              <span className="rounded-full bg-tafc-ink/90 px-2.5 py-1 text-eyebrow text-white uppercase backdrop-blur-sm">
                Premium
              </span>
            )}
            {product.tags.includes("Export") && (
              <span className="rounded-full bg-tafc-accent px-2.5 py-1 text-eyebrow text-tafc-ink uppercase">
                Export
              </span>
            )}
          </div>
        </div>

        {/* ---- Content ------------------------------------------------- */}
        <div className="flex flex-1 flex-col p-5">
          {product.latinName && (
            <p className="mb-1.5 text-meta text-tafc-ink/45 italic">
              {product.latinName}
            </p>
          )}

          <h3 className="font-display text-h3 text-tafc-ink transition-colors duration-300 group-hover:text-tafc-accent">
            {product.name}
          </h3>

          <SpecChips
            product={{
              origin: product.origin,
              type: formatType(product.type),
              caliber: product.caliber,
              formats: product.formats,
            }}
            className="mt-4"
          />

          {/* ---- Actions ----------------------------------------------- */}
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-tafc-ink/[0.07] pt-5">
            {/* Visual affordance only — the stretched card anchor handles it,
                which keeps a single target per card. */}
            <span className="inline-flex items-center gap-1.5 text-meta font-medium text-tafc-ink/60 transition-colors duration-300 group-hover:text-tafc-accent">
              {t("viewProduct")}
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </span>

            <Button asChild variant="ink" size="sm" className="relative z-20 rounded-full">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText aria-hidden="true" className="size-3.5" />
                <span>{t("requestQuote")}</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
