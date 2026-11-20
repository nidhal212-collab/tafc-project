"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { SectionIntro } from "@/components/ui/section-intro"

/**
 * HORECA band — the page's one cinematic break.
 *
 * The facility footage used to sit in a contained, rounded 16/9 card with a
 * caption under it, on a light surface, below a centred header. That framing made
 * the strongest asset on the page look like an embed. It is now the surface
 * itself: full-bleed video, flat scrim, type over the top, one solid salt CTA.
 * The band runs edge to edge between two contained sections, so the footage is
 * its own surface — the third one on the page, and the only one that is neither
 * salt nor ink.
 *
 * The scrim was a three-stop vertical gradient reaching two thirds up the frame.
 * It is now a flat `bg-tafc-ink/55` wash plus a short bottom gradient under the
 * type: flat is what keeps the footage looking like footage rather than like a
 * darkened photograph.
 *
 * Earlier fixes that still hold: this rendered an `<h1>`, giving the homepage a
 * second top-level heading — it is an `<h2>` via `SectionIntro`. The warm cream
 * `#f5f3ef` background, the only off-palette surface on the site, and the coral
 * blur that competed with the CTA are both gone. The mono decoration strip
 * under the footage is gone too; the band closes on the video itself.
 */
export function TargetClients() {
  const t = useTranslations("targetClients")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  // Lazy-load + autoplay video
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVideoVisible(true)
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.35, rootMargin: "200px" }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative isolate flex min-h-[38rem] items-center overflow-hidden bg-tafc-ink lg:min-h-[85svh]">
      {/* ---- Footage ------------------------------------------------------ */}
      <video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="none"
        poster="/fresh-sea-bass-fish-on-ice.jpg"
      >
        {isVideoVisible && (
          <source src="/2882090-Uhd%203840%202160%2024Fps.mp4" type="video/mp4" />
        )}
      </video>

      {/* Scrim: a flat wash for legibility, plus a short bottom gradient so the
          type block has ground under it without darkening the whole frame. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-tafc-ink/55" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-tafc-ink/75 to-transparent"
      />

      {/* ---- Type -------------------------------------------------------- */}
      <div className="container-tafc relative pb-10 pt-24 lg:pt-24">
        <div className="max-w-3xl">
          <SectionIntro
            tone="ink"
            size="h1"
            title={
              <>
                {t("titlePart1")} <span className="font-medium">{t("titleHighlight")}</span>
                <br />
                {t("titlePart2")}
              </>
            }
            deck={t("description")}
            action={
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Button asChild size="xl" variant="salt">
                  <Link href="/products">{t("ctaPrimary")}</Link>
                </Button>
                <Button
                  asChild
                  size="inline"
                  variant="quiet"
                  className="font-medium text-white/85 rtl:hover:[&_svg]:-translate-x-1"
                >
                  <Link href="/about">
                    {t("ctaSecondary")}
                    <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            }
          />
        </div>
      </div>

      {/* ---- Caption rail ------------------------------------------------ */}
      {/* The band closes on the footage itself. The old mono decoration strip
          ("FRESH - DAILY - PREMIUM") carried no information the headline and
          scrim had not already delivered. */}
    </section>
  )
}
