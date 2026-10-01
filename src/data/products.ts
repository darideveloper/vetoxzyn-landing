// GLOBAL product facts — identical on every avatar page. These are
// brand/technical constants (per the fichas técnicas and Master de Producto),
// NOT per-avatar content: never duplicate them in avatar JSON.
// See openspec/changes/add-json-avatar-pages (design D7).

export type ProductLine = "topico" | "instalaciones"

export interface Spec {
  term: string
  value: string
  note?: string
  valueClass?: string
  wide?: boolean
}

interface ProductLineData {
  key: ProductLine
  /** Light/dark panel presentation in the Products split. */
  tone: "light" | "dark"
  specs: Spec[]
  pill: string
}

export const PRODUCT_PILL = "No requiere enjuague"

export const PRODUCTS: Record<ProductLine, ProductLineData> = {
  topico: {
    key: "topico",
    tone: "light",
    pill: PRODUCT_PILL,
    specs: [
      { term: "Concentración", value: "100 ppm", note: "(0.010%)" },
      { term: "pH", value: "6.0–7.5", note: "(neutro)" },
      { term: "ORP", value: "> 850 mV", valueClass: "font-bold text-brand-orange text-xl" },
      { term: "Toxicidad", value: "Grado 0", note: "(no irritante)", valueClass: "font-semibold text-tertiary" },
      { term: "Presentaciones", value: "30ml a 950ml", wide: true },
    ],
  },
  instalaciones: {
    key: "instalaciones",
    tone: "dark",
    pill: PRODUCT_PILL,
    specs: [
      { term: "Concentración", value: "500 ppm", note: "(0.050%)" },
      { term: "pH", value: "6.0–7.5", note: "(neutro)" },
      { term: "ORP", value: "> 900 mV", valueClass: "font-bold text-secondary-container text-xl" },
      { term: "Toxicidad", value: "Grado 0", note: "(no irritante)", valueClass: "font-semibold text-tertiary-fixed" },
      { term: "Presentaciones", value: "1L · 4L · 20L", wide: true },
    ],
  },
}

// Formula banner (global technical facts, same on every page).
export const FORMULA_BANNER = {
  formula: "Fórmula: H₂O + NaCl + electrólisis = HOCl",
  mechanism: "Mecanismo: Lisis por oxidación en segundos",
  noResidue: "Sin residuos persistentes",
} as const
