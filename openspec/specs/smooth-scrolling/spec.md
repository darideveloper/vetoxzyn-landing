# smooth-scrolling Specification

## Purpose
TBD - created by archiving change fix-links-ctas. Update Purpose after archive.
## Requirements
### Requirement: Global smooth anchor scrolling
The system SHALL apply `scroll-behavior: smooth` for in-page anchor navigation at the document level in `src/styles/global.css`, with `prefers-reduced-motion: reduce` restoring instant jumps (`scroll-behavior: auto`). Existing `scroll-mt-20` sticky-header offsets SHALL be preserved.

#### Scenario: Smooth anchor jump
- **WHEN** a visitor clicks "Cotiza para tu clínica" (`#contacto-formulario`), "Más información" (`#contacto-formulario`), or "Ver línea Tópico" (`#productos`)
- **THEN** the page scrolls smoothly to the target (offset below the sticky header) — marketing CTAs land directly on the form

#### Scenario: Reduced-motion parity
- **WHEN** the user prefers reduced motion
- **THEN** anchor jumps are instant with no smooth animation

