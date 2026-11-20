import { cn } from "@/lib/utils"

/**
 * The spec/data layer — the page's signature device.
 *
 * A seafood export enquiry is answered with a spec line — species, origin,
 * chilled or frozen, caliber, pack format — and that vocabulary is the one thing
 * TAFC's page can carry that a generic "premium producer" template cannot. So it
 * is not a garnish here: an uppercase tracked label over a tabular value, ruled
 * with logical hairlines, is the structural grammar of every band on the site,
 * from the ranges index down to a product card.
 *
 * This used to be set in JetBrains Mono, the site's third font family. The voice
 * does not actually come from the monospace face: it comes from the uppercase,
 * the 0.1em tracking and the tabular figures. So the family is gone and the
 * voice stayed.
 *
 * `SpecLine` (components/ui/spec-line.tsx) is the card-level version of the
 * same idea; these are the page-level version.
 */

export interface DataLabelProps {
    children: React.ReactNode
    /** `ink` for dark surfaces, `light` for salt/paper. */
    tone?: "ink" | "light"
    className?: string
}

/** Small tracked label. Precedes a value; never used alone as body copy. */
export function DataLabel({ children, tone = "light", className }: DataLabelProps) {
    return (
        <span
            className={cn(
                "block text-data uppercase",
                // 65% is the muted floor: 5.05:1 on salt, 5.13:1 on paper,
                // 7.34:1 on ink. These were at 45%, which failed 4.5:1 on every
                // surface — and every spec label on the site comes through here.
                tone === "ink" ? "text-white/65" : "text-tafc-ink/65",
                className,
            )}
        >
            {children}
        </span>
    )
}

export interface SpecStatProps {
    label: string
    /** Short value: a figure (`32`), a pair (`Tunisia · Algeria`), a state. */
    value: React.ReactNode
    tone?: "ink" | "light"
    /**
     * `stat` sets the value as a large tabular numeral — for hard figures only.
     * `text` keeps it at body size, for values that are words.
     */
    size?: "stat" | "text"
    className?: string
}

/** Label-over-value pair. The unit the site's specification grids are built from. */
export function SpecStat({
    label,
    value,
    tone = "light",
    size = "text",
    className,
}: SpecStatProps) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <DataLabel tone={tone}>{label}</DataLabel>
            <span
                className={cn(
                    size === "stat"
                        ? "font-display text-stat tabular"
                        : "font-display text-h3 font-medium",
                    tone === "ink" ? "text-white" : "text-tafc-ink",
                )}
            >
                {value}
            </span>
        </div>
    )
}
