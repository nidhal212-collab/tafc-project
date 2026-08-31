"use client"

import { cn } from "@/lib/utils"

export type SectionTone = "light" | "shell" | "ink"

const TONE_SURFACE: Record<SectionTone, string> = {
    light: "bg-white text-tafc-ink",
    shell: "bg-tafc-shell text-tafc-ink",
    ink: "bg-tafc-ink text-white",
}

export interface SectionShellProps {
    children: React.ReactNode
    /**
     * Surface colour. The homepage alternates ink → light → shell → ink →
     * light → shell → ink so the page reads as deliberate bands rather than
     * ten separately-invented gradients.
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
 * container, which silently kills `position: sticky` on any descendant. Two
 * sections rely on sticky children (the ranges index pane and the featured
 * rail's header column), so they were one CSS property away from breaking.
 */
export function SectionShell({
    children,
    tone = "light",
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
 * uses the teal accent at low opacity; on light surfaces, a neutral rule.
 */
export function SectionRule({ tone = "light" }: { tone?: SectionTone }) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "h-px w-full",
                tone === "ink" ? "bg-tafc-accent/15" : "bg-tafc-ink/10",
            )}
        />
    )
}
