// Per-avatar page content schema. A factory so the collection can pass in
// Astro's `image()` helper (which resolves relative paths in co-located JSON
// to ImageMetadata). Types are inferred from the default (identity) build for
// use in organisms; the loader-built schema is authoritative for validation.
import { z } from "astro/zod"
import type { ImageMetadata } from "astro"

export type ImageHelper = () => z.ZodTypeAny

export const avatarSchema = (image: ImageHelper) =>
  z.object({
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),

    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      bullets: z.array(z.object({ label: z.string() })).min(1),
      primaryCta: z.object({ label: z.string() }),
      secondaryCta: z.object({ label: z.string() }),
      overlay: z.object({ name: z.string(), role: z.string() }),
      image: image(),
      imageAlt: z.string(),
    }),

    challenges: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      features: z
        .array(
          z.object({
            title: z.string(),
            challenge: z.string(),
            solution: z.string(),
          }),
        )
        .min(1),
      image: image(),
      imageAlt: z.string(),
      badges: z.object({ top: z.string(), bottom: z.string() }),
    }),

    testimonials: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      entries: z
        .array(
          z.object({
            quote: z.string(),
            name: z.string(),
            role: z.string().optional().default(""),
            accent: z.enum(["orange", "pink", "green"]),
            avatar: image(),
          }),
        )
        .min(2)
        .max(3),
      divider: image().optional(),
    }),

    products: z.object({
      title: z.string(),
      subtitle: z.string(),
      lines: z
        .array(
          z.object({
            line: z.enum(["topico", "instalaciones"]),
            title: z.string(),
            tagline: z.string(),
            image: image(),
            imageAlt: z.string(),
          }),
        )
        .min(1)
        .max(2),
    }),

    contact: z.object({
      eyebrow: z.string(),
      title: z.string(),
      subtitle: z.string(),
      backdropWord: z.string(),
      image: image(),
      imageAlt: z.string(),
      faq: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
      form: z.object({
        eyebrow: z.string(),
        title: z.string(),
        nameLabel: z.string(),
        namePlaceholder: z.string(),
        clinicaLabel: z.string(),
        clinicaPlaceholder: z.string(),
        telefonoLabel: z.string(),
        telefonoPlaceholder: z.string(),
        ciudadLabel: z.string(),
        ciudadPlaceholder: z.string(),
        emailLabel: z.string(),
        emailPlaceholder: z.string(),
        interestsLegend: z.string(),
        interests: z.object({
          topico: z.string(),
          instalaciones: z.string(),
          distribucion: z.string(),
        }),
        medioLabel: z.string(),
        medioOptions: z.object({
          correo: z.string(),
          llamada: z.string(),
          whatsapp: z.string(),
        }),
        motivoLabel: z.string(),
        motivoOptions: z.object({
          problema: z.string(),
          informacion: z.string(),
          incorporacion: z.string(),
        }),
        messageLabel: z.string(),
        messagePlaceholder: z.string(),
        submitLabel: z.string(),
        submittingLabel: z.string(),
        hint: z.string(),
        successTitle: z.string(),
        successSubtitle: z.string(),
        successReset: z.string(),
        errors: z.object({
          name: z.string(),
          emailRequired: z.string(),
          emailInvalid: z.string(),
          message: z.string(),
          clinica: z.string(),
          telefono: z.string(),
          ciudad: z.string(),
          medio: z.string(),
          motivo: z.string(),
          interest: z.string(),
        }),
      }),
    }),
  })

// Identity image helper for type inference only (real images are ImageMetadata).
const identityImage: ImageHelper = () => z.custom<ImageMetadata>()

export type AvatarData = z.infer<ReturnType<typeof avatarSchema>>
export const avatarSchemaForTypes = avatarSchema(identityImage)

export type HeroData = AvatarData["hero"]
export type ChallengesData = AvatarData["challenges"]
export type TestimonialsData = AvatarData["testimonials"]
export type ProductsData = AvatarData["products"]
export type ContactData = AvatarData["contact"]
export type SeoData = AvatarData["seo"]
export type FormCopy = AvatarData["contact"]["form"]
