import { cn } from "@/lib/utils"

/**
 * The spec/data layer.
 *
 * A seafood export enquiry is answered with a spec line — species, origin,
 * chilled or frozen, caliber, pack format — and that vocabulary is the one thing
 * TAFC's page can carry that a generic "premium producer" template cannot. These
 * two primitives set that voice in mono so it reads as catalogue data rather
 * than marketing copy, and they are the only place the mono face is introduced.
 *
 * `SpecChips` (components/ui/spec-chips.tsx) is the card-level version of the
 * same idea; these are the page-level version.
 */

export interface DataLabelProps {
    children: React.ReactNode
    /** `ink` for dark surfaces, `light` for white/shell. */
    tone?: "ink" | "light"
    className?: string
}

/** Small tracked mono label. Precedes a value; never used alone as body copy. */
export function DataLabel({ children, tone = "light", className }: DataLabelProps) {
    return (
        <span
            className={cn(
                "block font-mono text-data uppercase",
                tone === "ink" ? "text-white/45" : "text-tafc-ink/45",
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

/** Label-over-value pair. The unit the hero manifest bar is built from. */
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
