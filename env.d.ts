/// <reference types="astro/client" />

// Client-exposed env must use the PUBLIC_ prefix. Declare each one here
// when its first reader lands. (SITE_URL is server-only and intentionally
// absent: it is read via process.env, never import.meta.env.)
interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
