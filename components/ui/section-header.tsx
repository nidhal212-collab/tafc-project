"use client"

import { SectionIntro } from "@/components/ui/section-intro"
import type { SectionTone } from "@/components/ui/section-shell"

interface SectionHeaderProps {
  title: string
  description?: string
  tone?: SectionTone
  align?: "start" | "center"
  eyebrow?: string
  className?: string
}

/**
 * Thin compatibility wrapper over {@link SectionIntro}.
 *
 * Kept so existing call sites (`app/[locale]/products/page.tsx`) keep working,
 * but it no longer carries its own type sizes or the hardcoded `#22C5C5`
 * underline bar — everything routes through the one shared recipe.
 */
export function SectionHeader({
  title,
  description,
  tone = "light",
  align = "start",
  eyebrow,
  className = "",
}: SectionHeaderProps) {
  return (
    <SectionIntro
      eyebrow={eyebrow}
      title={title}
      deck={description}
      tone={tone}
      align={align}
      className={className}
    />
  )
}
