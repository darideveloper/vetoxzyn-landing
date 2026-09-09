## 1. Ghost Secondary Button

- [x] 1.1 Restyle `secondary` variant in `src/components/atoms/Button.tsx` to ghost pill (transparent bg, `border-2 border-[#a83200]/40`, brand text, `hover:border-[#a83200] hover:bg-[#a83200]/10`)
- [x] 1.2 Update the variant comment (B3 glass → B3 ghost) in `Button.tsx`

## 2. CTA Motion Fix

- [x] 2.1 Remove `className="tilt-float"` from both hero `Button`s in `src/components/organisms/Hero.astro`, keeping `tilt-float` on the visual card

## 3. Mobile Centering

- [x] 3.1 Center the hero content column below `md` (`items-center text-center` + `md:items-start md:text-left`) in `Hero.astro`
- [x] 3.2 Center subcopy (`mx-auto md:mx-0`), shrink-wrap bullet list (`w-fit`), center CTA row (`justify-center md:justify-start`)

## 4. Verification

- [x] 4.1 Run `pnpm run build` — 5 pages build with no errors
- [x] 4.2 Confirm no import changes (`rg "^import" src`) so `docs/component-dependencies.md` needs no update
- [x] 4.3 Visual check: ghost secondary visible on hero + showcase, single smooth CTA hover, centered hero below `md`, left-aligned at `md+`
