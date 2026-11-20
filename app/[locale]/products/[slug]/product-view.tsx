"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import {
    ArrowLeft,
    ArrowRight,
    CaretRight,
    MagnifyingGlassPlus,
    Phone,
    WhatsappLogo,
} from "@phosphor-icons/react"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ui/product-card"
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton"
import { Reveal } from "@/components/ui/reveal"
import { Eyebrow } from "@/components/ui/section-intro"
import type { Product, TranslatedProduct } from "@/lib/products-data"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

interface ProductViewProps {
    product: Product | TranslatedProduct
    relatedProducts: (Product | TranslatedProduct)[]
}

const whatsappNumber = "+21698621128"

/**
 * WhatsApp green is the one colour exempt from the palette: a buyer scanning for
 * that channel is scanning for that green. The label is **ink, not white** —
 * white on `#25D366` is 2.0:1 and fails AA at any size, while ink on it is
 * 9.5:1, and 7.6:1 on the darker hover.
 */
const WHATSAPP_CTA =
    "bg-[#25D366] font-medium text-tafc-ink hover:bg-[#20BD5A] focus-visible:ring-3 focus-visible:ring-[#25D366]/40"

/** Specification row — the site's hairline list, no glyph. The label above it already says which list this is. */
function SpecRow({ children }: { children: React.ReactNode }) {
    return (
        <li className="border-b border-tafc-ink/12 py-3 text-meta text-tafc-ink/80">{children}</li>
    )
}

/**
 * Product detail.
 *
 * The interactions worth keeping are kept: the `Dialog` image zoom, the variant
 * picker feeding the WhatsApp message, and the mobile fixed CTA bar. What changed
 * is the vocabulary. Usage was teal, packaging orange and variants purple — three
 * accent systems on one screen — and each spec line arrived as a rounded box with
 * its own icon. Both lists are now the same hairline `<dl>` / `<ul>` device used
 * by the product cards and the ranges index, so the page reads as one document
 * rather than as three widget families stacked up.
 *
 * `latinName` keeps its italic. A Latin binomial is a real typographic
 * convention, unlike the decorative italics that were removed elsewhere.
 */
export function ProductView({ product, relatedProducts }: ProductViewProps) {
    const t = useTranslations("productsData.ui")
    const tNav = useTranslations("nav")
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

    // Build WhatsApp message with optional selected variant
    const buildWhatsAppMessage = () => {
        let message = `${tNav("whatsappMessage")} - ${product.name}`
        if (selectedVariant) {
            message += ` (${selectedVariant})`
        }
        return encodeURIComponent(message)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.09,
                delayChildren: 0.15,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, transform: "translateY(18px)" },
        visible: {
            opacity: 1,
            transform: "translateY(0px)",
            transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const },
        },
    }

    /** Origin / type, one recipe for both breakpoints. The spec-grid device at detail scale. */
    const originType = (
        <dl className="grid grid-cols-2 border-t border-tafc-ink/12">
            <div className="pt-4">
                <dt className="text-data text-tafc-ink/60 uppercase">{t("origin")}</dt>
                <dd className="mt-1 truncate font-display text-h3 text-tafc-ink" title={product.origin}>
                    {product.origin}
                </dd>
            </div>
            <div className="border-s border-tafc-ink/12 ps-5 pt-4">
                <dt className="text-data text-tafc-ink/60 uppercase">{t("type")}</dt>
                <dd className="mt-1 truncate font-display text-h3 text-tafc-ink" title={product.type}>
                    {product.type}
                </dd>
            </div>
        </dl>
    )

    return (
        <div className="min-h-screen bg-tafc-salt pb-24 md:pb-0">
            {/* ---- Breadcrumb rail. `top-20` matches the header's 5rem height.
                  Floating chrome: content scrolls under it, separated by the same
                  hairline every other seam on the site uses. ---- */}
            <nav className="glass-surface sticky top-20 z-30 hidden border-b border-tafc-ink/12 bg-tafc-salt/85 backdrop-blur-xl md:block">
                <div className="container-tafc flex h-12 items-center gap-2 text-meta text-tafc-ink/55">
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-1.5 transition-colors hover:text-tafc-ink"
                    >
                        <ArrowLeft
                            aria-hidden="true"
                            className="size-3.5 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
                        />
                        {t("backToProducts")}
                    </Link>
                    <CaretRight aria-hidden="true" className="size-3.5 text-tafc-ink/25 rtl:rotate-180" />
                    <Link
                        href={`/products?category=${product.categorySlug}`}
                        className="transition-colors hover:text-tafc-ink"
                    >
                        {product.category}
                    </Link>
                    <CaretRight aria-hidden="true" className="size-3.5 text-tafc-ink/25 rtl:rotate-180" />
                    <span className="truncate font-medium text-tafc-ink">{product.name}</span>
                </div>
            </nav>

            <main id="main-content" className="container-tafc pt-24 pb-12 md:py-16">
                {/* Mobile floating back button — the breadcrumb rail is desktop only. */}
                <Link
                    href="/products"
                    className="absolute top-24 start-4 z-20 rounded-sm border border-tafc-ink/15 bg-tafc-paper p-2.5 text-tafc-ink shadow-float transition-transform active:scale-95 md:hidden"
                >
                    <ArrowLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
                    <span className="sr-only">{t("backToProducts")}</span>
                </Link>

                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* ---- Image ------------------------------------------------ */}
                    <motion.div
                        initial={{ opacity: 0, transform: "scale(0.97)" }}
                        animate={{ opacity: 1, transform: "scale(1)" }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        className="relative h-fit space-y-5 lg:sticky lg:top-36"
                    >
                        <Dialog>
                            <DialogTrigger asChild>
                                <div>
                                    {/* Photography is 0px, per the shape rule. A hairline
                                        holds it to the grid instead of a corner radius. */}
                                    <div className="group relative aspect-square cursor-zoom-in overflow-hidden border border-tafc-ink/12 bg-tafc-paper">
                                        <ImageWithSkeleton
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.name}
                                            fill
                                            className="photo-grade object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                            priority
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />

                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-0 flex items-center justify-center bg-tafc-ink/0 transition-colors duration-300 group-hover:bg-tafc-ink/15"
                                        >
                                            <span className="translate-y-3 bg-tafc-paper p-3 opacity-0 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100">
                                                <MagnifyingGlassPlus className="size-5 text-tafc-ink" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Tags as a caption line below the photo, in the data
                                        voice. Never overlaid on the photography, and no
                                        longer two filled pills. */}
                                    {product.tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap items-center gap-2.5 text-data text-tafc-ink/60 uppercase">
                                            {product.tags.map((tag, i) => (
                                                <span key={tag} className="inline-flex items-center gap-2.5">
                                                    {i > 0 && (
                                                        <span
                                                            aria-hidden="true"
                                                            className="h-3 w-px bg-tafc-ink/20"
                                                        />
                                                    )}
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </DialogTrigger>
                            {/* `aria-describedby={undefined}` is Radix's documented
                                opt-out. This dialog is one photograph at a larger
                                size, so the sr-only title is the whole accessible
                                name and there is nothing left to describe; without
                                the opt-out Radix points at a description id that
                                does not exist and warns on every open. */}
                            <DialogContent
                                aria-describedby={undefined}
                                className="w-full max-w-4xl overflow-hidden border-0 bg-transparent p-0 shadow-none"
                            >
                                <DialogTitle className="sr-only">
                                    {t("detailedView")} {product.name}
                                </DialogTitle>
                                <div className="relative aspect-square w-full overflow-hidden bg-tafc-ink/5 md:aspect-[4/3]">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        sizes="90vw"
                                        priority
                                    />
                                </div>
                            </DialogContent>
                        </Dialog>

                        {/* Origin / type — desktop, under the sticky image */}
                        <div className="hidden lg:block">{originType}</div>
                    </motion.div>

                    {/* ---- Details ---------------------------------------------- */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-8"
                    >
                        <motion.div variants={itemVariants}>
                            <Eyebrow>{product.category}</Eyebrow>
                            <h1 className="mt-6 font-display text-h1 text-balance text-tafc-ink">
                                {product.name}
                            </h1>
                            {product.latinName && (
                                <p className="mt-2 text-h3 text-tafc-ink/65 italic">
                                    {product.latinName}
                                </p>
                            )}
                            <p className="mt-5 text-data text-tafc-ink/60 uppercase tabular">
                                TAFC/{product.slug.toUpperCase().slice(0, 8)}-{product.id.padStart(3, "0")}
                            </p>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-deck text-pretty text-tafc-ink/70">
                            {product.description}
                        </motion.p>

                        {/* Origin / type — mobile */}
                        <div className="lg:hidden">{originType}</div>

                        {/* Desktop CTAs */}
                        <motion.div variants={itemVariants} className="hidden gap-4 md:flex">
                            <Button asChild size="xl" className={cn("flex-1 border-0", WHATSAPP_CTA)}>
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <WhatsappLogo aria-hidden="true" className="size-5" />
                                    {t("whatsappQuote")}
                                </a>
                            </Button>
                            <Button asChild size="xl" variant="onLight" className="flex-1">
                                <Link href="/contact">
                                    {t("contact")}
                                    <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Usage + packaging */}
                        <div className="grid gap-8 border-t border-tafc-ink/12 pt-8 md:grid-cols-2">
                            <motion.div variants={itemVariants}>
                                <h2 className="eyebrow-rule mb-4 inline-flex items-center text-eyebrow text-tafc-ink/65 uppercase">
                                    {t("recommendedUsage")}
                                </h2>
                                <ul className="border-t border-tafc-ink/12">
                                    {product.usage.map((use) => (
                                        <SpecRow key={use}>{use}</SpecRow>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h2 className="eyebrow-rule mb-4 inline-flex items-center text-eyebrow text-tafc-ink/65 uppercase">
                                    {t("packaging")}
                                </h2>
                                <ul className="border-t border-tafc-ink/12">
                                    {product.formats.map((format) => (
                                        <SpecRow key={format}>{format}</SpecRow>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Variants — selection flows into the WhatsApp message */}
                        {product.variants && product.variants.length > 0 && (
                            <motion.div variants={itemVariants}>
                                <h2 className="eyebrow-rule mb-4 inline-flex items-center text-eyebrow text-tafc-ink/65 uppercase">
                                    {t("availableVariants")}
                                </h2>
                                {/* Square hairline buttons, ink when selected. The four
                                    kind-specific glyphs (ruler, scale, layers, package)
                                    were decoration on a label that already reads
                                    "Calibre 40/60". */}
                                <div className="flex flex-wrap gap-2.5">
                                    {product.variants.map((variant, idx) => {
                                        let label = ""
                                        if (variant.kind === "size") {
                                            label = `${t("size")} ${variant.value}`
                                        } else if (variant.kind === "caliber") {
                                            label = `${t("caliber")} ${variant.value}`
                                        } else if (variant.kind === "pieces") {
                                            label = `${variant.value} ${t("pieces")}`
                                        } else {
                                            label = variant.value
                                        }

                                        const isSelected = selectedVariant === label

                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                aria-pressed={isSelected}
                                                onClick={() => setSelectedVariant(isSelected ? null : label)}
                                                className={cn(
                                                    "cursor-pointer rounded-sm border px-4 py-2.5 text-meta font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent",
                                                    isSelected
                                                        ? "border-tafc-ink bg-tafc-ink text-white"
                                                        : "border-tafc-ink/15 bg-tafc-paper text-tafc-ink/70 hover:border-tafc-accent hover:text-tafc-ink"
                                                )}
                                            >
                                                {label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* ---- Related --------------------------------------------------- */}
                {relatedProducts.length > 0 && (
                    <Reveal
                        as="section"
                        y={24}
                        duration={0.7}
                        className="mt-24 border-t border-tafc-ink/12 pt-16 md:mt-32"
                    >
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <Eyebrow>{t("discoverMore")}</Eyebrow>
                                <h2 className="mt-6 font-display text-h2 text-tafc-ink">{t("similar")}</h2>
                            </div>
                            <Button asChild variant="quiet" size="inline" className="text-tafc-ink/70">
                                <Link href={`/products?category=${product.categorySlug}`}>
                                    <span className="hidden sm:inline">{t("viewAll")}</span>
                                    <span className="sm:hidden">{t("all")}</span>
                                    <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                                </Link>
                            </Button>
                        </div>

                        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:px-0 sm:pb-0 lg:grid-cols-3">
                            {relatedProducts.map((related, idx) => (
                                <div key={related.id} className="min-w-[80vw] snap-center sm:min-w-0">
                                    <ProductCard product={related} index={idx} />
                                </div>
                            ))}
                        </div>
                    </Reveal>
                )}
            </main>

            {/* ---- Mobile fixed CTA bar -------------------------------------- */}
            <motion.div
                initial={{ opacity: 0, transform: "translateY(100%)" }}
                animate={{ opacity: 1, transform: "translateY(0%)" }}
                transition={{ delay: 0.9, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="glass-surface fixed inset-x-0 bottom-0 z-40 border-t border-tafc-ink/12 bg-tafc-salt/85 p-4 backdrop-blur-xl md:hidden"
            >
                <div className="mx-auto flex max-w-sm gap-3">
                    <Button asChild size="lg" className={cn("h-12 flex-1 border-0", WHATSAPP_CTA)}>
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsappLogo aria-hidden="true" className="size-4.5" />
                            {t("whatsappQuote")}
                        </a>
                    </Button>
                    <Button asChild variant="onLight" className="size-12 flex-none px-0">
                        <Link href="/contact">
                            <Phone aria-hidden="true" className="size-4.5" />
                            <span className="sr-only">{t("contact")}</span>
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
