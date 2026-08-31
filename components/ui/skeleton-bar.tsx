import { cn } from "@/lib/utils"

/**
 * Skeleton bars for the route-level `loading.tsx` fallbacks.
 *
 * The shadcn `Skeleton` resolves to `bg-accent` — `oklch(0.97 0 0)`, a
 * near-white neutral. That reads fine on white, disappears on the `tafc-shell`
 * band and is plain wrong on navy, which is why the previous fallbacks reached
 * for `slate-100`…`slate-700` and drifted off-palette. These two carry the TAFC
 * ink at fixed alphas so a fallback looks the same on every surface.
 */
export function SkeletonBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-tafc-ink/[0.07]", className)}
      {...props}
    />
  )
}

/** Same bar, for use on `bg-tafc-ink` surfaces. */
export function SkeletonBarInk({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-white/[0.08]", className)}
      {...props}
    />
  )
}
