"use client"

import { useTranslations } from "next-intl"

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
 * The claim ticker.
 *
 * It sat on navy, sharing the old hero's ground so the two read as one dark
 * block. With a salt hero there is nothing to share: a 51px navy stripe between
 * two light bands would be a hard interruption for no reason. So it becomes a
 * ruled salt ticker — hairline above and below, ink type in the data voice,
 * accent hairlines between items — which also keeps it visually distinct from
 * the split hero directly above it.
 *
 * The loop is pure CSS: one keyframe translating the track by exactly one set
 * width (25% of four duplicated sets), which is cheaper than a JS loop, pauses
 * on hover for a reader who wants a claim, and is neutralised wholesale by the
 * global reduced-motion rule. Layout stays forced to `dir="ltr"`; RTL flips the
 * keyframe direction instead.
 */
export function Marquee() {
  const t = useTranslations("marquee")

  return (
    <section
      className="group relative overflow-hidden border-b border-tafc-ink/12 bg-tafc-salt py-4"
      dir="ltr"
    >
      {/* Fade edges, in the ground colour so the track dissolves rather than
          being cut off at the gutter. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-tafc-salt to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-tafc-salt to-transparent sm:w-28" />

      <div className="flex overflow-hidden">
        <div
          className="animate-marquee flex flex-nowrap group-hover:[animation-play-state:paused] rtl:[animation-direction:reverse]"
          style={{ animationDuration: "48s" }}
        >
          {/* Four copies so the 25% loop lands seamlessly. */}
          {[...Array(4)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0" aria-hidden={setIndex > 0 || undefined}>
              {MARQUEE_ITEM_KEYS.map((key) => (
                <div key={`${setIndex}-${key}`} className="flex items-center gap-7 px-7">
                  <span className="text-data whitespace-nowrap text-tafc-ink/65 uppercase">
                    {t(`items.${key}`)}
                  </span>
                  <span aria-hidden="true" className="h-3 w-px bg-tafc-accent/50" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
