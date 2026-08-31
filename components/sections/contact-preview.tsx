"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionShell, InkGlow } from "@/components/ui/section-shell"
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
    icon: Facebook,
    label: "Facebook",
  },
  { href: "https://www.instagram.com/tafc.seafood/", icon: Instagram, label: "Instagram" },
] as const

/**
 * Closing conversion band, on navy so it flows straight into the dark footer
 * instead of stopping at a light seam.
 *
 * Restructured from a 50/50 split with a live Google Maps iframe filling half the
 * band. Two problems with that: the interactive map was the largest and heaviest
 * element in the page's most important section, and it pulled focus from the one
 * action that matters. The contact details are now three spec columns across the
 * full width, and the map is a desaturated full-bleed strip along the bottom —
 * still a real map, but doing the job of a location graphic and handing off into
 * the footer.
 */
export function ContactPreview() {
  const t = useTranslations("contact")

  const rows = [
    { icon: Mail, label: t("channels.email"), values: ["info@tafc.tn"] },
    { icon: Phone, label: t("channels.phone"), values: ["+216 98 62 11 28", "+216 98 62 19 38"] },
    { icon: MapPin, label: t("channels.based"), values: [t("location")] },
  ]

  return (
    <>
      <SectionShell tone="ink">
        <InkGlow className="-bottom-48 end-0" />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionIntro
            eyebrow={t("badge")}
            title={t("title")}
            deck={t("description")}
            tone="ink"
            className="max-w-2xl"
          />

          <Reveal delay={0.1} className="shrink-0 lg:pb-2">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
              <Button asChild size="xl" variant="action">
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
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-tafc-accent/60 hover:text-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/40 focus-visible:outline-none"
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
          <dl className="grid gap-px border-t border-tafc-ink-line sm:grid-cols-3 sm:gap-0">
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`flex flex-col gap-3 border-b border-tafc-ink-line py-6 sm:border-b-0 ${
                  index > 0 ? "sm:border-s sm:border-tafc-ink-line sm:ps-8" : ""
                } ${index < rows.length - 1 ? "sm:pe-8" : ""}`}
              >
                <dt className="flex items-center gap-2.5">
                  <row.icon aria-hidden="true" className="size-3.5 shrink-0 text-tafc-accent" />
                  <DataLabel tone="ink">{row.label}</DataLabel>
                </dt>
                <dd className="flex flex-col gap-1">
                  {row.values.map((value) => (
                    <span key={value} className="font-display text-h3 font-medium text-white">
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
      {/* Full-bleed, desaturated, and flush against the footer, with a navy fade
          over the top edge so it reads as part of the band rather than a
          pasted-in embed. It sits outside `SectionShell` so the shell's bottom
          padding doesn't leave a navy gap above it. */}
      <div className="relative isolate bg-tafc-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-tafc-ink to-transparent"
        />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311542.5044073225!2d8.5!3d36.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x125595448316a4e1%3A0x3a84333aaa019bef!2sTunisia!5e0!3m2!1sen!2sus!4v1234567890"
          width="100%"
          height="100%"
          className="block h-[16rem] w-full border-0 opacity-70 contrast-110 grayscale lg:h-[22rem]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("mapTitle")}
        />
      </div>
    </>
  )
}
