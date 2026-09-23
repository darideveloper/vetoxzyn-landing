// Testimonial content for the 03-testimonials section (Stitch verbatim ES copy).
// Single source of truth — organisms map over this, never duplicate literals.
export const TESTIMONIALS = [
  {
    quote:
      "“Llevamos tiempo usándolo en múltiples casos de herida y post operatorios tanto simples como complicados y hemos tenido una evolución favorable de nuestros pacientes es una excelente opción.”",
    name: "MVZ Daniela Ávila",
    role: "",
    accent: "orange",
    avatar: "/testimonials/daniela-avila.webp",
  },
  {
    quote:
      "“En nuestra práctica con animales no convencionales, Vetoxzyn ha demostrado ser un excelente coadyuvante en el manejo de heridas y lesiones cutáneas. Destaca por su buena tolerancia, baja citotoxicidad y apoyo efectivo en la cicatrización, especialmente en reptiles y aves. Una herramienta confiable dentro del manejo clínico diario.”",
    name: "MVZ Alan Doshey Gamborino Prieto",
    role: "",
    accent: "pink",
    avatar: "/testimonials/alan-gamborino.webp",
  },
  {
    quote:
      "«Integramos vetoxzyn® a nuestros protocolos sanitarios; elevó el nivel de bioseguridad de consulta.»",
    name: "MVZ Carlos Valdés",
    role: "Clínica BioPet · Monterrey",
    accent: "green",
    avatar: "/brand/logo.webp",
  },
] as const

export type TestimonialAccent = (typeof TESTIMONIALS)[number]["accent"]

export type Testimonial = (typeof TESTIMONIALS)[number]
