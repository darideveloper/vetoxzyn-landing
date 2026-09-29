import challengesImage from "@/assets/challenges/challenges-clinica.webp"
import contactImage from "@/assets/contact/contact-clinica.webp"
import heroImage from "@/assets/hero/hero-clinica.webp"
import instalacionesImage from "@/assets/products/instalaciones.webp"
import topicoImage from "@/assets/products/topico.webp"

export const AVATARS = [
  { id: "A1", label: "Socio Crecimiento", icon: "inventory_2", image: instalacionesImage },
  { id: "A2", label: "Dr. Resultados", icon: "stethoscope", image: heroImage },
  { id: "A3", label: "Ingeniero Eficiencia", icon: "precision_manufacturing", image: topicoImage },
  { id: "A4", label: "Guardián de Aire", icon: "air", image: challengesImage },
  { id: "A5", label: "Estratega de Fauna", icon: "pets", image: contactImage },
  { id: "A6", label: "Dueño Responsable", icon: "home", image: heroImage },
] as const
