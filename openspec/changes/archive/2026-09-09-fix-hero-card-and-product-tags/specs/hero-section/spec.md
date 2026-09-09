## MODIFIED Requirements

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
