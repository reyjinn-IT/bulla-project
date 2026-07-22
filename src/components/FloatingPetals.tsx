import { useMemo } from 'react'
import './FloatingPetals.css'

/**
 * Ambient background motion, in the spirit of reactbits.dev's "Particles".
 * Kept subtle and slow so it reads as atmosphere, not decoration.
 */
export default function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 6 + Math.random() * 10,
        duration: 14 + Math.random() * 12,
        delay: Math.random() * -20,
        drift: (Math.random() - 0.5) * 60,
      })),
    [count],
  )

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petals__item"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
