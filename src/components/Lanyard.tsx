import { useRef, useState } from 'react'
import './Lanyard.css'

interface LanyardProps {
  photo: string
  name: string
  role: string
}

/**
 * Hanging ID-badge, in the spirit of reactbits.dev's "Lanyard".
 * Drag the card to swing it; release and it eases back to rest.
 */
export default function Lanyard({ photo, name, role }: LanyardProps) {
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    startX.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const delta = e.clientX - startX.current
    setRotation(Math.max(Math.min(delta * 0.25, 26), -26))
  }

  const handlePointerUp = () => {
    setDragging(false)
    setRotation(0)
  }

  return (
    <div className="lanyard">
      <div className="lanyard__strap" />
      <div className="lanyard__clip" />
      <div
        className={`lanyard__card ${dragging ? 'lanyard__card--dragging' : 'lanyard__card--idle'}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="lanyard__hole" />
        <div className="lanyard__photo">
          <img src={photo} alt={name} draggable={false} />
        </div>
        <div className="lanyard__info">
          <span className="lanyard__name">{name}</span>
          <span className="lanyard__role">{role}</span>
        </div>
      </div>
    </div>
  )
}
