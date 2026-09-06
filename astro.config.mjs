// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Production domain: https://vetoxzyn.mx
// ponytail: no explicit `output` key — Astro default `static` is what this
// project ships; add an SSR adapter only if server rendering is ever needed.
export default defineConfig({
  site: 'https://vetoxzyn.mx',
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
