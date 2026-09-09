// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
  site: process.env.PUBLIC_SITE_URL ?? 'https://vetoxzyncomercial.mx',
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    strictPort: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
