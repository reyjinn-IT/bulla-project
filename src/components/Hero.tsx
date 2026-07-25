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
        <span className="hero__eyebrow">buat Bulla yang lagi baca ini</span>
        <BlurText as="h1" text="Terima kasih, Bulla" className="hero__title" />
        <BlurText as="h2" text="tetap semangat, ya!" className="hero__title" delay={300} />
        <p className="hero__sub">
          Halaman kecil ini aku bikin khusus buat Bulla, biar tau satu hal: usaha kamu selama ini
          kelihatan, dan aku bersyukur ada kamu.
        </p>
        <FluidGlassButton onClick={() => document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' })}>
          Baca pesannya ↓
        </FluidGlassButton>
      </div>
    </section>
  )
}
