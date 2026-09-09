## MODIFIED Requirements

### Requirement: Standardized Button atom
`src/components/atoms/Button.tsx` SHALL expose `variant="primary"|"secondary"|"product"`: primary = B2 orange pill, secondary = B3 glass pill, product = B4 rectangular full-width uppercase; `size="md"|"sm"` (md = hero spec `px-12 py-6`, sm = compact `px-6 py-3`, ignored by product); product-only `tone="light"|"dark"` (orange/black-hover vs secondary-burdeus/white-hover); and optional `href?: string` — when `href` is present the atom SHALL render an `<a>` with the identical variant/size/tone class chain (keyboard-focusable, middle-click/open-in-tab capable), otherwise a `<button>`. Dropped looks (B1 gradient, B5 large) SHALL NOT exist.

#### Scenario: Hero CTAs
- **WHEN** a hero renders `<Button variant="primary">` and `<Button variant="secondary">`
- **THEN** the primary is an orange pill and the secondary a glass pill, both hero-padded with hover scale

#### Scenario: Product cards and forms
- **WHEN** a product panel renders `<Button variant="product" tone="dark">` and a form renders `<Button variant="primary" size="sm">`
- **THEN** the product button is full-width rectangular burdeus and the form button is a compact orange pill

#### Scenario: Anchor rendering
- **WHEN** a hero renders `<Button variant="primary" size="md" href="#section-5">` and `<Button variant="secondary" size="md" href="#section-3">`
- **THEN** both render `<a>` elements with the same B2/B3 pill styling as their `<button>` counterparts and navigate to the anchor targets on activation
