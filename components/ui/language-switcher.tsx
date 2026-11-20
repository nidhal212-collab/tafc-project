import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { localeMetadata, type Locale } from '@/i18n/routing'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CaretDown } from "@phosphor-icons/react"
import { FlagFR, FlagGB, FlagSA } from "@/components/icons/flag-icons"
import { cn } from "@/lib/utils"

const flagComponents = {
    fr: FlagFR,
    en: FlagGB,
    ar: FlagSA,
}

/**
 * Sits in the header, so it has to read as part of the same system.
 *
 * It was on `slate-*` neutrals plus two off-system tokens: `tafc-gold`, which is
 * not registered at all and therefore rendered nothing, and `tafc-deep-navy`
 * (`#020c1b`), which is not a TAFC colour. Both are now `tafc-ink` / accent.
 *
 * Square, like every other control: the pill shape was the last piece of app-UI
 * vocabulary left in the header. The flag chips are square too, since a flag is
 * media and media is 0px in this system, and a 20px circle crops the tricolour.
 */
const TRIGGER =
    "h-9 md:h-10 px-2.5 md:px-3 flex items-center gap-2 rounded-sm border border-tafc-ink/12 bg-tafc-paper text-tafc-ink/75 transition-colors duration-300 hover:border-tafc-accent/50 hover:bg-tafc-ink/[0.03] hover:text-tafc-ink"

/** Shared flag frame: square, hairline, clipped. */
const FLAG_FRAME =
    "relative flex size-5 items-center justify-center overflow-hidden ring-1 ring-tafc-ink/10"

export function LanguageSwitcher() {
    const [mounted, setMounted] = useState(false)
    const locale = useLocale() as Locale
    const router = useRouter()
    const pathname = usePathname()

    // Prevent hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    const CurrentFlag = flagComponents[locale] || FlagFR

    const handleLocaleChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale })
    }

    // Helper to get short code (e.g., 'en-US' -> 'EN')
    const getShortCode = (code: string) => code.split('-')[0].toUpperCase()

    // Show a placeholder button during SSR to prevent hydration mismatch
    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="sm"
                className={cn(TRIGGER, "focus-visible:ring-0")}
            >
                <span className="flex size-5 items-center justify-center overflow-hidden bg-tafc-ink/[0.06]">
                    {/* Reserves the flag's box so nothing shifts once mounted. */}
                    <span className="opacity-0">..</span>
                </span>
                <span className="text-eyebrow tracking-[0.1em]">{getShortCode(locale)}</span>
                <CaretDown aria-hidden="true" className="size-3 opacity-40" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        TRIGGER,
                        "outline-none focus-visible:ring-3 focus-visible:ring-tafc-accent/20"
                    )}
                >
                    <span className={FLAG_FRAME}>
                        <CurrentFlag className="h-full w-full object-cover" />
                    </span>
                    <span className="text-eyebrow tracking-[0.1em]">{getShortCode(locale)}</span>
                    <CaretDown aria-hidden="true" className="size-3 opacity-40" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="glass-surface min-w-[11rem] rounded-sm border border-tafc-ink/12 bg-tafc-paper p-1.5 shadow-float"
            >
                {(Object.keys(localeMetadata) as Locale[]).map((loc) => {
                    const Flag = flagComponents[loc]
                    const isActive = loc === locale
                    return (
                        <DropdownMenuItem
                            key={loc}
                            onClick={() => handleLocaleChange(loc)}
                            className={cn(
                                "flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 transition-colors",
                                isActive
                                    ? "bg-tafc-ink/[0.05] font-medium text-tafc-ink"
                                    : "text-tafc-ink/65 hover:bg-tafc-ink/[0.04] hover:text-tafc-ink"
                            )}
                        >
                            <span className="flex items-center gap-3">
                                <span className={FLAG_FRAME}>
                                    <Flag className="h-full w-full object-cover" />
                                </span>
                                <span className="text-sm">{localeMetadata[loc].nativeName}</span>
                            </span>
                            {isActive && (
                                <span aria-hidden="true" className="size-1.5 rounded-full bg-tafc-accent" />
                            )}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
