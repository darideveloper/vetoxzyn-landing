/// <reference types="astro/client" />

// Client-exposed env must use the PUBLIC_ prefix. No concrete PUBLIC_* var
// exists yet — declare each one here when its first reader lands.
interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
