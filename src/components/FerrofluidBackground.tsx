import { useEffect, useRef } from 'react'
import './FerrofluidBackground.css'

interface FerrofluidBackgroundProps {
  color1?: string
  color2?: string
  color3?: string
}

interface Blob {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  color: string
}

/**
 * Ambient metaball-style blob field, in the spirit of reactbits.dev's
 * "Ferrofluid" background. Implemented with canvas 2D radial gradients
 * blended together instead of WebGL, tuned to the requested palette.
 */
export default function FerrofluidBackground({
  color1 = '#ffaaaa',
  color2 = '#e8b6b6',
  color3 = '#e5b0b0',
}: FerrofluidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const colors = [color1, color2, color3]

    const resize = () => {
      const parent = canvas.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const blobs: Blob[] = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 120 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      color: colors[i % colors.length],
    }))

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.filter = 'blur(40px)'
      ctx.globalCompositeOperation = 'lighter'

      for (const b of blobs) {
        if (!reducedMotion) {
          b.x += b.vx
          b.y += b.vy
          if (b.x < -b.r) b.x = width + b.r
          if (b.x > width + b.r) b.x = -b.r
          if (b.y < -b.r) b.y = height + b.r
          if (b.y > height + b.r) b.y = -b.r
        }
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        gradient.addColorStop(0, `${b.color}aa`)
        gradient.addColorStop(1, `${b.color}00`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.filter = 'none'
      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [color1, color2, color3])

  return <canvas ref={canvasRef} className="ferrofluid" aria-hidden="true" />
}
