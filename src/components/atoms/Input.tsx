import * as React from "react"
import { cn } from "@/lib/utils"
import { useField as defaultUseField } from "@/store/useField"

interface UseFieldResult {
  value: unknown
  error?: string
  setValue: (v: unknown) => void
  mounted: boolean
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: string
  useField?: (field: string) => UseFieldResult
  label?: string
}

export function Input({ field, useField = defaultUseField, label, className, ...props }: InputProps) {
  const { value, error, setValue, mounted } = useField(field)

  return (
    <div className="flex flex-col gap-2 p-2">
      {label && (
        <label className={cn("mb-3 text-xs font-bold uppercase tracking-widest", error ? "text-red-500" : "text-black/70")}>
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full border-0 border-b-2 border-black/10 bg-transparent px-0 py-3 text-lg transition-colors duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:border-black/30",
          "focus:border-[#fd530a] placeholder:text-[#5c4038]/40",
          error ? "border-red-500" : "",
          className
        )}
        {...props}
        value={mounted ? (value as string) || "" : ""}
        onChange={(e) => setValue(e.target.value)}
      />
      {error && <span className="text-xs text-red-500 font-medium italic">{error}</span>}
    </div>
  )
}
