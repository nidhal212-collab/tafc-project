"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MagnifyingGlass, X, SlidersHorizontal } from "@phosphor-icons/react"
import { useTranslations, useMessages } from "next-intl"
import { cn } from "@/lib/utils"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/ui/product-card"
import { SectionIntro, Eyebrow } from "@/components/ui/section-intro"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { ProductsSkeleton } from "@/components/ui/products-skeleton"
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

const CARD_GRID = "grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3"

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

  /**
   * One recipe for the category list, reused by the sidebar and the mobile
   * drawer. A filled navy pill for the active filter made the sidebar the
   * heaviest object on a page about photographs; active is now ink type plus the
   * site's `.index-rule` hairline at the reading edge, which is the same marker
   * the homepage ranges index uses.
   */
  const categoryButton = (slug: string, label: string) => {
    const active = selectedCategory === slug
    return (
      <button
        key={slug}
        onClick={() => handleCategoryChange(slug)}
        data-active={active}
        aria-current={active ? "true" : undefined}
        className={cn(
          "group relative block w-full border-b border-tafc-ink/12 py-3 text-start text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent",
          active ? "font-medium text-tafc-ink" : "text-tafc-ink/65 hover:text-tafc-ink"
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className="index-rule absolute inset-x-0 bottom-0"
        />
      </button>
    )
  }

  const filterPanel = (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-eyebrow text-tafc-ink/65 uppercase">{t("filterCategories")}</h2>
        <div className="border-t border-tafc-ink/12">
          {categoryButton("all", t("filterAllCategories"))}
          {translatedCategories.map((category) => categoryButton(category.slug, category.name))}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="border-t border-tafc-ink/12 pt-6">
          <h2 className="mb-4 text-eyebrow text-tafc-ink/65 uppercase">{t("filterSortBy")}</h2>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-11 w-full border-tafc-ink/15 bg-tafc-paper">
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
        <div className="border-t border-tafc-ink/12 pt-6">
          <Button variant="onLight" onClick={clearFilters} className="w-full">
            {t("filterReset")}
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-tafc-salt">
        {/* ---- Catalog hero band ---------------------------------------- */}
        {/* Was a photograph under a horizontal navy scrim. A catalogue page is
            about the photographs in the grid below; putting a seventh one behind
            the title, dark enough to read type over, competed with them and cost
            a full-viewport image fetch before the first product appeared. It is a
            salt band now: type, a hairline, nothing else. */}
        <section className="border-b border-tafc-ink/12 bg-tafc-salt pt-28 pb-14 md:pt-32 md:pb-18">
          <div className="container-tafc">
            <Reveal className="max-w-3xl">
              <Eyebrow>{t("heroCatalog")}</Eyebrow>
              <h1 className="mt-6 font-display text-h1 text-balance text-tafc-ink">
                {t("heroTitle")} <span className="font-medium">{t("heroHighlight")}</span>{" "}
                {t("heroSubtitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-deck text-pretty text-tafc-ink/65">
                {t("heroDescription")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Trust line — its own row under the hero band, not a micro-strip
            inside it. The claim stands on its own rather than on invented
            faces. */}
        <div className="border-b border-tafc-ink/12 bg-tafc-paper">
          <div className="container-tafc">
            <p className="flex items-center gap-2 py-5 text-meta text-tafc-ink/70 uppercase tracking-[0.14em]">
              {t("heroApprovedBy")}
              <span className="font-display text-base font-medium tracking-normal text-tafc-ink">
                {t("heroChefs")}
              </span>
            </p>
          </div>
        </div>

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
                <div className="fixed inset-0 z-50 overflow-y-auto bg-tafc-paper p-6 lg:hidden">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="eyebrow-rule inline-flex items-center text-eyebrow text-tafc-ink/65 uppercase">
                      {t("filterCategories")}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileFilters(false)}
                      className="text-tafc-ink hover:bg-tafc-ink/[0.06]"
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
                    <MagnifyingGlass
                      aria-hidden="true"
                      className="pointer-events-none absolute start-4 top-1/2 size-4.5 -translate-y-1/2 text-tafc-ink/50"
                    />
                    <input
                      type="text"
                      placeholder={t("searchPlaceholder")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-13 w-full rounded-sm border border-tafc-ink/15 bg-tafc-paper ps-12 pe-12 text-base text-tafc-ink placeholder:text-tafc-ink/60 focus:border-tafc-accent focus:ring-3 focus:ring-tafc-accent/20 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute end-4 top-1/2 -translate-y-1/2 text-tafc-ink/55 transition-colors hover:text-tafc-ink"
                      >
                        <X className="size-4" />
                        <span className="sr-only">{t("filterReset")}</span>
                      </button>
                    )}
                  </div>

                  {/* Mobile filter + sort */}
                  <div className="flex gap-3 lg:hidden">
                    <Button
                      variant="onLight"
                      onClick={() => setShowMobileFilters(true)}
                      className="h-12 flex-1"
                    >
                      <SlidersHorizontal aria-hidden="true" className="size-4" />
                      {t("filterCategories")}
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-12 flex-1 border-tafc-ink/15 bg-tafc-paper">
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
                        {/* The category name is the whole header. The old
                            templated "Découvrez nos ..." deck repeated six
                            times and said nothing each time. */}
                        <SectionIntro title={group.name} className="mb-10" />
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
                    <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-tafc-ink/12 pb-6">
                      <h2 className="font-display text-h2 text-tafc-ink">
                        {selectedCategory !== "all"
                          ? translatedCategories.find((c) => c.slug === selectedCategory)?.name
                          : t("resultsTitle")}
                      </h2>
                      <span className="text-data text-tafc-ink/65 uppercase tabular">
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
                      /* Empty state. The dashed box and the faded 40px magnifier
                         were both saying "nothing here" a third time, after the
                         heading and the copy had already said it. Type on a
                         hairline-ruled paper panel, start-aligned like the rest
                         of the page. */
                      <div className="rounded-sm border border-tafc-ink/12 bg-tafc-paper p-10 md:p-14">
                        <h3 className="font-display text-h3 text-tafc-ink">
                          {t("searchNoResults")}
                        </h3>
                        <p className="mt-3 max-w-sm text-tafc-ink/65">
                          {t("searchNoResultsDesc")}
                        </p>
                        <Button onClick={clearFilters} variant="ink" size="lg" className="mt-8">
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

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsContent />
    </Suspense>
  )
}
