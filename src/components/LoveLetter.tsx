import { useOnScreen } from '../hooks/useOnScreen'
import './LoveLetter.css'

const PARAGRAPHS = [
  'Aku nggak pernah pintar merangkai kata di depan kamu langsung, jadi aku tulis di sini aja.',
  'Terima kasih sudah jadi tempat yang paling nyaman buat pulang, bahkan di hari-hari yang berantakan.',
  'Aku suka caramu tertawa keras di hal-hal kecil, caramu peduli tanpa perlu diminta, dan caramu bikin hal biasa jadi terasa spesial.',
  'Semoga halaman kecil ini bisa mewakili sedikit dari rasa terima kasihku, punya kamu.',
]

export default function LoveLetter() {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.15)

  return (
    <section className="letter" id="surat">
      <div ref={ref} className={`letter__card ${visible ? 'letter__card--visible' : ''}`}>
        <span className="letter__mark">Untukmu</span>
        <div className="letter__body">
          {PARAGRAPHS.map((p, i) => (
            <p key={i} style={{ transitionDelay: `${i * 140}ms` }} className="letter__p">
              {p}
            </p>
          ))}
        </div>
        <span className="letter__sign">— aku, yang selalu bersyukur ada kamu</span>
      </div>
    </section>
  )
}
