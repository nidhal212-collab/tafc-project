import { setRequestLocale } from 'next-intl/server'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { AboutPreview } from "@/components/sections/about-preview"
import { BestSellers } from "@/components/sections/best-sellers"
import { Categories } from "@/components/sections/categories"
import { ProcessBand } from "@/components/sections/process-band"
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
              Section order is unchanged. What changed is the surface rhythm:
              salt · salt · salt · paper · salt · paper · INK · video · salt · INK.
              Ink went from four bands to two, so a dark band is an event rather
              than the default — the credibility break (AboutPreview) and the
              close (ContactPreview, running into the ink footer). The video band
              between them is its own surface: the footage IS the ground there.

              The three product showcases still progress browse (Categories, a
              text index) → featured (BestSellers, a photographic rail) → full
              grid (CatalogPreview, spec cards), so no two share a treatment,
              with ProcessBand explaining the chain between them.
            */}
            <main id="main-content">
                <Hero />
                <Marquee />
                <Categories />
                <BestSellers />
                <ProcessBand />
                <AboutPreview />
                <TargetClients />
                <CatalogPreview />
                <ContactPreview />
            </main>
            <Footer />
        </>
    )
}
