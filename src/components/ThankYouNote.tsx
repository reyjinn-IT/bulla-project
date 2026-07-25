import { useOnScreen } from '../../useOnScreen'
import './ThankYouNote.css'

const PARAGRAPHS = [
  'Gw cuma mau bilang, makasih ya udah jadi orang yang selalu ada — baik pas lagi seru-seruan atau pas lagi capek banget.',
  'Gw tau belakangan ini banyak yang lagi kamu kejar, dan aku lihat kok, kamu udah berusaha keras.',
  'Jangan lupa istirahat, jangan terlalu keras sama diri sendiri. Kamu udah jalan jauh, dan itu layak diapresiasi.',
  'Apapun yang kamu kerjain sekarang, aku dukung dari sini. Semangat terus!',
]

export default function ThankYouNote() {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.15)

  return (
    <section className="thanks" id="pesan">
      <div ref={ref} className={`thanks__card ${visible ? 'thanks__card--visible' : ''}`}>
        <span className="thanks__mark">Sebuah pesan singkat</span>
        <div className="thanks__body">
          {PARAGRAPHS.map((p, i) => (
            <p key={i} style={{ transitionDelay: `${i * 140}ms` }} className="thanks__p">
              {p}
            </p>
          ))}
        </div>
        <span className="thanks__sign">— temen kamu yang selalu dukung dari belakang layar</span>
      </div>
    </section>
  )
}
