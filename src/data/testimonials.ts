// Testimonial content for the 03-testimonials section (Stitch verbatim ES copy).
// Single source of truth — organisms map over this, never duplicate literals.
export const TESTIMONIALS = [
  {
    quote:
      "«Como es una solución a base de HOCl, no corroe nada del instrumental y lo usamos de forma frecuente sin residuos.»",
    name: "Dr. Alejandro Méndez",
    role: "Clínica Veterinaria San José · Ciudad de México",
    accent: "orange",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&crop=faces&w=192&h=192&q=80",
  },
  {
    quote:
      "«La limpieza tópica post-quirúrgica mantiene condiciones higiénicas óptimas y con muy baja irritación en tejido.»",
    name: "Dra. Sofía Ramírez",
    role: "Hospital Veterinario Central · Guadalajara",
    accent: "pink",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&crop=faces&w=192&h=192&q=80",
  },
  {
    quote:
      "«Integramos vetoxzyn® a nuestros protocolos sanitarios; elevó el nivel de bioseguridad de consulta.»",
    name: "MVZ Carlos Valdés",
    role: "Clínica BioPet · Monterrey",
    accent: "green",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&crop=faces&w=192&h=192&q=80",
  },
] as const

export type TestimonialAccent = (typeof TESTIMONIALS)[number]["accent"]

export type Testimonial = (typeof TESTIMONIALS)[number]
