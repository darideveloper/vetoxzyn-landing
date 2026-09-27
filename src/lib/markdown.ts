import { marked } from "marked"

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

const addHeadingIds = (html: string) => {
  const used = new Map<string, number>()
  return html.replace(/<(h[1-6])>([\s\S]*?)<\/\1>/g, (match, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, "")
    const base = slugify(text) || "seccion"
    const count = used.get(base) ?? 0
    used.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count + 1}`
    return `<${tag} id="${id}"><a class="markdown-heading-link" href="#${id}">${inner}</a></${tag}>`
  })
}

const addExternalLinkBehavior = (html: string) =>
  html.replace(/<a\s+href="((?:https?:|mailto:|tel:)[^"]+)"([^>]*)>/g, (_match, href, attrs) => {
    const safeAttrs = attrs.replace(/\s(?:target|rel)="[^"]*"/g, "")
    const rel = href.startsWith("http") ? ' rel="noopener noreferrer"' : ""
    return `<a href="${href}"${safeAttrs} target="_blank"${rel}>`
  })

export function renderMarkdown(source: string): string {
  if (!source.trim()) return ""
  const html = marked.parse(source, { gfm: true, breaks: true }) as string
  return addExternalLinkBehavior(addHeadingIds(html))
}

export function renderInline(source: string): string {
  const html = renderMarkdown(source)
  return html.replace(/^<p>([\s\S]*)<\/p>\n?$/, "$1")
}
