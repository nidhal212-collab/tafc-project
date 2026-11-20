import { cn } from "@/lib/utils"

/**
 * Skeleton bars for the route-level `loading.tsx` fallbacks.
 *
 * The vendored shadcn `Skeleton` resolved to `bg-accent` — `oklch(0.97 0 0)`,
 * which is `#f7f7f7`. That is the page ground now (`--tafc-salt` is `#f7f8f8`),
 * so a shadcn skeleton on this site is an invisible rectangle. These two carry
 * the TAFC ink and white at fixed low alphas instead, which reads as a tint of
 * whichever surface it sits on rather than a foreign panel.
 *
 * 2px corners, like every other non-photographic surface in the system.
 */
export function SkeletonBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-sm bg-tafc-ink/[0.07]", className)}
      {...props}
    />
  )
}

/** Same bar, for use on `bg-tafc-ink` surfaces. */
export function SkeletonBarInk({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-sm bg-white/[0.08]", className)}
      {...props}
    />
  )
}

/**
 * Card-shaped placeholder matching `ProductCard`: hairline plate on paper,
 * square `1/1` image well, then the tag / name / spec-line / action stack.
 * Used by the catalogue and product-detail fallbacks so a grid of loading cards
 * occupies exactly the space the real grid will.
 */
export function SkeletonProductCard() {
  return (
    <div className="overflow-hidden rounded-sm border border-tafc-ink/12 bg-tafc-paper">
      <div className="aspect-square animate-pulse bg-tafc-ink/[0.07]" />
      <div className="p-5">
        <SkeletonBar className="h-3 w-24" />
        <SkeletonBar className="mt-3 h-6 w-3/4" />
        <div className="mt-4 space-y-2">
          <SkeletonBar className="h-3 w-full" />
          <SkeletonBar className="h-3 w-2/3" />
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-tafc-ink/12 pt-5">
          <SkeletonBar className="h-3.5 w-28" />
          <SkeletonBar className="h-9 w-28" />
        </div>
      </div>
    </div>
  )
}
