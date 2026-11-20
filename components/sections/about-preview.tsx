"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { DataLabel } from "@/components/ui/spec"

const PILLAR_KEYS = ["vision", "mission", "whyTafc"] as const

const HIGHLIGHT_KEYS = ["partnership", "modernFleets", "traceability", "standards"] as const

/**
 * Mid-page credibility break, and the first of only two ink bands on the page.
 *
 * Ink used to be the default ground here; now it is an event, so this band has to
 * earn it. It does: this is where a buyer decides whether the company is real.
 *
 * The `15+` / years-of-experience figure is set as display type rather than in a
 * floating badge. Setting hard numerals large is the one device every exporter
 * studied uses to assert scale (Mowi, Nueva Pescanova, Iceland Seafood) — and
 * none of them animates a counter to do it, so the count-up is gone.
 *
 * Icons are gone throughout. The three pillar glyphs (ship, fish, award) and the
 * four check marks sat next to labels that already said the thing; on a dark
 * band they were four more accent-coloured objects competing with the type. The
 * hairlines carry the structure instead.
 *
 * This section also picks up `hero.ctaSecondary` ("Learn more about us"), which
 * the hero rebuild freed up. It previously had no link or button at all, so the
 * page had no route into /about from here.
 */
export function AboutPreview() {
  const t = useTranslations("about")
  const tHero = useTranslations("hero")

  return (
    <SectionShell tone="ink">
      <SectionIntro
        tone="ink"
        title={
          <>
            {t("titlePart1")} <span className="font-medium">{t("tunisia")}</span>{" "}
            {t("and")} <span className="font-medium">{t("algeria")}</span>
          </>
        }
      />

      <div className="mt-16 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ---- Image collage ------------------------------------------- */}
        <Reveal x={-32} y={0} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden bg-tafc-ink-raised">
            <Image
              src="/mediterranean-fishing-boats-harbor-tunisia-sunrise.jpg"
              alt={t("imageAlt.fleet")}
              fill
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="photo-grade object-cover"
            />
          </div>
          {/* One-line functional caption below the photo, not a pill on it. */}
          <p className="mt-3 text-data text-white/60 uppercase">{t("modernFleets")}</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-tafc-ink-raised">
              <Image
                src="/seafood-processing-facility-workers-quality-contro.jpg"
                alt={t("imageAlt.processing")}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="photo-grade object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-tafc-ink-raised">
              <Image
                src="/fresh-fish-market-selection-mediterranean-premium.jpg"
                alt={t("imageAlt.selection")}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="photo-grade object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* ---- Text --------------------------------------------------- */}
        <Reveal x={32} y={0} delay={0.1}>
          <p className="text-deck text-pretty text-white/85">{t("description1")}</p>
          <p className="mt-5 text-deck text-pretty text-white/65">{t("description2")}</p>

          {/* The one hard figure on this band, set as a stat and printed, not
              counted up. Cyan is the marker colour on ink surfaces. */}
          <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-8">
            <span className="font-display text-stat text-tafc-accent-bright tabular">15+</span>
            <DataLabel tone="ink" className="max-w-[11rem]">
              {t("yearsExperience")}
            </DataLabel>
          </div>

          {/* Four claims as ruled rows in the data voice. Previously four teal
              ticks in circles, which is app-UI vocabulary. */}
          <ul className="mt-10 grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {HIGHLIGHT_KEYS.map((key) => (
              <li
                key={key}
                className="border-b border-white/10 py-3.5 text-meta font-medium text-white/80"
              >
                {t(`highlights.${key}`)}
              </li>
            ))}
          </ul>

          <Button asChild size="xl" variant="salt" className="mt-10">
            <Link href="/about">{tHero("ctaSecondary")}</Link>
          </Button>
        </Reveal>
      </div>

      {/* ---- Pillars -------------------------------------------------- */}
      {/* Vision / mission / why is not a sequence, so these carry no numbering.
          The card grid is gone: three rows on a hairline, title beside
          description, reads as a manifesto rather than a feature set. One reveal
          for the block rather than three staggered arrivals. */}
      <Reveal y={16} className="mt-20">
        <div className="border-t border-white/10">
          {PILLAR_KEYS.map((key) => (
            <article
              key={key}
              className="grid gap-2 border-b border-white/10 py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10 lg:grid-cols-[minmax(0,18rem)_1fr]"
            >
              <h3 className="font-display text-h3 text-white">{t(`pillars.${key}.title`)}</h3>
              <p className="text-pretty text-white/65">{t(`pillars.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  )
}
