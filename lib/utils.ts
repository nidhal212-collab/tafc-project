import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * The site's type scale is registered in `app/globals.css` as custom `--text-*`
 * steps (`text-display`, `text-h1`, `text-data`, `text-stat`, …). tailwind-merge
 * knows nothing about them, and because it resolves an unrecognised `text-*`
 * value to the *text-colour* group, any component that combined a step with a
 * colour in one `cn()` call silently lost the step:
 *
 *   cn("text-data", "text-white/45")  ->  "text-white/45"
 *
 * That hit every header, eyebrow and spec label on the site through
 * `SectionIntro`, `Eyebrow`, `DataLabel` and `SpecStat` — the type scale existed
 * in CSS but never reached the elements. Declaring the steps as font sizes is
 * the fix; add any new `--text-*` token here as well.
 */
const TYPE_STEPS = [
  'display',
  'h1',
  'h2',
  'h3',
  'deck',
  'meta',
  'eyebrow',
  'data',
  'stat',
  'index',
] as const

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...TYPE_STEPS] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
