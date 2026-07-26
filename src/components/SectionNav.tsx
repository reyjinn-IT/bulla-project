import { useEffect, useState } from 'react'
import './SectionNav.css'

const SECTIONS = [
  { id: 'hero', label: 'Awal' },
  { id: 'pesan', label: 'Surat' },
  { id: 'semangat', label: 'Semangat' },
  { id: 'galeri', label: 'Kenangan' },
  { id: 'dibuat-oleh', label: 'Tanda tangan' },
]

export default function SectionNav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="section-nav" aria-label="Navigasi bagian">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`section-nav__dot ${active === s.id ? 'section-nav__dot--active' : ''}`}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={s.label}
          aria-current={active === s.id}
        >
          <span className="section-nav__tooltip">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
