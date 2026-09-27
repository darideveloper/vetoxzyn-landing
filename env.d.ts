/// <reference types="astro/client" />

// Client-exposed env must use the PUBLIC_ prefix. Declare each one here
// when its first reader lands. (SITE_URL is server-only and intentionally
// absent: it is read via process.env, never import.meta.env.)
interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_FORM_ENDPOINT: string
  readonly PUBLIC_CONTACT_FORM_USER: string
  readonly PUBLIC_CONTACT_FORM_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
