"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { Eyebrow } from "@/components/ui/section-intro"

/** The three values, in order. Copy lives in `messages/*.json` under the same keys. */
const VALUE_KEYS = ["excellence", "cooperation", "responsibility"] as const

/**
 * About page.
 *
 * This was the page with the most bespoke machinery on the site, and most of it
 * was working against the reading:
 *
 * - The hero ran a scroll-linked parallax *and* a 12-second `scale(1.15)` settle
 *   on separate elements, with an `isMounted` guard and three motion values to
 *   keep them from fighting. Both are gone. The photograph is a photograph.
 * - The values section was an expanding-card gallery: three tiles that flex to
 *   `2.5` on hover, each with a circular icon chip, a scrim and a `layout`
 *   animation. It is now a numbered editorial index on ink — the same device as
 *   the ranges index on the homepage and the process band — so the page finally
 *   shares a vocabulary with the rest of the site instead of importing a one-off
 *   interaction. It also drops three full-bleed image fetches.
 * - The vision section had a `20vw` background wordmark at 3.5% opacity and an
 *   offset outline floating behind a rounded panel. Both deleted; the ink panel
 *   became a full-bleed ink band, which is a stronger close and one fewer object.
 * - The italic pull-quote card floating over the facility photo is gone. It
 *   quoted the paragraph immediately beside it, truncated at the first comma.
 *
 * Every hand-rolled `whileInView` variant is replaced by the site's one `Reveal`
 * primitive, which carries the `useReducedMotion` guard for free.
 */
export default function AboutPage() {
  const t = useTranslations("aboutPage")
  const tAlt = useTranslations("about.imageAlt")

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-tafc-salt">
        {/* ---- Hero ------------------------------------------------------ */}
        {/* Bottom-left, not centred: type sits on the horizon rather than
            floating in the middle of the frame. Flat scrim plus a short bottom
            gradient — the same recipe as the clients band, so one photograph is
            never treated differently from another. */}
        <section className="relative flex min-h-[78svh] items-end overflow-hidden pt-32 pb-16 md:min-h-[85svh] md:pb-20">
          <Image
            src="/fishing-boat-nets-mediterranean-sea-sunrise-profes.jpg"
                    alt={t("hero.imageAlt")}
            fill
            className="photo-grade -z-20 object-cover"
            priority
            sizes="100vw"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-tafc-ink/55" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-tafc-ink/80 to-transparent"
          />

          <div className="container-tafc relative text-white">
            <Reveal y={20}>
              <h1 className="max-w-3xl font-display text-display text-balance">
                <span className="block">{t("hero.titlePart1")}</span>
                <span className="block font-medium">{t("hero.titlePart2")}</span>
              </h1>
            </Reveal>
            <Reveal y={20} delay={0.12}>
              <p className="mt-8 max-w-xl text-deck text-white/75">
                TAFC - The Tunisian Algerian Fish Company
                <br />
                <span className="text-white/55">{t("hero.slogan")}</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Presentation ---------------------------------------------- */}
        <section className="section-y">
          <div className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
              <Reveal x={-24} y={0} className="w-full flex-1">
                <Eyebrow>{t("presentation.badge")}</Eyebrow>
                <h2 className="mt-6 font-display text-h1 text-balance text-tafc-ink">
                  {t("presentation.title")}
                </h2>
                <p className="mt-7 max-w-xl text-deck text-pretty text-tafc-ink/70">
                  {t("presentation.text")}
                </p>
                {/* Two facts on a hairline. The anchor and globe glyphs beside
                    them were saying "fishing" and "export" a second time. */}
                <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 border-t border-tafc-ink/12 pt-7">
                  <span className="text-data text-tafc-ink/65 uppercase">
                    {t("presentation.fishing")}
                  </span>
                  <span className="text-data text-tafc-ink/65 uppercase">
                    {t("presentation.export")}
                  </span>
                </div>
              </Reveal>

              <div className="w-full flex-1">
                <div className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden md:max-w-md lg:ms-auto">
                  <Image
                    src="/mediterranean-fishing-fleet-boats-harbor-tunisia.jpg"
                    alt={tAlt("fleet")}
                    fill
                    className="photo-grade object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Mission + advantage --------------------------------------- */}
        <section className="border-t border-tafc-ink/12 bg-tafc-paper section-y">
          <div className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row-reverse lg:gap-24">
              <Reveal x={24} y={0} className="w-full flex-1">
                <div className="mb-14">
                  <h2 className="font-display text-h2 text-tafc-ink">{t("mission.title")}</h2>
                  {/* Accent hairline as a quote marker — the one job the accent
                      still has on a light surface. */}
                  <p className="mt-6 border-s border-tafc-accent ps-6 text-deck text-pretty text-tafc-ink/70">
                    {t("mission.text")}
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-h2 text-tafc-ink">{t("advantage.title")}</h2>
                  <p className="mt-6 text-deck text-pretty text-tafc-ink/70">
                    {t("advantage.text")}
                  </p>
                </div>
              </Reveal>

              <div className="w-full flex-1">
                <div className="group relative mx-auto aspect-square w-full max-w-sm overflow-hidden md:max-w-md lg:me-auto">
                  <Image
                    src="/modern-seafood-processing-facility-quality-control.jpg"
                    alt={tAlt("qualityControl")}
                    fill
                    className="photo-grade object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Values: numbered index on ink ----------------------------- */}
        <section className="bg-tafc-ink section-y">
          <div className="container-tafc">
            <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <h2 className="font-display text-h1 text-balance text-white">{t("values.title")}</h2>
              <p className="max-w-sm text-deck text-pretty text-white/60">
                {t("values.subtitle")}
              </p>
            </Reveal>

            <Reveal y={16}>
              <ol className="mt-16 border-t border-white/10 md:mt-20">
                {VALUE_KEYS.map((key, i) => (
                  <li
                    key={key}
                    className="grid gap-x-10 gap-y-5 border-b border-white/10 py-10 md:grid-cols-12 md:py-14"
                  >
                    <span
                      aria-hidden="true"
                      className="text-index text-tafc-accent-bright tabular md:col-span-1"
                    >
                      0{i + 1}
                    </span>
                    <div className="md:col-span-4">
                      <h3 className="font-display text-h2 text-white">
                        {t(`values.cards.${key}.title`)}
                      </h3>
                      <p className="mt-3 text-data text-white/60 uppercase">
                        {t(`values.cards.${key}.subtitle`)}
                      </p>
                    </div>
                    <p className="text-deck text-pretty text-white/70 md:col-span-7">
                      {t(`values.cards.${key}.desc`)}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        {/* ---- Vision: full-bleed ink close ------------------------------ */}
        <section className="border-t border-white/10 bg-tafc-ink section-y">
          <div className="container-tafc">
            <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
              <Reveal x={-24} y={0}>
                <Eyebrow tone="ink">{t("vision.badge")}</Eyebrow>
                <h2 className="mt-6 font-display text-display text-balance text-white">
                  {t("vision.titlePart1")}
                  <br />
                  {/* Emphasis is weight of the same face, never a second colour. */}
                  <span className="font-medium">{t("vision.titleHighlight")}</span>
                  <br />
                  {t("vision.titlePart2")}
                </h2>
                <p className="mt-10 max-w-xl border-t border-white/10 pt-8 text-h3 text-white/70 italic">
                  &ldquo;{t("hero.slogan")}&rdquo;
                </p>
              </Reveal>

              <Reveal y={20} delay={0.12} className="lg:pt-4">
                <h3 className="font-display text-h2 text-white">{t("vision.card.title")}</h3>
                <p className="mt-6 max-w-lg text-deck text-pretty text-white/65">
                  {t("vision.card.description")}
                </p>

                {/* One solid CTA, one quiet link. Two `xl` buttons side by side
                    made neither of them the answer. */}
                <div className="mt-12 flex flex-wrap items-center gap-8">
                  <Button asChild size="xl" variant="salt">
                    <Link href="/contact">{t("vision.card.ctaContact")}</Link>
                  </Button>
                  <Button
                    asChild
                    size="inline"
                    variant="quiet"
                    className="text-white hover:text-tafc-accent-bright focus-visible:ring-tafc-accent-bright/40"
                  >
                    <Link href="/products">{t("vision.card.ctaCatalog")}</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
