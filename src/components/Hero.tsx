import BlurText from './BlurText'
import FerrofluidBackground from './FerrofluidBackground'
import FluidGlassButton from './FluidGlassButton'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <FerrofluidBackground color1="#ffaaaa" color2="#e8b6b6" color3="#e5b0b0" />
      <div className="hero__inner">
        <span className="hero__eyebrow">buat kamu yang lagi baca ini</span>
        <BlurText as="h1" text="Terima kasih," className="hero__title" />
        <BlurText as="h1" text="dan tetap semangat!" className="hero__title" delay={300} />
        <p className="hero__sub">
          Halaman kecil ini gw bikin buat ngasih tau kamu satu hal: usaha kamu selama ini kelihatan,
          dan gw bersyukur ada kamu.
        </p>
        <FluidGlassButton onClick={() => document.getElementById('pesan')?.scrollIntoView({ behavior: 'smooth' })}>
          Baca pesannya ↓
        </FluidGlassButton>
      </div>
    </section>
  )
}
