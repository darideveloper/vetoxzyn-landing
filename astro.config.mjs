// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { devOnlyPages } from './src/integrations/dev-only-pages.ts';

// https://astro.build/config
// Production domain: https://vetoxzyncomercial.mx
// ponytail: config files can't use import.meta.env for .env values, and bare
// process.env can't see .env either — Node 22 loadEnvFile fills CLI-unset
// vars from .env (no new dependency; CLI env wins). Missing .env (e.g.
// Docker, where the value arrives as ENV) falls through to the fallback.
// ponytail: no explicit `output` key — Astro default `static` is what this
// project ships; add an SSR adapter only if server rendering is ever needed.
try {
  if (typeof process.loadEnvFile === 'function') process.loadEnvFile('.env');
} catch {
  // No .env — process.env / fallback below apply.
}
export default defineConfig({
  // Origin chain: per-checkout Portless URL wins in dev (each worktree gets
  // its own branch-subdomain URL), explicit SITE_URL covers Docker/CI builds.
  // Fallback is the prod domain (documented in docs/astro-worktrees.md,
  // docs/astro-portless.md, docs/astro-site-config.md): dev never reaches the
  // fallback, and a build without env must emit prod — never localhost —
  // into sitemap/canonicals.
  site: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? 'https://vetoxzyncomercial.mx',
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    strictPort: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
      strictPort: true,
    },
  },
  // ponytail: devOnlyPages() injects src/dev-pages/ routes on `dev` only —
  // prod builds never see them (true 404 + clean sitemap, no filter list).
  integrations: [react(), sitemap(), devOnlyPages()],
});
