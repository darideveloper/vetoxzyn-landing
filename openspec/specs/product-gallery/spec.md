## Purpose

Swiper gallery proof strip (`ProductGallery`) inside `#productos` — 7 product presentations with calm autoplay, deferred hydration, and small-width images.

## Requirements

### Requirement: Gallery slide content and Spanish alts
The system SHALL render a `ProductGallery` island with an initial set of 7 image-only slides sourced from `src/assets/gallery/`, each with a meaningful Spanish alt text naming its presentation. Slide image URLs/srcsets SHALL be resolved by an Astro wrapper (via `astro:assets`) and passed as plain string props — the `.tsx` island stays presentational and never imports `astro:assets` components directly.

#### Scenario: Initial seven presentations visible
- **WHEN** a visitor reaches the gallery strip
- **THEN** 7 slides appear in order — atomizador 60ml, 120ml, 240ml, 480ml, 950ml, garrafa 4L, garrafa 23L — each showing one product image with no text overlay, arrows, or dots

#### Scenario: Screen-reader names
- **WHEN** a screen reader traverses the slides
- **THEN** each image announces its Spanish alt (e.g. `Envase atomizador Vetoxzyn 120 ml`) and decorative layers are silent

### Requirement: Responsive peek-and-grow columns
The system SHALL drive visible columns via Swiper breakpoints: `1.2` with peek on mobile, `2` from `640px`, `3` from `1024px`, `4` from `1280px`, with `spaceBetween` growing per step.

#### Scenario: Mobile peek
- **WHEN** the viewport is 390px wide
- **THEN** one full slide plus a peek of the next is visible, hinting swipeability with no horizontal page scroll

#### Scenario: Desktop growth
- **WHEN** the viewport is 1280px wide
- **THEN** 4 slides are visible in one row with even gaps and no overflow

### Requirement: Calm autoplay loop
The system SHALL autoplay with `delay 3500ms`, infinite `loop`, `speed ~600ms`, `pauseOnMouseEnter`, continuing after manual swipe (`disableOnInteraction:false`), and fully disabled (static swipeable row) under `prefers-reduced-motion`.

#### Scenario: Calm loop plays
- **WHEN** the gallery is in view with no reduced-motion preference
- **THEN** slides advance roughly every 3.5s in an endless loop without user input

#### Scenario: Hover and touch behavior
- **WHEN** the pointer hovers the strip
- **THEN** automatic advance pauses via `pauseOnMouseEnter` and resumes afterwards
- **WHEN** a touch drag gesture is in progress
- **THEN** the loop suspends during the gesture and continues after release (`disableOnInteraction:false`)

#### Scenario: Reduced-motion stillness
- **WHEN** the OS requests reduced motion
- **THEN** no automatic movement occurs while manual swipe remains available

### Requirement: Deferred hydration and lean Swiper surface
The system SHALL hydrate the gallery with `client:visible` only, importing Swiper core CSS plus the `Autoplay` module exclusively (no Navigation, Pagination, Scrollbar, or their CSS).

#### Scenario: Zero cost until approached
- **WHEN** the page loads with the gallery far below the fold
- **THEN** no gallery JS executes until the strip nears the viewport

#### Scenario: Minimal bundle guards
- **WHEN** the implementation is reviewed
- **THEN** no `Navigation`/`Pagination` module import or CSS appears in the gallery island

### Requirement: Lazy small-width image budget
Each slide image SHALL be AVIF-first responsive output at widths `[256, 320, 400]` (masters are 400px squares — no upscaled candidates) with matching `sizes`, `loading="lazy"`, and `decoding="async"`, resolved by the Astro wrapper and never reusing the 2048w panel masters.

#### Scenario: Small delivery
- **WHEN** the gallery renders on mobile
- **THEN** each slide loads a ~256–400w candidate, not a 1536w+ panel variant

### Requirement: Gallery accessibility contract
The gallery region SHALL carry `aria-roledescription="carrusel"` with a Spanish `aria-label`, keep natural tab order with no focus trap, show the shared `:focus-visible` ring on any focusable, and keep heading order intact (gallery adds no `h2`/`h3`).

#### Scenario: Keyboard traverse
- **WHEN** a keyboard user tabs through the page
- **THEN** focus passes through/around the gallery without getting trapped and every stop shows a visible ring

### Requirement: Slide click reaches the contact form
Each slide SHALL be a link to `#contacto-formulario` with a Spanish action `aria-label` (`Consultar sobre …`), keyboard-operable with the shared focus ring and `cursor-pointer`; drags SHALL NOT navigate (Swiper `preventClicks`), and the bleed zoom hover SHALL run on `--duration-hover` + `--ease-gallery-zoom` with reduced-motion parity (pinned at `1.5×`, no transition).

#### Scenario: Click scrolls to contact
- **WHEN** a visitor clicks (not drags) a slide
- **THEN** the page smooth-scrolls to the contact form wrapper

### Requirement: Stable pre-hydration geometry (no layout shift)
Because the island hydrates on `client:visible`, the unhydrated markup SHALL already render as a correct strip: `global.css` SHALL define slide widths and gaps under a `.js-products-gallery` scope that mirror the Swiper breakpoints, so the row height and slide size are identical before and after hydration.

#### Scenario: Zero layout shift
- **WHEN** the page loads with the gallery below the fold and the visitor scrolls toward it
- **THEN** the gallery keeps the same height and slide width before and after Swiper initializes, and the section does not jump

#### Scenario: No-JS and crawlers see a real strip
- **WHEN** JavaScript does not run
- **THEN** the gallery still shows a horizontal row of correctly sized product plates rather than one full-width square image

### Requirement: Consistent product plate for transparent cutouts
Gallery masters are transparent cutouts, so each slide SHALL render inside one consistent surface — a white plate (`bg-on-primary`, `rounded-2xl`, `p-md`, elevation via `shadow-card`, `object-contain`) — so products read identically on the light panel, the dark panel, and mobile's page background. The image SHALL render at `scale: 1.5` past the plate with no clipping (oversized bleed), easing to `1.6` on hover; the swiper viewport SHALL be `overflow: visible` so the track never cuts the bleed.

#### Scenario: Legible on every background
- **WHEN** a slide renders over the light half, the dark half, or the mobile page background
- **THEN** the product is legible against the same white plate, with the image contained (never cropped) and elevation declared once (shadow, no border)
