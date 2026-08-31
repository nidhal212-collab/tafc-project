"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { Leaf, Handshake, Award, Anchor, Globe2, type LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/section-intro"

// --- ANIMATION VARIANTS ---
const EASE = [0.22, 1, 0.36, 1] as const

const fadeInRight = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE }
  }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE }
  }
}

const heroTextVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE }
  }
}

/**
 * About page.
 *
 * The two bespoke interactions are kept as-is — the parallax hero (with its
 * `isMounted` SSR guard) and the expanding values gallery. What changed is that
 * this page was running on a completely different palette from the rest of the
 * site: `tafc-navy` is `#1c2459` (a violet navy) and `tafc-blue-light` is
 * `#00a2e8` (a bright azure), neither of which is a TAFC colour. Everything is
 * normalised onto `tafc-ink` + `tafc-accent`, and the coral accents are gone
 * because coral is now reserved for primary CTAs.
 */
export default function AboutPage() {
  const t = useTranslations('aboutPage')
  const [isMounted, setIsMounted] = useState(false)

  // Default motion value for SSR
  const defaultY = useMotionValue(0)
  const { scrollY } = useScroll();
  const scrollBasedY = useTransform(scrollY, [0, 500], [0, 150]);

  // Only use scroll-based transform after mounting (client-side)
  const y1 = isMounted ? scrollBasedY : defaultY;

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* ---- Hero ------------------------------------------------------ */}
        <section className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden md:h-[95vh]">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "linear" }}
            style={{ y: y1 }}
          >
            <Image
              src="/fishing-boat-nets-mediterranean-sea-sunrise-profes.jpg"
              alt="Mer Méditerranée"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-tafc-ink/50 via-tafc-ink/35 to-tafc-ink"
            />
          </motion.div>

          <div className="container-tafc relative z-10 mt-16 text-center text-white md:mt-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {/* Was a white-to-white/70 gradient clip — over photography that
                  reads as a dirty smear, so the display line is solid now. */}
              <motion.h1 variants={heroTextVariant} className="font-display text-display text-balance">
                <span className="block">{t('hero.titlePart1')}</span>
                <span className="font-serif font-light italic text-tafc-accent">
                  {t('hero.titlePart2')}
                </span>
              </motion.h1>

              <motion.p variants={heroTextVariant} className="mx-auto mt-8 max-w-2xl text-deck text-white/75">
                TAFC - The Tunisian Algerian Fish Company<br />
                <span className="text-white/50">{t('hero.slogan')}</span>
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ---- Editorial body ------------------------------------------- */}
        <div className="space-y-24 bg-white pt-20 pb-24 md:space-y-36 md:pt-32">

          {/* SECTION 1: PRESENTATION (Editorial Left-Right) */}
          <section className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={fadeInRight}
                className="relative z-10 w-full flex-1"
              >
                <Eyebrow>{t('presentation.badge')}</Eyebrow>
                <h2 className="mt-5 font-display text-h1 text-balance text-tafc-ink">
                  {t('presentation.title')}
                </h2>
                <p className="mt-7 max-w-xl text-deck text-pretty text-tafc-ink/70">
                  {t('presentation.text')}
                </p>
                <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-tafc-ink/[0.08] pt-7">
                  <span className="flex items-center gap-2 text-meta text-tafc-ink/55 uppercase tracking-[0.14em]">
                    <Anchor aria-hidden="true" className="size-4 text-tafc-accent" />
                    {t('presentation.fishing')}
                  </span>
                  <span className="flex items-center gap-2 text-meta text-tafc-ink/55 uppercase tracking-[0.14em]">
                    <Globe2 aria-hidden="true" className="size-4 text-tafc-accent" />
                    {t('presentation.export')}
                  </span>
                </div>
              </motion.div>

              <div className="relative w-full flex-1">
                <div className="group relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl md:max-w-md lg:ms-auto">
                  <Image
                    src="/mediterranean-fishing-fleet-boats-harbor-tunisia.jpg"
                    alt="TAFC Fleet"
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: MISSION & AVANTAGE (Editorial Right-Left) */}
          <section className="container-tafc">
            <div className="flex flex-col items-center gap-14 lg:flex-row-reverse lg:gap-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={fadeInLeft}
                className="relative z-10 w-full flex-1"
              >
                <div className="mb-12">
                  <h2 className="font-display text-h2 text-tafc-ink">
                    {t('mission.title')}
                  </h2>
                  <p className="mt-6 border-s-2 border-tafc-accent ps-6 text-deck text-tafc-ink/65">
                    {t('mission.text')}
                  </p>
                </div>

                <div>
                  <h2 className="font-display text-h2 text-tafc-ink">
                    {t('advantage.title')}
                  </h2>
                  <p className="mt-6 text-deck text-tafc-ink/65">
                    {t('advantage.text')}
                  </p>
                </div>
              </motion.div>

              <div className="relative w-full flex-1">
                <div className="group relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl md:max-w-md lg:me-auto">
                  <Image
                    src="/modern-seafood-processing-facility-quality-control.jpg"
                    alt="TAFC Quality Control"
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -start-6 z-20 hidden max-w-xs rounded-2xl border border-tafc-ink/10 bg-white p-7 lg:block">
                  <p className="text-center font-serif text-h3 text-tafc-ink italic">
                    &ldquo;{t('advantage.text').split(',')[0]}…&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: VALEURS (Bespoke "Expanding Gallery" Interaction) */}
          <section className="overflow-hidden bg-tafc-ink py-24 md:py-32">
            <div className="container-tafc mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true }}
                className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
              >
                <h2 className="font-display text-h1 text-white">
                  {t('values.title')}
                </h2>
                <p className="max-w-sm text-deck text-white/50">
                  {t('values.subtitle')}
                </p>
              </motion.div>
            </div>

            {/* Expanding Cards Container */}
            <div className="container-tafc flex h-[600px] flex-col gap-4 md:flex-row">
              <ExpandingCard
                title={t('values.cards.excellence.title')}
                subtitle={t('values.cards.excellence.subtitle')}
                desc={t('values.cards.excellence.desc')}
                icon={Award}
                image="/modern-seafood-processing-facility-quality-control.jpg"
                index={0}
              />
              <ExpandingCard
                title={t('values.cards.cooperation.title')}
                subtitle={t('values.cards.cooperation.subtitle')}
                desc={t('values.cards.cooperation.desc')}
                icon={Handshake}
                image="/mediterranean-fishing-fleet-boats-harbor-tunisia.jpg"
                index={1}
              />
              <ExpandingCard
                title={t('values.cards.responsibility.title')}
                subtitle={t('values.cards.responsibility.subtitle')}
                desc={t('values.cards.responsibility.desc')}
                icon={Leaf}
                image="/fishing-boat-nets-mediterranean-sea-sunrise-profes.jpg"
                index={2}
              />
            </div>
          </section>

          {/* SECTION 4: VISION (Cinematic Typographic Manifesto) */}
          <section className="relative flex min-h-[90vh] flex-col items-start justify-center overflow-hidden bg-white py-24">
            {/* Oversized background wordmark */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 start-0 w-full -translate-y-1/2 overflow-hidden opacity-[0.035]"
            >
              <span className="block font-display text-[20vw] leading-none font-bold whitespace-nowrap text-tafc-ink">
                {t('vision.bgText')}
              </span>
            </div>

            <div className="container-tafc relative z-10 grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
              >
                <Eyebrow>{t('vision.badge')}</Eyebrow>
                <h2 className="mt-6 font-display text-display text-balance text-tafc-ink">
                  {t('vision.titlePart1')}<br />
                  <span className="text-tafc-accent">{t('vision.titleHighlight')}</span><br />
                  {t('vision.titlePart2')}
                </h2>
                <p className="mt-10 max-w-xl border-t border-tafc-ink/[0.08] pt-8 font-serif text-h3 text-tafc-ink/70 italic">
                  &ldquo;{t('hero.slogan')}&rdquo;
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="relative"
              >
                <div className="relative isolate z-10 flex min-h-[32rem] flex-col justify-between overflow-hidden rounded-2xl bg-tafc-ink p-10 text-white md:p-14">
                  <div
                    aria-hidden="true"
                    className="absolute -top-1/4 -end-1/4 -z-10 size-[25rem] rounded-full bg-tafc-accent/[0.12] blur-[100px]"
                  />

                  <div>
                    <span className="mb-8 flex size-14 items-center justify-center rounded-xl bg-tafc-accent/10 ring-1 ring-inset ring-tafc-accent/20">
                      <Globe2 aria-hidden="true" className="size-6 text-tafc-accent" />
                    </span>
                    <h3 className="font-display text-h2 text-white">{t('vision.card.title')}</h3>
                    <p className="mt-6 text-deck text-white/60">
                      {t('vision.card.description')}
                    </p>
                  </div>

                  <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                    <Button asChild size="xl" variant="action">
                      <Link href="/contact">{t('vision.card.ctaContact')}</Link>
                    </Button>
                    <Button asChild size="xl" variant="onInk">
                      <Link href="/products">{t('vision.card.ctaCatalog')}</Link>
                    </Button>
                  </div>
                </div>

                {/* Offset outline behind the panel */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-7 -end-7 -z-10 size-full rounded-2xl border border-tafc-ink/10"
                />
              </motion.div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}

// COMPONENT: Expanding Card (Values)
function ExpandingCard({
  title,
  subtitle,
  desc,
  icon: Icon,
  image,
  index,
}: {
  title: string
  subtitle: string
  desc: string
  icon: LucideIcon
  image: string
  index: number
}) {
  return (
    <motion.div
      layout
      className="group relative isolate h-[400px] cursor-pointer overflow-hidden rounded-2xl transition-[flex] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:h-full md:flex-1 md:hover:flex-[2.5]"
    >
      {/* Background Image (Reveals on Hover/Active) */}
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-40 transition-all duration-1000 ease-out group-hover:scale-[1.08] group-hover:opacity-65"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-tafc-ink via-tafc-ink/55 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70"
      />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <div className="absolute top-8 start-8 flex items-center gap-4 md:top-10 md:start-10">
          <span className="flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md transition-colors duration-500 group-hover:border-tafc-accent group-hover:bg-tafc-accent">
            <Icon aria-hidden="true" className="size-5 text-white transition-colors duration-500 group-hover:text-tafc-ink" />
          </span>
          <span className="font-mono text-meta tracking-[0.2em] text-white/40 uppercase">
            0{index + 1}
          </span>
        </div>

        <motion.div layout="position" className="relative z-10">
          <span className="mb-3 block translate-y-4 text-eyebrow text-tafc-accent uppercase opacity-0 transition-all duration-500 delay-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            {subtitle}
          </span>
          <h3 className="font-display text-h1 text-white">
            {title}
          </h3>
          <p className="mt-4 h-auto max-w-md translate-y-4 overflow-hidden text-white/70 opacity-100 transition-all duration-500 delay-200 md:h-0 md:opacity-0 md:group-hover:h-auto md:group-hover:translate-y-0 md:group-hover:opacity-100">
            {desc}
          </p>
        </motion.div>
      </div>

      {/* Interactive Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-white/25"
      />
    </motion.div>
  )
}
