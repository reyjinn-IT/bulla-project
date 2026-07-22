import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './FluidGlassButton.css'

interface FluidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

/**
 * Apple "liquid glass" style button — frosted translucency, a soft
 * specular highlight along the top edge, and a gentle press response.
 */
export default function FluidGlassButton({ children, className = '', ...props }: FluidGlassButtonProps) {
  return (
    <button className={`fluid-glass-btn ${className}`} {...props}>
      <span className="fluid-glass-btn__sheen" aria-hidden="true" />
      <span className="fluid-glass-btn__label">{children}</span>
    </button>
  )
}
