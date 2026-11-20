"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight, FileText } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton"
import { SpecLine } from "@/components/ui/spec-line"
import type { Product, TranslatedProduct } from "@/lib/products-data"

interface ProductCardProps {
  product: Product | TranslatedProduct
  index?: number
  /** Teaser mode (homepage catalogue preview): drops the per-card WhatsApp
   *  quote button so the card reads as one quiet tile. The whole card still
   *  links to the product. */
  compact?: boolean
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
 * Four things carry the premium read:
 * 1. **Square `1/1` crop.** One ratio for every product plate on the site — the
 *    listing cards, the featured rail and the detail hero are all 1:1, which is
 *    the standard catalogue ratio and part of why a grid reads as a contact
 *    sheet. Portrait `4/5` was the old crop, but it pushed a single mobile card
 *    past the viewport (image alone ~60vh, whole card over 100vh once the phone
 *    browser chrome is counted); a square plate keeps the editorial weight
 *    without the overrun, and is not landscape, so it never reads as e-commerce.
 * 2. **Whole card is one target.** A stretched absolute anchor covers the card,
 *    so the image, name and "view product" row all activate the same link
 *    without nesting anchors. The WhatsApp quote sits above it as the single
 *    competing action — dropped in `compact` mode so the homepage teaser reads
 *    as one quiet tile.
 * 3. **A specification line.** Origin / chilled-frozen / caliber surfaced at
 *    card level — none of the seven leading exporters does this, and TAFC
 *    already stores the fields, so a buyer can qualify a product without opening
 *    it. It is the site's hairline spec grid at card scale.
 * 4. **A plate, not a floating object.** A hairline border, a 2px corner and no
 *    shadow, so a grid of these reads as a contact sheet rather than as a set of
 *    app tiles lifting off the page on hover.
 */
export function ProductCard({ product, index = 0, compact = false }: ProductCardProps) {
  const t = useTranslations("productsData.ui")
  const tNav = useTranslations("nav")

  const whatsappMessage = encodeURIComponent(
    `${tNav("whatsappMessage")} - ${product.name} (Réf: ${product.id})`
  )

  const showTags =
    product.tags.includes("Premium") || product.tags.includes("Export")

  return (
    <Reveal as="article" delay={index * 0.06} y={20} duration={0.6} className="group h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-tafc-ink/12 bg-tafc-paper transition-colors duration-300 hover:border-tafc-ink/30">
        {/* Stretched anchor: whole-card target, no nested links. */}
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent"
        >
          <span className="sr-only">{product.name}</span>
        </Link>

        {/* ---- Image --------------------------------------------------- */}
        {/* No scrim: nothing sits on the photograph any more, so a gradient over
            it would only be darkening the product. */}
        <div className="relative aspect-square overflow-hidden bg-tafc-salt">
          <ImageWithSkeleton
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="photo-grade object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* ---- Content ------------------------------------------------- */}
        <div className="flex flex-1 flex-col p-5">
          {/* Tags in the data voice, separated by a hairline. Previously two
              filled pills, one of them accent-tinted. */}
          {showTags && (
            <div className="mb-3 flex items-center gap-2.5 text-data text-tafc-ink/60 uppercase">
              {product.tags.includes("Premium") && <span>Premium</span>}
              {product.tags.includes("Premium") && product.tags.includes("Export") && (
                <span aria-hidden="true" className="h-3 w-px bg-tafc-ink/20" />
              )}
              {product.tags.includes("Export") && <span>Export</span>}
            </div>
          )}

          <h3 className="font-display text-h3 text-tafc-ink">{product.name}</h3>

          <SpecLine
            product={{
              origin: product.origin,
              type: formatType(product.type),
              caliber: product.caliber,
            }}
            className="mt-4"
          />

          {/* ---- Actions ----------------------------------------------- */}
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-tafc-ink/12 pt-5">
            {/* Visual affordance only — the stretched card anchor handles it,
                which keeps a single target per card. */}
            <span className="inline-flex items-center gap-1.5 text-meta font-medium text-tafc-ink/70 transition-colors duration-300 group-hover:text-tafc-accent">
              {t("viewProduct")}
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </span>

            {!compact && (
              <Button asChild variant="ink" size="sm" className="relative z-20">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText aria-hidden="true" className="size-3.5" />
                  <span>{t("requestQuote")}</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
