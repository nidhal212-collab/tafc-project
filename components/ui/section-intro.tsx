"use client"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/ui/reveal"
import type { SectionTone } from "@/components/ui/section-shell"

export interface SectionIntroProps {
    /** Small uppercase kicker above the title. Rendered with an accent hairline. */
    eyebrow?: string
    /**
     * Section title. Accepts a node so callers can wrap part of it in a
     * `<span className="font-medium">` for emphasis — same family, same colour.
     * Colour is not an emphasis mechanism here; the accent is a hairline.
     */
    title: React.ReactNode
    /** Short supporting paragraph under the title. */
    deck?: string
    /** Optional CTA rendered under the deck (start-aligned) or centred. */
    action?: React.ReactNode
    tone?: SectionTone
    align?: "start" | "center"
    /** Heading level. Only page heroes should use `h1`. */
    as?: "h1" | "h2"
    /** Size step. `display` is hero-only. */
    size?: "display" | "h1" | "h2"
    className?: string
}

/**
 * The eyebrow → title → deck → CTA block that opens every section.
 *
 * This is the most consistently repeated pattern across the seafood exporters
 * studied (Iceland Seafood, Royal Greenland, Mowi, seafood.no): a small
 * uppercase kicker, a large display title, a short deck, and at most one CTA.
 * Repeating one recipe is what makes the page read as confident rather than
 * busy — so every section header on the site goes through here rather than
 * inventing its own sizes.
 *
 * The eyebrow is rationed. Ten sections allow at most three, and the homepage
 * ships two: it is a label for a thing that needs labelling, not decoration
 * stapled to every band.
 */
export function SectionIntro({
    eyebrow,
    title,
    deck,
    action,
    tone = "salt",
    align = "start",
    as: Heading = "h2",
    size = "h2",
    className,
}: SectionIntroProps) {
    const isInk = tone === "ink"
    const isCentered = align === "center"

    return (
        <Reveal
            className={cn(
                "flex flex-col",
                isCentered ? "items-center text-center" : "items-start text-start",
                className,
            )}
        >
            {eyebrow && (
                <span
                    className={cn(
                        "eyebrow-rule mb-6 inline-flex items-center text-eyebrow uppercase",
                        // The deep marine accent is invisible on navy and the
                        // bright cyan measures 1.9:1 on salt, so the hairline
                        // and the text both switch by surface.
                        // /65 is the muted floor on light — 5.05:1 on salt.
                        isInk
                            ? "eyebrow-rule-ink text-tafc-accent-bright"
                            : "text-tafc-ink/65",
                    )}
                >
                    {eyebrow}
                </span>
            )}

            <Heading
                className={cn(
                    "font-display text-balance",
                    size === "display" && "text-display",
                    size === "h1" && "text-h1",
                    size === "h2" && "text-h2",
                    isInk ? "text-white" : "text-tafc-ink",
                )}
            >
                {title}
            </Heading>

            {deck && (
                <p
                    className={cn(
                        "mt-6 measure text-deck text-pretty",
                        isInk ? "text-white/65" : "text-tafc-ink/65",
                    )}
                >
                    {deck}
                </p>
            )}

            {action && <div className="mt-10">{action}</div>}
        </Reveal>
    )
}

/**
 * Standalone eyebrow, for the handful of places that need the kicker without a
 * full intro block (product detail breadcrumb area).
 */
export function Eyebrow({
    children,
    tone = "salt",
    className,
}: {
    children: React.ReactNode
    tone?: SectionTone
    className?: string
}) {
    return (
        <span
            className={cn(
                "eyebrow-rule inline-flex items-center text-eyebrow uppercase",
                tone === "ink"
                    ? "eyebrow-rule-ink text-tafc-accent-bright"
                    : "text-tafc-ink/65",
                className,
            )}
        >
            {children}
        </span>
    )
}
