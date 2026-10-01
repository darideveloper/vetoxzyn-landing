import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { avatarSchema } from "@/lib/avatar-schema"

// Per-avatar page content. Co-located JSON + images live under
// src/content/avatars/es/<slug>/. Everything audience-specific is here;
// brand/product facts stay as code constants (see src/data/products.ts).
// See openspec/changes/add-json-avatar-pages for the full data contract.
//
// Note: src/content.config.ts cannot import from "@/..." aliases reliably at
// loader time, so the schema lives in src/lib/avatar-schema.ts and is imported
// via a relative path.
const avatars = defineCollection({
  loader: glob({
    pattern: "es/**/page.json",
    base: "./src/content/avatars",
    // Folder name is the slug: es/dr-resultados/page.json -> dr-resultados
    generateId: ({ entry }) => entry.replace(/^es\//, "").replace(/\/page\.json$/, ""),
  }),
  schema: ({ image }) => avatarSchema(image),
})

export const collections = { avatars }
