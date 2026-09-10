---
created: 2026-09-07
updated: 2026-09-09
tags:
  - astro
  - components
  - atomic-design
  - documentation
type: resource
status: active
---

# Atoms × Pages — Global Components Usage Map

Where each standardized atom (voted 2026-09-07, see [[component-dependencies]]) is
used across the Stitch designs in `design/stitch/*/`. Source of truth for the
votes is the showcase (`B1…B5 · E1…E3 · P1…P3 · I1…I4 · F1…F3 · C1…C3`).

Dropped (do NOT use): `B1` gradient, `B5` large submit, `E1`, `E3`, `P3` vertical,
`I2` grey circle, `C2` white card, `C3` dark HUD card.

## Button (`atoms/Button.tsx`, React)

```
variant="primary"   B2 orange pill   size md (hero) | sm (forms)
variant="secondary" B3 glass pill    size md (hero)
variant="product"   B4 rectangular   tone light|dark (product cards)
```
| Design | Location | Usage |
|---|---|---|
| `01-hero-layout` | CTAs row under badges | `primary md` "Cotiza para tu clínica" + `secondary md` "Ver línea Tópico" |
| `01-hero-bullet-list` | CTAs row under feature list | same as above |
| `04-products` | Bottom of each HUD spec panel | `product tone="light"` (Tópico, light card) + `product tone="dark"` (Instalaciones, dark card) |
| `05-contact-form` | Form submit, `flex justify-end` | `primary sm` "Enviar solicitud" + `arrow_forward` icon |
| `02-challanges`, `03-testimonials` | — | no buttons in design |

```
hero organism
└── CTAs row (flex flex-wrap gap-md)
    ├── Button primary md ──► "Cotiza…" + Icon(arrow_forward)*
    └── Button secondary md ─► "Ver línea Tópico"
(* arrow icon passed as children, not the Icon atom)

product card organism
└── HUD spec panel
    └── Button product tone=light|dark ──► "Ver ficha Técnica" + arrow
```

## Eyebrow (`atoms/Eyebrow.astro`, static) — E2 standard

| Design | Location | Usage |
|---|---|---|
| `02-challanges` | Top of white content card | `<Eyebrow>Dr. Resultados</Eyebrow>` — direct match |
| `01-hero-layout` | Above H1 | restyle: design shows E1 (bare icon+text) → use E2 pill |
| `01-hero-bullet-list` | Above H1 (inside white card) | same restyle E1 → E2 |
| `03-testimonials` | Above H2 ("EVIDENCIA CLÍNICA") | restyle: design shows E3 (pink outline) → use E2 pill |
| `04-products`, `05-contact-form` | — | no eyebrow in design |

```
content card organism
└── Eyebrow ──► [science icon] + UPPERCASE LABEL
```

## Badge (`atoms/Badge.astro`, static) — P1 `feature` + P2 `tag`

```
variant="feature"  P1 glass pill + optional icon (pH neutro, HOCl…)
variant="tag"      P2 HUD tag + tone dark|primary|light + optional icon
                   (dark = CLINICAL GRADE black/orange · primary = 99.9% Biosecurity
                   · light = 99.9% PURE white; icon replaces pulse dot)
```

| Design | Location | Usage |
|---|---|---|
| `01-hero-layout` | Badges row under subhead | `feature` ×5: `water_drop` pH neutro, `hub` HOCl biomimético, `health_and_safety` Grado 0, `shield` Cero corrosión, `eco` Sin residuos |
| `02-challanges` | Over media-card image, top-left | `tag tone="dark"` "CLINICAL GRADE" — direct match |
| `02-challanges` | Over media-card image, bottom-right | `tag tone="light" icon="verified"` "99.9% PURE" |
| `01-hero-bullet-list` | HUD overlays on visual card | `tag tone="primary"` "99.9% Biosecurity" + `feature` (no icon) "Clinical Grade" |
| `04-products` | Vertical "No requiere enjuague" pills | `feature icon=water_drop|cleaning_services` ×2 in vertical wrapper (P3 dropped, replaced) |

```
hero badges row (flex flex-wrap gap-sm)
└── Badge feature ×5 ──► [icon 14px pink] + caption text

media card organism (position relative)
└── Badge tag (absolute top-12 -ml-6) ──► ● CLINICAL GRADE
```

## Icon (`atoms/Icon.astro`, static) — I1 circle default + bare mode

`variant="circle"` (default): `w-10`/`w-12` circle (`size` md|lg), tone bg + symbol.
`tones`: pink (hero), orange (challenges), primary, green (3rd quote `tertiary-fixed-dim`).
`variant="bare"`: no circle; icon size/color via `class` (quotes, toggles, verified, warning).

| Design | Location | Usage |
|---|---|---|
| `01-hero-bullet-list` | Vertical feature list ×5 | circle pink md `water_drop, hub, health_and_safety, shield, eco` — direct match |
| `01-hero-layout` | Badge pills (14px inline icons) | keep inline (smaller than I1); I1 reserved for feature rows |
| `02-challanges` | Feature rows ×3 | circle orange lg `shield, water_drop, eco` |
| `01-hero-*` avatar card | `biotech` circle + bare `verified` | circle pink md filled + bare primary |
| `02-challanges` PURE pill | `verified` inside Badge tag | bare orange via Badge `icon` prop |
| `03-testimonials` | Quote marks | bare filled `text-4xl opacity-50`, tone orange/pink/green |
| `05-contact-form` | FAQ header avatar | circle pink lg filled `info` |
| `05-contact-form` | FAQ summary toggles ×3 | bare orange `add_circle` |
| `05-contact-form` | Disclaimer box | bare orange filled `warning` (inside `Card`) |

```
feature row molecule (flex items-start gap-5)
├── Icon name=… ──► ( )  w-10 pink circle
└── div
    ├── h4 headline-sm
    └── p body-md (Desafío: … / Solución: …)
```

## Input / Textarea / Checkbox (React, store-bound) — F1 / F3 / F2

F1 underline input (`border-b-2`, transparent, focus orange, F1 uppercase label).
F3 glass textarea (`rounded-2xl bg-white/30`, F1 label). F2 checkbox pill
(`rounded-full bg-white/40`, orange accent, boolean field).

| Design | Location | Usage |
|---|---|---|
| `05-contact-form` | Form grid 2-col ×2 rows | `Input` ×4: Nombre(`name`), Clínica/Hospital(`clinica`), Teléfono/WhatsApp(`telefono`), Correo(`email`) |
| `05-contact-form` | "¿Qué línea te interesa?" pill group | `Checkbox` ×3 bound to `lineaTopico/lineaInstalaciones/lineaDistribucion` |
| `05-contact-form` | Mensaje | `Textarea` ×1, `rows=3` |
| current `ContactForm` island | `/` + `/contact` | name/clinica/telefono/email + linea checkboxes + message wired; labels partly EN (copy pass pending, see notes) |

```
contact form molecule (glass-panel-heavy card)
├── grid md:grid-cols-2 ──► Input name, Input clinic, Input phone, Input email
├── pill group (flex flex-wrap gap-3) ──► Checkbox ×3
├── Textarea message
└── div flex justify-end ──► Button primary sm + arrow icon
```

## Card (`atoms/Card.astro`, static) — C1 standard

Glass panel (`bg-[#f9f9fd]/70`, `backdrop-blur-xl`, `rounded-xl`, ambient shadow).

| Design | Location | Usage |
|---|---|---|
| `03-testimonials` | 3-col testimonial grid | `Card` ×3: quote icon + italic quote + footer (name/caption, `border-t`). Left accent bar (`w-1` orange/pink/green) stays in organism |
| `05-contact-form` | FAQ panel, disclaimer box | optional: FAQ/disclaimer currently use `glass-panel-heavy`; may adopt `Card` + `class` override later |
| `01-hero-*`, `02-challanges`, `04-products` | — | hero/challenge/product cards are bespoke media compositions, not C1 |

```
testimonials grid (grid md:grid-cols-3 gap-gutter)
└── Card ×3
    ├── format_quote icon (bespoke, organism-level)
    ├── p italic body-lg (quote)
    └── footer border-t ──► label-bold name + caption role/clinic
```

## Per-design shopping lists (future organisms)

```
01-hero-layout / 01-hero-bullet-list → Button primary+secondary, Eyebrow(E2),
                                       Badge feature×5, Icon×5 (bullet variant)
02-challanges                        → Eyebrow, Icon circle orange×3, Badge tag dark+light
03-testimonials                       → Card×3, Eyebrow(E2 restyle), Icon bare quotes×3
04-products                           → Button product×2 (light+dark), Badge feature×2 vertical
05-contact-form                       → Input×4, Checkbox×3, Textarea, Button primary sm,
                                       Icon circle lg (FAQ) + bare (toggles, warning), Card (disclaimer)
```

## Notes

- Gaps closed 2026-09-07: GAP-A (Icon variant/tone/size), GAP-B (Badge tag tones),
  GAP-1/2/3 (all HUD pills mapped to Badge). GAP-4 closed: store has clinica/telefono/
  linea booleans, wired in `ContactForm`.
- Copy: `ContactForm` ES pass complete in `add-contact-section` (labels, placeholders, submit/success, store fallbacks, both page headings). Island `Textarea` is `rows=3` per the molecule sketch.
- Molecules unlocked by bare Icon: avatar-row (Icon filled + bare verified + text),
  FAQ accordion (`details`/`summary` + bare `add_circle` toggle).

## Related

- [[component-dependencies]] — atom catalogue + page trees (update both docs together)
- [[astro-atomic-components]] — vanilla tier + import rules
