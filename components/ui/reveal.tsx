"use client"

import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

const TAGS = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    header: motion.header,
    li: motion.li,
    span: motion.span,
} as const

export interface RevealProps {
    children: React.ReactNode
    className?: string
    /** Seconds to wait before animating. For grids, pass `index * 0.06`. */
    delay?: number
    /** Distance travelled on the Y axis, in px. Pass 0 for a pure fade. */
    y?: number
    /** Distance travelled on the X axis, in px. Positive = from the right. */
    x?: number
    duration?: number
    /** Portion of the element that must be visible before firing. */
    amount?: "some" | "all" | number
    as?: keyof typeof TAGS
}

/**
 * The single scroll-reveal primitive for the whole site.
 *
 * Generalised from the original `components/sections/categories-motion.tsx`
 * (which is now a thin wrapper around this). Fires once, respects
 * `prefers-reduced-motion` by rendering the final state immediately rather
 * than snapping mid-animation.
 */
export function Reveal({
    children,
    className,
    delay = 0,
    y = 24,
    x = 0,
    duration = 0.7,
    amount = 0.15,
    as = "div",
}: RevealProps) {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, amount })
    const reduceMotion = useReducedMotion()

    // Cast to ElementType: the TAGS union would otherwise collapse the ref type
    // into an intersection of every element type (HTMLDivElement & HTMLLIElement…).
    const Tag = TAGS[as] as React.ElementType

    if (reduceMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <Tag
            ref={ref}
            className={cn(className)}
            initial={{ opacity: 0, transform: `translate(${x}px, ${y}px)` }}
            animate={inView ? { opacity: 1, transform: "translate(0px, 0px)" } : undefined}
            transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
        >
            {children}
        </Tag>
    )
}
