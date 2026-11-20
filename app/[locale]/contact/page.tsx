"use client"

import {
    ArrowRight,
    CircleNotch,
    InstagramLogo,
    FacebookLogo,
} from "@phosphor-icons/react"
import { useTranslations } from "next-intl"
import { useState, FormEvent } from "react"
import { toast } from "@/hooks/use-toast"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal } from "@/components/ui/reveal"
import { Eyebrow } from "@/components/ui/section-intro"
import { cn } from "@/lib/utils"

/** One field recipe: eyebrow label, 3rem control, square, accent focus ring.
 *  Labels sit at /65 — 5.05:1 on salt, AA-safe; /50 measured 3.7:1.
 *  Invalid fields take `--tafc-invalid`, which exists only for this. It is not an
 *  accent and appears nowhere else on the site. */
const FIELD =
    "h-12 rounded-sm border-tafc-ink/15 bg-tafc-salt text-tafc-ink placeholder:text-tafc-ink/60 focus-visible:border-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/20 aria-[invalid=true]:border-tafc-invalid/70 aria-[invalid=true]:focus-visible:ring-tafc-invalid/20"
const LABEL = "text-eyebrow text-tafc-ink/65 uppercase"
const ERROR_TEXT = "mt-2 text-start text-meta text-tafc-invalid"

/** Field order for submit-time focus: first invalid receives focus. */
const FIELD_ORDER = ["name", "email", "message"] as const
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * The three direct channels.
 *
 * WhatsApp green does **not** appear here. `#25D366` measures 1.99:1 on a light
 * ground, so as a text or glyph colour it fails AA and the 3:1 non-text
 * threshold both. The green survives where it is a fill with ink on top — the
 * product-detail CTAs and the footer square — and the label already reads
 * "WhatsApp" without it.
 */
const CHANNELS = [
    { key: "whatsapp", href: "https://wa.me/21698621128", external: true, value: null },
    { key: "phone", href: "tel:+21698621128", external: false, value: "+216 98 621 128" },
    { key: "email", href: "mailto:sales@tafc.tn", external: false, value: "sales@tafc.tn" },
] as const

/**
 * Contact page.
 *
 * The form's wiring is untouched on purpose: field `id`s, the `formData` keys,
 * blur-then-live validation and focus-first-invalid all stay exactly as they
 * were, because `app/api/contact/route.ts` and its zod schema key off them.
 *
 * What changed is everything around it. The three channels were floating cards
 * with a coloured icon tile each and a 56px drop shadow on hover — three
 * different accent fills on one row. They are now three ruled columns of the
 * site's specification grid, which is the same device as the product cards and
 * the footer contact list. The navy location panel keeps its surface but loses
 * the circular globe medallion and the centring. Fields go square on salt inside
 * a paper panel, and the submit button is the one solid ink rectangle on the
 * page.
 */
export default function ContactPage() {
    const t = useTranslations('contactPage')

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    /** Touched fields: validation fires on blur, then stays live. */
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    /** Error for one field, or null. Mirrors the server's zod rules. */
    const errorFor = (field: keyof typeof formData): string | null => {
        if (!touched[field]) return null
        if (field === "name" && !formData.name.trim()) return t('form.errors.nameRequired')
        if (field === "email") {
            if (!formData.email.trim()) return t('form.errors.emailRequired')
            if (!EMAIL_RE.test(formData.email)) return t('form.errors.emailInvalid')
        }
        if (field === "message" && !formData.message.trim()) return t('form.errors.messageRequired')
        return null
    }

    const formIsValid = () =>
        Boolean(formData.name.trim()) &&
        Boolean(formData.email.trim()) &&
        EMAIL_RE.test(formData.email) &&
        Boolean(formData.message.trim())

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTouched(prev => ({ ...prev, [e.target.id]: true }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validate everything, mark all, and focus the first invalid field —
        // the user lands exactly where the fix is needed.
        setTouched({ name: true, email: true, message: true })
        if (!formIsValid()) {
            const firstInvalid = FIELD_ORDER.find(f => errorFor(f) !== null || (
                f === "name" ? !formData.name.trim() :
                f === "email" ? (!formData.email.trim() || !EMAIL_RE.test(formData.email)) :
                !formData.message.trim()
            ))
            if (firstInvalid) {
                document.getElementById(firstInvalid)?.focus()
            }
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (data.success) {
                toast({ title: t('form.success') })
                setFormData({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    message: ""
                })
                setTouched({})
            } else {
                toast({ title: data.error || t('form.error'), variant: "destructive" })
            }
        } catch {
            toast({ title: t('form.error'), variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    // Keys off `e.target.id`, so every control's `id` must match a formData key.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    /** Field block: label above, control, error below (when touched). */
    const fieldError = (id: string) => {
        const err = errorFor(id as keyof typeof formData)
        if (!err) return null
        return <p className={ERROR_TEXT} role="alert">{err}</p>
    }

    return (
        <>
            <Header />
            <main id="main-content" className="min-h-screen bg-tafc-salt">

                {/* ---- Hero band --------------------------------------------- */}
                {/* Was a navy block. A page that is mostly a white form does not
                    need a dark lid on it; a hairline is enough of a seam. */}
                <section className="border-b border-tafc-ink/12 bg-tafc-salt pt-28 pb-14 md:pt-32 md:pb-18">
                    <div className="container-tafc">
                        <Reveal y={20} className="max-w-3xl">
                            <h1 className="font-display text-h1 text-balance text-tafc-ink">
                                {t('hero.title')}
                            </h1>
                            <p className="mt-6 max-w-xl text-deck text-pretty text-tafc-ink/65">
                                {t('hero.subtitle')}
                            </p>
                        </Reveal>
                    </div>
                </section>

                <div className="container-tafc section-y-tight">

                    {/* ---- Direct channels ----------------------------------- */}
                    <Reveal y={16}>
                        <div className="grid border-y border-tafc-ink/12 md:grid-cols-3">
                            {CHANNELS.map((channel, i) => (
                                <a
                                    key={channel.key}
                                    href={channel.href}
                                    target={channel.external ? "_blank" : undefined}
                                    rel={channel.external ? "noopener noreferrer" : undefined}
                                    className={cn(
                                        "group flex flex-col border-b border-tafc-ink/12 py-8 last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tafc-accent md:border-b-0",
                                        i > 0 && "md:border-s md:border-tafc-ink/12 md:ps-10",
                                    )}
                                >
                                    <h2 className="text-data text-tafc-ink/60 uppercase">
                                        {t(`cards.${channel.key}.title`)}
                                    </h2>
                                    <p className="mt-2 text-meta text-tafc-ink/65">
                                        {t(`cards.${channel.key}.subtitle`)}
                                    </p>

                                    {channel.value ? (
                                        <span className="mt-6 font-display text-h3 text-tafc-ink transition-colors duration-300 group-hover:text-tafc-accent">
                                            {channel.value}
                                        </span>
                                    ) : (
                                        <span className="mt-6 inline-flex items-center gap-1.5 text-meta font-medium text-tafc-ink transition-colors duration-300 group-hover:text-tafc-accent">
                                            {t('cards.whatsapp.cta')}
                                            <ArrowRight
                                                aria-hidden="true"
                                                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                                            />
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    {/* ---- Context + form ------------------------------------ */}
                    <div className="mt-16 grid items-start gap-8 lg:grid-cols-12">

                        {/* Left: location + socials */}
                        <div className="space-y-4 lg:col-span-4">
                            <Reveal x={-24} y={0}>
                                {/* The Google Static Maps background here had no API key, so it
                                    resolved to an error tile. Replaced with a plain navy panel. */}
                                <div className="bg-tafc-ink p-8 md:p-10">
                                    <Eyebrow tone="ink">{t('cards.location.subtitle')}</Eyebrow>
                                    <h2 className="mt-6 font-display text-h3 text-white">
                                        {t('cards.location.title')}
                                    </h2>
                                    <p className="mt-4 text-meta leading-relaxed text-white/65">
                                        {t('cards.location.desc')}
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal x={-24} y={0} delay={0.1}>
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="https://www.instagram.com/tafc.seafood/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 rounded-sm border border-tafc-ink/15 bg-tafc-paper px-5 py-4 transition-colors duration-300 hover:border-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/30 focus-visible:outline-none"
                                    >
                                        <InstagramLogo
                                            aria-hidden="true"
                                            className="size-4.5 text-tafc-ink/70 transition-colors duration-300 group-hover:text-tafc-accent"
                                        />
                                        <span className="text-meta font-medium text-tafc-ink/75">
                                            {t('cards.socials.instagram')}
                                        </span>
                                    </a>

                                    <a
                                        href="https://www.facebook.com/profile.php?id=61585917932963"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 rounded-sm border border-tafc-ink/15 bg-tafc-paper px-5 py-4 transition-colors duration-300 hover:border-tafc-accent focus-visible:ring-3 focus-visible:ring-tafc-accent/30 focus-visible:outline-none"
                                    >
                                        <FacebookLogo
                                            aria-hidden="true"
                                            className="size-4.5 text-tafc-ink/70 transition-colors duration-300 group-hover:text-tafc-accent"
                                        />
                                        <span className="text-meta font-medium text-tafc-ink/75">
                                            {t('cards.socials.facebook')}
                                        </span>
                                    </a>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: quote form */}
                        <Reveal x={24} y={0} delay={0.12} className="lg:col-span-8">
                            <div className="rounded-sm border border-tafc-ink/12 bg-tafc-paper p-7 lg:p-10">
                                <div className="mb-8 border-b border-tafc-ink/12 pb-6">
                                    <Eyebrow>{t('form.subtitle')}</Eyebrow>
                                    <h2 className="mt-6 font-display text-h2 text-tafc-ink">{t('form.title')}</h2>
                                </div>

                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="name" className={cn(LABEL, "mb-2 block")}>{t('form.name')}</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={errorFor("name") !== null}
                                                className={FIELD}
                                            />
                                            {fieldError("name")}
                                        </div>
                                        <div>
                                            <Label htmlFor="company" className={cn(LABEL, "mb-2 block")}>{t('form.company')}</Label>
                                            <Input
                                                id="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className={FIELD}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="email" className={cn(LABEL, "mb-2 block")}>{t('form.email')}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                aria-invalid={errorFor("email") !== null}
                                                className={FIELD}
                                            />
                                            {fieldError("email")}
                                        </div>
                                        <div>
                                            <Label htmlFor="phone" className={cn(LABEL, "mb-2 block")}>{t('form.phone')}</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={FIELD}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className={cn(LABEL, "mb-2 block")}>{t('form.message')}</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            aria-invalid={errorFor("message") !== null}
                                            className={cn(FIELD, "h-auto min-h-36 resize-none py-3.5")}
                                        />
                                        {fieldError("message")}
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button
                                            type="submit"
                                            size="xl"
                                            variant="ink"
                                            disabled={isLoading}
                                            className="w-full sm:w-auto"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <CircleNotch aria-hidden="true" className="size-4 animate-spin" />
                                                    {t('form.sending') || "Sending..."}
                                                </>
                                            ) : (
                                                t('form.submit')
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
