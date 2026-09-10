## MODIFIED Requirements

### Requirement: Contact section structure and anchors
The system SHALL render a static `organisms/ContactSection.astro` shell on `/` as `section#section-5` and reused on `/contact`, composed of a transparent shell over the global fixed wash carrying a section-local tint/blur overlay plus the section-scoped blob background (`ContactBackdrop`: organic blobs with giant rotated `BIOSEGURIDAD` massive type), an in-flow header flattened from the Stitch `lg:absolute top-left` overlay (per Products header-flattening precedent; H2 with gradient `bioseguridad` span + sub copy), and a static 12-column grid inside the standard `max-w-max-width` container: left column (5 cols) stacking FAQ panel + image + disclaimer, right column (7 cols) with the glass `ContactForm` spanning full height. Mild Stitch skew on all viewports — base tilt on mobile (form `-1deg`, FAQ `+1deg`, image `-1deg`), stronger at desktop (form `-2deg` + `hover:rotate-0`, FAQ `+3deg`, image `-3deg`) — with no inter-card overlap; float animation disabled. No client-side framework SHALL be required except the single `ContactForm` island (`client:load`) and the inline FAQ exclusive-open script.

#### Scenario: Landing composition
- **WHEN** a visitor loads `/` on desktop
- **THEN** a `#section-5` region appears after Products showing the header, the FAQ/image/disclaimer stack in the left column with the glass form spanning the right column, and every Hero/Products `href="#section-5"` link lands on it

#### Scenario: Contact page reuse
- **WHEN** a visitor loads `/contact`
- **THEN** the same `ContactSection` organism renders below the existing direct phone/email intro block with identical composition and a single `ContactForm` island instance

#### Scenario: Distinctive backdrop over global wash
- **WHEN** a visitor scrolls from Products into `#section-5`
- **THEN** the section shows its tinted blur overlay + organic blobs + giant `BIOSEGURIDAD` above the continuous global wash (no `bg-surface-ice` fill on the shell), reading as a distinct region with unchanged glass-panel contrast
