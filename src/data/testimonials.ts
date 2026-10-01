// Testimonial content for the 03-testimonials section (Stitch verbatim ES copy).
// Single source of truth — organisms map over this, never duplicate literals.
// Avatars are pipelined src assets (ImageMetadata, rendered via astro:assets
// in Avatar); Carlos's avatar reuses the brand logo asset directly.
import alanAvatar from "@/assets/testimonials/alan-gamborino.webp"
import danielaAvatar from "@/assets/testimonials/daniela-avila.webp"
import type { Testimonial } from "@/lib/testimonials"

export const TESTIMONIALS = [
  {
    quote:
      "“Llevamos tiempo usándolo en múltiples casos de herida y post operatorios tanto simples como complicados y hemos tenido una evolución favorable de nuestros pacientes es una excelente opción.”",
    name: "MVZ Daniela Ávila",
    role: "",
    accent: "orange",
    avatar: danielaAvatar,
  },
  {
    quote:
      "“En nuestra práctica con animales no convencionales, vetoxzyn ha demostrado ser un excelente coadyuvante en el manejo de heridas y lesiones cutáneas. Destaca por su buena tolerancia, baja citotoxicidad y apoyo efectivo en la cicatrización, especialmente en reptiles y aves. Una herramienta confiable dentro del manejo clínico diario.”",
    name: "MVZ Alan Doshey Gamborino Prieto",
    role: "",
    accent: "pink",
    avatar: alanAvatar,
  },
] as const satisfies readonly Testimonial[]
