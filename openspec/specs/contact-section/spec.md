## ADDED Requirements

### Requirement: Contact section structure and anchors
The system SHALL render a static `organisms/ContactSection.astro` shell on `/` as `section#section-5` and reused on `/contact`, composed of a section-scoped blob background with giant rotated `BIOSEGURIDAD` massive type, an in-flow header flattened from the Stitch `lg:absolute top-left` overlay (per Products header-flattening precedent; H2 with gradient `bioseguridad` span + sub copy), and a static 12-column grid inside the standard `max-w-max-width` container: left column (5 cols) stacking FAQ panel + image + disclaimer, right column (7 cols) with the glass `ContactForm` spanning full height. Mild Stitch skew on all viewports — base tilt on mobile (form `-1deg`, FAQ `+1deg`, image `-1deg`), stronger at desktop (form `-2deg` + `hover:rotate-0`, FAQ `+3deg`, image `-3deg`) — with no inter-card overlap; float animation disabled. No client-side framework SHALL be required except the single `ContactForm` island (`client:load`) and the inline FAQ exclusive-open script.

#### Scenario: Landing composition
- **WHEN** a visitor loads `/` on desktop
- **THEN** a `#section-5` region appears after Products showing the header, the FAQ/image/disclaimer stack in the left column with the glass form spanning the right column, and every Hero/Products `href="#section-5"` link lands on it

#### Scenario: Contact page reuse
- **WHEN** a visitor loads `/contact`
- **THEN** the same `ContactSection` organism renders below the existing direct phone/email intro block with identical composition and a single `ContactForm` island instance

### Requirement: Contact header and background copy
The organism SHALL use the exact Stitch ES strings: H2 `¿Listo para elevar la bioseguridad de tu clínica?` (with `bioseguridad` as gradient `from-brand-orange to-brand-pink` span), sub `Inicie el protocolo de integración biológica. Conecte su infraestructura con la precisión clínica de nuestra matriz oxidativa.`, and background massive word `BIOSEGURIDAD` (`font-impact text-massive`, `opacity-[0.03]`, `-rotate-12`).

#### Scenario: Copy fidelity
- **WHEN** the section renders
- **THEN** the H2, gradient span, sub, and background word match the Stitch source verbatim (including accents and casing)

### Requirement: Voted atom reuse with zero atom edits
The section SHALL reuse standardized atoms with no atom file modifications: `Input` F1 ×4 (Nombre→`name`, Clínica / Hospital→`clinica`, Teléfono / WhatsApp→`telefono`, Correo→`email`), `Checkbox` F2 ×3 (`lineaTopico`/`lineaInstalaciones`/`lineaDistribucion` → Tópico/Instalaciones/Distribución), `Textarea` F3 ×1 (Mensaje, `rows=3`), `Button variant="primary" size="sm"` right-aligned in `flex justify-end` with an `arrow_forward` glyph passed as a `span` child (NOT the `Icon` atom — `ContactForm` is a React island and cannot import `Icon.astro`; hero/product CTA precedent), `Icon variant="circle" tone="pink" size="lg" filled name="info"` (FAQ header), `Icon variant="bare" tone="orange" name="add_circle"` ×3 with `group-open:rotate-180` toggle class, and `Icon variant="bare" tone="orange" filled name="warning"` (disclaimer). Shells SHALL be bespoke `glass-panel-heavy rounded-3xl` (NOT `Card C1`).

#### Scenario: Atom mapping
- **WHEN** the section renders
- **THEN** all 4 inputs, 3 line pills, message area, sm submit, FAQ avatar/toggles, and disclaimer icon render via the voted variants above with no new atom or variant introduced

### Requirement: FAQ accordion content and exclusive behavior
The FAQ panel SHALL show title `Frecuencia de Diagnóstico` and exactly 3 native `<details>` items with Stitch ES Q/A verbatim (`¿Es un desinfectante clínico de grado médico?`, `¿Cura heridas profundas o infectadas?`, `¿Deja residuos en quirófano?` + their answers), each `summary` carrying the bare `add_circle` toggle; an inline section-scoped script SHALL enforce exclusive single-open (opening one closes the others), matching Stitch behavior.

#### Scenario: Exclusive accordion
- **WHEN** a visitor opens the second FAQ item while the first is open
- **THEN** the first closes automatically and only the second stays open, with its toggle rotated

#### Scenario: No-JS baseline
- **WHEN** the page loads with JS disabled
- **THEN** all headings, form labels, FAQ questions, and disclaimer render as static HTML and each `<details>` still opens natively (multi-open fallback)

### Requirement: Image and disclaimer layer
The layer SHALL render a local WebP from `src/assets/contact/` via `astro:assets Image` (`loading="lazy"`, widths capped at native, `decoding="async"`, `border-4 border-white/80 rounded-3xl`) at its natural aspect ratio (`h-auto w-full`, no fixed or fill heights that crop or stretch on any viewport) — no external `googleusercontent` hotlink SHALL remain — with the `glass-panel-heavy rounded-2xl border-l-4 border-l-brand-orange` disclaimer box beside/below it carrying the bare `warning` icon and caption `Aviso Importante: vetoxzyn® no es un medicamento, consulte a su médico veterinario.` The layer SHALL stack visible on mobile (deliberate deviation from Stitch `hidden lg:flex`).

#### Scenario: Local optimized render
- **WHEN** the page builds and loads `/` or `/contact`
- **THEN** the contact image is served from local build output (responsive WebP) and the disclaimer caption is visible at 390px width without horizontal scroll

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
