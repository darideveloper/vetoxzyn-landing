// Single source of truth for section anchor ids. Import from here — never
// hardcode section ids in components.
export const SECTION_IDS = {
  inicio: "inicio",
  desafios: "desafios",
  testimonios: "testimonios",
  productos: "productos",
  contacto: "contacto",
  contactoFormulario: "contacto-formulario",
  contactoFaq: "contacto-faq",
} as const
