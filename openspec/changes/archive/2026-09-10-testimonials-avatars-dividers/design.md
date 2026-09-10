## Context

`organisms/Testimonials.astro` renders a centered E2 header plus a 3-column grid of `molecules/TestimonialCard.astro` over `src/data/testimonials.ts` (quote/name/role/accent ×3). `atoms/Card.astro` (C1) is a glass shell with `p-6` and no overflow opinion of its own; the card previously set `overflow-hidden` to clip the left accent bar to its rounded corners. The section previously used `grid-cols-1 md:grid-cols-3 gap-gutter` with `mb-xl` header spacing. No avatar or divider assets exist in the repo (`public/` holds only favicons/og-image; `src/assets/` holds hero/challenges/products WebP).

## Goals / Non-Goals

**Goals:**
- Give each testimonial a recognizable author via a circular avatar half-overflowing the card top, centered.
- Break card-to-card monotony with small photographic dividers: thin centered strips on desktop, full-width short strips on mobile.
- Use vet-themed stock (medical professionals, dogs) as placeholders swappable URL-only for licensed art.
- Keep the section fully static; no new atoms, molecules, store, or islands.

**Non-Goals:**
- No `Avatar` atom (single use — a plain `<img>` in the molecule is the laziest working diff).
- No local assets / `astro:assets` optimization for these images (remote hotlinks can't go through Astro Image; matches the project's placeholder-art pattern).
- No real client photos, no copy changes, no layout changes outside `section-3`.

## Decisions

- **D1 — `avatar` lives in `src/data/testimonials.ts` alongside quote/name/role/accent.** Rationale: extends the existing single-source-of-truth const pattern; swap URLs only when real photos land. Gender-matched Unsplash medical-professional portraits with `fit=crop&crop=faces&w=192&h=192` so the 96px circle is always face-framed and retina-supplied. All URLs verified HTTP 200 `image/jpeg` before use.
- **D2 — Overflow via absolute positioning, not negative-margin layout.** Avatar is `absolute -top-12 left-1/2 -translate-x-1/2 h-24 w-24` (96px = +20% over the initial 80px pass); the molecule wraps the card in a `pt-12` div reserving the overflow space, and an `h-8` spacer inside the card keeps the quote clear of the 48px overlap (card `p-6` covers 24px). Card flips `overflow-hidden` → `overflow-visible`; the accent bar gains `rounded-l-xl` so its corners still follow the card radius. White `border-4` ring + `shadow-lg` seat the photo on the glass shell; `width`/`height` + `loading="lazy"` prevent CLS.
- **D3 — Dividers as grid cells, not flex items.** Desktop grid becomes `md:grid-cols-[1fr_5vw_1fr_5vw_1fr]` (card/divider/card/divider/card in DOM order via map + fragment, divider rendered when `i < length - 1`). Percentage height (`md:h-[60%] md:self-center`) resolves against the grid area — the same trick fails in flexbox with indefinite container height, which is why grid was kept. Mobile stays single-column: each divider is a full-width `h-24` strip. Image fills its slot with `object-cover` (square 600×600 source cropped); slot is `aria-hidden` with empty `alt` since dividers are decorative.
- **D4 — Divider sources are `picsum.photos` fixed IDs 237 (black dog) and 1025 (pug).** Fixed IDs (not random seeds) keep the vet-patient imagery stable across builds; both verified HTTP 200. Swapped URL-only when brand art lands.
- **D5 — Spacing compensates exactly for the overflow.** Avatar sticks 48px above the card, eating header gap; grid gains `mt-12` (48px) so subhead → avatar keeps the original ~80px rhythm. No header changes.

## Risks / Trade-offs

- **Remote hotlinks can break or slow-load.** Mitigation: all five URLs verified live before shipping; fixed Picsum IDs and pinned Unsplash photo IDs (not search/random endpoints); `width`/`height` reserve layout so a failure degrades to alt-sized gap, not shift. Migration to local `src/assets/` + `astro:assets` when licensed art exists.
- **60% divider height tracks the tallest card.** Grid row height = tallest card (avatar + longest quote); dividers center at 60% of that. If copy lengths diverge sharply, strips may look short against the tallest card — acceptable for fixed Stitch copy.
- **`overflow-visible` card + `tilt-float` hover transform.** Avatar is inside the transformed card so it tilts together — intended. No clipping regressions: section-level `overflow-hidden` only clips background blobs, avatars never reach section bounds.
