"use client"

import { useTranslations, useLocale } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"

const MARQUEE_ITEM_KEYS = [
  "premiumQuality",
  "internationalExport",
  "sustainableFishing",
  "guaranteedFreshness",
  "fullTraceability",
  "certifiedProducts",
  "fastDelivery",
]

/**
 * The hero's base rail.
 *
 * Previously a standalone `slate-900` band with a cyan bullet between items,
 * which read as a second section stacked under the hero. Now it shares the
 * hero's navy so the two form a single dark block, with teal hairlines instead
 * of bullets, and it is set in the mono face so the claims sit in the same
 * data layer as the hero manifest bar directly above it. Layout stays forced to
 * `dir="ltr"` — the scroll direction is handled in the animation so RTL reads
 * outward-to-inward, as before.
 */
export function Marquee() {
  const t = useTranslations("marquee")
  const locale = useLocale()
  const isRTL = locale === "ar"
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.08] bg-tafc-ink py-4"
      dir="ltr"
    >
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-tafc-ink to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-tafc-ink to-transparent sm:w-28" />

      <div className="flex overflow-hidden">
        <motion.div
          className="flex flex-nowrap"
          animate={
            reduceMotion ? undefined : { x: isRTL ? ["-25%", "0%"] : ["0%", "-25%"] }
          }
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 32,
              ease: "linear",
            },
          }}
        >
          {/* Four copies so the 25% loop lands seamlessly. */}
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0">
              {MARQUEE_ITEM_KEYS.map((key) => (
                <div key={`${setIndex}-${key}`} className="flex items-center gap-7 px-7">
                  <span className="font-mono text-data whitespace-nowrap text-white/60 uppercase">
                    {t(`items.${key}`)}
                  </span>
                  <span aria-hidden="true" className="h-3 w-px bg-tafc-accent/60" />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
