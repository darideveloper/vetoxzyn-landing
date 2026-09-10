import * as React from "react"

export function FormRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-8 md:grid-cols-2">{children}</div>
}
