"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/section-intro"
import { DataLabel } from "@/components/ui/spec"
import { categories } from "@/lib/categories"
import { products } from "@/lib/products-data"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Full-bleed cinematic hero, closed by a manifest bar.
 *
 * The photograph and navy scrim are the pattern every leading exporter converges
 * on (Iceland Seafood, Mowi, Royal Greenland, seafood.no) and they stay. What is
 * new is the strip along the bottom: four spec entries — origin, ranges,
 * references, cold chain — set in mono, on the same hairline grid the rest of the
 * page uses.
 *
 * It does three jobs at once. It answers the first four questions a buyer
 * actually has, before any scrolling. It states the page's thesis, that this is
 * a working catalogue and not a brochure. And it hands the eye off into the
 * marquee, so hero and rail still read as one dark block.
 *
 * The two figures are counted from the data rather than typed, so they cannot
 * drift from `lib/categories.ts` and `lib/products-data.ts`.
 */
export function Hero() {
  const t = useTranslations("hero")
  const tContact = useTranslations("contact")
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
  }

  const item = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
      }

  const manifest = [
    { label: t("manifest.origin"), value: t("manifest.originValue") },
    { label: t("manifest.ranges"), value: String(categories.length).padStart(2, "0") },
    { label: t("manifest.references"), value: String(products.length) },
    { label: t("manifest.coldChain"), value: t("manifest.coldChainValue") },
  ]

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-tafc-ink">
      {/* ---- Photograph -------------------------------------------------- */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ scale: reduceMotion ? 1 : 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "linear" }}
      >
        {/* One photograph, not a pair. This previously rendered a phone crop and
            a desktop crop side by side with `md:hidden` / `hidden md:block` —
            but `display: none` does not stop a fetch, so every visit downloaded
            both, on the page's LCP element. Both source files are also square
            (1024×1024), so the "art-directed crop" was really just two different
            photographs; `object-cover` does the framing either way. */}
        <Image
          src="/premium-seafood-platter-shrimp-lobster-mediterrane.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Scrim. Runs from the text side inwards, so it flips in RTL. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-tafc-ink/95 via-tafc-ink/72 to-tafc-ink/25 rtl:bg-gradient-to-l"
      />
      {/* Bottom fade — seats the manifest bar and carries the eye into the
          marquee, so hero and rail read as one dark block. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-tafc-ink via-tafc-ink/55 to-transparent"
      />

      {/* ---- Content ----------------------------------------------------- */}
      <div className="container-tafc relative flex flex-1 items-center pt-32 pb-16 md:pt-36 md:pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl text-start"
        >
          <motion.div variants={item}>
            <Eyebrow tone="ink">{t("badge")}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-display text-balance text-white"
          >
            {t("titleLine1")}
            <br />
            <span className="text-tafc-accent">{t("titleHighlight")}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-display text-h3 font-medium text-white/70"
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-deck text-pretty text-white/60"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8"
          >
            <Button asChild size="xl" variant="action">
              <Link href="/contact">{tContact("cta")}</Link>
            </Button>

            <Button
              asChild
              size="inline"
              variant="quiet"
              className="font-medium text-white/85 rtl:hover:[&_svg]:-translate-x-1"
            >
              <Link href="/products">
                {t("ctaPrimary")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ---- Manifest bar ------------------------------------------------ */}
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        className="relative border-t border-white/[0.12] bg-tafc-ink/35 backdrop-blur-md"
      >
        <div className="container-tafc">
          {/* Two columns on phones, four from `lg`. Hairlines are drawn per cell
              with logical `border-s` / `ps` so the grid flips in RTL and no rule
              doubles up at the edges. */}
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {manifest.map(({ label, value }, index) => (
              <div
                key={label}
                className={cn(
                  "flex flex-col gap-1.5 py-5 sm:py-6",
                  index % 2 === 0 && "pe-5 sm:pe-6",
                  index % 2 === 1 && "border-s border-white/[0.09] ps-5 sm:ps-6",
                  index > 1 && "border-t border-white/[0.09] lg:border-t-0",
                  index > 0 && "lg:border-s lg:border-white/[0.09] lg:ps-6",
                  index < 3 && "lg:pe-6",
                )}
              >
                <dt>
                  <DataLabel tone="ink">{label}</DataLabel>
                </dt>
                <dd className="font-display text-[0.9375rem] font-medium text-white tabular sm:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  )
}
