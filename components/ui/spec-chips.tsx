"use client"

import { useTranslations } from "next-intl"
import { MapPin, Snowflake, Ruler, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SectionTone } from "@/components/ui/section-shell"

/**
 * Loose shape so this works with both `Product` and `TranslatedProduct` from
 * `lib/products-data.ts` without coupling to either. No data-architecture
 * change — these fields already exist on every product.
 */
export interface SpecChipsSource {
    origin?: string
    type?: string
    caliber?: string
    formats?: string[]
}

export interface SpecChipsProps {
    product: SpecChipsSource
    tone?: SectionTone
    /** Cap the number of chips so cards stay on a single or double row. */
    max?: number
    className?: string
}

/**
 * Compact B2B spec chips: origin, chilled/frozen, caliber, pack format.
 *
 * This is the deliberate point of difference. Of the seven leading seafood
 * exporters studied, none surfaces per-card specification data — buyers have to
 * open a product or a PDF to learn origin, grade or pack format. TAFC already
 * stores all four fields, so showing them at card level answers a purchasing
 * question before the buyer has to ask it.
 */
export function SpecChips({ product, tone = "light", max = 3, className }: SpecChipsProps) {
    const t = useTranslations("productsData.ui")
    const isInk = tone === "ink"

    const chips = [
        product.origin && { icon: MapPin, label: t("origin"), value: product.origin },
        product.type && { icon: Snowflake, label: t("type"), value: product.type },
        product.caliber && { icon: Ruler, label: t("caliber"), value: product.caliber },
        product.formats?.[0] && {
            icon: Package,
            label: t("packaging"),
            value: product.formats[0],
        },
    ]
        .filter((chip): chip is { icon: typeof MapPin; label: string; value: string } =>
            Boolean(chip),
        )
        .slice(0, max)

    if (chips.length === 0) return null

    return (
        <ul className={cn("flex flex-wrap gap-1.5", className)}>
            {chips.map(({ icon: Icon, label, value }) => (
                <li
                    key={label}
                    title={`${label}: ${value}`}
                    className={cn(
                        "inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-meta font-medium",
                        isInk
                            ? "bg-white/[0.06] text-white/75 ring-1 ring-inset ring-white/10"
                            : "bg-tafc-ink/[0.04] text-tafc-ink/70 ring-1 ring-inset ring-tafc-ink/[0.07]",
                    )}
                >
                    <Icon
                        aria-hidden="true"
                        className="size-3 shrink-0 text-tafc-accent"
                        strokeWidth={2.25}
                    />
                    <span className="truncate">{value}</span>
                </li>
            ))}
        </ul>
    )
}
