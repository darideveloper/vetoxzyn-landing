import * as React from "react"
import { cn, toKebab } from "@/lib/utils"
import { useField as defaultUseField } from "@/store/useField"

interface UseFieldResult {
  value: unknown
  error?: string
  setValue: (v: unknown) => void
  mounted: boolean
}

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  field: string
  label: string
  options: RadioOption[]
  useField?: (field: string) => UseFieldResult
  idPrefix?: string
  className?: string
}

export function RadioGroup({
  field,
  label,
  options,
  useField = defaultUseField,
  idPrefix = "",
  className,
}: RadioGroupProps) {
  const { value, error, setValue, mounted } = useField(field)
  const groupId = `${idPrefix}${toKebab(field)}`

  return (
    <fieldset className={cn("flex flex-col gap-3 p-2", className)}>
      <legend className={cn("text-xs font-bold uppercase tracking-widest", error ? "text-error" : "text-on-surface/70")}>
        {label}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const id = `${groupId}-${toKebab(option.value)}`
          return (
            <label
              key={option.value}
              htmlFor={id}
              className="inline-flex cursor-pointer items-center rounded-full border border-glass-border bg-surface-ice/40 px-6 py-3 shadow-sm transition-all duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:bg-surface-ice/80 active:scale-[.98] has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
            >
              <input
                id={id}
                type="radio"
                name={groupId}
                value={option.value}
                checked={mounted ? value === option.value : false}
                onChange={(event) => setValue(event.target.value)}
                className="h-5 w-5 cursor-pointer accent-brand-orange disabled:cursor-not-allowed"
              />
              <span className="ml-3 text-sm font-bold">{option.label}</span>
            </label>
          )
        })}
      </div>
      {error && <span className="text-xs font-medium italic text-error">{error}</span>}
    </fieldset>
  )
}
