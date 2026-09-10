## 1. Tokens + asset

- [x] 1.1 Port `glass-panel-heavy`, `organic-blob-1/2` (+`morph`), `floating-element` (+`float-slow`), `deep-float-shadow`, `z-stack-1/2/3` from `05-contact-form/code.html` into `styles/global.css` + extend `prefers-reduced-motion` guard
- [x] 1.2 Add local contact WebP under `src/assets/contact/` (dedicated file; hero/products placeholder crop as fallback) with `TODO(replace)` note if placeholder

## 2. ContactForm island restyle (shell only, logic untouched)

- [x] 2.1 Wrap form in `glass-panel-heavy rounded-3xl p-10 md:p-14` card with Stitch skew on all viewports (`rotate-[-1deg]` base + `hover:rotate-0`, `lg:rotate-[-2deg]` at desktop)
- [x] 2.2 Arrange inputs in `grid grid-cols-1 md:grid-cols-2 gap-8`, pill group `flex flex-wrap gap-3` under `¿Qué línea te interesa?` label, `Textarea rows=3`, submit row `pt-6 flex justify-end` with `Button primary sm` + `arrow_forward` `span` child (not `Icon` atom — island boundary)
- [x] 2.3 Complete ES copy pass in island (success strings) and verify `pnpm run build` passes

## 3. ContactSection organism

- [x] 3.1 Create `organisms/ContactSection.astro`: fixed blob background + `BIOSEGURIDAD` massive type, in-flow header (H2 gradient span + sub)
- [x] 3.2 Compose asymmetric stack: `ContactForm client:load` base, static FAQ panel (`Icon info` header + 3 `<details>` with bare `add_circle` toggles + section-scoped single-open script), image (`astro:assets`, lazy) + disclaimer (`Icon warning` + caption) layer
- [x] 3.3 Gate overlap transforms at `lg:` (`-rotate-2`, `+3deg -translate-x-12`, `z-stack`, `floating-element`), mobile stacks, container `overflow-x-clip`

## 4. Page wiring + verification

- [x] 4.1 Mount `<ContactSection />` on `/` as `section#section-5` (replacing bare section) and on `/contact` below the phone/email intro; complete page ES headings
- [x] 4.2 Verify: visuals at 390/768/1024/1280/1440 with 0px overflow, exclusive FAQ behavior, no-JS static render, `#section-5` anchors land, `rg "^import"` clean
- [x] 4.3 Update `docs/component-dependencies.md` per Page trees (`index` + `contact`), Shared shell unaffected, Notes (deviations: `primary sm` submit, stacked disclaimer); sync `atoms-page-global-components.md` if touched

## 5. Post-apply refinements (chat follow-ups, all verified)

- [x] 5.1 Merge `origin/main` (`max-w` token-collision rule); resolve `ContactForm` conflict (keep glass shell); apply rule to new code (`max-w-md` → `max-w-[28rem]`)
- [x] 5.2 Full-width experiment (drop `max-w` cap, pin layers edge-to-edge) — verified, then reverted by 5.3
- [x] 5.3 Simplify to static grid in standard `max-w-max-width`: row 1 FAQ 5 + form 7, row 2 image 5 + disclaimer 7; drop absolute positioning + rotations
- [x] 5.4 Left-column stack (FAQ + image + disclaimer) + form right at full height; mild skew restored (form `-2deg` + hover, FAQ `+3deg`, image `-3deg`); float disabled; re-verify 0px overflow at 390/768/1024/1280/1440
- [x] 5.5 Image natural aspect ratio on all screens (`h-auto w-full`, drop `h-56`/`lg:h-full` crop-stretch); verified layout ratio 1.833 vs 1.835 natural at 390 + 1440
- [x] 5.6 Mobile base skew (form `-1deg` + hover straighten, FAQ `+1deg`, image `-1deg`; desktop `-2/+3/-3` kept); verified 0px overflow at 390
