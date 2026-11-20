"use client"

import { cn } from "@/lib/utils"

export type SectionTone = "salt" | "paper" | "ink"

const TONE_SURFACE: Record<SectionTone, string> = {
    salt: "bg-tafc-salt text-tafc-ink",
    paper: "bg-tafc-paper text-tafc-ink",
    ink: "bg-tafc-ink text-white",
}

export interface SectionShellProps {
    children: React.ReactNode
    /**
     * Surface colour. Salt is the default ground; paper is a half-step lighter
     * for sections that need to read as a raised plane; ink appears exactly
     * twice on the homepage plus the footer, so a dark band still means
     * something when it arrives.
     */
    tone?: SectionTone
    /** Set false to opt out of `.container-tafc` for full-bleed content. */
    contained?: boolean
    tight?: boolean
    id?: string
    className?: string
    /** Classes for the inner container (only when `contained`). */
    innerClassName?: string
}

/**
 * Wraps a page section: owns the surface colour and the vertical rhythm so
 * neither is re-decided per section. Padding comes from `.section-y` and
 * width from `.container-tafc`, both defined in `app/globals.css`.
 *
 * `overflow-clip` rather than `overflow-hidden`: hidden establishes a scroll
 * container, which silently kills `position: sticky` on any descendant. The
 * ranges index pane relies on a sticky child, so it was one CSS property away
 * from breaking.
 */
export function SectionShell({
    children,
    tone = "salt",
    contained = true,
    tight = false,
    id,
    className,
    innerClassName,
}: SectionShellProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative isolate overflow-clip",
                TONE_SURFACE[tone],
                tight ? "section-y-tight" : "section-y",
                className,
            )}
        >
            {contained ? (
                <div className={cn("container-tafc", innerClassName)}>{children}</div>
            ) : (
                children
            )}
        </section>
    )
}

/**
 * A hairline divider for stacking two same-tone sections. On ink surfaces it
 * uses the bright accent at low opacity; on light surfaces, a neutral rule.
 */
export function SectionRule({ tone = "salt" }: { tone?: SectionTone }) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "h-px w-full",
                tone === "ink" ? "bg-tafc-accent-bright/15" : "bg-tafc-ink/10",
            )}
        />
    )
}
