import { useOnScreen } from '../hooks/useOnScreen'
import './Timeline.css'

interface Moment {
  date: string
  title: string
  desc: string
}

const MOMENTS: Moment[] = [
  { date: 'Awal cerita', title: 'Pertama kali ngobrol', desc: 'Isi sendiri ceritanya di sini ya.' },
  { date: 'Beberapa minggu kemudian', title: 'Ketemu pertama kali', desc: 'Momen yang bikin deg-degan itu.' },
  { date: 'Hari jadian', title: 'Resmi jadi kita', desc: 'Tanggal yang selalu diingat.' },
  { date: 'Sampai sekarang', title: 'Masih terus berjalan', desc: 'Dan masih banyak cerita yang mau ditulis bareng kamu.' },
]

function TimelineItem({ moment, index }: { moment: Moment; index: number }) {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.3)
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`timeline__item ${isEven ? 'timeline__item--left' : 'timeline__item--right'} ${
        visible ? 'timeline__item--visible' : ''
      }`}
    >
      <div className="timeline__dot" />
      <div className="timeline__content">
        <span className="timeline__date">{moment.date}</span>
        <h3 className="timeline__title">{moment.title}</h3>
        <p className="timeline__desc">{moment.desc}</p>
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section className="timeline" id="cerita">
      <h2 className="timeline__heading">Perjalanan Kita</h2>
      <div className="timeline__line" />
      <div className="timeline__list">
        {MOMENTS.map((m, i) => (
          <TimelineItem key={i} moment={m} index={i} />
        ))}
      </div>
    </section>
  )
}
