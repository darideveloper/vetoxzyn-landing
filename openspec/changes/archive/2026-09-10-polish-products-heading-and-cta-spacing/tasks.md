## 1. Panel title

- [x] 1.1 Remove the forced `Instala-<br/>ciones` break in `Products.astro` Instalaciones `h3` so it renders single-word `Instalaciones`
- [x] 1.2 Verify no horizontal overflow at 390px with the single-word title

## 2. CTA spacing and padding

- [x] 2.1 Add `className="mt-md"` to both product CTAs (`tone="light"` and `tone="dark"`) in `Products.astro`
- [x] 2.2 Add `px-4` to the `product` variant class chain in `Button.tsx` (`py-3` untouched, height unchanged)

## 3. Verification

- [x] 3.1 Run `pnpm run build` and confirm all 5 pages build with no errors
- [x] 3.2 Confirm both CTAs still link to `#section-5` and the `design-system` showcase renders the updated `product` variant
