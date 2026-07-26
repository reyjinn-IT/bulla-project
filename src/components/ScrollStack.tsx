import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react'
import './ScrollStack.css'

interface ScrollStackItemProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export const ScrollStackItem = forwardRef<HTMLDivElement, ScrollStackItemProps>(
  ({ children, className = '', style }, ref) => (
    <div ref={ref} className={`scroll-stack-card ${className}`.trim()} style={style}>
      {children}
    </div>
  ),
)
ScrollStackItem.displayName = 'ScrollStackItem'

interface ScrollStackProps {
  children: ReactNode
  className?: string
  /** px of scroll it takes for one card to fully arrive & bury the one before it */
  itemDistance?: number
  /** how much a buried card shrinks per layer of depth */
  itemScale?: number
  /** px each buried layer peeks out from behind the one on top */
  itemStackOffset?: number
  /** cap how many layers deep the shrink/dim keeps stacking */
  maxStackDepth?: number
}

/**
 * Pinned card stack, in the spirit of reactbits.dev's "ScrollStack".
 * Every <ScrollStackItem> sticks at the exact same spot as it arrives,
 * so each new card lands directly on top of the last one instead of
 * cascading diagonally. Cards already underneath quietly shrink, dim,
 * and peek out behind the newest arrival — the depth is driven by how
 * many later cards have reached the pin point, recomputed every frame
 * from actual scroll position (works fine under Lenis smoothing, since
 * Lenis animates real `window.scrollTop`).
 */
export default function ScrollStack({
  children,
  className = '',
  itemDistance = 220,
  itemScale = 0.055,
  itemStackOffset = 10,
  maxStackDepth = 3,
}: ScrollStackProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const items = Children.toArray(children)

  useEffect(() => {
    let raf = 0
    let pinPoint = 100

    const measurePin = () => {
      const first = cardRefs.current[0]
      if (!first) return
      const parsed = parseFloat(getComputedStyle(first).top || '')
      if (!Number.isNaN(parsed)) pinPoint = parsed
    }

    const update = () => {
      const cards = cardRefs.current
      const n = cards.length

      const arrival = cards.map((card) => {
        if (!card) return 0
        const rect = card.getBoundingClientRect()
        return Math.min(Math.max((pinPoint - rect.top) / itemDistance, 0), 1)
      })

      for (let i = 0; i < n; i++) {
        const card = cards[i]
        if (!card) continue
        let depth = 0
        for (let j = i + 1; j < n; j++) depth += arrival[j]
        depth = Math.min(depth, maxStackDepth)

        const scale = 1 - depth * itemScale
        const translateY = -depth * itemStackOffset
        const brightness = Math.max(1 - depth * 0.07, 0.72)

        card.style.transform = `translateY(${translateY}px) scale(${scale})`
        card.style.filter = `brightness(${brightness})`
      }

      raf = requestAnimationFrame(update)
    }

    measurePin()
    window.addEventListener('resize', measurePin)
    raf = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measurePin)
    }
  }, [itemDistance, itemScale, itemStackOffset, maxStackDepth, items.length])

  return (
    <div className={`scroll-stack ${className}`.trim()}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child
        const el = child as ReactElement<ScrollStackItemProps>
        return cloneElement(el, {
          key: i,
          ref: (node: HTMLDivElement | null) => {
            cardRefs.current[i] = node
          },
          style: { ...(el.props.style ?? {}), zIndex: i + 1 } as CSSProperties,
        })
      })}
    </div>
  )
}
