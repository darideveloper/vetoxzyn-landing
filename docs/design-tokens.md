---
created: 2026-09-10
updated: 2026-09-10
tags:
  - astro
  - styling
  - design-tokens
  - documentation
type: resource
status: active
---

# Design Tokens

Living reference for the centralized color palette. Sole source: `src/styles/global.css`
(`@theme inline`, Tailwind v4). Consume colors ONLY as palette-token utilities
(`bg-brand-orange`, `text-on-surface`, …) with optional opacity modifiers.
See `AGENTS.md` § "Styling / palette" for the mandatory rule + banned list.

## Colors

| Token | Value | Used for |
|---|---|---|
| `surface-ice` | `#f9f9fd` | Page/section backgrounds, glass fills (`/60–80`) |
| `on-surface` | `#1a1c1f` | Body text; `black/*` successor (`/50–70` for muted) |
| `on-surface-variant` | `#5c4038` | Secondary text, placeholders (`/40`) |
| `on-primary` | `#ffffff` | `white` successor — text/fills on brand + dark surfaces |
| `primary` | `#a83200` | Brand red-brown — secondary ghost CTA, Biosecurity tag, icons |
| `secondary` | `#9d3e54` | Burdeos — product dark tone |
| `secondary-fixed` | `#ffd9de` | Pale pink tint — hero blobs, Icon pink bg (`/30–40`) |
| `brand-pink` | `#db6f85` | Brand pink — gradients, blurs, icons |
| `brand-orange` | `#fd530a` | Brand orange — primary CTA, accents, Eyebrow tint |
| `glass-border` | `rgba(255,255,255,0.6)` | Glass hairlines (cards, pills, FAQ) |
| `surface-container-highest` | `#e2e2e6` | Hairline borders (`gray-100` successor), media placeholder bg, Testimonials wash (`/50`) |
| `inverse-surface` | `#2f3034` | `black` successor — dark panels, tags, strips (`/80–90`) |
| `secondary-container` | `#fe8ba2` | Saturated pink — dark-panel accents, gradients |
| `tertiary` | `#396700` | Accessible green text on light (spec values) |
| `tertiary-fixed` | `#bbf383` | Accessible green text on dark (spec values) |
| `tertiary-fixed-dim` | `#a0d66a` | Green accent — Icon tone, testimonial bar |
| `error` | `#b3261e` | Form error states (labels, borders, messages) |

## Shadows

| Token | Value | Used for |
|---|---|---|
| `shadow-card` | `0 20px 50px rgba(0,0,0,0.08)` | Light content cards (Challenges) |
| `shadow-media` | `0 30px 60px rgba(0,0,0,0.15)` | Tilted media cards |

Brand ambient shadows use the `.shadow-ambient` / `.deep-float-shadow` effect classes
in `global.css` (pink/orange glows), not shadow tokens.

## Rules

- BANNED in components/pages/layouts: hex literals, `rgba()/rgb()/oklch()/hsl()`
  literals, raw neutrals (`white`, `black`, `gray-*`, `red-*`, `slate-*`, `zinc-*`,
  `neutral-*`), `style=` colors. Legal: `transparent`, `currentColor`, opacity modifiers.
- New color → token first (this table gets a row with where-used), then consume.
- Verify: `pnpm run check:palette` clean + `astro build` green.
- Removed 2026-09-10 (`centralize-color-palette`): `brand-500` (orphan),
  `inverse-on-surface`, `on-secondary-container`, `on-tertiary-fixed`,
  `on-tertiary-fixed-variant` (zero usages); `primary-fixed-dim` folded into
  `secondary-fixed` (single blurred hero blob).
