"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/ui/language-switcher"

const whatsappNumber = "+21698621128"

/** WhatsApp glyph. Inlined so the brand mark stays exact at every size. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("fill-current", className)}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/**
 * Fixed header.
 *
 * Kept solid white rather than transparent-over-hero. The logo is bright cyan
 * with a navy outline, so on the navy hero the outline and the darker fish
 * stripe would flatten into the background — the pattern reads well on sites
 * whose mark is a single light colour, and TAFC's is not. Instead the scroll
 * state is expressed the way Discefa and Browne Trading do it: a hairline that
 * firms into a shadow, and a small height compression, so the bar recedes as
 * you read.
 */
export function Header() {
  const t = useTranslations("nav")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { href: "/" as const, labelKey: "home" },
    { href: "/products" as const, labelKey: "products" },
    { href: "/about" as const, labelKey: "about" },
    { href: "/contact" as const, labelKey: "contact" },
  ]

  const whatsappMessage = encodeURIComponent(t("whatsappMessage"))

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-white/92 backdrop-blur-md transition-[border-color,box-shadow] duration-500",
        scrolled
          ? "border-tafc-ink/10 shadow-[0_8px_30px_-18px_rgba(4,38,53,0.4)]"
          : "border-tafc-ink/[0.06] shadow-none"
      )}
    >
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
            className="group flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-tafc-accent"
          >
            <Image
              src="/logo.png"
              width={44}
              height={44}
              alt="TAFC"
              className="size-10 object-contain sm:size-11"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1.125rem] font-extrabold tracking-tight text-tafc-ink uppercase">
                TAFC
              </span>
              <span className="text-[0.6875rem] tracking-[0.08em] text-tafc-ink/55 sm:text-xs">
                {t("companyTagline")}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 text-sm font-medium text-tafc-ink/75 transition-colors duration-300 hover:text-tafc-ink"
              >
                {t(item.labelKey)}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 start-0 h-px w-0 bg-tafc-accent transition-all duration-300 ease-out group-hover:w-full"
                />
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <Button
              asChild
              className="rounded-full border-0 bg-[#25D366] px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20BD5A] hover:shadow-lg hover:shadow-[#25D366]/30"
            >
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-5" />
                WhatsApp
              </a>
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
                    className="rounded-full text-tafc-ink hover:bg-tafc-shell"
                  >
                    <Menu className="size-6" />
                    <span className="sr-only">{t("menu")}</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] border-s border-tafc-ink/10 bg-white p-0 sm:w-[380px]"
                >
                  <SheetTitle className="sr-only">{t("navigation")}</SheetTitle>
                  <div className="flex h-full flex-col">
                    <div className="border-b border-tafc-ink/[0.08] px-6 py-6">
                      <span className="eyebrow-rule inline-flex items-center text-eyebrow text-tafc-ink/55 uppercase">
                        {t("navigation")}
                      </span>
                    </div>
                    <nav className="flex flex-1 flex-col px-6 py-6">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 + index * 0.07 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block border-b border-tafc-ink/[0.08] py-4 font-display text-h3 text-tafc-ink transition-colors last:border-0 hover:text-tafc-accent"
                          >
                            {t(item.labelKey)}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                    <div className="mt-auto border-t border-tafc-ink/[0.08] p-6">
                      <Button
                        asChild
                        size="xl"
                        className="w-full border-0 bg-[#25D366] font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20BD5A]"
                        onClick={() => setOpen(false)}
                      >
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon className="size-5" />
                          WhatsApp
                        </a>
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
              <Button variant="ghost" size="icon-lg" className="rounded-full text-tafc-ink">
                <Menu className="size-6" />
                <span className="sr-only">{t("menu")}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  )
}
