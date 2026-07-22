import ScrollStack from './ScrollStack'
import type { StackCard } from './ScrollStack'
import './Encourage.css'

const CARDS: StackCard[] = [
  { title: 'Kamu udah jauh lebih kuat dari yang kamu kira', desc: 'Semua proses berat yang udah kamu lewatin itu bukti nyata.' },
  { title: 'Gak apa-apa kalau capek', desc: 'Istirahat bukan berarti berhenti. Pelan-pelan juga jalan.' },
  { title: 'Progres kamu kelihatan kok', desc: 'Mungkin gak selalu kamu sadari, tapi orang di sekitar kamu lihat.' },
  { title: 'Gw ada, kapanpun dibutuhin', desc: 'Cerita apa aja, gw siap dengerin.' },
]

export default function Encourage() {
  return (
    <section className="encourage" id="semangat">
      <h2 className="encourage__heading">Beberapa hal yang mau gw ingetin</h2>
      <ScrollStack cards={CARDS} />
    </section>
  )
}
