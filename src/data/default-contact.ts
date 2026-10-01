// Global default contact slice for pages without an avatar entry (e.g.
// /contact). Shape matches the contact slice of the avatar schema, so it can
// be passed straight to <ContactSection data={...} />. Images resolve from
// src/assets (global, not per-avatar).
// See openspec/changes/add-json-avatar-pages (design D12).
import type { ContactData } from "@/lib/avatars"
import { DISCLAIMER } from "@/data/copy"
import contactImg from "@/assets/contact/contact-clinica.webp"
import { DEFAULT_FORM_COPY } from "@/data/copy"

export const DEFAULT_CONTACT: ContactData = {
  eyebrow: "ORIENTACIÓN PARA TU CLÍNICA",
  title: "Revisemos cómo quieres integrar vetoxzyn® en tu clínica.",
  subtitle:
    "Describe brevemente dónde quieres utilizar vetoxzyn® y podremos orientarte según tu contexto de trabajo.",
  backdropWord: "BIOSEGURIDAD",
  image: contactImg,
  imageAlt:
    "Clínica veterinaria de alta tecnología con superficies de vidrio e instrumental metálico bajo luz blanca",
  faq: [
    {
      question: "¿Qué es vetoxzyn®?",
      answer:
        "Es una solución oxidativa de pH neutro a base de ácido hipocloroso (HOCl) de alta estabilidad, obtenida por electrólisis. Es la misma molécula que producen de forma natural los glóbulos blancos. Se clasifica como auxiliar de higiene y bioseguridad integral. No es un medicamento.",
    },
    {
      question: "¿Puedo usarlo directamente con pacientes?",
      answer:
        "Sí. La línea vinculada a la higiene del paciente viene lista para usar: higiene de heridas superficiales, mucosas externas, zonas postquirúrgicas y ombligo de neonatos. No arde, no mancha y no requiere enjuague.",
    },
    {
      question: "¿Puede utilizarse en superficies de la clínica?",
      answer:
        "Sí, con la línea de higiene de espacios y procesos (500 ppm concentrada). Para superficies se diluye 1:10. En material de acero inoxidable se utiliza directo, sin diluir; para otros materiales, 1:10 con agua destilada. No provoca corrosión.",
    },
  ],
  form: DEFAULT_FORM_COPY,
}

export { DISCLAIMER }
