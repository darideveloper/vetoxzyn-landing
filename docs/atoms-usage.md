---
created: 2026-09-07
updated: 2026-09-07
tags:
  - astro
  - components
  - atomic-design
  - documentation
type: resource
status: active
---

# Atom Usage Map — Where Each Global Component Lives

Standardized 2026-09-07 from the 5 Stitch designs
(`design/01-hero-layout`, `01-hero-bullet-list`, `02-challanges`,
`03-testimonials`, `04-products`, `05-contact-form`).
Votes: primary **B2**, secondary **B3** + product **B4**, submit **B2**,
eyebrow **E2**, badge **P1** + tag **P2**, icon **I1**, form **F1+F2+F3**, card **C1**.
Dropped: B1 gradient, B5 large, E1/E3, P3 vertical.

Landing sections (organisms, future work):

```
index.astro
└── Layout.astro
    ├── Hero            ← 01-hero-layout (+ bullets from 01-hero-bullet-list)
    ├── Challenges      ← 02-challanges
    ├── Testimonials    ← 03-testimonials
    ├── Products        ← 04-products
    └── Contact         ← 05-contact-form (+ molecules/ContactForm island)
```

## Button (`atoms/Button.tsx`)

`variant`: `primary` B2 (default) · `secondary` B3 · `product` B4.
`size`: `md` (B2 hero spec, default) · `sm` (forms).
`tone` (product only): `light` orange · `dark` secondary burdeos.

```
Hero                              Products (×2 cards)              Contact
+------------------------------+  +-----------------------------+  +------------------+
| [Eyebrow E2]                 |  | Tópico         Instalaciones|  | F1  F1           |
| HEADLINE                     |  | specs...       specs...     |  | F1  F1           |
| [P1][P1][P1][P1][P1]         |  | [B4 light]     [B4 dark]    |  | F2 F2 F2         |
| [B2 Cotiza ->] [B3 Ver línea]|  |  Ver ficha      Ver ficha   |  | F3               |
+------------------------------+  +-----------------------------+  |     [B2 Enviar]  |
                                                                    +------------------+
ContactForm island (index + contact pages):  [Input F1] [Input F1] [Textarea F3] [Button size=sm]
```

| Variant | Used in | Design source |
|---|---|---|
| `primary` md | Hero CTA "Cotiza para tu clínica" | 01-hero-bullet-list (B2 replaces B1 gradient) |
| `primary` sm | `ContactForm` submit, Contact "Enviar solicitud" (B5 replaced by B2) | 05-contact-form, molecules/ContactForm |
| `secondary` | Hero "Ver línea Tópico" | 01-hero-layout + bullet-list (B3) |
| `product` light/dark | "Ver ficha Técnica" on light Tópico / dark Instalaciones cards | 04-products (B4) |

## Eyebrow (`atoms/Eyebrow.astro`)

E2: orange-tint pill, `science` icon default, uppercase label via slot.

```
Hero                               Challenges (native E2)          Testimonials (E3 → E2)
+--------------------------------+ +--------------------------------+ +--------------------------------+
| [● TECNOLOGÍA OXIDATIVA...]    | | [● DR. RESULTADOS]             | | [● EVIDENCIA CLÍNICA]            |
|  (E1 icon+text → replaced)     | |                                | |  (E3 pink outline → replaced)    |
+--------------------------------+ +--------------------------------+ +--------------------------------+
```

## Badge (`atoms/Badge.astro`)

`variant="feature"` P1 (default, `icon` prop) · `variant="tag"` P2 tag.

```
Hero feature pills (P1 ×5)                    Over-image HUD tags (P2)
+--------------------------------------------------+  +----------------------------------+
| [💧 pH neutro] [🕸 HOCl biomimético]              |  | photo                            |
| [🛡 Grado 0] [🛡 Cero corrosión] [🌱 Sin residuos]|  | [● CLINICAL GRADE]  [99.9% PURE] |
+--------------------------------------------------+  +----------------------------------+
  01-hero-layout / bullet-list                        02-challanges, 03-testimonials (cards),
                                                      04-products (vertical P3 → dropped)
```

## Icon (`atoms/Icon.astro`)

I1: `w-10` circle, `secondary-fixed/40` bg, brand-pink 20px glyph.
`name` = any Material Symbols name, `filled` toggle.

```
Hero bullets (I1 ×5, native)      Challenges rows (I2 w-12 → replaced by I1)
+--------------------------------+ +--------------------------------+
| (○) pH neutro                  | | (○) Cero Corrosión             |
| (○) HOCl biomimético           | | (○) Alta Pureza                |
| (○) Grado 0 / Cero / Sin...    | | (○) Biodegradable              |
+--------------------------------+ +--------------------------------+
  01-hero-bullet-list                02-challanges

Static (not atoms, used as-is): I3 avatar+verified (hero card overlay),
I4 quote/info/add/warning (testimonials, FAQ accordion, disclaimer).
```

## Input / Textarea / Checkbox (`atoms/Input.tsx`, `Textarea.tsx`, `Checkbox.tsx`)

F1 underline input · F3 glass textarea · F2 checkbox-pill. All store-bound
via injectable `useField` (same shape as `store/useField`).

```
Contact (05-contact-form)                    ContactForm island (index + /contact)
+------------------------------------------+ +------------------------------------------+
| NOMBRE              CLÍNICA / HOSPITAL   | | Name [Input F1]                          |
| [F1 Dr. Juan Pérez] [F1 Hospital...]     | | Email [Input F1]                         |
| TELÉFONO            CORREO               | | Message [Textarea F3]                    |
| [F1 +52...]         [F1 contacto@...]    | | [Button size=sm Send message]            |
| ¿QUÉ LÍNEA TE INTERESA?                  | |                                          |
| [F2 Tópico] [F2 Instalaciones] [F2 Dist.]| | F2 group (Tópico/Instalaciones/Distrib.) |
| MENSAJE                                  | | → future molecule, needs store field    |
| [F3 glass textarea]                      | |                                          |
|                      [B2 Enviar]         | +------------------------------------------+
+------------------------------------------+
```

Labels: F1 spec (`uppercase text-xs tracking-widest text-black/70`) — fixed 2026-09-07.

## Card (`atoms/Card.astro`)

C1: glass panel, `rounded-xl`, ambient shadow, `p-6`. Sole standard (C2/C3 dropped).

```
Testimonials (native C1 ×3)       Challenges (C2 white → C1)      Products specs (C3 dark → C1)
+------------+------------+-----+ +--------------------------------+ +--------------------------------+
| "Sin       | "Limpieza  | "In- | | Transciende los Obstáculos     | | Concentración 100 ppm          |
| residuos"  | tópica..." | teg..| | + feature rows (I1)            | | pH 6.0–7.5 · ORP >850mV        |
| — Dr. Mén. | — Dra. Ram.| —MVZ | |                                | | [B4 Ver ficha Técnica]         |
+------------+------------+-----+ +--------------------------------+ +--------------------------------+
  03-testimonials                   02-challanges                     04-products
```

## Replacement log (non-standard → standard)

```
B1 gradient CTA   → Button primary        (hero-layout)
B5 large submit   → Button primary (+size) (contact-form)
E1 icon+text      → Eyebrow E2            (hero)
E3 pink outline   → Eyebrow E2            (testimonials)
P3 vertical pills → dropped (tag covers)  (products)
I2 w-12 orange    → Icon I1               (challenges)
C2 white card     → Card C1               (challenges)
C3 dark HUD       → Card C1               (products)
```

## Related

- [[astro-atomic-components]]
- [[component-dependencies]] (atom catalogue + per-page trees)
