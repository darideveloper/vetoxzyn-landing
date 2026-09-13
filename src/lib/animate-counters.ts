import { gsap } from "@/lib/gsap"

// Reusable stat-counter helper (pattern only — no stats are wired yet;
// placement was deferred to implementation). Animates every
// `.js-stat-value` inside `container`, reading target number + suffix
// from `data-value` (e.g. "100+"). If `tl` is provided, appends the
// counter tweens to that timeline; otherwise plays them immediately.
export function animateCounters(container: Element, tl?: gsap.core.Timeline) {
  const counters = container.querySelectorAll(".js-stat-value")
  counters.forEach((counter) => {
    const targetValueAttr = counter.getAttribute("data-value") || ""
    const numericMatch = targetValueAttr.match(/(\d+)/)
    if (!numericMatch) return

    const targetValue = parseInt(numericMatch[0], 10)
    const suffix = targetValueAttr.replace(numericMatch[0], "")
    const obj = { value: 0 }

    const tweenParams = {
      value: targetValue,
      duration: 1.2,
      ease: "power4.out",
      onUpdate: () => {
        counter.textContent = Math.round(obj.value) + suffix
      },
    }

    if (tl) {
      tl.to(obj, tweenParams, "<")
    } else {
      gsap.to(obj, tweenParams)
    }
  })
}
