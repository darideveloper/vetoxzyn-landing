## MODIFIED Requirements

### Requirement: Contact header and background copy
The organism SHALL render its eyebrow, H2, subtitle, and background massive word from the avatar data prop (previously fixed to `¿Listo para elevar la bioseguridad de tu clínica?` with the `bioseguridad` gradient span and `BIOSEGURIDAD` backdrop word), keeping the gradient-span treatment and the `opacity-[0.03]` rotated backdrop style.

#### Scenario: Copy per avatar
- **WHEN** the section renders for a given avatar
- **THEN** the H2 (with its gradient span), sub, and background word match that avatar's JSON values verbatim, including accents and casing

### Requirement: FAQ accordion content and exclusive behavior
The FAQ panel SHALL render its items (2–3 native `<details>`, Q/A) from the avatar data prop, each `summary` carrying the bare `add_circle` toggle; an inline section-scoped script SHALL enforce exclusive single-open (opening one closes the others).

#### Scenario: Exclusive accordion
- **WHEN** a visitor opens the second FAQ item while the first is open
- **THEN** the first closes automatically and only the second stays open, with its toggle rotated

#### Scenario: No-JS baseline
- **WHEN** the page loads with JS disabled
- **THEN** all headings, form labels, FAQ questions, and disclaimer render as static HTML and each `<details>` still opens natively (multi-open fallback)

### Requirement: Image and disclaimer layer
The layer SHALL render the local contact image resolved from the avatar's co-located content folder via the collection `image()` helper and `astro:assets` (`loading="lazy"`, responsive widths, `decoding="async"`, bordered rounded container) — no external hotlink SHALL remain — with the `glass-panel-heavy` disclaimer box beside/below it carrying the bare `warning` icon and the **global** disclaimer caption (`Aviso Importante: vetoxzyn® no es un medicamento, consulte a su médico veterinario.`). The layer SHALL stack visible on mobile.

#### Scenario: Local optimized render
- **WHEN** an avatar page builds and loads
- **THEN** the contact image is served from that avatar's build output filling its ratio container with cover crop, and the disclaimer caption is visible at 390px width without horizontal scroll

#### Scenario: Disclaimer is global and always present
- **WHEN** any avatar page renders the contact section
- **THEN** the disclaimer text equals the single global disclaimer definition and cannot be omitted or varied per avatar
