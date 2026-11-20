"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react"
import { Reveal } from "@/components/ui/reveal"

const whatsappNumber = "+21698621128"

const NAV_LINKS = [
  { href: "/" as const, labelKey: "home" },
  { href: "/products" as const, labelKey: "products" },
  { href: "/about" as const, labelKey: "about" },
  { href: "/contact" as const, labelKey: "contact" },
]

const PRODUCT_CATEGORIES = [
  { href: "/products?category=crevettes-crustaces" as const, labelKey: "shrimp" },
  { href: "/products?category=poissons-mediterranee" as const, labelKey: "mediterraneanFish" },
  { href: "/products?category=calamars-poulpes" as const, labelKey: "squidOctopus" },
  { href: "/products?category=saumon-thon" as const, labelKey: "salmonTuna" },
]

/**
 * The four social squares. WhatsApp keeps its own brand green — the documented
 * exemption, because a green WhatsApp glyph is a recognised affordance and a
 * buyer scanning for it is scanning for that colour. Everything else is white.
 */
const SOCIAL_LINKS = [
  {
    href: `https://wa.me/${whatsappNumber}`,
    icon: WhatsappLogo,
    label: "WhatsApp",
    brand: true,
  },
  { href: "mailto:sales@tafc.tn", icon: EnvelopeSimple, label: "Email", brand: false },
  {
    href: "https://www.instagram.com/tafc.seafood/",
    icon: InstagramLogo,
    label: "Instagram",
    brand: false,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61585917932963",
    icon: FacebookLogo,
    label: "Facebook",
    brand: false,
  },
] as const

/** Column heading — cyan hairline, eyebrow label. One recipe for all four. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-6 flex items-center gap-2.5 text-eyebrow text-white uppercase">
      <span aria-hidden="true" className="h-3.5 w-px bg-tafc-accent-bright" />
      {children}
    </h3>
  )
}

/**
 * Site footer.
 *
 * The three social glyphs were hand-drawn `<svg>` paths — 24-line `d` attributes
 * for Instagram, Facebook and WhatsApp inlined into the markup. They are Phosphor
 * logo components now: same marks, one icon family across the site, and nothing
 * to maintain by hand.
 *
 * Both link lists are ruled rows carrying the same `.index-rule` hairline draw as
 * the ranges index on the homepage and the values index on /about. That is the
 * third and last place the device appears, which is what makes it read as the
 * site's one interaction rather than a per-section flourish. The decorative fish
 * glyph beside every category and the four accent pins in the contact column are
 * gone: the rules do the grouping.
 *
 * Two structural fixes still holding. It forced `min-h-[calc(100vh-80px)]`, so
 * every page ended with a full extra viewport of footer — the ocean base
 * stretched to fill it. That is gone; the footer is content-height with a
 * fixed-height base band.
 *
 * The base image was `footer.png` at **7.0 MB**, fetched on every page of the
 * site. It now uses the existing `ocean-waves-pattern.jpg` (176 KB) under the
 * same navy fade, which is a ~97% reduction with no new asset introduced and no
 * binary re-encoded. Swapping the `src` back is a one-line change if the
 * original artwork is preferred and gets compressed later.
 */
export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-tafc-ink text-white">
      {/* Hairline top accent — was a 4px tricolour gradient bar. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tafc-accent-bright/40 to-transparent"
      />

      <div className="container-tafc relative z-10 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* ---- Brand -------------------------------------------------- */}
          <Reveal>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image src="/logo.png" width={40} height={40} alt="TAFC" className="size-10" />
              <span className="flex flex-col leading-tight">
                {/* Same wordmark recipe as the header: tracked out at medium,
                    not set extrabold. */}
                <span className="font-display text-lg font-medium tracking-[0.14em] uppercase">
                  TAFC
                </span>
                <span className="text-[0.6875rem] tracking-[0.08em] text-white/55">
                  {t("brandSubtitle")}
                </span>
              </span>
            </Link>

            <p className="mb-7 max-w-xs text-meta leading-relaxed text-white/65">{t("tagline")}</p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const external = social.href.startsWith("http")
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className={
                      social.brand
                        ? "inline-flex size-10 items-center justify-center rounded-sm border border-[#25D366]/40 text-[#25D366] transition-colors duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-tafc-ink focus-visible:ring-3 focus-visible:ring-[#25D366]/40 focus-visible:outline-none"
                        : "inline-flex size-10 items-center justify-center rounded-sm border border-white/20 text-white/75 transition-colors duration-300 hover:border-tafc-accent-bright hover:text-tafc-accent-bright focus-visible:ring-3 focus-visible:ring-tafc-accent-bright/40 focus-visible:outline-none"
                    }
                  >
                    <social.icon aria-hidden="true" className="size-4.5" />
                  </a>
                )
              })}
            </div>
          </Reveal>

          {/* ---- Navigation --------------------------------------------- */}
          <Reveal delay={0.08}>
            <ColumnHeading>{t("navigation")}</ColumnHeading>
            <ul className="border-t border-white/10">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-white/10">
                  <Link
                    href={link.href}
                    className="group relative block py-3 text-meta text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent-bright"
                  >
                    {tNav(link.labelKey)}
                    <span
                      aria-hidden="true"
                      className="index-rule index-rule-ink absolute inset-x-0 bottom-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Product categories ------------------------------------- */}
          <Reveal delay={0.16}>
            <ColumnHeading>{t("ourProducts")}</ColumnHeading>
            <ul className="border-t border-white/10">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category.href} className="border-b border-white/10">
                  <Link
                    href={category.href}
                    className="group relative block py-3 text-meta text-white/65 transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent-bright"
                  >
                    {t(`productCategories.${category.labelKey}`)}
                    <span
                      aria-hidden="true"
                      className="index-rule index-rule-ink absolute inset-x-0 bottom-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Contact ------------------------------------------------ */}
          <Reveal delay={0.24}>
            <ColumnHeading>{t("contact")}</ColumnHeading>
            <ul className="border-t border-white/10">
              <li className="border-b border-white/10 py-3 text-meta text-white/65">
                {t("location.line1")}
                <br />
                {t("location.line2")}
              </li>
              <li className="border-b border-white/10 py-3">
                <a
                  href={`tel:${whatsappNumber}`}
                  className="text-meta text-white/65 transition-colors hover:text-white tabular"
                >
                  +216 98 621 128
                </a>
              </li>
              <li className="border-b border-white/10 py-3">
                <a
                  href="mailto:sales@tafc.tn"
                  className="text-meta text-white/65 transition-colors hover:text-white"
                >
                  sales@tafc.tn
                </a>
              </li>
              <li className="border-b border-white/10 py-3 text-meta text-white/65">
                {t("hours")}
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-meta text-white/55">{t("copyright", { year: currentYear })}</p>
          {/* Legal links. Routes carry placeholder copy until real legal text
              is supplied. */}
          <nav aria-label={t("navigation")} className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-meta text-white/55 transition-colors hover:text-white"
            >
              {t("legalPrivacy")}
            </Link>
            <Link
              href="/terms"
              className="text-meta text-white/55 transition-colors hover:text-white"
            >
              {t("legalTerms")}
            </Link>
          </nav>
        </div>
      </div>

      {/* ---- Ocean base band ------------------------------------------- */}
      {/* Two gradient stops instead of five: the fade only has to carry the
          footage out of the type area, and five stops was five chances for a
          visible band on a wide screen. */}
      <div className="relative h-24 w-full sm:h-28 md:h-32" aria-hidden="true">
        <Image
          src="/ocean-waves-pattern.jpg"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
          quality={70}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0a0f29 0%, rgba(10, 15, 41, 0.2) 100%)",
          }}
        />
      </div>
    </footer>
  )
}
