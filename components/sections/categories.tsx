"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations, useMessages } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { categories } from "@/lib/categories"

type CategoryTranslation = {
  name: string
  description: string
}

type ProductsDataTranslations = {
  categories: Record<string, CategoryTranslation>
}

/**
 * Ranges index — the first of the three product showcases, and the section that
 * establishes the numbered-index device the rest of the site reuses.
 *
 * Previously a grid of portrait photo tiles, which was the same treatment the
 * featured rail and the catalogue grid also used: three photo grids in a row, and
 * a buyer had to scroll three screens to learn the ranges exist. It is now a
 * trade index: numbered rows, one line of description each, with the photograph
 * carried in a single sticky pane that crossfades as you move down the list.
 *
 * All six ranges are legible at once, the numerals are real reference markers for
 * a fixed catalogue listing, and the section no longer competes with the two
 * photographic showcases further down the page.
 *
 * The pane is decorative and desktop-only, so it is mounted behind a
 * `matchMedia` check rather than hidden with CSS — hidden images are still
 * fetched, and phones have no hover to drive it. Phones get a thumbnail per row
 * instead, which is denser than the tiles it replaces.
 */
export function Categories() {
  const t = useTranslations("categories")
  const tUi = useTranslations("productsData.ui")
  const messages = useMessages()
  const productsData = messages.productsData as unknown as ProductsDataTranslations | undefined

  const [active, setActive] = useState(0)
  const [showPane, setShowPane] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const sync = () => setShowPane(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  const getTranslatedCategory = (slug: string, fallbackName: string, fallbackDesc: string) => {
    const translation = productsData?.categories?.[slug]
    return {
      name: translation?.name || fallbackName,
      description: translation?.description || fallbackDesc,
    }
  }

  const translated = categories.map((category) =>
    getTranslatedCategory(category.slug, category.name, category.description)
  )

  return (
    <SectionShell tone="paper">
      {/* ---- Header ------------------------------------------------------ */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionIntro
          eyebrow={t("badge")}
          title={t("title")}
          deck={t("description")}
          tone="paper"
          className="max-w-2xl"
        />

        {/* The full-catalog link lives in the header rather than as a fifth
            filled button below the fold. The solid ink CTA is reserved for the
            three real decision points on the page. */}
        <Reveal delay={0.08} className="shrink-0 lg:pb-2">
          <Button
            asChild
            size="inline"
            variant="quiet"
            className="font-medium text-tafc-ink/70 rtl:hover:[&_svg]:-translate-x-1"
          >
            <Link href="/products">
              {t("viewFullCatalog")}
              <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
            </Link>
          </Button>
        </Reveal>
      </div>

      {/* ---- Index ------------------------------------------------------- */}
      <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Pane */}
        {showPane && (
          <Reveal y={0} className="hidden lg:col-span-5 lg:block">
            <div
              aria-hidden="true"
              className="sticky top-28 overflow-hidden bg-tafc-ink"
            >
              <div className="relative aspect-[4/5]">
                {categories.map((category, index) => (
                  <Image
                    key={category.slug}
                    src={category.image}
                    alt=""
                    fill
                    sizes="40vw"
                    priority={index === 0}
                    className={cn(
                      "photo-grade object-cover transition-opacity duration-700 ease-out",
                      index === active ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-tafc-ink via-tafc-ink/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="font-display text-index text-tafc-accent-bright tabular">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2.5 font-display text-h3 text-white">
                    {translated[active].name}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Rows. One group reveal rather than a per-row stagger: six rows
            arriving one after another is six animations where the reader only
            wanted a list. */}
        <Reveal y={16} className={cn("lg:col-span-7", !showPane && "lg:col-span-12")}>
          <ul className="border-t border-tafc-ink/12">
            {categories.map((category, index) => {
              const isActive = index === active

              return (
                <li key={category.slug} className="border-b border-tafc-ink/12">
                  <Link
                    href={`/products?category=${category.slug}`}
                    data-active={isActive}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group relative flex items-center gap-4 py-7 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent sm:gap-6"
                  >
                    {/* The one interaction this redesign adds: a hairline drawn
                        in from the reading edge. `.index-rule` is defined once in
                        globals.css and reused on every numbered index on the
                        site, so it reads as the system rather than as a flourish
                        invented here. */}
                    <span
                      aria-hidden="true"
                      className="index-rule absolute inset-x-0 bottom-0"
                    />

                    {/* The inactive numeral sits at /60 (4.98:1 on paper), not
                        the /30 this section first shipped with. Unlike the
                        display-scale ordinals in ProcessBand — which are
                        `aria-hidden` inside an `<ol>`, so the order is carried
                        by the list and the glyph is decoration — these are read
                        aloud as part of the link and sit in the reading line at
                        body size. That makes them content, and content clears
                        AA. Active is still full ink, a 4x jump, so the state is
                        no less legible than it was. */}
                    <span
                      className={cn(
                        "font-display text-index tabular transition-colors duration-300",
                        isActive ? "text-tafc-ink" : "text-tafc-ink/60"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Phones get the photograph as a thumbnail; the desktop
                        pane replaces it from `lg`. Square, like every other
                        photograph on the site. */}
                    <span className="relative size-16 shrink-0 overflow-hidden bg-tafc-salt lg:hidden">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="photo-grade object-cover"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-h3 text-tafc-ink">
                        {translated[index].name}
                      </span>
                      <span className="mt-2 line-clamp-1 text-meta text-tafc-ink/65">
                        {translated[index].description}
                      </span>
                    </span>

                    <span className="hidden shrink-0 text-data text-tafc-ink/65 uppercase tabular sm:block">
                      {tUi("productsCountLabel", { count: category.count })}
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 transition-[transform,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] rtl:rotate-180",
                        isActive
                          ? "translate-x-0.5 text-tafc-accent rtl:-translate-x-0.5"
                          : "text-tafc-ink/50"
                      )}
                    />
                    <span className="sr-only">{t("viewProducts")}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </SectionShell>
  )
}
