"use client"

import { useRef } from "react"
import { useTranslations, useMessages, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  getBestSellers,
  getTranslatedProduct,
  type TranslatedProduct,
  type ProductsDataTranslations,
} from "@/lib/products-data"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { Reveal } from "@/components/ui/reveal"
import { DataLabel } from "@/components/ui/spec"

/** The three products the old hero carried on its rotated floating cards. */
const FEATURED_KEYS = ["seaBass", "seaBream", "prawns"] as const

/**
 * Featured-selection rail — the second of the three product showcases.
 *
 * Swiper is gone from this section. It carried an autoplay loop, a pagination
 * row, a `<style jsx global>` block patching its own CSS, and three stylesheet
 * imports, to deliver a horizontal list of five cards. That is now native
 * scroll-snap (`.rail` in globals.css): no JS driving the scroll, keyboard- and
 * trackpad-scrollable by default, and it respects `prefers-reduced-motion`
 * through the existing global rule instead of a second opt-out.
 *
 * Structurally the section is a sticky header beside a rail that bleeds off the
 * viewport edge, rather than a centred header above a contained carousel. The
 * bleed is what tells a reader there is more to the right; the old pagination
 * bullets were doing that job in a much weaker way.
 *
 * The three strings from the old hero's floating product cards live in the
 * sticky column, where they read as a contents list for the rail beside them.
 *
 * Cards are navy against the shell surface and carry a real spec table — origin,
 * chilled/frozen, caliber, pack format — so this section cannot be confused with
 * either the ranges index above or the white catalogue cards below.
 */
export function BestSellers() {
  const t = useTranslations("bestSellers")
  const tHero = useTranslations("hero")
  const tUi = useTranslations("productsData.ui")
  const messages = useMessages()
  const locale = useLocale()
  const isRTL = locale === "ar"
  const translations = messages.productsData as unknown as ProductsDataTranslations

  const railRef = useRef<HTMLUListElement>(null)

  const bestSellers = getBestSellers().map((product) =>
    getTranslatedProduct(product, translations)
  )

  // Accent the second word of the title, as the previous build did.
  const titleWords = t("title").split(" ")

  /**
   * One card per press. `scrollBy` takes a physical offset, so "next" is a
   * leftward move in RTL — hence the sign flip rather than a logical property.
   */
  const scrollByCard = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8
    rail.scrollBy({ left: step * direction * (isRTL ? -1 : 1), behavior: "smooth" })
  }

  /** Up to four spec entries per card, in the order a buyer reads them. */
  const specsFor = (product: TranslatedProduct) =>
    [
      product.origin && { label: tUi("origin"), value: product.origin },
      product.type && { label: tUi("type"), value: product.type },
      product.caliber && { label: tUi("caliber"), value: product.caliber },
      product.formats?.[0] && { label: tUi("packaging"), value: product.formats[0] },
    ].filter((spec): spec is { label: string; value: string } => Boolean(spec))

  return (
    <SectionShell tone="shell" contained={false}>
      {/* `lg:pe-0` drops the container's end gutter so the rail runs off the
          viewport edge, while the sticky column keeps its start gutter. */}
      <div className="container-tafc lg:pe-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- Sticky header -------------------------------------------- */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionIntro
                eyebrow={t("badge")}
                title={
                  <>
                    {titleWords.map((word, i) => (
                      <span
                        key={`${word}-${i}`}
                        className={i === 1 ? "text-tafc-accent" : undefined}
                      >
                        {word}
                        {i < titleWords.length - 1 ? " " : ""}
                      </span>
                    ))}
                  </>
                }
                deck={t("description")}
              />

              {/* Contents list for the rail — the copy the old hero carried on
                  its floating cards. */}
              <Reveal delay={0.1} className="mt-10">
                <DataLabel>{tHero("featuredSelection")}</DataLabel>
                <ul className="mt-4 border-t border-tafc-ink/[0.12]">
                  {FEATURED_KEYS.map((key) => (
                    <li
                      key={key}
                      className="flex items-start justify-between gap-4 border-b border-tafc-ink/[0.12] py-3.5"
                    >
                      <span className="min-w-0">
                        <span className="block font-display text-[0.9375rem] font-semibold text-tafc-ink">
                          {tHero(`products.${key}.name`)}
                        </span>
                        <span className="mt-0.5 block text-meta text-tafc-ink/45">
                          {tHero(`products.${key}.subtitle`)}
                        </span>
                      </span>
                      <span className="shrink-0 text-data text-tafc-ink/45 uppercase">
                        {tHero(`products.${key}.badge`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Rail controls. Scrolling works without them — these are the
                  affordance, not the only route. */}
              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label={t("previousSlide")}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-tafc-ink/[0.12] bg-white text-tafc-ink transition hover:border-tafc-accent hover:text-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/40 focus-visible:outline-none"
                >
                  <ChevronLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label={t("nextSlide")}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-tafc-ink/[0.12] bg-white text-tafc-ink transition hover:border-tafc-accent hover:text-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/40 focus-visible:outline-none"
                >
                  <ChevronRight aria-hidden="true" className="size-5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* ---- Rail ----------------------------------------------------- */}
          <div className="lg:col-span-8">
            <ul
              ref={railRef}
              className="rail scrollbar-hide -mx-6 gap-5 px-6 pb-2 scroll-ps-6 lg:mx-0 lg:ps-0 lg:scroll-ps-0"
            >
              {bestSellers.map((product) => (
                <li key={product.id} className="w-[78vw] sm:w-[22rem]">
                  <Link
                    href={`/products/${product.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-tafc-ink ring-1 ring-tafc-ink/10 transition duration-500 hover:ring-tafc-accent/50 hover:shadow-[0_28px_64px_-34px_rgba(4,38,53,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent"
                  >
                    <div className="relative aspect-[4/5] shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 78vw, 22rem"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-tafc-ink/70 via-transparent to-transparent"
                      />
                      <span className="absolute start-4 top-4 rounded-full bg-tafc-accent px-2.5 py-1 text-data text-tafc-ink uppercase">
                        {t("badge")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {product.latinName && (
                        <p className="mb-1.5 text-meta text-white/40 italic">
                          {product.latinName}
                        </p>
                      )}
                      <h3 className="font-display text-h3 text-white transition-colors duration-300 group-hover:text-tafc-accent">
                        {product.name}
                      </h3>

                      {/* Spec table. The catalogue voice, in the mono face. */}
                      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-tafc-ink-line pt-5">
                        {specsFor(product).map((spec) => (
                          <div key={spec.label} className="min-w-0">
                            <dt>
                              <DataLabel tone="ink">{spec.label}</DataLabel>
                            </dt>
                            <dd className="mt-1 truncate text-meta font-medium text-white/85">
                              {spec.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
