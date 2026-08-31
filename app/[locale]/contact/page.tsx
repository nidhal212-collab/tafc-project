"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MessageSquare, Globe, ArrowRight, Instagram, Facebook, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState, FormEvent } from "react"
import { toast } from "sonner"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Reveal } from "@/components/ui/reveal"
import { Eyebrow } from "@/components/ui/section-intro"
import { cn } from "@/lib/utils"

/** One field recipe: eyebrow label, 3rem control, teal focus ring. */
const FIELD =
    "h-12 rounded-xl border-tafc-ink/12 bg-tafc-shell/60 text-tafc-ink focus-visible:border-tafc-accent/50 focus-visible:ring-3 focus-visible:ring-tafc-accent/20"
const LABEL = "text-eyebrow text-tafc-ink/50 uppercase"

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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                toast.success(t('form.success') || "Message sent successfully!")
                setFormData({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    message: ""
                })
            } else {
                toast.error(data.error || t('form.error') || "Failed to send message")
            }
        } catch {
            toast.error(t('form.error') || "An error occurred. Please try again.")
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

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">

                {/* ---- Hero band --------------------------------------------- */}
                <section className="relative isolate overflow-hidden bg-tafc-ink pt-32 pb-16 md:pt-40 md:pb-20">
                    <div className="container-tafc">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            className="max-w-3xl"
                        >
                            <h1 className="font-display text-h1 text-balance text-white">
                                {t('hero.title')}
                            </h1>
                            <p className="mt-6 max-w-xl text-deck text-pretty text-white/60">
                                {t('hero.subtitle')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container-tafc section-y-tight">

                    {/* ---- Direct contact methods ---------------------------- */}
                    {/* Flattened: the cards no longer float on a `-mt-12` overlap, and
                        the oversized watermark icons behind each one are gone. */}
                    <div className="grid gap-5 md:grid-cols-3">
                        <Reveal>
                            <a
                                href="https://wa.me/21698621128"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col rounded-2xl border border-tafc-ink/10 bg-white p-7 transition-[border-color,box-shadow] duration-400 hover:border-[#25D366]/60 hover:shadow-[0_24px_56px_-34px_rgba(4,38,53,0.4)]"
                            >
                                <span className="mb-6 flex size-12 items-center justify-center rounded-xl bg-[#25D366]/12 text-[#25D366] transition-colors duration-300 group-hover:bg-[#25D366] group-hover:text-white">
                                    <MessageSquare aria-hidden="true" className="size-5" />
                                </span>
                                <h2 className="font-display text-h3 text-tafc-ink">{t('cards.whatsapp.title')}</h2>
                                <p className="mt-2 text-meta text-tafc-ink/55">{t('cards.whatsapp.subtitle')}</p>
                                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-medium text-[#25D366]">
                                    {t('cards.whatsapp.cta')}
                                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                                </span>
                            </a>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <a
                                href="tel:+21698621128"
                                className="group flex h-full flex-col rounded-2xl border border-tafc-ink/10 bg-white p-7 transition-[border-color,box-shadow] duration-400 hover:border-tafc-accent/50 hover:shadow-[0_24px_56px_-34px_rgba(4,38,53,0.4)]"
                            >
                                <span className="mb-6 flex size-12 items-center justify-center rounded-xl bg-tafc-ink/[0.06] text-tafc-ink transition-colors duration-300 group-hover:bg-tafc-ink group-hover:text-white">
                                    <Phone aria-hidden="true" className="size-5" />
                                </span>
                                <h2 className="font-display text-h3 text-tafc-ink">{t('cards.phone.title')}</h2>
                                <p className="mt-2 text-meta text-tafc-ink/55">{t('cards.phone.subtitle')}</p>
                                <span className="mt-auto pt-6 font-display text-h3 text-tafc-ink transition-colors duration-300 group-hover:text-tafc-accent">
                                    +216 98 621 128
                                </span>
                            </a>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <a
                                href="mailto:sales@tafc.tn"
                                className="group flex h-full flex-col rounded-2xl border border-tafc-ink/10 bg-white p-7 transition-[border-color,box-shadow] duration-400 hover:border-tafc-accent/50 hover:shadow-[0_24px_56px_-34px_rgba(4,38,53,0.4)]"
                            >
                                <span className="mb-6 flex size-12 items-center justify-center rounded-xl bg-tafc-accent/12 text-tafc-accent transition-colors duration-300 group-hover:bg-tafc-accent group-hover:text-tafc-ink">
                                    <Mail aria-hidden="true" className="size-5" />
                                </span>
                                <h2 className="font-display text-h3 text-tafc-ink">{t('cards.email.title')}</h2>
                                <p className="mt-2 text-meta text-tafc-ink/55">{t('cards.email.subtitle')}</p>
                                <span className="mt-auto pt-6 font-display text-h3 text-tafc-ink transition-colors duration-300 group-hover:text-tafc-accent">
                                    sales@tafc.tn
                                </span>
                            </a>
                        </Reveal>
                    </div>

                    {/* ---- Context + form ------------------------------------ */}
                    <div className="mt-16 grid items-start gap-8 lg:grid-cols-12">

                        {/* Left: location + socials */}
                        <div className="space-y-5 lg:col-span-4">
                            <Reveal x={-24} y={0}>
                                {/* The Google Static Maps background here had no API key, so it
                                    resolved to an error tile. Replaced with a plain navy panel. */}
                                <div className="rounded-2xl bg-tafc-ink p-8 text-center">
                                    <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10">
                                        <Globe aria-hidden="true" className="size-6 text-tafc-accent" />
                                    </span>
                                    <h2 className="font-display text-h3 text-white">{t('cards.location.title')}</h2>
                                    <p className="mt-2 text-eyebrow text-tafc-accent uppercase">
                                        {t('cards.location.subtitle')}
                                    </p>
                                    <p className="mx-auto mt-4 max-w-xs text-meta leading-relaxed text-white/55">
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
                                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-tafc-ink/10 bg-white p-6 transition-colors hover:border-tafc-accent/50"
                                    >
                                        <span className="flex size-10 items-center justify-center rounded-full bg-tafc-ink/[0.06] text-tafc-ink/70 transition-colors group-hover:bg-tafc-accent group-hover:text-tafc-ink">
                                            <Instagram aria-hidden="true" className="size-4.5" />
                                        </span>
                                        <span className="text-meta font-medium text-tafc-ink/70">
                                            {t('cards.socials.instagram')}
                                        </span>
                                    </a>

                                    <a
                                        href="https://www.facebook.com/profile.php?id=61585917932963"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-tafc-ink/10 bg-white p-6 transition-colors hover:border-tafc-accent/50"
                                    >
                                        <span className="flex size-10 items-center justify-center rounded-full bg-tafc-ink/[0.06] text-tafc-ink/70 transition-colors group-hover:bg-tafc-accent group-hover:text-tafc-ink">
                                            <Facebook aria-hidden="true" className="size-4.5" />
                                        </span>
                                        <span className="text-meta font-medium text-tafc-ink/70">
                                            {t('cards.socials.facebook')}
                                        </span>
                                    </a>
                                </div>
                            </Reveal>
                        </div>

                        {/* Right: quote form */}
                        <Reveal x={24} y={0} delay={0.12} className="lg:col-span-8">
                            <div className="rounded-2xl border border-tafc-ink/10 bg-white p-7 lg:p-10">
                                <div className="mb-8 border-b border-tafc-ink/[0.08] pb-6">
                                    <Eyebrow>{t('form.subtitle')}</Eyebrow>
                                    <h2 className="mt-4 font-display text-h2 text-tafc-ink">{t('form.title')}</h2>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className={LABEL}>{t('form.name')}</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className={FIELD}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className={LABEL}>{t('form.company')}</Label>
                                            <Input
                                                id="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className={FIELD}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className={LABEL}>{t('form.email')}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className={FIELD}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className={LABEL}>{t('form.phone')}</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={FIELD}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className={LABEL}>{t('form.message')}</Label>
                                        <Textarea
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className={cn(FIELD, "h-auto min-h-36 resize-none py-3.5")}
                                        />
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <Button
                                            type="submit"
                                            size="xl"
                                            variant="action"
                                            disabled={isLoading}
                                            className="w-full sm:w-auto"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 aria-hidden="true" className="size-4 animate-spin" />
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
