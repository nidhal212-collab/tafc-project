import { getTranslations, setRequestLocale } from "next-intl/server"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SectionShell } from "@/components/ui/section-shell"

type Props = {
    params: Promise<{ locale: string }>
}

export default async function PrivacyPage({ params }: Props) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations("legal.privacy")

    return (
        <>
            <Header />
            <main id="main-content">
                <SectionShell tone="salt">
                    <div className="container-narrow">
                        <h1 className="font-display text-h1 text-balance text-tafc-ink">
                            {t("title")}
                        </h1>
                        <p className="mt-4 text-meta text-tafc-ink/50">
                            {t("lastUpdated")}
                        </p>

                        {/* TODO(legal): placeholder body. Replace with real
                            legal copy before launch. */}
                        {t.raw("sections").length > 0 &&
                            t.raw("sections").map((section: { heading: string; body: string[] }, i: number) => (
                                <section key={i} className="mt-12">
                                    <h2 className="font-display text-h2 text-tafc-ink">
                                        {section.heading}
                                    </h2>
                                    {section.body.map((paragraph, j) => (
                                        <p key={j} className="mt-4 text-body leading-relaxed text-tafc-ink/70">
                                            {paragraph}
                                        </p>
                                    ))}
                                </section>
                            ))}
                    </div>
                </SectionShell>
            </main>
            <Footer />
        </>
    )
}
