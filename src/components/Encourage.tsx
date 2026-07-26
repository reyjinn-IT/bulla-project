import { HeartHandshake, Battery, TrendingUp, MessageCircleHeart, Sunrise, ShieldCheck, Sparkles } from 'lucide-react'
import ScrollStack from './ScrollStack'
import type { StackCard } from './ScrollStack'
import './Encourage.css'

const CARDS: StackCard[] = [
  {
    title: 'Kamu udah jauh lebih kuat dari yang kamu kira',
    desc: 'Semua proses berat yang udah kamu lewatin itu bukti nyata, bukan kebetulan. Aku yang liat dari samping aja bangga.',
    icon: HeartHandshake,
    accent: '#ff6f9f',
  },
  {
    title: 'Gak apa-apa kalau capek',
    desc: 'Istirahat bukan berarti berhenti. Pelan-pelan juga tetap jalan, dan aku tetep nungguin di ujungnya.',
    icon: Battery,
    accent: '#e8a87c',
  },
  {
    title: 'Progres kamu kelihatan kok',
    desc: 'Mungkin gak selalu kamu sadari, tapi orang di sekitar kamu — apalagi aku — liat usahanya, sekecil apa pun itu.',
    icon: TrendingUp,
    accent: '#9db5d8',
  }
]

export default function Encourage() {
  return (
    <section className="encourage" id="semangat">
      <span className="encourage__eyebrow">buat kamu baca pelan-pelan</span>
      <ScrollStack cards={CARDS} />
    </section>
  )
}
