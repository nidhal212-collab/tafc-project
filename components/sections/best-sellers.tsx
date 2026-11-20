"use client"

import { useCallback, useEffect, useState } from "react"
import { useTranslations, useMessages, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import {
  getBestSellers,
  getTranslatedProduct,
  type TranslatedProduct,
  type ProductsDataTranslations,
} from "@/lib/products-data"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { DataLabel } from "@/components/ui/spec"
import { cn } from "@/lib/utils"

/**
 * Featured-selection carousel — the second of the three product showcases.
 *
 * A plain Embla (v8) rail: no scroll-driven scale, no depth trickery. Every
 * photograph sits at full size; the only motion is the drag itself plus a quiet
 * image zoom on hover, which reads as product feedback rather than decoration.
 * Not looped — a catalogue rail should meet an end, so the boundary buttons
 * disable at the edges instead of cycling forever.
 *
 * Layout leads with a full-width header — eyebrow, title and deck stacked at the
 * top with the scroll controls bottom-aligned to their end — over a full-bleed
 * rail that runs off the viewport's end edge. The slide basis is set on the
 * viewport with responsive percentages so a peek of the next plate always says
 * "scroll" better than any arrow: ~1.2 slides on a phone, ~2.4 from `md`, ~3.2
 * from `lg` where the rail spans the whole width.
 *
 * Squared controls, data-voice labels and paper plates follow the rest of the site.
 */
export function BestSellers() {
  const t = useTranslations("bestSellers")
  const tUi = useTranslations("productsData.ui")
  const messages = useMessages()
  const locale = useLocale()
  const translations = messages.productsData as unknown as ProductsDataTranslations

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    // Embla defaults to LTR and does not read the DOM's dir, so the locale
    // drives it. Same value on server and client, so hydration is stable.
    direction: locale === "ar" ? "rtl" : "ltr",
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const bestSellers = getBestSellers().map((product) =>
    getTranslatedProduct(product, translations)
  )

  /* ---- State sync -------------------------------------------------------- */

  useEffect(() => {
    if (!emblaApi) return

    /** Arrow-button states: one sync so scroll, select and reInit share it. */
    const syncButtons = () => {
      setPrevBtnDisabled(!emblaApi.canScrollPrev())
      setNextBtnDisabled(!emblaApi.canScrollNext())
    }
    const syncSelection = () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      setSelectedIndex(emblaApi.selectedScrollSnap())
      syncButtons()
    }

    syncSelection()

    // Embla's `.on()` returns the api (not an unsubscriber), so cleanup must
    // call `.off()` with the SAME function references. The React hook owns
    // the instance's lifecycle — never destroy() it manually here.
    emblaApi
      .on("select", syncButtons)
      .on("scroll", syncButtons)
      .on("reInit", syncSelection)

    return () => {
      emblaApi
        .off("select", syncButtons)
        .off("scroll", syncButtons)
        .off("reInit", syncSelection)
    }
  }, [emblaApi])

  const onPrevButtonClick = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const onNextButtonClick = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const onDotButtonClick = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  /* ---- Spec table -------------------------------------------------------- */

  /** Up to three spec entries per card, in the order a buyer reads them.
   *  Packaging/conditioning stays on the detail page only. */
  const specsFor = (product: TranslatedProduct) =>
    [
      product.origin && { label: tUi("origin"), value: product.origin },
      product.type && { label: tUi("type"), value: product.type },
      product.caliber && { label: tUi("caliber"), value: product.caliber },
    ].filter((spec): spec is { label: string; value: string } => Boolean(spec))

  // Emphasise the second word of the title. Weight of the same family, not a
  // second colour: colour is no longer an emphasis mechanism anywhere on the site.
  const titleWords = t("title").split(" ")

  return (
    <SectionShell tone="salt" contained={false}>
      {/* ---- Header: eyebrow → title → deck on top, full width. The scroll
             controls sit at the header's end, bottom-aligned to the intro on
             desktop and stacked beneath it on mobile. Fully contained (both
             gutters) so the type never runs to the viewport edge. ---------- */}
      <div className="container-tafc">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionIntro
            eyebrow={t("badge")}
            title={
              <>
                {titleWords.map((word, i) => (
                  <span
                    key={`${word}-${i}`}
                    className={i === 1 ? "font-medium" : undefined}
                  >
                    {word}
                    {i < titleWords.length - 1 ? " " : ""}
                  </span>
                ))}
              </>
            }
            deck={t("description")}
            className="max-w-2xl"
          />

          {/* Arrows + one dot per snap point. Squares and hairlines, like
              every other control on the site. */}
          <div className="flex shrink-0 items-center gap-4 lg:pb-2">
            <button
              type="button"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
              aria-label={t("previousSlide")}
              className="inline-flex size-11 items-center justify-center rounded-sm border border-tafc-ink/15 bg-tafc-paper text-tafc-ink transition-colors hover:border-tafc-accent hover:text-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
            >
              <CaretLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
              aria-label={t("nextSlide")}
              className="inline-flex size-11 items-center justify-center rounded-sm border border-tafc-ink/15 bg-tafc-paper text-tafc-ink transition-colors hover:border-tafc-accent hover:text-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/30 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
            >
              <CaretRight aria-hidden="true" className="size-5 rtl:rotate-180" />
            </button>

            <div className="ms-2 flex items-center gap-2" aria-label={t("badge")}>
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-current={index === selectedIndex ? "true" : undefined}
                  aria-label={`${index + 1} / ${scrollSnaps.length}`}
                  onClick={() => onDotButtonClick(index)}
                  className={cn(
                    "size-1.5 rounded-[1px] transition-colors duration-200",
                    index === selectedIndex
                      ? "w-5 bg-tafc-accent"
                      : "bg-tafc-ink/25 hover:bg-tafc-ink/45"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Carousel: full-bleed rail. Keeps the container's start gutter so
             the first plate lines up with the header, `lg:pe-0` drops the end
             gutter so the rail runs off the viewport edge. ----------------- */}
      <div className="container-tafc mt-14 lg:mt-16 lg:pe-0">
        <div
          /* `touch-pan-y`: the horizontal drag belongs to the carousel,
             the vertical to the page, so a diagonal thumb-scroll doesn't
             trap the reader. `select-none` stops drag-selection flashes. */
          className="embla-viewport touch-pan-y select-none overflow-hidden"
          ref={emblaRef}
        >
          <ul className="flex">
            {bestSellers.map((product) => (
              <li
                key={product.id}
                /* Basis percentages resolve against the full-width rail:
                   ~1.2 plates on a phone (a peek of the next plate says
                   "scroll" better than any arrow), ~2.4 from md, ~3.2 from
                   lg where the rail spans the whole width. The gutter is
                   logical (`ps`), so RTL mirrors correctly. */
                className="min-w-0 shrink-0 grow-0 basis-[82%] ps-5 sm:basis-[60%] md:basis-[42%] lg:basis-[31%] xl:basis-[27%]"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-sm border border-tafc-ink/12 bg-tafc-paper transition-colors duration-300 hover:border-tafc-ink/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent"
                >
                  {/* Inner padding stops the photo from touching the card's
                      own border; `overflow-hidden` clips the hover zoom. */}
                  <div className="p-4 pb-0">
                    <div className="relative aspect-square overflow-hidden rounded-sm">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 768px) 60vw, (max-width: 1024px) 42vw, (max-width: 1280px) 31vw, 27vw"
                        className="photo-grade object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-3 text-data text-tafc-accent uppercase">
                      {t("badge")}
                    </span>
                    <h3 className="font-display text-h3 text-tafc-ink">
                      {product.name}
                    </h3>

                    <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-tafc-ink/12 pt-4">
                      {specsFor(product).map((spec) => (
                        <div key={spec.label} className="min-w-0">
                          <dt>
                            <DataLabel>{spec.label}</DataLabel>
                          </dt>
                          <dd className="mt-1 truncate text-meta font-medium text-tafc-ink/75">
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
    </SectionShell>
  )
}
