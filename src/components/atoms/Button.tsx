import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  // Standard variants (atom showcase 2026-09-07):
  // primary = B2 orange pill (hero CTA + submit), secondary = B3 ghost pill (hero),
  // product = B4 rectangular w-full uppercase (product cards; bg via tone).
  variant?: "primary" | "secondary" | "product"
  // size md = B2 hero spec; sm = form/compact contexts (e.g. ContactForm submit).
  size?: "md" | "sm"
  // tone only applies to variant="product": light = orange (light card),
  // dark = secondary burdeos (dark card).
  tone?: "light" | "dark"
  // href renders an <a> with identical styling (hero CTAs); otherwise <button>.
  href?: string
}

const sizes = {
  md: "px-12 py-6",
  sm: "px-6 py-3",
} as const

const variants = {
  primary:
    "rounded-full bg-[#fd530a] font-bold text-white shadow-[0_20px_40px_-10px_rgba(219,111,133,0.25)] transition-transform hover:scale-105",
  secondary:
    "rounded-full border-2 border-[#a83200]/40 bg-transparent font-bold text-[#a83200] transition hover:scale-105 hover:border-[#a83200] hover:bg-[#a83200]/10",
  product: "w-full rounded px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors",
} as const

const tones = {
  light: "bg-[#fd530a] text-white hover:bg-black",
  dark: "bg-[#9d3e54] text-white hover:bg-white hover:text-black",
} as const

export function Button({
  children,
  className,
  type = "button",
  variant = "primary",
  size = "md",
  tone = "light",
  href,
  ...props
}: ButtonProps) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2",
    variants[variant],
    variant === "product" ? tones[tone] : sizes[size],
    className
  )
  if (href !== undefined) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button
      type={type}
      className={cls}
      {...props}
    >
      {children}
    </button>
  )
}
