"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Editorial split hero on salt.
 *
 * This inverts the pattern every seafood exporter converges on — stock photo,
 * navy gradient scrim, white headline, coloured pill CTA — because that pattern
 * is precisely what makes the category interchangeable. Here the page is light,
 * the photograph is a plate rather than a backdrop, and there is no scrim at
 * all: nothing is sitting on top of the image, so the image does not have to be
 * darkened into a texture to keep type legible.
 *
 * The copy column aligns to the container gutter while the photograph bleeds off
 * the outer edge. `max(2.5rem, calc((100vw - 84rem)/2 + 2.5rem))` is that
 * alignment: below 84rem it resolves to the raw gutter, above it, to the gutter
 * plus the centring margin. It is a logical property, so the whole composition
 * mirrors in Arabic without a second rule.
 *
 * Exactly three text elements: headline, subtext, and the two-item CTA row. The
 * eyebrow that used to sit above the headline is gone — a hero does not need a
 * label telling you it is a hero.
 *
 * The headline is one sentence assembled from two message keys and broken by
 * `text-wrap: balance`, not by a hard `<br>`. At display scale the copy column
 * is the narrow half of the split, so a forced break gave one line that
 * overflowed and re-wrapped plus a short orphan under it. Letting the browser
 * balance it yields even measures at every width, and it fixes the English and
 * Arabic cases, where the old break landed before the final noun.
 *
 * The 14s Ken Burns scale is gone too. It animated the LCP element for fourteen
 * seconds after paint, and a photograph that will not hold still is the opposite
 * of expensive.
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
        hidden: { opacity: 0, transform: "translateY(20px)" },
        show: {
          opacity: 1,
          transform: "translateY(0px)",
          transition: { duration: 0.75, ease: EASE },
        },
      }

  return (
    <section className="relative isolate bg-tafc-salt">
      {/* `svh`, not `vh` — iOS Safari's collapsing address bar makes `vh` jump.
          5rem is the header, so the hero alone fills exactly one viewport and
          the CTA lands above the fold with nothing cropped. */}
      <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 lg:grid-cols-2">
        {/* ---- Copy -------------------------------------------------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={cn(
            "order-2 flex flex-col justify-center px-6 pb-16 pt-14 text-start lg:order-1 lg:pb-24 lg:pt-28",
            "lg:pe-16 lg:ps-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]",
          )}
        >
          <motion.h1
            variants={item}
            className="font-display text-display text-balance text-tafc-ink"
          >
            {t("titleLine1")} {t("titleHighlight")}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 measure text-deck text-pretty text-tafc-ink/65"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-9"
          >
            <Button asChild size="xl" variant="ink">
              <Link href="/contact">{tContact("cta")}</Link>
            </Button>

            <Button
              asChild
              size="inline"
              variant="quiet"
              className="font-medium text-tafc-ink/75 rtl:hover:[&_svg]:-translate-x-1"
            >
              <Link href="/products">
                {t("ctaPrimary")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* ---- Photograph -------------------------------------------------
            No scrim, no gradient, no radius. One file: this previously rendered
            a phone crop and a desktop crop side by side with `md:hidden` /
            `hidden md:block`, but `display: none` does not stop a fetch, so
            every visit downloaded both — on the page's LCP element. */}
        <div className="relative order-1 h-[38svh] min-h-[280px] lg:order-2 lg:h-auto lg:min-h-0">
          <Image
            src="/premium-seafood-platter-shrimp-lobster-mediterrane.jpg"
            alt=""
            fill
            priority
            quality={85}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="photo-grade object-cover object-center"
          />
        </div>
      </div>
    </section>
  )
}
