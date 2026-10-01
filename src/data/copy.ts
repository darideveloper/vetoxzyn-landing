// GLOBAL copy that is identical on every page (brand-critical, must not drift).
// Per-avatar copy lives in src/content/avatars/es/<slug>/page.json. The
// DEFAULT_FORM_COPY block below is the fallback for pages without an avatar
// entry (e.g. /contact) and the base for omitted per-avatar strings.
// See openspec/changes/add-json-avatar-pages (design D7, D9, D12).

export const DISCLAIMER = {
  strong: "Aviso Importante:",
  text: "vetoxzyn® se integra en protocolos de higiene veterinaria y no sustituye el criterio profesional.",
} as const

// Shape matches the contact.form slice of the avatar schema. Non-avatar pages
// use this verbatim; avatar JSON overrides individual strings.
export const DEFAULT_FORM_COPY = {
  eyebrow: "Cuéntanos sobre tu necesidad",
  title: "Recibe orientación para tu clínica",
  nameLabel: "Nombre",
  namePlaceholder: "Dr. Juan Pérez",
  clinicaLabel: "Clínica / Hospital",
  clinicaPlaceholder: "Hospital Veterinario Central",
  telefonoLabel: "Teléfono / WhatsApp",
  telefonoPlaceholder: "+52 55 1234 5678",
  ciudadLabel: "Ciudad / estado",
  ciudadPlaceholder: "Celaya, Guanajuato",
  emailLabel: "Correo electrónico",
  emailPlaceholder: "contacto@clinica.com",
  interestsLegend: "¿Qué configuración te interesa?",
  interests: {
    topico: "Higiene vinculada al paciente",
    instalaciones: "Higiene de espacios y procesos",
    distribucion: "Distribución",
  },
  medioLabel: "Medio preferido de comunicación",
  medioOptions: {
    correo: "Correo",
    llamada: "Llamada",
    whatsapp: "Mensaje de WhatsApp",
  },
  motivoLabel: "Te interesa el producto porque",
  motivoOptions: {
    problema: "Puede solucionar un problema actual",
    informacion: "Quiero informarme más",
    incorporacion: "Puedo incorporarlo próximamente",
  },
  messageLabel: "Mensaje personalizado",
  messagePlaceholder:
    "Especifique sus requerimientos de volumen o dudas adicionales...",
  submitLabel: "Enviar mi solicitud",
  submittingLabel: "Enviando solicitud…",
  hint: "Revisaremos tu solicitud y te contactaremos por el medio indicado.",
  successTitle: "Gracias — tu mensaje fue registrado. Te contactaremos pronto.",
  successSubtitle: "Te contactaremos por el medio que indicaste.",
  successReset: "Enviar otro mensaje",
  errors: {
    name: "El nombre es obligatorio",
    emailRequired: "El correo electrónico es obligatorio",
    emailInvalid: "Correo electrónico inválido",
    message: "El mensaje debe tener al menos 10 caracteres",
    clinica: "La clínica u hospital es obligatorio",
    telefono: "Ingresa un teléfono o WhatsApp válido",
    ciudad: "La ciudad o estado es obligatorio",
    medio: "Selecciona un medio de contacto",
    motivo: "Selecciona el motivo de tu interés",
    interest: "Selecciona al menos una configuración de interés",
  },
} as const

export type FormCopy = typeof DEFAULT_FORM_COPY
