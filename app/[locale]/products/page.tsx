"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, X, SlidersHorizontal, Check } from "lucide-react"
import Image from "next/image"
import { useTranslations, useMessages } from "next-intl"
import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/ui/product-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Eyebrow } from "@/components/ui/section-intro"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  products,
  categories,
  type TranslatedProduct,
  getTranslatedProducts,
  type ProductsDataTranslations,
} from "@/lib/products-data"

const CARD_GRID = "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category")

  // Get translations
  const t = useTranslations("productsData.ui")
  const messages = useMessages()
  const productsDataTranslations = (messages as { productsData?: ProductsDataTranslations })
    .productsData

  // Get translated products
  const translatedProducts = useMemo(() => {
    if (productsDataTranslations) {
      return getTranslatedProducts(products, productsDataTranslations)
    }
    return products as TranslatedProduct[]
  }, [productsDataTranslations])

  // Get translated categories
  const translatedCategories = useMemo(() => {
    if (productsDataTranslations) {
      return categories.map((cat) => ({
        ...cat,
        name: productsDataTranslations.categories[cat.slug]?.name || cat.name,
      }))
    }
    return categories
  }, [productsDataTranslations])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all")
  const [sortBy, setSortBy] = useState("name")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Sync state with URL param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    } else {
      setSelectedCategory("all")
    }
  }, [categoryParam])

  // Filtering Logic - uses translated products
  const filteredProducts = useMemo(() => {
    let result = [...translatedProducts]

    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.origin.toLowerCase().includes(query) ||
          (p.latinName && p.latinName.toLowerCase().includes(query))
      )
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "category") {
      result.sort((a, b) => a.category.localeCompare(b.category))
    }

    return result
  }, [translatedProducts, searchQuery, selectedCategory, sortBy])

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug)
    if (slug === "all") {
      router.push("/products", { scroll: false })
    } else {
      router.push(`/products?category=${slug}`, { scroll: false })
    }
    setShowMobileFilters(false) // Close mobile drawer on selection
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSortBy("name")
    router.push("/products", { scroll: false })
  }

  const hasActiveFilters = searchQuery || (selectedCategory && selectedCategory !== "all")

  // Grouping logic for "All" view - uses translated products and categories
  const groupedProducts = useMemo(() => {
    if (hasActiveFilters) return null // Don't group if filtered

    return translatedCategories
      .map((cat) => ({
        ...cat,
        items: translatedProducts.filter((p) => p.categorySlug === cat.slug),
      }))
      .filter((group) => group.items.length > 0)
  }, [hasActiveFilters, translatedCategories, translatedProducts])

  /** One recipe for the category list, reused by the sidebar and the mobile drawer. */
  const categoryButton = (slug: string, label: string) => (
    <button
      key={slug}
      onClick={() => handleCategoryChange(slug)}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3 text-start text-sm transition-colors duration-200",
        selectedCategory === slug
          ? "bg-tafc-ink font-medium text-white"
          : "text-tafc-ink/65 hover:bg-tafc-ink/[0.05] hover:text-tafc-ink"
      )}
    >
      <span>{label}</span>
      {selectedCategory === slug && (
        <Check aria-hidden="true" className="size-4 shrink-0 text-tafc-accent" />
      )}
    </button>
  )

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-eyebrow text-tafc-ink/55 uppercase">{t("filterCategories")}</h2>
        <div className="space-y-1">
          {categoryButton("all", t("filterAllCategories"))}
          {translatedCategories.map((category) => categoryButton(category.slug, category.name))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="border-t border-tafc-ink/[0.08] pt-6">
          <h2 className="mb-4 text-eyebrow text-tafc-ink/55 uppercase">{t("filterSortBy")}</h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-11 w-full border-tafc-ink/12 bg-white">
              <SelectValue placeholder={t("filterSortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("filterSortName")}</SelectItem>
              <SelectItem value="category">{t("filterSortCategory")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {hasActiveFilters && (
        <div className="border-t border-tafc-ink/[0.08] pt-6">
          <Button variant="outline" onClick={clearFilters} className="w-full rounded-full">
            {t("filterReset")}
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      <Header />
      <main className="min-h-screen bg-tafc-shell">
        {/* ---- Catalog hero band ---------------------------------------- */}
        <section className="relative isolate overflow-hidden bg-tafc-ink pt-32 pb-16 md:pt-40 md:pb-20">
          <Image
            src="/products-hero-seafood-display.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="-z-10 object-cover object-center"
          />
          {/* Scrim: keeps the display type legible over the photograph. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-tafc-ink via-tafc-ink/88 to-tafc-ink/55 rtl:bg-gradient-to-l"
          />

          <div className="container-tafc">
            <Reveal className="max-w-3xl">
              <Eyebrow tone="ink">{t("heroCatalog")}</Eyebrow>
              <h1 className="mt-5 font-display text-h1 text-balance text-white">
                {t("heroTitle")} <span className="text-tafc-accent">{t("heroHighlight")}</span>{" "}
                {t("heroSubtitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-deck text-pretty text-white/60">
                {t("heroDescription")}
              </p>
              {/* Trust line — the three fake numbered "chef" avatars are gone; the
                  claim stands on its own rather than on invented faces. */}
              <p className="mt-8 inline-flex items-center gap-2 border-t border-white/15 pt-6 text-meta text-white/70 uppercase tracking-[0.14em]">
                {t("heroApprovedBy")}
                <span className="font-display text-base font-semibold tracking-normal text-tafc-accent">
                  {t("heroChefs")}
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Catalog ------------------------------------------------- */}
        <section className="section-y-tight">
          <div className="container-tafc">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-14">
              {/* Sidebar filters (desktop) */}
              <aside className="hidden shrink-0 lg:block lg:w-60">
                <div className="lg:sticky lg:top-28">{filterPanel}</div>
              </aside>

              {/* Mobile filter drawer */}
              {showMobileFilters && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-white p-6 lg:hidden">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="eyebrow-rule inline-flex items-center text-eyebrow text-tafc-ink/55 uppercase">
                      {t("filterCategories")}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileFilters(false)}
                      className="rounded-full"
                    >
                      <X className="size-5" />
                      <span className="sr-only">{t("filterCategories")}</span>
                    </Button>
                  </div>
                  {filterPanel}
                </div>
              )}

              {/* Products */}
              <div className="min-w-0 flex-1">
                {/* Toolbar */}
                <div className="mb-10 space-y-4">
                  <div className="relative max-w-2xl">
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute start-4 top-1/2 size-4.5 -translate-y-1/2 text-tafc-ink/35"
                    />
                    <input
                      type="text"
                      placeholder={t("searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-13 w-full rounded-full border border-tafc-ink/12 bg-white ps-12 pe-12 text-base text-tafc-ink placeholder:text-tafc-ink/35 focus:border-tafc-accent/50 focus:ring-3 focus:ring-tafc-accent/20 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute end-4 top-1/2 -translate-y-1/2 text-tafc-ink/40 transition-colors hover:text-tafc-ink"
                      >
                        <X className="size-4" />
                        <span className="sr-only">{t("filterReset")}</span>
                      </button>
                    )}
                  </div>

                  {/* Mobile filter + sort */}
                  <div className="flex gap-3 lg:hidden">
                    <Button
                      variant="outline"
                      onClick={() => setShowMobileFilters(true)}
                      className="h-12 flex-1 rounded-full"
                    >
                      <SlidersHorizontal aria-hidden="true" className="size-4" />
                      {t("filterCategories")}
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-12 flex-1 rounded-full border-tafc-ink/12 bg-white">
                        <SelectValue placeholder={t("filterSortBy")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">{t("filterSortName")}</SelectItem>
                        <SelectItem value="category">{t("filterSortCategory")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {groupedProducts ? (
                  // VIEW 1: GROUPED BY CATEGORY (Default)
                  <div className="space-y-20">
                    {groupedProducts.map((group) => (
                      <section key={group.slug} id={group.slug} className="scroll-mt-28">
                        <SectionHeader
                          title={group.name}
                          description={`${t("discoverPremium")} ${group.name.toLowerCase()}.`}
                          className="mb-10"
                        />
                        <div className={CARD_GRID}>
                          {group.items.map((product, idx) => (
                            <ProductCard key={product.id} product={product} index={idx} />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  // VIEW 2: FILTERED FLAT LIST
                  <div>
                    <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-tafc-ink/[0.08] pb-6">
                      <h2 className="font-display text-h2 text-tafc-ink">
                        {selectedCategory !== "all"
                          ? translatedCategories.find((c) => c.slug === selectedCategory)?.name
                          : t("resultsTitle")}
                      </h2>
                      <span className="text-meta text-tafc-ink/50 uppercase tracking-[0.14em]">
                        {filteredProducts.length} {t("productsCount")}
                      </span>
                    </div>

                    {filteredProducts.length > 0 ? (
                      <div className={CARD_GRID}>
                        {filteredProducts.map((product, index) => (
                          <ProductCard key={product.id} product={product} index={index} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-tafc-ink/15 bg-white py-20 text-center">
                        <Search
                          aria-hidden="true"
                          className="mx-auto mb-5 size-10 text-tafc-ink/15"
                        />
                        <h3 className="font-display text-h3 text-tafc-ink">
                          {t("searchNoResults")}
                        </h3>
                        <p className="mx-auto mt-3 max-w-sm text-tafc-ink/55">
                          {t("searchNoResultsDesc")}
                        </p>
                        <Button
                          onClick={clearFilters}
                          variant="ink"
                          className="mt-7 rounded-full px-6"
                        >
                          {t("viewCatalog")}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function ProductsSkeleton() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-tafc-shell">
        <div className="h-[22rem] w-full bg-tafc-ink md:h-[26rem]" />
        <div className="container-tafc section-y-tight">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-14">
            <div className="hidden shrink-0 space-y-3 lg:block lg:w-60">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="min-w-0 flex-1">
              <Skeleton className="mb-10 h-13 max-w-2xl rounded-full" />
              <div className={CARD_GRID}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent />
    </Suspense>
  )
}
