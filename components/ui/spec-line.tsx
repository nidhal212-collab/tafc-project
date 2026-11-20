"use client"

import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import type { SectionTone } from "@/components/ui/section-shell"

/**
 * Loose shape so this works with both `Product` and `TranslatedProduct` from
 * `lib/products-data.ts` without coupling to either. No data-architecture
 * change — these fields already exist on every product.
 */
export interface SpecLineSource {
    origin?: string
    type?: string
    caliber?: string
}

export interface SpecLineProps {
    product: SpecLineSource
    tone?: SectionTone
    /** Cap the number of entries so cards stay on a single or double row. */
    max?: number
    className?: string
}

/**
 * Compact B2B specification line: origin, chilled/frozen and caliber.
 *
 * This is the deliberate point of difference. Of the seven leading seafood
 * exporters studied, none surfaces per-card specification data — buyers have to
 * open a product or a PDF to learn origin, grade or pack format. TAFC surfaces
 * the three fields that qualify a product at a glance; pack format
 * (conditioning) is left to the detail page, where the full list has room.
 *
 * It used to render as rounded chips with an icon each, which is app-UI
 * vocabulary: four pills of four different glyphs, on a card that already had a
 * pill radius. It is now a hairline `<dl>` — uppercase label over a `.tabular`
 * value, ruled — which is the same specification-grid device as the featured-
 * rail cards and the product-detail tables. One device at three scales is what
 * makes it read as the site's language.
 */
export function SpecLine({ product, tone = "salt", max = 3, className }: SpecLineProps) {
    const t = useTranslations("productsData.ui")
    const isInk = tone === "ink"

    const entries = [
        product.origin && { label: t("origin"), value: product.origin },
        product.type && { label: t("type"), value: product.type },
        product.caliber && { label: t("caliber"), value: product.caliber },
    ]
        .filter((entry): entry is { label: string; value: string } => Boolean(entry))
        .slice(0, max)

    if (entries.length === 0) return null

    return (
        <dl
            className={cn(
                "grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4",
                isInk ? "border-white/10" : "border-tafc-ink/12",
                className,
            )}
        >
            {entries.map(({ label, value }) => (
                <div key={label} className="min-w-0">
                    <dt
                        className={cn(
                            "text-data uppercase",
                            isInk ? "text-white/60" : "text-tafc-ink/60",
                        )}
                    >
                        {label}
                    </dt>
                    <dd
                        className={cn(
                            "mt-1 truncate text-meta font-medium",
                            isInk ? "text-white/85" : "text-tafc-ink/80",
                        )}
                        title={value}
                    >
                        {value}
                    </dd>
                </div>
            ))}
        </dl>
    )
}
