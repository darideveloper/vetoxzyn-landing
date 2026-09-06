import * as React from "react"
import { getNestedValue, initialState, useContactStore } from "@/store/contact"

export function useField(field: string) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const isDotted = field.includes(".")
  const setField = useContactStore((state) => state.setField)

  const value = useContactStore((state) =>
    isDotted ? getNestedValue(state as unknown as Record<string, any>, field) : state[field as keyof typeof state]
  )
  const error = useContactStore((state) => state.errors[field])

  const setValue = React.useCallback((v: unknown) => setField(field, v), [field, setField])

  let safeValue: unknown
  if (mounted) {
    safeValue = value
  } else if (isDotted) {
    safeValue = getNestedValue(initialState as unknown as Record<string, any>, field) ?? ""
  } else {
    safeValue = initialState[field as keyof typeof initialState]
  }

  return { value: safeValue, error, setValue, mounted }
}
