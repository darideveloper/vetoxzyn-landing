import * as React from "react"
import { cn } from "@/lib/utils"
import { useField as defaultUseField } from "@/store/useField"

interface UseFieldResult {
  value: unknown
  error?: string
  setValue: (v: unknown) => void
  mounted: boolean
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  field: string
  useField?: (field: string) => UseFieldResult
  label?: string
}

export function Textarea({ field, useField = defaultUseField, label, className, ...props }: TextareaProps) {
  const { value, error, setValue, mounted } = useField(field)

  return (
    <div className="flex flex-col gap-2 p-2">
      {label && (
        <label className={cn("text-sm font-medium", error ? "text-red-500" : "text-foreground")}>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "min-h-24 w-full rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-base transition-colors outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
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
