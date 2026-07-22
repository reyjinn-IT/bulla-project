import './Gallery.css'

interface Photo {
  src: string
  caption: string
  rotate: number
}

// Ganti `src` dengan path foto kalian sendiri, taruh filenya di folder /public
const PHOTOS: Photo[] = [
  { src: '/photos/1.jpg', rotate: -4, caption: 'momen favoritku' },
  { src: '/photos/2.jpg', rotate: 3, caption: 'ketawa bareng' },
  { src: '/photos/3.jpg', rotate: -2, caption: 'jalan-jalan kita' },
  { src: '/photos/4.jpg', rotate: 5, caption: 'random tapi disayang' },
]

export default function Gallery() {
  return (
    <section className="gallery" id="galeri">
      <h2 className="gallery__heading">Kenangan Kita</h2>
      <p className="gallery__sub">beberapa potongan momen yang aku simpan baik-baik</p>
      <div className="gallery__grid">
        {PHOTOS.map((photo, i) => (
          <figure
            key={i}
            className="gallery__frame"
            style={{ '--rotate': `${photo.rotate}deg` } as React.CSSProperties}
          >
            <div className="gallery__image">
              <img src={photo.src} alt={photo.caption} loading="lazy" />
            </div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
