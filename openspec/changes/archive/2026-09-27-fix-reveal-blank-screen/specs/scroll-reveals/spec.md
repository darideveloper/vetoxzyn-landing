## MODIFIED Requirements

### Requirement: Scroll reveals for Challenges, Testimonials, Products, ContactSection

Each of Challenges, Testimonials, Products, and ContactSection SHALL own one ScrollTrigger timeline (`toggleActions: "play none none none"`) with section-scoped `js-*` selectors, unhide-before-`.from()`, header + staggered group choreography with `-=` overlaps, and tuned `start` values (Challenges `top 75%`, Testimonials `top 80%`, Products `top 75%`, ContactSection `top 80%`, falling back to `top bottom` if a tall section never fires). Tweens SHALL animate transform/opacity only. Hiding via `.js-reveal` SHALL apply only when module JS is confirmed running (the `no-js` → `js` swap is gated on module support), so module-less clients never hide content. Reduced-motion branches that hide-before-reveal SHALL reveal immediately when the section is already in viewport at init, and SHALL use a one-shot trigger otherwise, so content can never stick hidden.

#### Scenario: Sections reveal once on scroll

- **WHEN** each section's top reaches its `start` threshold
- **THEN** its header reveals first and its cards/media follow with stagger, playing exactly once

#### Scenario: Tall-section fallback fires

- **WHEN** a section is taller than the viewport so its configured `start` never triggers
- **THEN** the section uses `top bottom` (or equivalent retune) so content still reveals

#### Scenario: Already-visible section never sticks hidden

- **WHEN** a section is already in viewport at init (short page, tall viewport, restored scroll) under reduced-motion
- **THEN** its content reveals immediately without waiting for a scroll-enter event that will never fire
