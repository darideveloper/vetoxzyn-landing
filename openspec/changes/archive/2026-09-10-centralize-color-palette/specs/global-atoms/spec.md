## MODIFIED Requirements

### Requirement: Standardized Button atom
`src/components/atoms/Button.tsx` SHALL expose `variant="primary"|"secondary"|"product"`: primary = B2 orange pill, secondary = B3 ghost pill (transparent bg, 2px brand border, brand text, brand-tint hover fill), product = B4 rectangular full-width uppercase with `px-4` horizontal padding (`py-3` vertical rhythm unchanged, so button height is unchanged); `size="md"|"sm"` (md = hero spec `px-12 py-6`, sm = compact `px-6 py-3`, ignored by product); product-only `tone="light"|"dark"` (orange/black-hover vs secondary-burdeus/white-hover); and optional `href?: string` — when `href` is present the atom SHALL render an `<a>` with the identical variant/size/tone class chain (keyboard-focusable, middle-click/open-in-tab capable), otherwise a `<button>`. All color values SHALL be palette-token utilities (`bg-brand-orange`, `text-primary`, `border-primary`, `bg-secondary`, `text-on-primary`, `shadow-ambient`) — hard-coded hexes (`bg-[#fd530a]`, `border-[#a83200]`) and raw `white`/`black` utilities SHALL NOT appear. Dropped looks (B1 gradient, B5 large) SHALL NOT exist.

#### Scenario: Hero CTAs
- **WHEN** a hero renders `<Button variant="primary">` and `<Button variant="secondary">`
- **THEN** the primary is an orange pill and the secondary a transparent ghost pill with visible brand border, both hero-padded with hover scale

#### Scenario: Product cards and forms
- **WHEN** a product panel renders `<Button variant="product" tone="dark">` and a form renders `<Button variant="primary" size="sm">`
- **THEN** the product button is full-width rectangular burdeus with 16px horizontal inset at unchanged height and the form button is a compact orange pill

#### Scenario: Anchor rendering
- **WHEN** a hero renders `<Button variant="primary" size="md" href="#section-5">` and `<Button variant="secondary" size="md" href="#section-4">`
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
`Eyebrow.astro` SHALL render the E2 orange-tint pill with `science` icon default; `Card.astro` SHALL render the C1 glass shell (`rounded-xl`, ambient shadow); `Input.tsx` SHALL be the F1 underline control with uppercase xs label; `Textarea.tsx` the F3 glass control; `Checkbox.tsx` the F2 pill with orange accent — all three store-bound via injectable `useField`. All color values SHALL be token utilities: `bg-brand-orange/10`, `text-brand-orange`, `bg-surface-ice/70`, `border-glass-border`, `shadow-ambient`, `text-on-surface`, `text-on-surface-variant`, `border-on-surface/10`, `placeholder:text-on-surface-variant/40`, `focus:border-brand-orange`, `accent-brand-orange`, `text-error`/`border-error` for error states (replacing `red-500`). E1/E3 eyebrows and C2/C3 cards SHALL NOT exist.

#### Scenario: Contact controls
- **WHEN** the form renders `<Input>`, `<Textarea>`, and `<Checkbox>` atoms
- **THEN** inputs show underline-only styling with uppercase labels, the textarea a glass rounded box, and checkboxes pills — all reading/writing the bound store

#### Scenario: Error states use the error token
- **WHEN** a field has a validation error
- **THEN** its label, border, and message render in `error` token color, never `red-500`
