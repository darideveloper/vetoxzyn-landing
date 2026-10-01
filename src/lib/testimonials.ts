import type { ImageMetadata } from "astro"

export type TestimonialAccent = "orange" | "pink" | "green"

export interface Testimonial {
  quote: string
  name: string
  role?: string
  accent: TestimonialAccent
  avatar: ImageMetadata
}
