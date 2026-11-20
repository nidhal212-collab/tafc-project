import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:duration-150 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',

        /* ---- TAFC design system -------------------------------------------
           There is no coloured CTA. A solid near-black rectangle on an off-white
           page is what a premium house actually ships, and it is what let the
           second competing accent (coral, with a coral glow) be deleted outright.
           Both fills measure 17.8:1, so they clear AA at any size.

           `ink` is the primary on light surfaces, `salt` the primary on ink.
           Exactly one of them appears per surface; the outline pair is the
           secondary. WhatsApp green is the only other fill on the site and it is
           scoped to WhatsApp actions. */
        /** Solid navy. THE primary CTA on salt/paper surfaces. */
        ink: 'bg-tafc-ink text-white hover:bg-tafc-ink-raised focus-visible:ring-tafc-ink/25',
        /** Solid white. THE primary CTA on ink surfaces. */
        salt: 'bg-white text-tafc-ink hover:bg-white/88 focus-visible:ring-white/40',
        /** Hairline outline, for use on ink surfaces. */
        onInk:
          'border border-white/25 bg-transparent text-white hover:border-tafc-accent-bright hover:text-tafc-accent-bright focus-visible:ring-tafc-accent-bright/40',
        /** Hairline outline, for use on salt/paper surfaces. */
        onLight:
          'border border-tafc-ink/15 bg-transparent text-tafc-ink hover:border-tafc-accent hover:text-tafc-accent focus-visible:ring-tafc-accent/30',
        /** Text-only secondary action. Pair with a translating arrow icon. */
        quiet:
          'text-current hover:text-tafc-accent [&_svg]:transition-transform hover:[&_svg]:translate-x-1 focus-visible:ring-tafc-accent/40',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 px-6 has-[>svg]:px-4',
        /** Premium CTA size. Square, not pill — the radius comes from the
            single 2px token, so it matches every other surface on the page. */
        xl: 'h-14 px-9 text-base has-[>svg]:px-8',
        /** No padding — for `quiet` text links that sit inline with copy. */
        inline: 'h-auto p-0 text-base',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'icon-xl': 'size-12',
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
