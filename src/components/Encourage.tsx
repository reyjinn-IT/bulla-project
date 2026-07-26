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
  },
  {
    title: 'Boleh cerita apa aja ke aku',
    desc: 'Gak harus soal yang berat. Hal receh sekalipun, aku tetep mau dengerin — karena itu ceritanya kamu.',
    icon: MessageCircleHeart,
    accent: '#c88ec0',
  },
  {
    title: 'Besok masih ada, gak perlu diselesein hari ini',
    desc: 'Kalau hari ini rasanya berat banget, cukup lewatin satu langkah dulu aja. Aku jalan pelan-pelan bareng kamu.',
    icon: Sunrise,
    accent: '#e8c87c',
  },
  {
    title: 'Kamu gak sendirian ngadepin ini',
    desc: 'Ada aku yang siap jadi tempat sandaran, kapan pun kamu butuh — gak ada syarat, gak ada basa-basi.',
    icon: ShieldCheck,
    accent: '#7cc0b0',
  },
  {
    title: 'Aku ada, kapan pun dibutuhin',
    desc: 'Selalu terbuka buat kamu — gak ada kata "kepagian" atau "kemaleman". Sesederhana itu, karena kamu penting.',
    icon: Sparkles,
    accent: '#e0508f',
  },
]

export default function Encourage() {
  return (
    <section className="encourage" id="semangat">
      <div className="encourage__layout">
        <div className="encourage__intro">
          <span className="encourage__eyebrow">buat kamu baca pelan-pelan</span>
          <h2 className="encourage__heading">Beberapa hal yang mau aku ingetin</h2>
          <p className="encourage__sub">tujuh catatan kecil, tapi maksudnya sama semua — aku sayang kamu, dan itu gak berubah.</p>
        </div>
        <ScrollStack cards={CARDS} />
      </div>
    </section>
  )
}
