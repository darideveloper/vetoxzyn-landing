## Purpose

Static ContactSection shell (`#contacto`) with FAQ, media/disclaimer layer, and the ContactForm island.
## Requirements
### Requirement: Contact section structure and anchors
The system SHALL render a static `organisms/ContactSection.astro` shell on `/` as `section#section-5` and reused on `/contact`, composed of a transparent shell over the global fixed wash carrying a section-local tint/blur overlay plus the section-scoped blob background (`ContactBackdrop`: organic blobs with giant rotated `BIOSEGURIDAD` massive type), an in-flow header flattened from the Stitch `lg:absolute top-left` overlay (per Products header-flattening precedent; H2 with gradient `bioseguridad` span + sub copy), and a static 12-column grid inside the standard `max-w-max-width` container: left column (5 cols) stacking FAQ panel + image + disclaimer, right column (7 cols) with the glass `ContactForm` spanning full height. Mild Stitch skew on all viewports — base tilt on mobile (form `-1deg`, FAQ `+1deg`, image `-1deg`), stronger at desktop (form `-2deg` + `hover:rotate-0`, FAQ `+3deg`, image `-3deg`) — with no inter-card overlap; float animation disabled. No client-side framework SHALL be required except the single `ContactForm` island (`client:load`) and the inline FAQ exclusive-open script.

#### Scenario: Landing composition
- **WHEN** a visitor loads `/` on desktop
- **THEN** a `#section-5` region appears after Products showing the header, the FAQ/image/disclaimer stack in the left column with the glass form spanning the right column, and every Hero/Products `href="#section-5"` link lands on it

#### Scenario: Contact page reuse
- **WHEN** a visitor loads `/contact`
- **THEN** a branded H1 (`Contáctanos`, canonical `SectionHeader` `level="h1"` string-title style) renders inside the section above the organism header via the optional `page-title` slot (shared section tint/backdrop background), followed by the same `ContactSection` composition with a single `ContactForm` island instance (no phone/email paragraph; channels remain reachable via shell `ContactLinks` in header and footer)

#### Scenario: Landing slot absence
- **WHEN** a visitor loads `/`
- **THEN** the `page-title` slot is empty and the organism renders exactly as before (no extra wrapper, no heading)

#### Scenario: Distinctive backdrop over global wash
- **WHEN** a visitor scrolls from Products into `#section-5`
- **THEN** the section shows its tinted blur overlay + organic blobs + giant `BIOSEGURIDAD` above the continuous global wash (no `bg-surface-ice` fill on the shell), reading as a distinct region with unchanged glass-panel contrast

### Requirement: Contact header and background copy
The organism SHALL render its eyebrow, H2, subtitle, and background massive word from the avatar data prop (previously fixed to `¿Listo para elevar la bioseguridad de tu clínica?` with the `bioseguridad` gradient span and `BIOSEGURIDAD` backdrop word), keeping the gradient-span treatment and the `opacity-[0.03]` rotated backdrop style.

#### Scenario: Copy per avatar
- **WHEN** the section renders for a given avatar
- **THEN** the H2 (with its gradient span), sub, and background word match that avatar's JSON values verbatim, including accents and casing

### Requirement: Voted atom reuse with zero atom edits
The section SHALL reuse standardized atoms with no atom file modifications: `Input` F1 ×4 (Nombre→`name`, Clínica / Hospital→`clinica`, Teléfono / WhatsApp→`telefono`, Correo→`email`), `Checkbox` F2 ×3 (`lineaTopico`/`lineaInstalaciones`/`lineaDistribucion` → Tópico/Instalaciones/Distribución), `Textarea` F3 ×1 (Mensaje, `rows=3`), `Button variant="primary" size="sm"` right-aligned in `flex justify-end` with an `arrow_forward` glyph passed as a `span` child (NOT the `Icon` atom — `ContactForm` is a React island and cannot import `Icon.astro`; hero/product CTA precedent), `Icon variant="circle" tone="pink" size="lg" filled name="info"` (FAQ header), `Icon variant="bare" tone="orange" name="add_circle"` ×3 with `group-open:rotate-180` toggle class, and `Icon variant="bare" tone="orange" filled name="warning"` (disclaimer). Shells SHALL be bespoke `glass-panel-heavy rounded-3xl` (NOT `Card C1`).

#### Scenario: Atom mapping
- **WHEN** the section renders
- **THEN** all 4 inputs, 3 line pills, message area, sm submit, FAQ avatar/toggles, and disclaimer icon render via the voted variants above with no new atom or variant introduced

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

### Requirement: Responsive overlap without overflow
Mobile SHALL stack header → form → FAQ → image → disclaimer single-column with the base skew tilts; desktop (`lg:`) SHALL lay the same DOM order out as a static 12-column grid (left column `FAQ + image + disclaimer` on cols 1–5, form on cols 6–12 spanning all three rows, `gap-10`) with stronger skew tilts, no absolute positioning, and no inter-card overlap, inside an `overflow-x-clip` container with zero horizontal overflow at 390/768/1024/1280/1440px.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** all five blocks stack vertically (header, form, FAQ, image, disclaimer) with no grid offsets applied and no horizontal scrollbar appears

#### Scenario: Desktop grid
- **WHEN** the viewport is 1280px wide
- **THEN** FAQ, image, and disclaimer stack in the left column while the form spans the right column at full height with a 40px gap, mild skew tilts visible, no cards overlapping, and no page-level horizontal overflow appears

### Requirement: Effect tokens in global.css
`styles/global.css` SHALL gain verbatim Stitch tokens `glass-panel-heavy`, `organic-blob-1/2` (+`morph`), `floating-element` (+`float-slow`), `deep-float-shadow`, `z-stack-1/2/3`, with the existing `prefers-reduced-motion` guard extended to disable `morph`/`float-slow`.

#### Scenario: Reduced motion
- **WHEN** a visitor prefers reduced motion
- **THEN** blob morph and float animations are disabled while all content remains fully visible and positioned

