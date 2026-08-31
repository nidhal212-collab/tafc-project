import { setRequestLocale } from 'next-intl/server'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { AboutPreview } from "@/components/sections/about-preview"
import { BestSellers } from "@/components/sections/best-sellers"
import { Categories } from "@/components/sections/categories"
import { TargetClients } from "@/components/sections/target-clients"
import { CatalogPreview } from "@/components/sections/catalog-preview"
import { ContactPreview } from "@/components/sections/contact-preview"

type Props = {
    params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params

    // Enable static rendering
    setRequestLocale(locale)

    return (
        <>
            <Header />
            {/*
              Order and tone alternate deliberately: ink → light → shell → ink →
              cinematic → light → ink. The three product showcases progress
              browse (Categories, a text index) → featured (BestSellers, a
              photographic rail) → full grid (CatalogPreview, spec cards), so no
              two of them share a treatment, with AboutPreview as the mid-page
              credibility break and TargetClients as a full-bleed video seam.
            */}
            <main>
                <Hero />
                <Marquee />
                <Categories />
                <BestSellers />
                <AboutPreview />
                <TargetClients />
                <CatalogPreview />
                <ContactPreview />
            </main>
            <Footer />
        </>
    )
}
