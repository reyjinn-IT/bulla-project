import { useEffect, useRef } from 'react'

export interface FerrofluidProps {
  colors?: string[]
  speed?: number
  scale?: number
  turbulence?: number
  fluidity?: number
  rimWidth?: number
  sharpness?: number
  shimmer?: number
  glow?: number
  flowDirection?: 'up' | 'down' | 'left' | 'right'
  opacity?: number
  mouseInteraction?: boolean
  mouseStrength?: number
  mouseRadius?: number
}

/**
 * Lightweight canvas-based "ferrofluid" style blob background.
 * Draws a handful of soft metaball blobs that drift, pulse and
 * gently react to the mouse. No WebGL / external deps required.
 */
export function Ferrofluid({
  colors = ['#f2eded', '#e89595', '#f0e4e4'],
  speed = 0.5,
  scale = 1.6,
  turbulence = 1,
  fluidity = 0.1,
  rimWidth = 0.2,
  sharpness = 2.5,
  shimmer = 1.5,
  glow = 2,
  flowDirection = 'down',
  opacity = 1,
  mouseInteraction = true,
  mouseStrength = 1,
  mouseRadius = 0.35,
}: FerrofluidProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const flow = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    }[flowDirection]

    const blobCount = 5
    const blobs = Array.from({ length: blobCount }, (_, i) => ({
      angle: (i / blobCount) * Math.PI * 2,
      radius: 0.18 + Math.random() * 0.12,
      orbit: 0.16 + Math.random() * 0.14,
      speedMul: 0.6 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
    }))

    function resize() {
      const parent = canvas!.parentElement
      width = parent ? parent.clientWidth : window.innerWidth
      height = parent ? parent.clientHeight : window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.current.x = (e.clientX - rect.left) / rect.width
      mouse.current.y = (e.clientY - rect.top) / rect.height
      mouse.current.active = true
    }
    function handlePointerLeave() {
      mouse.current.active = false
    }

    resize()
    window.addEventListener('resize', resize)
    if (mouseInteraction) {
      canvas.addEventListener('pointermove', handlePointerMove)
      canvas.addEventListener('pointerleave', handlePointerLeave)
    }

    const start = performance.now()

    function draw(now: number) {
      const t = ((now - start) / 1000) * speed
      ctx!.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const baseR = (Math.min(width, height) / 2) * scale * 0.5

      ctx!.save()
      ctx!.globalAlpha = opacity
      ctx!.filter = `blur(${Math.max(1, 18 - sharpness * 4)}px)`

      blobs.forEach((b, i) => {
        const wobble = Math.sin(t * b.speedMul + b.phase) * turbulence
        const angle = b.angle + t * 0.2 * b.speedMul + wobble * fluidity
        const orbitR = b.orbit * baseR * (1 + 0.15 * Math.sin(t * 0.5 + b.phase))

        let x = cx + Math.cos(angle) * orbitR + flow.x * t * 6
        let y = cy + Math.sin(angle) * orbitR + flow.y * t * 6

        if (mouse.current.active) {
          const mx = mouse.current.x * width
          const my = mouse.current.y * height
          const dx = mx - x
          const dy = my - y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const influence = Math.max(0, 1 - dist / (mouseRadius * Math.max(width, height)))
          x += dx * influence * 0.25 * mouseStrength
          y += dy * influence * 0.25 * mouseStrength
        }

        const r = b.radius * baseR * (1 + 0.1 * Math.sin(t * 1.3 + b.phase))
        const color = colors[i % colors.length]

        const gradient = ctx!.createRadialGradient(x, y, 0, x, y, r)
        gradient.addColorStop(0, color)
        gradient.addColorStop(1, 'transparent')

        ctx!.beginPath()
        ctx!.fillStyle = gradient
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
      })

      // soft shimmering rim highlight
      const rimGradient = ctx!.createRadialGradient(
        cx, cy, baseR * (1 - rimWidth),
        cx, cy, baseR,
      )
      const shimmerAlpha = 0.15 * shimmer * (0.6 + 0.4 * Math.sin(t * 1.7))
      rimGradient.addColorStop(0, 'transparent')
      rimGradient.addColorStop(1, `rgba(255,255,255,${shimmerAlpha})`)
      ctx!.globalAlpha = opacity * 0.8
      ctx!.filter = 'none'
      ctx!.beginPath()
      ctx!.fillStyle = rimGradient
      ctx!.arc(cx, cy, baseR, 0, Math.PI * 2)
      ctx!.fill()

      // gentle overall glow
      if (glow > 0) {
        ctx!.globalAlpha = Math.min(1, 0.08 * glow)
        ctx!.filter = `blur(${20 + glow * 6}px)`
        ctx!.beginPath()
        ctx!.fillStyle = colors[0]
        ctx!.arc(cx, cy, baseR * 0.7, 0, Math.PI * 2)
        ctx!.fill()
      }

      ctx!.restore()
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [
    colors,
    speed,
    scale,
    turbulence,
    fluidity,
    rimWidth,
    sharpness,
    shimmer,
    glow,
    flowDirection,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
  ])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}

export default Ferrofluid