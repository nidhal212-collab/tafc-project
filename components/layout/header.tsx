"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { usePathname, Link } from "@/i18n/navigation"
import { motion, useScroll, useMotionValueEvent } from "motion/react"
import { List } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

/**
 * Fixed header.
 *
 * Kept solid rather than transparent-over-hero. The logo is bright cyan with a
 * navy outline, so on a photographic hero the outline and the darker fish stripe
 * would flatten into the background — the transparent-bar pattern reads well on
 * sites whose mark is a single light colour, and TAFC's is not. The hero is now
 * light anyway, so there is nothing to be transparent over.
 *
 * The scroll state is expressed the way Discefa and Browne Trading do it: a
 * hairline that firms into a shadow, and a small height compression, so the bar
 * recedes as you read. That shadow is the only shadow in the design system, and
 * floating chrome is the only thing it is for.
 *
 * The CTA is the solid ink `ink` button. WhatsApp green stays where a
 * conversation starts (product and contact actions), not in global chrome, so
 * one CTA treatment owns the top of every page.
 *
 * There is deliberately no entrance animation. Global chrome should be present
 * on arrival rather than perform on every navigation, and gating the site's
 * navigation behind an animation means the bar is invisible for as long as that
 * animation has not run. The scroll state below is the only motion here.
 */
export function Header() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { href: "/" as const, labelKey: "home" },
    { href: "/products" as const, labelKey: "products" },
    { href: "/about" as const, labelKey: "about" },
    { href: "/contact" as const, labelKey: "contact" },
  ]

  /** Active nav detection: "/" exact, everything else by prefix. */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * Scroll state via Motion's useScroll + a one-shot state flip, instead of a
   * window scroll listener. `useMotionValueEvent` never re-renders on scroll
   * frames; the setState only fires when the boolean actually changes.
   */
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled((prev) => (prev !== y > 20 ? y > 20 : prev))
  })

  return (
    <header
      className={cn(
        "glass-surface fixed inset-x-0 top-0 z-50 bg-tafc-salt/80 backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow] duration-500",
        scrolled ? "shadow-float" : "shadow-none"
      )}
    >
      {/* Scroll-edge fade instead of a hard border: a hairline gradient mask
          where content meets the chrome, present only once the page has moved
          under the bar. Apple's floating-chrome pattern. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(10,15,41,0.14) 18%, rgba(10,15,41,0.14) 82%, transparent)",
        }}
      />
      <div className="container-tafc">
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-500",
            scrolled ? "h-18" : "h-20"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tafc-accent"
          >
            <Image
              src="/logo.png"
              width={44}
              height={44}
              alt="TAFC"
              className="size-10 object-contain sm:size-11"
            />
            <span className="flex flex-col leading-tight">
              {/* Wordmark, not a heading: tracked out at a medium weight rather
                  than set extrabold. Weight is what made the old lockup read as
                  a logo in a tech deck. */}
              <span className="font-display text-[1.0625rem] font-medium tracking-[0.14em] text-tafc-ink uppercase">
                TAFC
              </span>
              <span className="text-[0.6875rem] tracking-[0.08em] text-tafc-ink/65 sm:text-xs">
                {t("companyTagline")}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-2 text-sm font-medium transition-colors duration-300",
                    active ? "text-tafc-ink" : "text-tafc-ink/75 hover:text-tafc-ink"
                  )}
                >
                  {t(item.labelKey)}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 start-0 h-px bg-tafc-accent transition-[width] duration-300 ease-out",
                      active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button asChild variant="ink" size="sm" className="px-6 font-medium">
              <Link href="/contact">{t("cta")}</Link>
            </Button>
          </div>

          {/* Mobile menu — only after mount, to avoid a hydration mismatch */}
          {mounted && (
            <div className="flex items-center gap-2 md:hidden">
              <LanguageSwitcher />
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="text-tafc-ink hover:bg-tafc-ink/[0.06]"
                  >
                    <List className="size-6" />
                    <span className="sr-only">{t("menu")}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] border-s border-tafc-ink/10 bg-tafc-paper p-0 sm:w-[380px]"
                >
                  <SheetTitle className="sr-only">{t("navigation")}</SheetTitle>
                  <div className="flex h-full flex-col">
                    <div className="border-b border-tafc-ink/[0.08] px-6 py-6">
                      <span className="eyebrow-rule inline-flex items-center text-eyebrow text-tafc-ink/65 uppercase">
                        {t("navigation")}
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col px-6 py-6">
                      {navItems.map((item, index) => {
                        const active = isActive(item.href)
                        return (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, transform: "translateX(16px)" }}
                            animate={{ opacity: 1, transform: "translateX(0px)" }}
                            transition={{ delay: 0.08 + index * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-center justify-between border-b border-tafc-ink/[0.08] py-4 font-display text-h3 transition-colors last:border-0",
                                active ? "text-tafc-accent" : "text-tafc-ink hover:text-tafc-accent"
                              )}
                            >
                              {t(item.labelKey)}
                              {active && (
                                <span
                                  aria-hidden="true"
                                  className="size-1.5 rounded-full bg-tafc-accent"
                                />
                              )}
                            </Link>
                          </motion.div>
                        )
                      })}
                    </nav>
                    <div className="mt-auto border-t border-tafc-ink/[0.08] p-6">
                      <Button
                        asChild
                        size="xl"
                        variant="ink"
                        className="w-full font-medium"
                        onClick={() => setOpen(false)}
                      >
                        <Link href="/contact">{t("cta")}</Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

          {/* Pre-mount placeholder, keeps the bar from reflowing on hydration */}
          {!mounted && (
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="ghost" size="icon-lg" className="text-tafc-ink">
                <List className="size-6" />
                <span className="sr-only">{t("menu")}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
