## ADDED Requirements

### Requirement: Hero minimal transform-only entrance

The Hero section SHALL play a short transform-only entrance (no `autoAlpha: 0` / opacity hide on the H1, subtitle, or LCP media; `y`/`scale` only, durations ≤ 0.9s), scoped to its own root, guarded to play once per session, and gated behind `gsap.matchMedia()` with a fade/no-op reduced-motion branch.

#### Scenario: LCP-safe hero entrance

- **WHEN** the home page loads with JS enabled and no reduced-motion preference
- **THEN** hero content settles via short transform motion without ever hiding the H1/LCP media at opacity zero

#### Scenario: Hero does not replay annoyingly

- **WHEN** the user navigates away and back via ClientRouter in the same session
- **THEN** the hero jumps to its final visible state instead of replaying the entrance

### Requirement: Scroll reveals for Challenges, Testimonials, Products, ContactSection

Each of Challenges, Testimonials, Products, and ContactSection SHALL own one ScrollTrigger timeline (`toggleActions: "play none none none"`) with section-scoped `js-*` selectors, unhide-before-`.from()`, header + staggered group choreography with `-=` overlaps, and tuned `start` values (Challenges `top 75%`, Testimonials `top 80%`, Products `top 75%`, ContactSection `top 80%`, falling back to `top bottom` if a tall section never fires). Tweens SHALL animate transform/opacity only.

#### Scenario: Sections reveal once on scroll

- **WHEN** each section's top reaches its `start` threshold
- **THEN** its header reveals first and its cards/media follow with stagger, playing exactly once

#### Scenario: Tall-section fallback fires

- **WHEN** a section is taller than the viewport so its configured `start` never triggers
- **THEN** the section uses `top bottom` (or equivalent retune) so content still reveals

### Requirement: Decorative parallax only

Scrubbed parallax SHALL apply to decorative blobs/glows only (never text, CTAs, or form controls), using `scrub` + `start`/`end` ranges with `ease: "none"` inside the `no-preference` branch, and SHALL be absent for reduced-motion users.

#### Scenario: Parallax depth without content motion sickness

- **WHEN** a `no-preference` user scrolls the hero/testimonials backdrop
- **THEN** decorative layers drift at different scrubbed speeds while text stays fixed to its reveal timeline

### Requirement: Kinetic marquee pattern (placement deferred)

The system SHALL ship the `initKineticMarquee` factory (duplicate-once seamless loop with modulo wrap, `_marqueeInit` guard, `ctx.revert()` cleanup, `aria-hidden="true"`, reduced-motion early return) as a reusable pattern; the concrete host strip is deferred to implementation since no marquee markup exists today, and when wired it SHALL fade as a faint watermark behind foreground reveals.

#### Scenario: Seamless loop without duplication bugs

- **WHEN** the marquee section mounts, remounts, or the page navigates via ClientRouter
- **THEN** content width stays exactly 2× original with an invisible wrap point and no repeated duplication

### Requirement: Animated counters pattern (placement deferred)

The system SHALL ship the counter helper reading target + suffix from `data-value` (e.g. `100+`); the concrete stats wired to it are deferred to implementation since no `data-value` markup exists today, and when wired each counter SHALL zero-out before its timeline starts and tick up in sync with its section reveal (appended at `"<"` when inside an entrance timeline).

#### Scenario: Counters tick with the reveal

- **WHEN** the stats group reveals
- **THEN** each `.js-stat-value` counts from zero to its target with suffix preserved and no final-value flash

## REMOVED Requirements

### Requirement: Swiper scroller extra (conditional)
**Reason**: Dropped per user decision — no gallery markup exists and CSS `overflow-x: auto` covers the need without a new dependency.
**Migration**: Use a CSS `overflow-x: auto` row for any horizontal strip; do not add the `swiper` dependency.
