import * as React from "react"
import { cn, toKebab } from "@/lib/utils"
import { useField as defaultUseField } from "@/store/useField"

interface UseFieldResult {
  value: unknown
  error?: string
  setValue: (v: unknown) => void
  mounted: boolean
}

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  field: string
  useField?: (field: string) => UseFieldResult
  label: React.ReactNode
  idPrefix?: string
}

// F2 standard: checkbox inside white/40 pill, orange accent.
export function Checkbox({ field, useField = defaultUseField, label, idPrefix = "", className, ...props }: CheckboxProps) {
  const { value, error, setValue, mounted } = useField(field)
  const id = `${idPrefix}${toKebab(field)}`

  return (
    <div className="flex flex-col gap-2">
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center rounded-full border border-glass-border bg-surface-ice/40 px-6 py-3 shadow-sm transition-all duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:bg-surface-ice/80",
        error ? "border-error" : "",
        className
      )}
    >
      <input
        type="checkbox"
        className="h-5 w-5 shrink-0 cursor-pointer accent-brand-orange"
        {...props}
        id={id}
        checked={mounted ? Boolean(value) : false}
        onChange={(e) => setValue(e.target.checked)}
      />
      <span className="ml-3 text-sm font-bold">{label}</span>
    </label>
    {error && <span className="px-2 text-xs font-medium italic text-error">{error}</span>}
    </div>
  )
}
