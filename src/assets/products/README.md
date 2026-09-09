# Products images (placeholder)

Source: temporary reuse of `src/assets/hero/hero-clinica-*.webp`
(Stitch hero placeholder) so the `04-products` split-screen builds and
ships with zero external hotlinks.

- `topico-512.webp` / `topico-384.webp` → light Tópico panel background
- `instalaciones-512.webp` / `instalaciones-384.webp` → dark Instalaciones panel background

Status: placeholder. Replace with real brand product art when it lands
(then re-export at 1024+ widths and update `organisms/Products.astro`
widths+sizes). Original Stitch `04-products` art was `googleusercontent`
hotlinks — do NOT reintroduce them; keep all panel imagery local via
`astro:assets Image`.
