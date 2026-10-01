// Typed access to the `avatars` content collection. Organisms receive slices
// of `AvatarData` as a single typed `data` prop (design D8).
import type { CollectionEntry } from "astro:content"
import type { AvatarData } from "@/lib/avatar-schema"

export type { AvatarData } from "@/lib/avatar-schema"
export type {
  HeroData,
  ChallengesData,
  TestimonialsData,
  ProductsData,
  ContactData,
  SeoData,
  FormCopy,
} from "@/lib/avatar-schema"

export type AvatarEntry = CollectionEntry<"avatars">

/** Typed page data returned to the route/organisms. */
export type PageData = AvatarData & { slug: string }

/** Build the typed page data from a collection entry. */
export function toPageData(entry: AvatarEntry): PageData {
  return { slug: entry.id, ...(entry.data as AvatarData) }
}
