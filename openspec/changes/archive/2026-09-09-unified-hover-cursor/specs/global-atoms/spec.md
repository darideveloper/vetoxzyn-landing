## MODIFIED Requirements

### Requirement: Standardized Button atom

`src/components/atoms/Button.tsx` SHALL expose `variant="primary"|"secondary"|"product"`: primary = B2 orange pill, secondary = B3 ghost pill (transparent bg, 2px brand border, brand text, brand-tint hover fill), product = B4 rectangular full-width uppercase with `px-4` horizontal padding (`py-3` vertical rhythm unchanged, so button height is unchanged) now joining the shared `.lift` hover language (translate + shadow, token-timed) alongside primary/secondary; `size="md"|"sm"` (md = hero spec `px-12 py-6`, sm = compact `px-6 py-3`, ignored by product); product-only `tone="light"|"dark"` (orange/black-hover vs secondary-burdeus/white-hover); all variants SHALL include token-timed transitions with `active:scale-[.98]` press feedback, shared `:focus-visible` ring, and `disabled:opacity-60 disabled:cursor-not-allowed` (pointer cursor arrives via the base layer, with the anchor branch additionally carrying explicit `cursor-pointer`); and optional `href?: string` — when `href` is present the atom SHALL render an `<a>` with the identical variant/size/tone class chain (keyboard-focusable, middle-click/open-in-tab capable), otherwise a `<button>`. Dropped looks (B1 gradient, B5 large) SHALL NOT exist.

#### Scenario: Hero CTAs

- **WHEN** a hero renders `<Button variant="primary">` and `<Button variant="secondary">`
- **THEN** the primary is an orange pill and the secondary a transparent ghost pill with visible brand border, both hero-padded with token-timed lift hover, press scale, and visible keyboard focus

#### Scenario: Product cards and forms

- **WHEN** a product panel renders `<Button variant="product" tone="dark">` and a form renders `<Button variant="primary" size="sm">`
- **THEN** the product button is full-width rectangular burdeus with 16px horizontal inset at unchanged height with lift hover and the form button is a compact orange pill with press/disabled/focus states

#### Scenario: Anchor rendering

- **WHEN** a hero renders `<Button variant="primary" size="md" href="#section-5">` and `<Button variant="secondary" size="md" href="#section-4">`
- **THEN** both render `<a>` elements with the same B2/B3 pill styling as their `<button>` counterparts and navigate to the anchor targets on activation

### Requirement: Standardized Eyebrow, Card, and form atoms

`Eyebrow.astro` SHALL render the E2 orange-tint pill with `science` icon default; `Card.astro` SHALL render the C1 glass shell (`rounded-xl`, ambient shadow); `Input.tsx` SHALL be the F1 underline control with uppercase xs label plus token-timed `hover:border-black/30` and shared focus-ring parity; `Textarea.tsx` the F3 glass control with the same hover/focus contract; `Checkbox.tsx` the F2 white/40 pill with orange accent and token-timed hover wash, with `cursor-pointer` on both label and inner input — all three store-bound via injectable `useField`. `NavLink` (`src/components/atoms/NavLink.astro`) SHALL adopt the shared `.link` class plus explicit `cursor-pointer` (color shift + underline-offset transition with `focus-visible` parity, including inline `tel:`/`mailto:` instances). `FaqItem` SHALL own `cursor-pointer` on `<summary>` (not `<details>`) with token-timed hover wash, icon rotation, and `focus-visible` ring plus marker normalization. Display atoms (`Badge`, `Eyebrow`, `Card`, `Avatar`, `SpecItem`) SHALL adopt the pointer-free `.hover-subtle` voice (`Icon` stays motionless — parent containers own the motion, so glyphs never double-animate). E1/E3 eyebrows and C2/C3 cards SHALL NOT exist.

#### Scenario: Contact controls

- **WHEN** the form renders `<Input>`, `<Textarea>`, and `<Checkbox>` atoms
- **THEN** inputs show underline-only styling with uppercase labels, hover border feedback, and focus rings; the textarea a glass rounded box with the same contract; and checkboxes pills with pointer on label and input — all reading/writing the bound store

#### Scenario: Links and disclosures

- **WHEN** header, footer, contact-page, and 404 NavLinks render, and FAQ disclosures render
- **THEN** links show pointer, underline/color hover, and keyboard focus parity and summaries show pointer only on the clickable summary row with hover wash

#### Scenario: Display atoms whisper

- **WHEN** badges, eyebrows, cards, avatars, and spec cells render
- **THEN** each carries the pointer-free `.hover-subtle` voice on the shared tokens (icons stay still; their parents animate)
