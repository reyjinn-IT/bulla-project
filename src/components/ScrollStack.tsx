import { useEffect, useRef } from 'react'
import './ScrollStack.css'

export interface StackCard {
  title: string
  desc: string
}

interface ScrollStackProps {
  cards: StackCard[]
}

/**
 * Sticky card stack, in the spirit of reactbits.dev's "ScrollStack".
 * Each card pins near the top of the viewport as the next one scrolls
 * over it, scaling and dimming slightly so the stack reads as depth.
 */
export default function ScrollStack({ cards }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let raf = 0

    const update = () => {
      const viewportH = window.innerHeight

      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        // progress: 0 when card just reached its pinned position, 1 when the
        // next card has fully covered it.
        const stuckAt = viewportH * 0.16
        const progress = Math.min(Math.max((stuckAt - rect.top) / (viewportH * 0.5), 0), 1)
        const scale = 1 - progress * 0.06 * (cards.length - i)
        const dim = 1 - progress * 0.35
        card.style.transform = `scale(${Math.max(scale, 0.86)})`
        card.style.filter = `brightness(${Math.max(dim, 0.65)})`
      })

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [cards.length])

  return (
    <div className="scroll-stack" ref={containerRef}>
      {cards.map((card, i) => (
        <div
          key={i}
          className="scroll-stack__card"
          style={{ top: `${96 + i * 18}px`, zIndex: i + 1 }}
          ref={(el) => {
            cardRefs.current[i] = el
          }}
        >
          <span className="scroll-stack__index">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="scroll-stack__title">{card.title}</h3>
          <p className="scroll-stack__desc">{card.desc}</p>
        </div>
      ))}
    </div>
  )
}
