import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',

        /* ---- TAFC design system -------------------------------------------
           Coral is reserved for the primary call to action and nothing else,
           so `action` should be the only filled coral button on any screen. */
        action:
          'bg-tafc-action text-white shadow-lg shadow-tafc-action/20 hover:bg-tafc-action-dark hover:shadow-tafc-action/30 hover:-translate-y-0.5 focus-visible:ring-tafc-action/40',
        /** Navy fill, for dark actions on light surfaces. */
        ink: 'bg-tafc-ink text-white hover:bg-tafc-ink-raised hover:-translate-y-0.5 focus-visible:ring-tafc-ink/30',
        /** Outline for use on navy surfaces. */
        onInk:
          'border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-tafc-accent/60 hover:bg-white/10 focus-visible:ring-tafc-accent/40',
        /** Outline for use on white/shell surfaces. */
        onLight:
          'border border-tafc-ink/15 bg-white text-tafc-ink hover:border-tafc-accent hover:text-tafc-accent focus-visible:ring-tafc-accent/40',
        /** Text-only secondary action. Pair with a translating arrow icon. */
        quiet:
          'text-current hover:text-tafc-accent [&_svg]:transition-transform hover:[&_svg]:translate-x-1 focus-visible:ring-tafc-accent/40',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        /** Premium CTA size. Replaces the ad-hoc `px-8 py-6 rounded-full`
            override that used to be appended at ~15 call sites. */
        xl: 'h-13 rounded-full px-8 text-base has-[>svg]:px-7',
        /** No padding — for `quiet` text links that sit inline with copy. */
        inline: 'h-auto p-0 text-base',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'icon-xl': 'size-12 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
