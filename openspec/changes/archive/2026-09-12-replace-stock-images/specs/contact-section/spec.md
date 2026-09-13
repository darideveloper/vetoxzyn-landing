## MODIFIED Requirements

### Requirement: Image and disclaimer layer

The layer SHALL render the local master `src/assets/contact/contact-clinica.webp` (3200×1800 16:9) via `astro:assets Image` (`loading="lazy"`, `widths [640, 1024, 1600]`, `decoding="async"`, `border-4 border-on-primary/80 rounded-3xl`) inside a fixed-ratio container (`aspect-[16/9] w-full overflow-hidden`, image `h-full w-full object-cover`) — no external `googleusercontent` hotlink SHALL remain — with the `glass-panel-heavy rounded-2xl border-l-4 border-l-brand-orange` disclaimer box beside/below it carrying the bare `warning` icon and caption `Aviso Importante: vetoxzyn® no es un medicamento, consulte a su médico veterinario.` The layer SHALL stack visible on mobile (deliberate deviation from Stitch `hidden lg:flex`).

#### Scenario: Local optimized render

- **WHEN** the page builds and loads `/` or `/contact`
- **THEN** the contact image is served from the `contact-clinica.webp` build output (responsive WebP with `widths [640, 1024, 1600]`) filling its `16/9` container with cover crop, and the disclaimer caption is visible at 390px width without horizontal scroll
