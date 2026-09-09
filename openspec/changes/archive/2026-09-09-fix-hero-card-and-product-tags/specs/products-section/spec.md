## MODIFIED Requirements

### Requirement: Responsive behavior
The section SHALL stack panels vertically on mobile (content first, HUD below) and split `flex-col lg:flex-row` (50/50) on desktop, with wrapping CTAs, no horizontal overflow at 390/768/1280px, and vertical pills positioned without overlapping HUD content. Each vertical pill SHALL be bottom-anchored (`bottom-lg`) inside its panel's padded content column (not centered on the full-height article), sitting alongside its HUD card with a clear horizontal gap (HUD cards carry `sm:ml-md` / `sm:mr-md`), and fully below the panel title text.

#### Scenario: Mobile stacking
- **WHEN** the viewport is 390px wide
- **THEN** panels stack full-width, text remains readable, CTAs wrap without horizontal scroll, and no element overflows the viewport

#### Scenario: Tablet pill placement
- **WHEN** the viewport is 768px wide (stacked panels, pills visible)
- **THEN** each pill's top edge is below its panel title, its bottom edge sits ~24px under its HUD card's bottom edge, and a ~22px horizontal gap separates pill and card with no viewport overflow
