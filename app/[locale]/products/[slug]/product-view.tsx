"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    CheckCircle2,
    Layers,
    MapPin,
    Package,
    Phone,
    Ruler,
    Scale,
    Snowflake,
    Sun,
    ZoomIn,
    Check,
} from "lucide-react"

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

/** Frozen vs fresh, across all three locales. */
function isFrozen(type: string) {
    const t = type.toLowerCase()
    return t.includes("congelé") || t.includes("frozen") || t.includes("مجمد")
}

/** WhatsApp glyph, inlined so the brand mark stays exact at every size. */
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("fill-current", className)}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

/** Spec list row — one recipe for usage and packaging, previously teal vs orange. */
function SpecRow({ icon: Icon, children }: { icon: typeof Package; children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-3 rounded-xl border border-tafc-ink/[0.08] bg-white px-4 py-3">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-tafc-accent" />
            <span className="text-tafc-ink/80">{children}</span>
        </li>
    )
}

/**
 * Product detail.
 *
 * The interactions worth keeping are kept: the `Dialog` image zoom, the variant
 * picker feeding the WhatsApp message, and the mobile fixed CTA bar. What changed
 * is the palette — usage was teal, packaging orange and variants purple, three
 * accent systems on one screen — now one neutral surface with teal as the single
 * accent. `next/link` is also swapped for the locale-aware `Link`, so the
 * breadcrumb and related-products links no longer drop the active locale.
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
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
        },
    }

    const TypeIcon = isFrozen(product.type) ? Snowflake : Sun

    return (
        <div className="min-h-screen bg-tafc-shell pb-24 md:pb-0">
            {/* ---- Breadcrumb rail. `top-20` matches the header's 5rem height. ---- */}
            <nav className="sticky top-20 z-30 hidden border-b border-tafc-ink/[0.08] bg-white/85 backdrop-blur-md md:block">
                <div className="container-tafc flex h-12 items-center gap-2 text-meta text-tafc-ink/50">
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
                    <ChevronRight aria-hidden="true" className="size-3.5 text-tafc-ink/20 rtl:rotate-180" />
                    <Link
                        href={`/products?category=${product.categorySlug}`}
                        className="transition-colors hover:text-tafc-ink"
                    >
                        {product.category}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5 text-tafc-ink/20 rtl:rotate-180" />
                    <span className="truncate font-medium text-tafc-ink">{product.name}</span>
                </div>
            </nav>

            <main className="container-tafc pt-24 pb-12 md:py-16">
                {/* Mobile floating back button */}
                <Link
                    href="/products"
                    className="absolute top-24 start-4 z-20 rounded-full border border-tafc-ink/10 bg-white/90 p-2.5 text-tafc-ink shadow-lg backdrop-blur-sm transition-transform active:scale-95 md:hidden"
                >
                    <ArrowLeft aria-hidden="true" className="size-5 rtl:rotate-180" />
                    <span className="sr-only">{t("backToProducts")}</span>
                </Link>

                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* ---- Image ------------------------------------------------ */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-fit space-y-3 lg:sticky lg:top-36"
                    >
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-2xl border border-tafc-ink/[0.08] bg-white">
                                    <ImageWithSkeleton
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />

                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 flex items-center justify-center bg-tafc-ink/0 transition-colors duration-300 group-hover:bg-tafc-ink/15"
                                    >
                                        <span className="translate-y-3 rounded-full bg-white/95 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <ZoomIn className="size-5 text-tafc-ink" />
                                        </span>
                                    </div>

                                    {/* Tag chips — same recipe as the catalog card. */}
                                    <div className="absolute inset-x-4 top-4 flex max-w-[85%] flex-wrap gap-2">
                                        {product.tags.map((tag, i) => (
                                            <motion.span
                                                key={tag}
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.35 + i * 0.08 }}
                                                className={cn(
                                                    "rounded-full px-2.5 py-1 text-eyebrow uppercase backdrop-blur-sm",
                                                    tag === "Premium" || tag === "Best-seller"
                                                        ? "bg-tafc-accent text-tafc-ink"
                                                        : "bg-tafc-ink/85 text-white"
                                                )}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="w-full max-w-4xl overflow-hidden border-0 bg-transparent p-0 shadow-none">
                                <DialogTitle className="sr-only">
                                    {t("detailedView")} {product.name}
                                </DialogTitle>
                                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-tafc-ink/5 backdrop-blur-sm md:aspect-[4/3]">
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

                        {/* Origin / type — desktop */}
                        <div className="hidden grid-cols-2 gap-3 lg:grid">
                            <div className="rounded-xl border border-tafc-ink/[0.08] bg-white p-4">
                                <p className="mb-2 flex items-center gap-1.5 text-eyebrow text-tafc-ink/45 uppercase">
                                    <MapPin aria-hidden="true" className="size-3 text-tafc-accent" />
                                    {t("origin")}
                                </p>
                                <p className="line-clamp-1 font-display font-semibold text-tafc-ink">
                                    {product.origin}
                                </p>
                            </div>
                            <div className="rounded-xl border border-tafc-ink/[0.08] bg-white p-4">
                                <p className="mb-2 flex items-center gap-1.5 text-eyebrow text-tafc-ink/45 uppercase">
                                    <TypeIcon aria-hidden="true" className="size-3 text-tafc-accent" />
                                    {t("type")}
                                </p>
                                <p className="font-display font-semibold text-tafc-ink">{product.type}</p>
                            </div>
                        </div>
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
                            <h1 className="mt-5 font-display text-h1 text-balance text-tafc-ink">
                                {product.name}
                            </h1>
                            {product.latinName && (
                                <p className="mt-2 text-h3 text-tafc-ink/40 italic">
                                    {product.latinName}
                                </p>
                            )}
                            <p className="mt-4 inline-block text-meta tracking-tight text-tafc-ink/50">
                                TAFC/{product.slug.toUpperCase().slice(0, 8)}-{product.id.padStart(3, "0")}
                            </p>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-deck text-pretty text-tafc-ink/70">
                            {product.description}
                        </motion.p>

                        {/* Origin / type — mobile */}
                        <div className="grid grid-cols-2 gap-3 lg:hidden">
                            <div className="rounded-xl border border-tafc-ink/[0.08] bg-white p-3.5">
                                <p className="mb-1.5 text-eyebrow text-tafc-ink/45 uppercase">{t("origin")}</p>
                                <p className="flex items-center gap-1.5 text-meta font-semibold text-tafc-ink">
                                    <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-tafc-accent" />
                                    {product.origin}
                                </p>
                            </div>
                            <div className="rounded-xl border border-tafc-ink/[0.08] bg-white p-3.5">
                                <p className="mb-1.5 text-eyebrow text-tafc-ink/45 uppercase">{t("type")}</p>
                                <p className="flex items-center gap-1.5 text-meta font-semibold text-tafc-ink">
                                    <TypeIcon aria-hidden="true" className="size-3.5 shrink-0 text-tafc-accent" />
                                    {product.type}
                                </p>
                            </div>
                        </div>

                        {/* Desktop CTAs */}
                        <motion.div variants={itemVariants} className="hidden gap-4 md:flex">
                            <Button
                                asChild
                                size="xl"
                                className="flex-1 border-0 bg-[#25D366] font-semibold text-white transition-colors hover:bg-[#20BD5A]"
                            >
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <WhatsAppIcon className="size-5" />
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

                        <div className="border-t border-tafc-ink/[0.08]" />

                        {/* Usage + packaging */}
                        <div className="grid gap-8 md:grid-cols-2">
                            <motion.div variants={itemVariants}>
                                <h2 className="eyebrow-rule mb-4 inline-flex items-center text-eyebrow text-tafc-ink/55 uppercase">
                                    {t("recommendedUsage")}
                                </h2>
                                <ul className="flex flex-col gap-2">
                                    {product.usage.map((use) => (
                                        <SpecRow key={use} icon={CheckCircle2}>
                                            {use}
                                        </SpecRow>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h2 className="eyebrow-rule mb-4 inline-flex items-center text-eyebrow text-tafc-ink/55 uppercase">
                                    {t("packaging")}
                                </h2>
                                <ul className="flex flex-col gap-2">
                                    {product.formats.map((format) => (
                                        <SpecRow key={format} icon={Package}>
                                            {format}
                                        </SpecRow>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Variants — selection flows into the WhatsApp message */}
                        {product.variants && product.variants.length > 0 && (
                            <motion.div variants={itemVariants}>
                                <h2 className="eyebrow-rule mb-4 inline-flex items-center text-eyebrow text-tafc-ink/55 uppercase">
                                    {t("availableVariants")}
                                </h2>
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

                                        const getIcon = () => {
                                            switch (variant.kind) {
                                                case "size":
                                                    return <Ruler className="size-3.5" />
                                                case "caliber":
                                                    return <Scale className="size-3.5" />
                                                case "preparation":
                                                    return <Layers className="size-3.5" />
                                                default:
                                                    return <Package className="size-3.5" />
                                            }
                                        }

                                        const isSelected = selectedVariant === label

                                        return (
                                            <button
                                                key={idx}
                                                type="button"
                                                aria-pressed={isSelected}
                                                onClick={() => setSelectedVariant(isSelected ? null : label)}
                                                className={cn(
                                                    "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-meta font-medium transition-colors duration-200",
                                                    isSelected
                                                        ? "bg-tafc-ink text-white"
                                                        : "border border-tafc-ink/12 bg-white text-tafc-ink/70 hover:border-tafc-accent/50 hover:text-tafc-ink"
                                                )}
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={isSelected ? "text-tafc-accent" : "text-tafc-accent/70"}
                                                >
                                                    {isSelected ? <Check className="size-3.5" /> : getIcon()}
                                                </span>
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
                        y={32}
                        duration={0.8}
                        className="mt-20 border-t border-tafc-ink/[0.08] pt-14 md:mt-28"
                    >
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <Eyebrow>{t("discoverMore")}</Eyebrow>
                                <h2 className="mt-4 font-display text-h2 text-tafc-ink">{t("similar")}</h2>
                            </div>
                            <Button asChild variant="quiet" size="inline" className="text-tafc-ink/60">
                                <Link href={`/products?category=${product.categorySlug}`}>
                                    <span className="hidden sm:inline">{t("viewAll")}</span>
                                    <span className="sm:hidden">{t("all")}</span>
                                    <ArrowRight aria-hidden="true" className="size-4 rtl:rotate-180" />
                                </Link>
                            </Button>
                        </div>

                        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:px-0 sm:pb-0 lg:grid-cols-3">
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
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 bottom-0 z-40 border-t border-tafc-ink/[0.08] bg-white/92 p-4 backdrop-blur-xl md:hidden"
            >
                <div className="mx-auto flex max-w-sm gap-3">
                    <Button
                        asChild
                        size="lg"
                        className="h-12 flex-1 rounded-full border-0 bg-[#25D366] font-semibold text-white hover:bg-[#20BD5A]"
                    >
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <WhatsAppIcon className="size-4" />
                            {t("whatsappQuote")}
                        </a>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="size-12 flex-none rounded-full border-tafc-ink/12 px-0 text-tafc-ink/70"
                    >
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
