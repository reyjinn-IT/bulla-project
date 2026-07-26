import { useState } from 'react'
import { useOnScreen } from '../../useOnScreen'
import './Gallery.css'

interface Photo {
  src: string
  caption: string
}

const PHOTOS: Photo[] = [
  { src: '/photos/1.jpg', caption: 'kids with sparkling eye' },
  { src: '/photos/2.jpg', caption: 'OMGG' },
  { src: '/photos/3.jpg', caption: 'Bulla berkumis' },
  { src: '/photos/4.jpg', caption: 'Bulla Seperi Idol' },
  { src: '/photos/5.jpg', caption: 'ini kah mbg?' },
  { src: '/photos/6.jpg', caption: 'Lukisan' },
  { src: '/photos/7.jpg', caption: 'beautiful bouquet, and the girl also.' },
  { src: '/photos/8.jpg', caption: 'shape of my heart bgt ini mah' },
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
          <h2 className="gallery__heading">Gallery Bulla</h2>
          <p className="gallery__sub">
            isinya maha karya tuhan yang indahnya bikin terus bersyukur
          </p>
        </div>

        <div className="gallery__grid">
          {PHOTOS.map((photo, i) => (
            <button
              type="button"
              key={i}
              className="gallery__card"
              style={{ '--i': i } as React.CSSProperties}
              onClick={() => setActive(photo)}
            >
              <div className="gallery__card-art">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
                <span className="gallery__card-play" aria-hidden="true">
                  ♥
                </span>
              </div>
              <span className="gallery__card-title">{photo.caption}</span>
              <span className="gallery__card-sub">Gallery Bulla</span>
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
