"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Ship, Fish, Award, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { DataLabel } from "@/components/ui/spec"

/** Icons only — the three per-pillar gradients and three different icon colours
 *  were part of the accent sprawl. One accent, applied consistently. */
const PILLARS = [
  { key: "vision", icon: Ship },
  { key: "mission", icon: Fish },
  { key: "whyTafc", icon: Award },
] as const

const HIGHLIGHT_KEYS = ["partnership", "modernFleets", "traceability", "standards"] as const

/**
 * Mid-page credibility break, on navy.
 *
 * The `15+` / years-of-experience figure moves out of a small floating badge and
 * becomes display type. Setting hard numerals large is the one device every
 * exporter studied uses to assert scale (Mowi, Nueva Pescanova, Iceland
 * Seafood) — and none of them animates a counter to do it.
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
        eyebrow={t("badge")}
        tone="ink"
        title={
          <>
            {t("titlePart1")} <span className="text-tafc-accent">{t("tunisia")}</span>{" "}
            {t("and")} <span className="text-tafc-accent">{t("algeria")}</span>
          </>
        }
      />

      <div className="mt-16 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ---- Image collage ------------------------------------------- */}
        <Reveal x={-32} y={0} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image
              src="/mediterranean-fishing-boats-harbor-tunisia-sunrise.jpg"
              alt={t("imageAlt.fleet")}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-tafc-ink/80 via-transparent to-transparent"
            />
            <span className="absolute bottom-5 start-5 rounded-full bg-tafc-ink/70 px-3 py-1.5 text-data text-white uppercase ring-1 ring-inset ring-white/15 backdrop-blur-sm">
              {t("modernFleets")}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src="/seafood-processing-facility-workers-quality-contro.jpg"
                alt={t("imageAlt.processing")}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src="/fresh-fish-market-selection-mediterranean-premium.jpg"
                alt={t("imageAlt.selection")}
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* ---- Text --------------------------------------------------- */}
        <Reveal x={32} y={0} delay={0.1}>
          <p className="text-deck text-pretty text-white/80">{t("description1")}</p>
          <p className="mt-5 text-deck text-pretty text-white/55">{t("description2")}</p>

          {/* The one hard figure on this band, set as a stat rather than a
              floating badge. None of the exporters studied animates a counter
              to do this, and neither does this. */}
          <div className="mt-10 flex items-center gap-6 border-t border-tafc-ink-line pt-8">
            <span className="font-display text-stat text-tafc-accent tabular">15+</span>
            <DataLabel tone="ink" className="max-w-[11rem]">
              {t("yearsExperience")}
            </DataLabel>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {HIGHLIGHT_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-tafc-accent/12 ring-1 ring-inset ring-tafc-accent/25">
                  <Check aria-hidden="true" className="size-3.5 text-tafc-accent" strokeWidth={2.5} />
                </span>
                <span className="text-meta font-medium text-white/80">
                  {t(`highlights.${key}`)}
                </span>
              </li>
            ))}
          </ul>

          <Button asChild size="xl" variant="onInk" className="mt-10">
            <Link href="/about">{tHero("ctaSecondary")}</Link>
          </Button>
        </Reveal>
      </div>

      {/* ---- Pillars -------------------------------------------------- */}
      {/* Vision / mission / why is not a sequence, so these carry no numbering.
          The icon tiles and per-card gradients are gone: a teal hairline that
          runs the width of the card on hover is the whole state change. */}
      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar, index) => (
          <Reveal
            key={pillar.key}
            as="article"
            delay={index * 0.08}
            className="group relative h-full overflow-hidden rounded-2xl border border-tafc-ink-line bg-tafc-ink-raised p-8 transition-colors duration-500 hover:border-tafc-accent/40"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-tafc-accent transition-transform duration-700 ease-out group-hover:scale-x-100 rtl:origin-right"
            />
            <pillar.icon aria-hidden="true" className="size-6 text-tafc-accent" />
            <h3 className="mt-6 font-display text-h3 text-white">
              {t(`pillars.${pillar.key}.title`)}
            </h3>
            <p className="mt-3 text-pretty text-white/60">
              {t(`pillars.${pillar.key}.description`)}
            </p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
