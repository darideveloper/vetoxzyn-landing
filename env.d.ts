/// <reference types="astro/client" />

// Client-exposed env must use the PUBLIC_ prefix. Declare each one here
// when its first reader lands.
interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
