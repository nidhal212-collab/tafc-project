"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTranslations, useMessages } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
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
 * Ranges index — the first of the three product showcases.
 *
 * Previously a grid of seven portrait photo tiles, which was the same treatment
 * the featured rail and the catalogue grid also used: three photo grids in a row,
 * seven tiles deep, and a buyer had to scroll three screens to learn the ranges
 * exist. It is now a trade index: numbered rows, one line of description each,
 * with the photograph carried in a single sticky pane that crossfades as you move
 * down the list.
 *
 * All seven ranges are legible at once, the numerals are real reference markers
 * for a fixed catalogue listing, and the section no longer competes with the two
 * photographic showcases further down the page.
 *
 * The pane is decorative and desktop-only, so it is mounted behind a
 * `matchMedia` check rather than hidden with CSS — hidden images are still
 * fetched, and phones have no hover to drive it. Phones get a thumbnail per row
 * instead, which is denser than the tiles it replaces.
 */
export function Categories() {
  const t = useTranslations("categories")
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
    <SectionShell tone="light">
      {/* ---- Header ------------------------------------------------------ */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <SectionIntro
          eyebrow={t("badge")}
          title={t("title")}
          deck={t("description")}
          className="max-w-2xl"
        />

        {/* The full-catalog link lives in the header rather than as a fifth
            coral button below the fold. Coral is reserved for the three real
            decision points on the page. */}
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
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Pane */}
        {showPane && (
          <Reveal y={0} className="hidden lg:col-span-5 lg:block">
            <div
              aria-hidden="true"
              className="sticky top-28 overflow-hidden rounded-2xl bg-tafc-ink ring-1 ring-tafc-ink/10"
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
                      "object-cover transition-opacity duration-700 ease-out",
                      index === active ? "opacity-100" : "opacity-0"
                    )}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-tafc-ink via-tafc-ink/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <span className="font-mono text-index text-tafc-accent tabular">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-display text-h3 text-white">
                    {translated[active].name}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Rows */}
        <div className={cn("lg:col-span-7", !showPane && "lg:col-span-12")}>
          <ul className="border-t border-tafc-ink/[0.12]">
            {categories.map((category, index) => {
              const isActive = index === active

              return (
                <Reveal
                  as="li"
                  key={category.slug}
                  delay={Math.min(index, 4) * 0.05}
                  y={16}
                  className="border-b border-tafc-ink/[0.12]"
                >
                  <Link
                    href={`/products?category=${category.slug}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group relative flex items-center gap-4 py-5 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent sm:gap-6"
                  >
                    {/* Teal edge marker — grows from the reading edge, so it
                        flips in RTL. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 start-0 w-px origin-center bg-tafc-accent transition-transform duration-500 ease-out",
                        isActive ? "scale-y-100" : "scale-y-0"
                      )}
                    />

                    <span
                      className={cn(
                        "font-mono text-index tabular transition-colors duration-300 sm:ps-4",
                        isActive ? "text-tafc-accent" : "text-tafc-ink/35"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Phones get the photograph as a thumbnail; the desktop
                        pane replaces it from `lg`. */}
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-tafc-shell lg:hidden">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-display text-h3 transition-colors duration-300",
                          isActive ? "text-tafc-accent" : "text-tafc-ink"
                        )}
                      >
                        {translated[index].name}
                      </span>
                      <span className="mt-1.5 line-clamp-1 text-meta text-tafc-ink/50">
                        {translated[index].description}
                      </span>
                    </span>

                    <span className="hidden shrink-0 font-mono text-data text-tafc-ink/40 uppercase sm:block">
                      {category.count}
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 transition-all duration-300 rtl:rotate-180",
                        isActive
                          ? "translate-x-0.5 text-tafc-accent rtl:-translate-x-0.5"
                          : "text-tafc-ink/30"
                      )}
                    />
                    <span className="sr-only">{t("viewProducts")}</span>
                  </Link>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </SectionShell>
  )
}
