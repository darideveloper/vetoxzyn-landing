import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function Button({ children, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("rounded-2xl bg-black px-5 py-2.5 text-white transition-opacity hover:opacity-90", className)}
      {...props}
    >
      {children}
    </button>
  )
}
