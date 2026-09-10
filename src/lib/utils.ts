export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ")
}

// Field key → DOM id fragment (e.g. lineaTopico → linea-topico).
export function toKebab(field: string): string {
  return field.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
}
