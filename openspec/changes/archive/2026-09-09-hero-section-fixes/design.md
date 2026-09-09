## Context

The hero (`src/components/organisms/Hero.astro`) composes the `Button` atom (`src/components/atoms/Button.tsx`) for its two CTAs and renders on `bg-surface-ice` (`#f9f9fd`). Three defects were fixed in place: an invisible secondary CTA, a glitched hover animation, and a left-aligned mobile layout. This doc records the as-built design rationale. Vanilla-only atomic hierarchy applies (no `ui/`, no `Validated*`); `Button` remains a self-contained atom importing only `lib/utils`.

## Goals / Non-Goals

**Goals:**
- Secondary CTA visibly distinct from body text on the light hero background.
- One hover-motion owner per CTA (no competing transform systems).
- Balanced centered hero below `md`, original left alignment at `md+`.

**Non-Goals:**
- No copy, SEO, a11y, or CTA-target changes (secondary still → `#section-4` per the earlier testimonials retarget).
- No new motion system, no `global.css` effect changes, no `tilt-float` removal from the visual card.
- No atom API changes (same `variant/size/tone/href` props).

## Decisions

- **Ghost over tinted-glass for secondary.** Root cause was `border-white/60` + `bg-[#f9f9fd]/70` on `#f9f9fd` — near-zero contrast. Alternatives: darken the glass fill (keeps blur complexity, still low contrast) or solid fill (competes with primary). Ghost (transparent + `border-2 border-[#a83200]/40` + brand text + `hover:bg-[#a83200]/10`) wins on contrast with the fewest properties and preserves primary/secondary hierarchy. Chosen border starts at `/40` and deepens to full on hover so the resting state stays quiet.
- **Strip `tilt-float` from buttons instead of unifying motion inside it.** The glitch came from Tailwind v4 `hover:scale-105` (CSS `scale` property) stacking with `.tilt-float:hover` (`transform: perspective… scale3d…`), compounded by unlayered `.tilt-float { transition: transform … }` overriding the atom's transition so `scale`/color changes snapped. Removing the two `className="tilt-float"` usages (Hero only) is a 2-line diff vs. touching the shared atom + global CSS; card tilt is the effect's rightful home.
- **`md:` breakpoint for the left-aligned restore (not `lg:`).** First pass used `lg:`, which left tablets centered. Content column centers via `items-center text-center` with `md:items-start md:text-left`; subcopy `mx-auto md:mx-0`, CTA row `justify-center md:justify-start`, bullet `ul` shrinks with `w-fit` so the block centers while icon rows stay left-aligned inside. Grid spans stay `lg:` — only alignment moves to `md:`.

## Risks / Trade-offs

- [Ghost border at `/40` may still feel light on low-end displays] → Mitigation: hover/full-border state demonstrates the ceiling; bump resting opacity if QA flags it.
- [`Challenges.astro` also pairs `tilt-float` with `transition-transform`] → Left as-is (no reported glitch); revisit if the same pop appears there.
- [`prefers-reduced-motion` kills `tilt-float` transition but Tailwind `hover:scale-105` still snaps] → Pre-existing behavior, out of scope.
