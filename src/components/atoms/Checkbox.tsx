import * as React from "react"
import { cn } from "@/lib/utils"
import { useField as defaultUseField } from "@/store/useField"

interface UseFieldResult {
  value: unknown
  error?: string
  setValue: (v: unknown) => void
  mounted: boolean
}

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  field: string
  useField?: (field: string) => UseFieldResult
  label: string
}

// F2 standard: checkbox inside white/40 pill, orange accent.
export function Checkbox({ field, useField = defaultUseField, label, className, ...props }: CheckboxProps) {
  const { value, setValue, mounted } = useField(field)

  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center rounded-full border border-glass-border bg-surface-ice/40 px-6 py-3 shadow-sm transition-all hover:bg-surface-ice/80",
        className
      )}
    >
      <input
        type="checkbox"
        className="h-5 w-5 accent-brand-orange"
        {...props}
        checked={mounted ? Boolean(value) : false}
        onChange={(e) => setValue(e.target.checked)}
      />
      <span className="ml-3 text-sm font-bold">{label}</span>
    </label>
  )
}
