import * as React from "react"
import { cn, toKebab } from "@/lib/utils"
import { useField as defaultUseField } from "@/store/useField"

interface UseFieldResult {
  value: unknown
  error?: string
  setValue: (v: unknown) => void
  mounted: boolean
}

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  field: string
  useField?: (field: string) => UseFieldResult
  label?: string
  idPrefix?: string
}

export function Textarea({ field, useField = defaultUseField, label, idPrefix = "", className, ...props }: TextareaProps) {
  const { value, error, setValue, mounted } = useField(field)
  const id = `${idPrefix}${toKebab(field)}`

  return (
    <div className="flex flex-col gap-2 p-2">
      {label && (
        <label htmlFor={id} className={cn("mb-3 text-xs font-bold uppercase tracking-widest", error ? "text-error" : "text-on-surface/70")}>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "min-h-24 w-full rounded-2xl border border-on-surface/10 bg-surface-ice/30 px-6 py-4 text-lg backdrop-blur-sm transition-colors outline-none",
          "focus:border-brand-orange placeholder:text-on-surface-variant/40",
          error ? "border-error" : "",
          className
        )}
        {...props}
        id={id}
        value={mounted ? (value as string) || "" : ""}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <span className="text-xs text-error font-medium italic">{error}</span>}
    </div>
  )
}
