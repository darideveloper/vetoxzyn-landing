## Why

Landing currently jumps from Hero straight to a placeholder benefits block and contact form. The Stitch `04-products` cinematic split-screen (Tópico light / Instalaciones dark with HUD spec panels) is the missing middle that explains the two product lines and converts visitors toward the contact form. Building it now also resolves the dead `#section-3` hero anchor.

## What Changes

- Add static `src/components/organisms/Products.astro` implementing the `04-products` split-screen: section header (`Líneas para tu clínica y quirófano`), two half-panels (light Tópico / dark Instalaciones), each with local background image, vertical `No requiere enjuague` pill, title + subhead, HUD spec grid (Concentración / pH / ORP / Toxicidad / Presentaciones), and `Ver ficha técnica` CTA.
- Reuse voted atoms only: `Button variant="product" tone="light"|"dark"` for CTAs, `Badge variant="feature"` for the two vertical pills. HUD panels stay bespoke (C1 is light-only and cannot cover the dark panel).
- Port `04-products` design tokens and panel CSS (`hud-panel`, `hud-panel-dark`, `writing-vertical`, `image-pan` with reduced-motion guard) into `src/styles/global.css`, following the Hero token-port precedent.
- Add two local product images under `src/assets/products/` rendered via `astro:assets Image` (lazy, responsive widths); remove all `googleusercontent` hotlinks from this section.
- Mount `<Products />` on `src/pages/index.astro` as `id="section-3"`, replacing the placeholder benefits block; tag the contact section with `id="section-5"` (missing today — verified in `index.astro`) so both ficha CTAs linking to `#section-5` land until real ficha URLs exist.
- Update `docs/component-dependencies.md` per-page trees and orphan notes.

## Capabilities

### New Capabilities

- `products-section`: split-screen Tópico/Instalaciones product showcase with HUD specs, vertical pills, product CTAs, formula banner, responsive + accessible behavior.

### Modified Capabilities

- None. Hero CTA targets (`#section-3` / `#section-5`) are fulfilled, not changed; global atoms are reused unchanged.

## Impact

- Touched: `src/components/organisms/Products.astro` (new), `src/pages/index.astro` (mount + `id="section-5"` on contact section), `src/styles/global.css`, `src/assets/products/*` (new), `docs/component-dependencies.md`.
- No new dependencies, no new store, no client-side JS (static Astro, same as Hero). No API or routing changes beyond the new `#section-3` anchor.
