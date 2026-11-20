"use client"

import { useState, useCallback } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
    skeletonClassName?: string
}

/**
 * LQIP placeholder + soft fade-in — the pattern every competitor site uses, so
 * the behaviour is kept as-is. Only the placeholder colour changed: the sweep
 * was `slate-200 → slate-100 → slate-200`, a cool grey that belongs to no TAFC
 * surface and flashed noticeably lighter than the salt band it sits on. It now
 * carries the ink at the same low alphas as `SkeletonBar`, so the placeholder
 * reads as a tint of the page rather than a foreign panel.
 *
 * Both call sites (`ProductCard`, the product-detail gallery) are on light
 * surfaces. `skeletonClassName` is the escape hatch if one ever lands on navy.
 */

export function ImageWithSkeleton({
    className,
    skeletonClassName,
    alt,
    ...props
}: ImageWithSkeletonProps) {
    const [isLoading, setIsLoading] = useState(true)

    const handleLoad = useCallback(() => {
        setIsLoading(false)
    }, [])

    return (
        <>
            {/* Skeleton/Shimmer effect - uses absolute positioning from parent */}
            {isLoading && (
                <div
                    className={cn(
                        "absolute inset-0 z-10 animate-shimmer bg-gradient-to-r from-tafc-ink/[0.09] via-tafc-ink/[0.04] to-tafc-ink/[0.09] bg-[length:200%_100%]",
                        skeletonClassName
                    )}
                    aria-hidden="true"
                />
            )}

            {/* Actual image */}
            <Image
                {...props}
                alt={alt}
                className={cn(
                    "transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                onLoad={handleLoad}
            />
        </>
    )
}
