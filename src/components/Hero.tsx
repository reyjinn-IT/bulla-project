import BlurText from './BlurText'
import { Ferrofluid } from './ui/Ferrofluid'
import FluidGlassButton from './FluidGlassButton'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <Ferrofluid
          colors={['#f2eded', '#e89595', '#f0e4e4']}
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>
      <div className="hero__inner">
        <span className="hero__eyebrow">buat Bulla yang lagi baca ini</span>
        <BlurText as="h1" text="Terima kasih, Bulla" className="hero__title" />
        <BlurText as="h1" text="tetap semangat, ya!" className="hero__title" delay={300} />
        <p className="hero__sub">
          Halaman kecil ini gw bikin khusus buat Bulla, biar tau satu hal: usaha kamu selama ini
          kelihatan, dan gw bersyukur ada kamu.
        </p>
        <FluidGlassButton onClick={() => document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' })}>
          Baca pesannya ↓
        </FluidGlassButton>
      </div>
    </section>
  )
}