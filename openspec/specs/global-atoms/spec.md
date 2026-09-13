## Purpose

Standardized self-contained vanilla atoms shared across pages (no `ui/`, no `Validated*`).
## Requirements
### Requirement: Standardized Button atom
`src/components/atoms/Button.tsx` SHALL expose `variant="primary"|"secondary"|"product"`: primary = B2 orange pill, secondary = B3 ghost pill (transparent bg, 2px brand border, brand text, brand-tint hover fill), product = B4 rectangular full-width uppercase with `px-4` horizontal padding (`py-3` vertical rhythm unchanged, so button height is unchanged) now joining the shared `.lift` hover language (translate + shadow, token-timed) alongside primary/secondary; `size="md"|"sm"` (md = hero spec `px-12 py-6`, sm = compact `px-6 py-3`, ignored by product); product-only `tone="light"|"dark"` (orange/on-surface-hover vs secondary-burdeus/on-primary-hover); all variants SHALL include token-timed transitions with `active:scale-[.98]` press feedback, shared `:focus-visible` ring, and `disabled:opacity-60 disabled:cursor-not-allowed` (pointer cursor arrives via the base layer, with the anchor branch additionally carrying explicit `cursor-pointer`); and optional `href?: string` — when `href` is present the atom SHALL render an `<a>` with the identical variant/size/tone class chain (keyboard-focusable, middle-click/open-in-tab capable), otherwise a `<button>`. All color values SHALL be palette-token utilities (`bg-brand-orange`, `text-primary`, `border-primary`, `bg-secondary`, `text-on-primary`, `shadow-ambient`) — hard-coded hexes (`bg-[#fd530a]`, `border-[#a83200]`) and raw `white`/`black` utilities SHALL NOT appear. Dropped looks (B1 gradient, B5 large) SHALL NOT exist.

#### Scenario: Hero CTAs
- **WHEN** a hero renders `<Button variant="primary">` and `<Button variant="secondary">`
- **THEN** the primary is an orange pill and the secondary a transparent ghost pill with visible brand border, both hero-padded with token-timed lift hover, press scale, and visible keyboard focus

#### Scenario: Product cards and forms
- **WHEN** a product panel renders `<Button variant="product" tone="dark">` and a form renders `<Button variant="primary" size="sm">`
- **THEN** the product button is full-width rectangular burdeus with 16px horizontal inset at unchanged height with lift hover and the form button is a compact orange pill with press/disabled/focus states

#### Scenario: Anchor rendering
- **WHEN** a hero renders `<Button variant="primary" size="md" href="#contacto">` and `<Button variant="secondary" size="md" href="#productos">`
- **THEN** both render `<a>` elements with the same B2/B3 pill styling as their `<button>` counterparts and navigate to the anchor targets on activation

#### Scenario: Token-only styling
- **WHEN** `pnpm run check:palette` scans `src/components/atoms/Button.tsx`
- **THEN** it reports zero banned-pattern matches

### Requirement: Standardized Icon atom
`src/components/atoms/Icon.astro` SHALL default to the I1 circle (`w-10`, `secondary-fixed/40` bg, pink 20px symbol) and support `variant="circle"|"bare"`, `tone="pink"|"orange"|"primary"|"green"` (`green` = `tertiary-fixed-dim`), `size="md"|"lg"` for circles, and `filled` for `FILL 1` symbols; bare mode SHALL render a plain symbol sized/colored via `class`. Tone colors SHALL be token utilities (`text-brand-pink`, `bg-secondary-fixed/40`, `text-brand-orange`, `text-primary`, `text-tertiary-fixed-dim`) — hex literals SHALL NOT appear. The I2 grey container SHALL NOT exist.

#### Scenario: Feature rows and quotes
- **WHEN** a feature list renders `<Icon name="shield" tone="orange">` and a testimonial renders `<Icon name="format_quote" variant="bare" tone="green" filled class="text-4xl">`
- **THEN** the first is an orange w-10 circle and the second a bare 36px green quote mark

### Requirement: Standardized Badge atom
`src/components/atoms/Badge.astro` SHALL provide `variant="feature"` (P1 glass pill with optional pink icon) and `variant="tag"` with `tone="dark"|"primary"|"light"` (`inverse-surface/90` CLINICAL-GRADE with brand-orange border, `primary/90` Biosecurity, `on-primary/95` PURE) plus optional `icon` replacing the pulse dot. All colors SHALL be token utilities (`border-brand-orange`, `bg-inverse-surface/90`, `text-on-primary`, `bg-primary/90`, `border-surface-container-highest`, `bg-surface-ice/70`, `border-glass-border`, `text-brand-pink`, `text-on-surface`) — hex, `white`, `black`, and `gray-*` SHALL NOT appear. P3 vertical pills SHALL NOT exist (replaced by feature pills in a vertical wrapper).

#### Scenario: HUD overlays
- **WHEN** a media card renders `<Badge variant="tag" tone="dark">` and `<Badge variant="tag" tone="light" icon="verified">`
- **THEN** the first shows a dark tag with pulsing orange dot and the second a light pill with orange verified icon

### Requirement: Standardized Eyebrow, Card, and form atoms
`Eyebrow.astro` SHALL render the E2 orange-tint pill with `science` icon default; `Card.astro` SHALL render the C1 glass shell (`rounded-xl`, ambient shadow); `Input.tsx` SHALL be the F1 underline control with uppercase xs label plus token-timed `hover:border-on-surface/30` and shared focus-ring parity; `Textarea.tsx` the F3 glass control with the same hover/focus contract; `Checkbox.tsx` the F2 glass pill with orange accent and token-timed hover wash, with `cursor-pointer` on both label and inner input — all three store-bound via injectable `useField`. All color values SHALL be token utilities: `bg-brand-orange/10`, `text-brand-orange`, `bg-surface-ice/70`, `border-glass-border`, `shadow-ambient`, `text-on-surface`, `text-on-surface-variant`, `border-on-surface/10`, `placeholder:text-on-surface-variant/40`, `focus:border-brand-orange`, `accent-brand-orange`, `text-error`/`border-error` for error states (replacing `red-500`). `NavLink` (`src/components/atoms/NavLink.astro`) SHALL adopt the shared `.link` class plus explicit `cursor-pointer` (color shift + underline-offset transition with `focus-visible` parity, including inline `tel:`/`mailto:` instances). `FaqItem` SHALL own `cursor-pointer` on `<summary>` (not `<details>`) with token-timed hover wash, icon rotation, and `focus-visible` ring plus marker normalization. Display atoms (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`) SHALL adopt the pointer-free `.hover-subtle` voice (`Icon` stays motionless — parent containers own the motion, so glyphs never double-animate). E1/E3 eyebrows and C2/C3 cards SHALL NOT exist.

#### Scenario: Contact controls
- **WHEN** the form renders `<Input>`, `<Textarea>`, and `<Checkbox>` atoms
- **THEN** inputs show underline-only styling with uppercase labels, hover border feedback, and focus rings; the textarea a glass rounded box with the same contract; and checkboxes pills with pointer on label and input — all reading/writing the bound store

#### Scenario: Links and disclosures
- **WHEN** header, footer, contact-page, and 404 NavLinks render, and FAQ disclosures render
- **THEN** links show pointer, underline/color hover, and keyboard focus parity and summaries show pointer only on the clickable summary row with hover wash

#### Scenario: Display atoms whisper
- **WHEN** badges, eyebrows, cards, avatars, and spec cells render
- **THEN** each carries the pointer-free `.hover-subtle` voice on the shared tokens (icons stay still; their parents animate)

#### Scenario: Error states use the error token
- **WHEN** a field has a validation error
- **THEN** its label, border, and message render in `error` token color, never `red-500`

## ADDED Requirements

### Requirement: ResponsiveImage per-slot widths prop
`src/components/atoms/ResponsiveImage.astro` SHALL accept an optional `widths?: number[]` prop passed through to `astro:assets Image`; when omitted it SHALL default to `[480, 800, 1024, 1280]` for `eager` and `[480, 800, 1024, 1200]` for lazy, preserving the existing `sizes` passthrough, `eager → loading="eager" + fetchpriority="high"` vs lazy `loading="lazy" + decoding="async"` contract.

#### Scenario: Explicit per-slot widths win
- **WHEN** a caller passes `widths={[640, 1024, 1600]}` (e.g. `ContactMedia`)
- **THEN** the emitted `srcset` contains exactly those candidates and the loading/decoding contract for its `eager` flag is unchanged

#### Scenario: Defaults cover unmigrated callers
- **WHEN** a caller omits `widths`
- **THEN** an eager instance emits the `[480, 800, 1024, 1280]` set with high fetch priority and a lazy instance the `[480, 800, 1024, 1200]` set with async decoding

### Requirement: DividerImage local-only astro:assets image
`src/components/atoms/DividerImage.astro` SHALL take `src: ImageMetadata` (local only) plus optional `widths = [400, 800]` and `sizes = "80px"`, rendering `astro:assets Image` with `loading="lazy"` and `decoding="async"`; plain `<img>` string URLs and external sources SHALL NOT be accepted.

#### Scenario: Local divider render
- **WHEN** `Testimonials` renders `<DividerImage src={divider1} />`
- **THEN** the output is an optimized local image with the `[400, 800]` srcset, lazy loading, async decoding, and the shared `.hover-subtle` cover styling
