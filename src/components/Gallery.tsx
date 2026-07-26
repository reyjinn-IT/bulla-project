import { useState } from 'react'
import { useOnScreen } from '../../useOnScreen'
import './Gallery.css'

interface Photo {
  src: string
  caption: string
  rotate: number
  size: 'tall' | 'wide' | 'square' | 'big'
}

const PHOTOS: Photo[] = [
  { src: '/photos/1.jpg', rotate: -3, caption: 'momen seru bareng', size: 'tall' },
  { src: '/photos/2.jpg', rotate: 2, caption: 'ketawa bareng', size: 'square' },
  { src: '/photos/3.jpg', rotate: -1, caption: 'jalan-jalan bareng', size: 'wide' },
  { src: '/photos/4.jpg', rotate: 3, caption: 'random tapi berkesan', size: 'big' },
  { src: '/photos/5.jpg', rotate: -2, caption: 'senyum manis', size: 'square' },
  { src: '/photos/6.jpg', rotate: 1, caption: 'hari yang indah', size: 'tall' },
  { src: '/photos/7.jpg', rotate: -3, caption: 'selalu bareng', size: 'wide' },
  { src: '/photos/8.jpg', rotate: 2, caption: 'cerita kita', size: 'square' },
]

const SPARKLES = [
  { top: '8%', left: '12%', delay: '0s', size: 14 },
  { top: '22%', left: '88%', delay: '1.2s', size: 10 },
  { top: '45%', left: '6%', delay: '0.6s', size: 12 },
  { top: '55%', left: '92%', delay: '2s', size: 8 },
  { top: '78%', left: '15%', delay: '1.5s', size: 11 },
  { top: '85%', left: '82%', delay: '0.3s', size: 13 },
  { top: '15%', left: '50%', delay: '1.8s', size: 9 },
  { top: '65%', left: '48%', delay: '0.9s', size: 10 },
]

export default function Gallery() {
  const [active, setActive] = useState<Photo | null>(null)
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.12)

  return (
    <section className="gallery" id="galeri">
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="gallery__sparkle"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            fontSize: s.size,
          }}
          aria-hidden="true"
        >
          ✦
        </span>
      ))}

      <div ref={ref} className={`gallery__content ${visible ? 'gallery__content--visible' : ''}`}>
      <div className="gallery__header">
        <span className="gallery__ornament" aria-hidden="true">— ✿ —</span>
        <h2 className="gallery__heading">Kenangan Bareng Bulla</h2>
        <p className="gallery__sub">
          setiap momen jadi cerita indah yang pantas dikenang
        </p>
      </div>

      <div className="gallery__masonry">
        {PHOTOS.map((photo, i) => (
          <button
            type="button"
            key={i}
            className={`gallery__card gallery__card--${photo.size}`}
            style={{ '--rotate': `${photo.rotate}deg` } as React.CSSProperties}
            onClick={() => setActive(photo)}
          >
            <span className="gallery__card-inner">
              <span className="gallery__card-img">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
              </span>
              <span className="gallery__card-label">
                <span className="gallery__card-heart" aria-hidden="true">♥</span>
                {photo.caption}
              </span>
            </span>
          </button>
        ))}
      </div>
      </div>

      {active && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActive(null)}
        >
          <figure className="gallery__lightbox-frame">
            <img src={active.src} alt={active.caption} />
            <figcaption>
              <span className="gallery__lightbox-heart" aria-hidden="true">♥</span>
              {active.caption}
            </figcaption>
          </figure>
          <button
            type="button"
            className="gallery__lightbox-close"
            aria-label="Tutup"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}