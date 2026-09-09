## 1. Assets and tokens

- [x] 1.1 Add two local WebP images under `src/assets/products/` (topico + instalaciones) with README note if placeholder
- [x] 1.2 Port `04-products` color tokens (`inverse-surface`, `secondary-container`, `on-secondary-container`, `tertiary-fixed` family) into `src/styles/global.css`
- [x] 1.3 Port panel CSS (`hud-panel`, `hud-panel-dark`, `writing-vertical`, `image-pan`) into `global.css` with `prefers-reduced-motion` guard

## 2. Organism

- [x] 2.1 Create `src/components/organisms/Products.astro` (static, `id="section-3"`): header + split panels + banner, frontmatter spec const
- [x] 2.2 Wire `Badge variant="feature"` vertical pills (`water_drop` / `cleaning_services`) and `Button variant="product" tone="light"|"dark"` CTAs (`href="#section-5"` + `arrow_forward`)
- [x] 2.3 Render both panel images via `astro:assets Image` (responsive widths+sizes, `loading="lazy"`, meaningful alt, luminosity treatment)
- [x] 2.4 Verify no `googleusercontent` URL, no new atom/molecule/store, tier imports only

## 3. Page wiring and docs

- [x] 3.1 Mount `<Products />` in `src/pages/index.astro` replacing the placeholder benefits block, and tag the contact section with `id="section-5"` (missing today)
- [x] 3.2 Update `docs/component-dependencies.md` (per-page tree, shared leaf if tokens added, Notes + orphan sweep) via `rg` re-run
- [x] 3.3 Verify: `pnpm run build`, 390/768/1280px no-overflow check, keyboard + screen-reader pass (heading order, alt, focus, reduced motion)
