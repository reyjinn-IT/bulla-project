import BlurText from './BlurText'
import FluidGlassButton from './FluidGlassButton'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      {/* Moon */}
      <div className="hero__moon" aria-hidden="true" />
      {/* Moon glow */}
      <div className="hero__moon-glow" aria-hidden="true" />
      {/* Floating stars layer */}
      <div className="hero__stars" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="hero__star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2.5}px`,
              height: `${1 + Math.random() * 2.5}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      <div className="hero__inner">
        <span className="hero__eyebrow">holaa</span>
        <BlurText as="h1" text="Bulla" className="hero__title" />
        <p className="hero__sub">
          Sebuah nama yang indah, terkesan asing tapi unik yang terdengar ditelingaku.
        </p>
        <FluidGlassButton onClick={() => document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' })}>
          Baca pesannya ↓
        </FluidGlassButton>
      </div>
    </section>
  )
}
