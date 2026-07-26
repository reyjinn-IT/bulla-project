import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Mounts Lenis once for the whole page so every scroll (including the
 * ScrollStack pin effect in Encourage) feels smooth and inertia-driven
 * instead of the browser's default stepped scroll.
 *
 * Lenis animates the real `window.scrollTop` under the hood, so anything
 * reading `getBoundingClientRect()` (ScrollStack, useOnScreen, etc.)
 * keeps working exactly as before — no extra wiring needed there.
 */
export function useLenis() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
