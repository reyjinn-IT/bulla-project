import { HeartHandshake, Battery, TrendingUp, MessageCircleHeart, Sunrise, ShieldCheck, Sparkles } from 'lucide-react'
import ScrollStack from './ScrollStack'
import type { StackCard } from './ScrollStack'
import './Encourage.css'

const CARDS: StackCard[] = [
  {
    title: 'Kamu udah jauh lebih kuat dari yang kamu kira',
    desc: 'Semua proses berat yang udah kamu lewatin itu bukti nyata, bukan kebetulan.',
    icon: HeartHandshake,
    accent: 'var(--rose)',
  },
  {
    title: 'Gak apa-apa kalau capek',
    desc: 'Istirahat bukan berarti berhenti. Pelan-pelan juga tetap jalan, kok.',
    icon: Battery,
    accent: 'var(--gold)',
  },
  {
    title: 'Progres kamu kelihatan kok',
    desc: 'Mungkin gak selalu kamu sadari, tapi orang di sekitar kamu lihat usahanya.',
    icon: TrendingUp,
    accent: 'var(--sage)',
  },
  {
    title: 'Boleh cerita apa aja ke gw',
    desc: 'Gak harus soal yang berat. Hal receh sekalipun, gw tetep mau dengerin.',
    icon: MessageCircleHeart,
    accent: 'var(--rose-deep)',
  },
  {
    title: 'Besok masih ada, gak perlu diselesein hari ini',
    desc: 'Kalau hari ini rasanya berat banget, cukup lewatin satu langkah dulu aja.',
    icon: Sunrise,
    accent: 'var(--gold)',
  },
  {
    title: 'Kamu gak sendirian ngadepin ini',
    desc: 'Ada gw yang siap jadi tempat sandaran, kapan pun kamu butuh.',
    icon: ShieldCheck,
    accent: 'var(--plum-soft)',
  },
  {
    title: 'Gw ada, kapan pun dibutuhin',
    desc: 'Selalu terbuka buat kamu — gak ada kata "kepagian" atau "kemaleman".',
    icon: Sparkles,
    accent: 'var(--rose)',
  },
]

export default function Encourage() {
  return (
    <section className="encourage" id="semangat">
      <h2 className="encourage__heading">Beberapa hal yang mau gw ingetin</h2>
      <ScrollStack cards={CARDS} />
    </section>
  )
}