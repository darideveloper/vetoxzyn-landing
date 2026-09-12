import { gsap } from "@/lib/gsap"
import { ModifiersPlugin } from "gsap/ModifiersPlugin"

// Reusable infinite-marquee factory (pattern only — no host section is
// wired yet; placement was deferred to implementation). Turns a
// `.js-marquee-content` strip into a seamless loop:
// content is duplicated once (2× width), tweened 0 → -one-copy-width,
// with a modulo wrap so the jump point is invisible.
// Required: the modulo wrap below is silently ignored unless
// ModifiersPlugin is registered (the docs factory omits this step).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ModifiersPlugin)
}

const initialized = new WeakSet<HTMLElement>()

export const initKineticMarquee = (container: HTMLElement) => {
  if (initialized.has(container)) return () => {}
  initialized.add(container)

  const words = container.querySelector(".js-marquee-content") as HTMLElement | null
  if (!words) {
    initialized.delete(container)
    return () => {}
  }

  const ctx = gsap.context(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Duplicate content for a seamless loop
    const children = Array.from(words.children)
    children.forEach((child) => words.appendChild(child.cloneNode(true)))

    const totalWidth = words.scrollWidth / 2

    gsap.to(words, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % totalWidth}px`,
      },
    })
  }, container)

  return () => {
    ctx.revert()
    initialized.delete(container)
  }
}
