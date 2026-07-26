import { HeartHandshake, Battery, TrendingUp, MessageCircleHeart, Sunrise, ShieldCheck, Sparkles } from 'lucide-react'
import ScrollStack from './ScrollStack'
import type { StackCard } from './ScrollStack'
import './Encourage.css'

const CARDS: StackCard[] = [
  {
    title: 'Kehadiran kamu itu sangat berarti',
    desc: 'Makasih udah hadir di dunia ini. Kamu bukan cuma sekadar cantik, tapi juga bikin hari-hari terasa lebih bermakna.',
    icon: HeartHandshake,
    accent: '#ff6f9f',
  },
  {
    title: 'Pengingat untuk terus jadi orang baik',
    desc: 'Kebaikan dan ketulusan kamu selalu jadi inspirasi buat aku untuk terus berusaha jadi pribadi yang lebih baik setiap harinya.',
    icon: Sparkles,
    accent: '#e8a87c',
  },
  {
    title: 'Progres dan energi positif kamu nyata',
    desc: 'Aku yakin Kamu Pasti bisa ngejar Mimpi kamu bull, Kejar PTN idaman kamu itu aku support kamu selalu dari sini',
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
