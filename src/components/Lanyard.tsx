import { useEffect, useRef } from 'react'
import './Lanyard.css'

interface LanyardProps {
  photo: string
  name: string
  role: string
  idNumber?: string
  ropeColor?: [string, string, string]
  height?: number
}

export default function Lanyard({
  photo,
  name,
  role,
  idNumber = '2025-JINN-0001',
  ropeColor = ['#c8a8d8', '#8a5a9a', '#b888c8'],
  height = 500,
}: LanyardProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current!
    const card   = cardRef.current!
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    const CW = 160, CH = 240
    let W = 0, H = 0, anchorX = 0
    const anchorY = 16

    function resize() {
      W = wrap.offsetWidth
      H = wrap.offsetHeight
      canvas.width  = W
      canvas.height = H
      anchorX = W / 2
    }
    resize()
    window.addEventListener('resize', resize)

    let px = W / 2, py = H / 2 + 40
    let vx = 0, vy = 0
    let angle = 0, av = 0
    let dragging = false
    let dox = 0, doy = 0
    let lx = 0, ly = 0, lt = 0
    let raf = 0

    const ROPE = Math.min(220, H - CH - anchorY - 20)
    const G = 0.5, DAMP = 0.984, ADAMP = 0.972

    function drawRope() {
      ctx.clearRect(0, 0, W, H)
      const clipX = px, clipY = py - CH / 2
      const dx = clipX - anchorX, dy = clipY - anchorY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const sag  = Math.max(0, ROPE - dist) * 0.45 + 18
      const mx   = (anchorX + clipX) / 2 + vx * 0.35
      const my   = (anchorY + clipY) / 2 + sag

      ctx.beginPath()
      ctx.moveTo(anchorX, anchorY)
      ctx.quadraticCurveTo(mx, my, clipX, clipY)
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.lineWidth   = 9
      ctx.lineCap     = 'round'
      ctx.stroke()

      const grad = ctx.createLinearGradient(anchorX, anchorY, clipX, clipY)
      grad.addColorStop(0,   ropeColor[0])
      grad.addColorStop(0.4, ropeColor[1])
      grad.addColorStop(1,   ropeColor[2])
      ctx.beginPath()
      ctx.moveTo(anchorX, anchorY)
      ctx.quadraticCurveTo(mx, my, clipX, clipY)
      ctx.strokeStyle = grad
      ctx.lineWidth   = 8
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(anchorX, anchorY, 5, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fill()
    }

    function applyTransform() {
      card.style.left            = `${px - CW / 2}px`
      card.style.top             = `${py - CH / 2}px`
      card.style.transform       = `rotate(${angle}deg)`
      card.style.transformOrigin = `${CW / 2}px 0px`
    }

    function tick() {
      if (!dragging) {
        const clipX = px, clipY = py - CH / 2
        const dx = clipX - anchorX, dy = clipY - anchorY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > ROPE) {
          const nx = dx / dist, ny = dy / dist
          const ex = dist - ROPE
          px -= nx * ex * 0.82
          py -= ny * ex * 0.82
          const dot = vx * nx + vy * ny
          vx -= nx * dot * 1.1
          vy -= ny * dot * 1.1
        }
        vy += G
        vx *= DAMP; vy *= DAMP
        px += vx;   py += vy
        av += vx * 0.1
        av -= angle * 0.032
        av *= ADAMP
        angle += av
        if (px < CW / 2 + 8)     { px = CW / 2 + 8;     vx *= -0.4 }
        if (px > W - CW / 2 - 8) { px = W - CW / 2 - 8; vx *= -0.4 }
        if (py > H - CH / 2 - 8) { py = H - CH / 2 - 8; vy *= -0.3 }
      }
      drawRope()
      applyTransform()
      raf = requestAnimationFrame(tick)
    }

    function getXY(e: PointerEvent) {
      const r = wrap.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    function hitTest(p: { x: number; y: number }) {
      const dx  = p.x - px, dy = p.y - py
      const rad = (-angle * Math.PI) / 180
      const rx  = dx * Math.cos(rad) - dy * Math.sin(rad)
      const ry  = dx * Math.sin(rad) + dy * Math.cos(rad)
      return Math.abs(rx) < CW / 2 + 14 && Math.abs(ry) < CH / 2 + 14
    }

    function onDown(e: PointerEvent) {
      const p = getXY(e)
      if (!hitTest(p)) return
      dragging = true
      dox = p.x - px; doy = p.y - py
      lx = p.x; ly = p.y; lt = Date.now()
      vx = 0; vy = 0
      wrap.setPointerCapture(e.pointerId)
      e.preventDefault()
    }

    function onMove(e: PointerEvent) {
      if (!dragging) return
      const p   = getXY(e)
      const now = Date.now(), dt = Math.max(1, now - lt)
      vx = (p.x - lx) / dt * 14
      vy = (p.y - ly) / dt * 14
      lx = p.x; ly = p.y; lt = now
      px = p.x - dox; py = p.y - doy
      av = vx * 0.14
      e.preventDefault()
    }

    function onUp() { dragging = false }

    wrap.addEventListener('pointerdown',  onDown, { passive: false })
    wrap.addEventListener('pointermove',  onMove, { passive: false })
    wrap.addEventListener('pointerup',    onUp)
    wrap.addEventListener('pointercancel', onUp)

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      wrap.removeEventListener('pointerdown',  onDown)
      wrap.removeEventListener('pointermove',  onMove)
      wrap.removeEventListener('pointerup',    onUp)
      wrap.removeEventListener('pointercancel', onUp)
    }
  }, [])

  return (
    <div ref={wrapRef} className="lanyard-wrap" style={{ height }}>
      <canvas ref={canvasRef} className="lanyard-canvas" />

      <div ref={cardRef} className="lanyard-card">
        <div className="lc-sheen" />
        <div className="lc-border" />
        <div className="lc-content">
          <div className="lc-header">
            <span className="lc-badge">Wanna be ur friend</span>
            <span className="lc-status">✌️</span>
          </div>
          <div className="lc-divider" />
          <div className="lc-photo">
            <img src={photo} alt={name} draggable={false} />
          </div>
          <p className="lc-name">{name}</p>
          <p className="lc-role">{role}</p>
          <div className="lc-divider" style={{ marginTop: 10 }} />
          <div className="lc-footer">
            <span className="lc-id-label">ID NUMBER</span>
            <span className="lc-id-value">{idNumber}</span>
          </div>
        </div>
        <div className="lc-clip">
          <div className="lc-clip-hole" />
        </div>
      </div>
    </div>
  )
}