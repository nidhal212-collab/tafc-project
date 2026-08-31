"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

import { SkeletonBar } from "@/components/ui/skeleton-bar"

export function LoadingSpinner({
    size = "md",
    className = "",
}: {
    size?: "sm" | "md" | "lg"
    className?: string
}) {
    const sizeClasses = {
        sm: "size-4",
        md: "size-8",
        lg: "size-12",
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                className={`${sizeClasses[size]} relative`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute inset-0 rounded-full border-2 border-tafc-accent/20" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-tafc-accent" />
            </motion.div>
        </div>
    )
}

export function LoadingDots({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center gap-1.5 ${className}`}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="size-2 rounded-full bg-tafc-accent"
                    initial={{ opacity: 0.3, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    )
}

export function LoadingPulse({ className = "" }: { className?: string }) {
    return (
        <div
            aria-hidden="true"
            className={`h-full w-full animate-pulse bg-tafc-ink/[0.07] ${className}`}
        />
    )
}

/**
 * The brand splash. `LoadingProvider` holds this for a fixed 2000ms on every
 * initial load, so it is the first thing every visitor sees.
 *
 * It used to be `bg-slate-50` — a near-white panel that then cut straight to a
 * navy hero, so every page began with a white→navy flash. It is navy now, which
 * matches the first band of all four routes and makes the hand-off invisible.
 * The logo stays inside a white tile on purpose: `/logo.png` is bright cyan with
 * a navy outline and a navy wave stripe, both of which flatten into a navy
 * background.
 */
export function AppLoadingScreen() {
    const reduceMotion = useReducedMotion()

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-tafc-ink">
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-12"
            >
                {/* Two teal rings breathing outward, ~2s apart. */}
                {!reduceMotion &&
                    [0, 0.5].map((delay) => (
                        <motion.div
                            key={delay}
                            aria-hidden="true"
                            className="absolute -inset-8 rounded-full border border-tafc-accent/25"
                            initial={{ scale: 0.85, opacity: 0.5 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
                        />
                    ))}

                <div className="relative flex size-28 items-center justify-center rounded-3xl bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:size-32">
                    <Image
                        src="/logo.png"
                        alt="TAFC"
                        width={96}
                        height={96}
                        priority
                        className="size-20 object-contain sm:size-24"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center"
            >
                <p className="font-display text-3xl font-bold tracking-tight text-white">TAFC</p>
                <div
                    aria-hidden="true"
                    className="mx-auto my-3 h-px w-12 bg-gradient-to-r from-transparent via-tafc-accent to-transparent"
                />
                <p className="text-eyebrow text-tafc-accent uppercase">Premium Seafood</p>
            </motion.div>
        </div>
    )
}

/**
 * Generic page fallback. The route-level `loading.tsx` files are the ones the
 * router actually renders; this is kept as a neutral catch-all.
 */
export function PageLoadingSkeleton() {
    return (
        <div className="min-h-screen bg-tafc-shell">
            <div className="flex h-20 items-center justify-between border-b border-tafc-ink/[0.06] bg-white px-6">
                <SkeletonBar className="h-8 w-24" />
                <div className="flex gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <SkeletonBar key={i} className="h-4 w-16" />
                    ))}
                </div>
            </div>

            <div className="container-tafc section-y-tight">
                <SkeletonBar className="mb-12 h-[25rem] rounded-2xl" />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="space-y-4">
                            <SkeletonBar className="aspect-[4/5] rounded-2xl" />
                            <SkeletonBar className="h-4 w-3/4" />
                            <SkeletonBar className="h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
