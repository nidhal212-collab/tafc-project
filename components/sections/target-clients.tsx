"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionIntro } from "@/components/ui/section-intro"

/**
 * HORECA band — the page's one cinematic break.
 *
 * The facility footage used to sit in a contained, rounded 16/9 card with a
 * caption under it, on a light surface, below a centred header. That framing made
 * the strongest asset on the page look like an embed. It is now the surface
 * itself: full-bleed video, navy scrim, type over the top, one coral CTA. The
 * band runs edge to edge between two contained sections, so it also does the
 * structural job of breaking the ink → light → ink rhythm without inventing
 * another background colour.
 *
 * Earlier fixes that still hold: this rendered an `<h1>`, giving the homepage a
 * second top-level heading — it is an `<h2>` via `SectionIntro`. The warm cream
 * `#f5f3ef` background, the only off-palette surface on the site, and the coral
 * blur that competed with the CTA are both gone. The `videoBadge` copy is kept,
 * now as a mono caption on the bottom hairline.
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
    <section className="relative isolate flex min-h-[38rem] flex-col justify-end overflow-hidden bg-tafc-ink lg:min-h-[85svh]">
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

      {/* Scrim: vertical, so the type sits in the darkest part of the frame and
          the footage stays readable in the upper two thirds. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-tafc-ink via-tafc-ink/70 to-tafc-ink/25"
      />

      {/* ---- Type -------------------------------------------------------- */}
      <div className="container-tafc relative pt-32 pb-10 lg:pt-40">
        <div className="max-w-3xl">
          <SectionIntro
            eyebrow={t("badge")}
            tone="ink"
            size="h1"
            title={
              <>
                {t("titlePart1")}{" "}
                <span className="text-tafc-accent italic">{t("titleHighlight")}</span>
                <br />
                {t("titlePart2")}
              </>
            }
            deck={t("description")}
            action={
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <Button asChild size="xl" variant="action">
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
      <div className="relative border-t border-white/[0.12]">
        <div className="container-tafc">
          <p className="py-4 font-mono text-data text-white/50 uppercase">{t("videoBadge")}</p>
        </div>
      </div>
    </section>
  )
}
