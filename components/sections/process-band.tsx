"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"

const STEPS = [
  { key: "landing", image: "/mediterranean-fishing-fleet-boats-harbor-tunisia.jpg" },
  { key: "selection", image: "/seafood-quality-control-inspection-facility-worker.jpg" },
  { key: "coldChain", image: "/industrial-freezing-seafood-packaging-pro.jpg" },
  { key: "delivery", image: "/refrigerated-truck-logistics-export-shipping-conta.jpg" },
] as const

/**
 * "From sea to table" — the process band.
 *
 * The claims the marquee makes (freshness, traceability, cold chain) are shown
 * here as a physical chain instead: landing, selection, cold, delivery. This is
 * the section Mowi and Iceland Seafood both lead with, because a buyer who
 * believes the chain does not need the adjectives.
 *
 * Layout is a numbered editorial list with alternating photo placement — a
 * family nothing else on the homepage uses. No eyebrow (the ranges index and
 * featured rail spend the budget), no cards, no CTA: this band explains, the
 * rail above sells. Photos carry the site grade for coherence, squared off like
 * every other photograph on the site.
 *
 * The numerals are set at display scale in ink at 12% rather than mid-size in
 * accent: large and quiet reads as a reference marker, mid-size and coloured
 * read as decoration competing with the step titles beside them.
 */
export function ProcessBand() {
  const t = useTranslations("process")

  return (
    <SectionShell tone="paper">
      <SectionIntro
        title={t("title")}
        deck={t("description")}
        tone="paper"
        className="max-w-2xl"
      />

      {/* One reveal for the list, not four staggered ones: a reader scrolling a
          four-step chain wants the chain, not four separate arrivals. */}
      <Reveal y={16} className="mt-16">
        <ol className="flex flex-col">
          {STEPS.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <li
                key={step.key}
                className="border-t border-tafc-ink/12 py-10 first:border-t-0 first:pt-0 lg:py-14"
              >
                <div
                  className={[
                    "grid items-center gap-8 lg:grid-cols-12 lg:gap-14",
                    isEven ? "" : "lg:[direction:rtl] lg:[&>*]:[direction:ltr]",
                  ].join(" ")}
                >
                  {/* Photo */}
                  <div className="lg:col-span-5 lg:[direction:inherit]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-tafc-salt">
                      <Image
                        src={step.image}
                        alt={t(`steps.${step.key}.imageAlt`)}
                        fill
                        quality={75}
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="photo-grade object-cover"
                      />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className="lg:col-span-7 lg:[direction:inherit]">
                    <div className="flex items-baseline gap-6 sm:gap-8">
                      <span
                        aria-hidden="true"
                        className="font-display text-display leading-none font-normal text-tafc-ink/12 tabular"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-h2 text-tafc-ink">
                          {t(`steps.${step.key}.title`)}
                        </h3>
                        <p className="mt-3 max-w-xl text-deck text-pretty text-tafc-ink/65">
                          {t(`steps.${step.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </Reveal>
    </SectionShell>
  )
}
