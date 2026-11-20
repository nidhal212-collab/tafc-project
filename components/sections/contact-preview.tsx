"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell } from "@/components/ui/section-shell"
import { SectionIntro } from "@/components/ui/section-intro"
import { DataLabel } from "@/components/ui/spec"

/**
 * The four social links here all pointed at `"#"`. These are the real accounts,
 * already present on the contact page. LinkedIn and YouTube are dropped rather
 * than shipped dead — a link that goes nowhere costs more trust than a missing
 * icon does.
 */
const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/profile.php?id=61585917932963",
    icon: FacebookLogo,
    label: "Facebook",
  },
  { href: "https://www.instagram.com/tafc.seafood/", icon: InstagramLogo, label: "Instagram" },
] as const

/**
 * Closing conversion band, and the second of the page's two ink bands. It sits on
 * ink so it flows straight into the dark footer instead of stopping at a light
 * seam — the page closes on one continuous dark block.
 *
 * Restructured from a 50/50 split with a live Google Maps iframe filling half the
 * band. Two problems with that: the interactive map was the largest and heaviest
 * element in the page's most important section, and it pulled focus from the one
 * action that matters. The contact details are now three spec columns across the
 * full width — the same hairline device as the product cards and the ranges
 * index, at band scale.
 *
 * The channel labels carry no icons. "Email", "Téléphone" and "Basé à" already
 * say what an envelope, a handset and a pin would say, and on a dark band three
 * accent-coloured glyphs are three objects competing with the values beside them.
 */
export function ContactPreview() {
  const t = useTranslations("contact")

  const rows = [
    { label: t("channels.email"), values: ["info@tafc.tn"] },
    { label: t("channels.phone"), values: ["+216 98 62 11 28", "+216 98 62 19 38"] },
    { label: t("channels.based"), values: [t("location")] },
  ]

  return (
    <>
      <SectionShell tone="ink">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionIntro
            title={t("title")}
            deck={t("description")}
            tone="ink"
            className="max-w-2xl"
          />

          <Reveal delay={0.1} className="shrink-0 lg:pb-2">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
              <Button asChild size="xl" variant="salt">
                <Link href="/contact">{t("cta")}</Link>
              </Button>

              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-11 items-center justify-center rounded-sm border border-white/20 text-white/75 transition-colors hover:border-tafc-accent-bright hover:text-tafc-accent-bright focus-visible:ring-3 focus-visible:ring-tafc-accent-bright/40 focus-visible:outline-none"
                  >
                    <social.icon aria-hidden="true" className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- Channels --------------------------------------------------- */}
        <Reveal delay={0.16} className="mt-16">
          <dl className="grid border-t border-white/10 sm:grid-cols-3">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`flex flex-col gap-3 border-b border-white/10 py-7 sm:border-b-0 ${
                  index > 0 ? "sm:border-s sm:border-white/10 sm:ps-8" : ""
                } ${index < rows.length - 1 ? "sm:pe-8" : ""}`}
              >
                <dt>
                  <DataLabel tone="ink">{row.label}</DataLabel>
                </dt>
                <dd className="flex flex-col gap-1">
                  {row.values.map((value) => (
                    <span key={value} className="font-display text-h3 text-white">
                      {value}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </SectionShell>

      {/* ---- Location strip ------------------------------------------------ */}
      {/* A fabricated-token country-level embed communicates no address and
          third-parties a slow iframe on every page load. The locations are
          stated instead: two shores, one line each, flush against the footer
          so the band still reads as one dark block. The harbor photograph
          sits behind at low opacity under an ink wash — the same treatment
          the footer's ocean band uses — so the strip is a place, not a
          text-on-ink gap. */}
      <div className="relative isolate border-t border-white/10 bg-tafc-ink">
        <Image
          src="/mediterranean-fishing-boats-harbor-tunisia-sunrise.jpg"
          alt=""
          aria-hidden="true"
          fill
          quality={70}
          sizes="100vw"
          className="photo-grade object-cover object-center opacity-[0.16]"
        />
        {/* Ink wash: keeps the strip unmistakably part of the band while the
            photo gives it depth underneath. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-tafc-ink via-tafc-ink/85 to-tafc-ink/60 rtl:bg-gradient-to-l"
        />
        <div className="container-tafc relative py-12">
          <dl className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <dt>
                <DataLabel tone="ink">{t("channels.based")}</DataLabel>
              </dt>
              <dd className="mt-3 font-display text-h2 text-white">{t("location")}</dd>
            </div>
            <div>
              <dt>
                <DataLabel tone="ink">{t("exportLabel")}</DataLabel>
              </dt>
              <dd className="mt-3 font-display text-h2 text-white">{t("exportMarkets")}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}
