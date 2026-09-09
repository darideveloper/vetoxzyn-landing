## ADDED Requirements

### Requirement: Hybrid A2 hero structure
The system SHALL render a hero organism combining the `01-hero-layout` shell (animated blob background, content column + visual glass card) with the `01-hero-bullet-list` vertical feature rows, using hardcoded A2 Dr. Resultados copy from `design/docs/client-pages-sections.md` Sec 1. The visual glass card SHALL render at its designed width (28rem cap, filling its 5-col cell); width utilities shadowed by the Stitch spacing scale (bare `max-w-xs/sm/md/lg/xl`, which compile to 4/12/24/48/80px) SHALL NOT be used — explicit arbitrary rem values SHALL be used instead.

#### Scenario: Hero composition
- **WHEN** a visitor loads `/` on desktop
- **THEN** the hero shows eyebrow + H1 + sub + 5 Icon bullet rows + 2 CTAs in a 7-col content column beside a 5-col visual glass card with bottom avatar overlay, over animated blobs

#### Scenario: Bullets replace badges
- **WHEN** the hero renders the 5 trust items (`pH neutro`, `HOCl biomimético`, `Grado 0 de irritación`, `Cero corrosión`, `Sin residuos`)
- **THEN** they appear exactly once as vertical `Icon circle pink md filled` rows (water_drop, hub, health_and_safety, shield, eco) and no glass-pill badges row is rendered

#### Scenario: Card fills its cell
- **WHEN** a visitor loads `/` at 1280px viewport
- **THEN** the visual card measures ~448×560px with its image filling the card, and no shadowed max-width utility applies to the hero card

### Requirement: Hero copy and CTAs
The hero SHALL use the exact A2 strings (eyebrow `Tecnología oxidativa para práctica veterinaria`, H1 `vetoxzyn®: bioseguridad avanzada para tu clínica.`, sub, CTA labels `Cotiza para tu clínica` / `Ver línea Tópico`, avatar overlay `Dr. Resultados` / `División Veterinaria`) with primary CTA linking `#section-5` and secondary `#section-3`.

#### Scenario: CTA targets
- **WHEN** a visitor activates the primary or secondary CTA
- **THEN** the browser navigates to `#section-5` (form) or `#section-3` (galería) respectively, keyboard-focusable with visible focus state

### Requirement: Hero responsive behavior
The hero SHALL be fully responsive: single-column stacked layout (content first, visual below) on mobile, `lg:grid-cols-12` (7+5) on desktop, fluid type (`display-lg-mobile` → `md:display-lg`), and no horizontal overflow at 390/768/1280px viewports.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** content stacks above the visual card with Stitch spacing (`px-gutter`), CTAs wrap without horizontal scroll, and blobs are clipped without horizontal scroll

### Requirement: Hero local WebP image
The hero visual SHALL render a local WebP image from `src/assets/hero/` via `astro:assets Image` (eager, `fetchpriority="high"`, widths+sizes) converted from the Stitch source; no external `googleusercontent` hotlink SHALL remain in the hero.

#### Scenario: Optimized local render
- **WHEN** the page builds and loads `/`
- **THEN** the hero card image is served from the local build output (WebP with responsive widths) and displays with the luminosity/opacity treatment and avatar overlay intact

### Requirement: Hero accessibility and brand rules
The hero SHALL contain exactly one H1 per page, unskipped heading order, decorative blobs hidden from assistive tech, meaningful alt on the hero image, `vetoxzyn®` lowercase + ® spelling, and safe-vocabulary copy (no cura/trata/desinfectante clínico claims).

#### Scenario: Assistive-tech pass
- **WHEN** a screen-reader or keyboard user traverses the hero
- **THEN** one H1 is announced, blobs are ignored, CTAs are reachable/operable by keyboard, and the image exposes its alt text
