import type React from "react"
import type { Metadata, Viewport } from "next"
import { Schibsted_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { routing, localeMetadata, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import "../globals.css"

// One Latin family, one Arabic family, both with `display: swap`.
//
// Schibsted Grotesk carries everything Latin — display AND body. It replaced
// Sora + Inter, which were two downloads doing one job; the premium read comes
// from setting the display steps at weight 400 with tight tracking, not from a
// second face. `latin-ext` is required for the French copy.
//
// IBM Plex Sans Arabic is new. Arabic previously had no face loaded at all and
// fell back to whatever the system provided, which is why /ar looked unrelated
// to /fr. Three weights cover body, medium emphasis and the data layer.
const schibsted = Schibsted_Grotesk({
    subsets: ["latin", "latin-ext"],
    variable: "--font-schibsted",
    display: "swap",
})

const plexArabic = IBM_Plex_Sans_Arabic({
    subsets: ["arabic", "latin"],
    weight: ["400", "500", "600"],
    variable: "--font-plex-arabic",
    display: "swap",
})

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
    // Salt, matching the page ground — the browser chrome on mobile now blends
    // into the top of the page instead of banding navy above a light hero.
    themeColor: "#f7f8f8",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
}

// Generate static params for all locales
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

// Generate metadata dynamically based on locale
export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params

    // You can import translations here for dynamic SEO
    const messages = await import(`../../messages/${locale}.json`)
    const seo = messages.seo || {}

    const baseUrl = "https://tafc.tn"

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: seo.title || "TAFC - The Tunisian Algerian Fish Company",
            template: seo.titleTemplate || "%s | TAFC",
        },
        description: seo.description || "Premium B2B seafood supplier",
        keywords: [
            "produits de la mer",
            "grossiste poisson",
            "fournisseur B2B",
            "export tunisie",
            "export algerie",
            "poulpe méditerranée",
            "crevettes royales",
            "fruits de mer",
            "HORECA",
            "poisson frais",
            "seafood export",
            "mediterranean fish",
        ],
        authors: [{ name: "TAFC - The Tunisian Algerian Fish Company" }],
        creator: "TAFC",
        publisher: "TAFC",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        openGraph: {
            type: "website",
            locale: locale === 'ar' ? 'ar_SA' : locale === 'en' ? 'en_US' : 'fr_FR',
            url: baseUrl,
            siteName: "TAFC - The Tunisian Algerian Fish Company",
            title: seo.ogTitle || "TAFC - Premium Seafood Excellence",
            description: seo.ogDescription || "Premium seafood from Tunisia and Algeria",
            images: [
                {
                    url: "/products-hero-seafood-display.jpg",
                    width: 1200,
                    height: 630,
                    alt: "TAFC - Premium Seafood",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: seo.ogTitle || "TAFC - Premium Seafood",
            description: seo.twitterDescription || "Premium seafood export",
            images: ["/products-hero-seafood-display.jpg"],
        },
        icons: {
            icon: [{ url: "/logo.png", type: "image/png" }],
            apple: [{ url: "/logo.png", type: "image/png" }],
        },
        manifest: "/manifest.json",
        alternates: {
            canonical: locale === 'fr' ? baseUrl : `${baseUrl}/${locale}`,
            languages: {
                'fr': baseUrl,
                'en': `${baseUrl}/en`,
                'ar': `${baseUrl}/ar`,
            },
        },
    }
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: string }>
}>) {
    const { locale } = await params

    // Validate that the incoming `locale` parameter is valid
    if (!routing.locales.includes(locale as Locale)) {
        notFound()
    }

    // Enable static rendering
    setRequestLocale(locale)

    // Get messages for the current locale
    const messages = await getMessages()

    // Get text direction for the locale
    const direction = localeMetadata[locale as Locale]?.direction || 'ltr'

    return (
        <html
            lang={locale}
            dir={direction}
            className="scroll-smooth"
            // Next needs this to know the smooth scroll is intentional; without
            // it, it warns and force-disables smooth scrolling during route
            // transitions. Declaring it keeps in-page anchor jumps smooth while
            // letting route changes land instantly at the top, which is what you
            // want in both cases.
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <head>
                {/* Preconnect to external resources for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body
                className={cn(
                    schibsted.variable,
                    plexArabic.variable,
                    "font-sans antialiased min-h-screen bg-tafc-salt text-tafc-ink",
                    "selection:bg-tafc-ink selection:text-white"
                )}
            >
                {/* Skip link — first tab stop, visible on focus only. */}
                <a
                    href="#main-content"
                    className="sr-only z-[100] bg-tafc-ink px-6 py-3 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:flex focus:items-center focus:outline-2 focus:outline-offset-2 focus:outline-tafc-accent"
                >
                    Skip to content
                </a>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
                {/* Film grain over the whole viewport. Fixed + pointer-events-none
                    so it composites once and never intercepts a click. */}
                <div aria-hidden="true" className="grain-overlay" />
                <Toaster />
                <Analytics />
            </body>
        </html>
    )
}
