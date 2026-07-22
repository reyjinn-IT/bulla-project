import { useState } from 'react'
import './Letter.css'

const LETTER_PARAGRAPHS = [
  'Bulla,',
  'Gw sebenernya bingung mulai dari mana, jadi gw mulai aja dari yang paling jujur: makasih, ya. Bukan basa-basi — makasih karena selama ini kamu tetep jadi kamu, di tengah semua hal yang lagi kamu bawa sendirian.',
  'Gw tau capeknya gak selalu keliatan. Kadang kamu masih sempet ketawa, masih sempet nanyain kabar orang lain, padahal di dalem kepala kamu sendiri lagi rame banget. Gw lihat itu, dan itu gak luput gitu aja di mata gw.',
  'Kamu gak harus selalu kuat di depan gw. Boleh capek, boleh nangis, boleh bilang "gw lagi gak baik-baik aja" tanpa harus jelasin panjang lebar kenapa. Gw tetep di sini, dengan versi kamu yang mana pun itu.',
  'Progres kamu itu nyata, walau kadang kamu ngerasa jalan di tempat. Setiap langkah kecil yang kamu ambil pas lagi berat-beratnya, itu udah lebih dari cukup buat dibanggain.',
  'Jadi tolong, pelan-pelan aja. Gak perlu buru-buru nyelesein semuanya sekarang. Istirahat itu bagian dari usaha juga, bukan kebalikannya.',
  'Surat kecil ini cuma pengingat sederhana: ada gw, kapan pun kamu butuh. Makasih udah jadi Bulla yang ini — yang lagi berjuang, dan tetep baik di tengah semuanya.',
  '— dari yang selalu dukung kamu, diam-diam maupun terang-terangan.',
]

export default function Letter() {
  const [opened, setOpened] = useState(false)

  return (
    <section className="letter" id="pesan">
      <span className="letter__eyebrow">sebuah surat kecil</span>
      <h2 className="letter__heading">Klik amplopnya, Bulla</h2>

      <div className={`letter__stage ${opened ? 'letter__stage--opened' : ''}`}>
        {/* Bear + envelope, hidden away once the letter is open */}
        <button
          type="button"
          className="letter__trigger"
          onClick={() => setOpened(true)}
          aria-label="Buka surat"
          disabled={opened}
        >
          <svg viewBox="0 0 220 220" className="letter__bear" aria-hidden="true">
            {/* ears */}
            <circle cx="62" cy="58" r="22" fill="#c99a72" />
            <circle cx="158" cy="58" r="22" fill="#c99a72" />
            <circle cx="62" cy="58" r="11" fill="#e9c9a8" />
            <circle cx="158" cy="58" r="11" fill="#e9c9a8" />
            {/* head */}
            <circle cx="110" cy="92" r="58" fill="#d9ab7e" />
            {/* muzzle */}
            <ellipse cx="110" cy="106" rx="26" ry="20" fill="#f1dcc0" />
            <ellipse cx="110" cy="100" rx="6" ry="4.5" fill="#4a2545" />
            <path d="M110 104 Q110 112 100 113" stroke="#4a2545" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M110 104 Q110 112 120 113" stroke="#4a2545" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* eyes */}
            <circle cx="88" cy="82" r="5" fill="#4a2545" />
            <circle cx="132" cy="82" r="5" fill="#4a2545" />
            {/* blush */}
            <ellipse cx="76" cy="98" rx="9" ry="6" fill="#ff9fb2" opacity="0.55" />
            <ellipse cx="144" cy="98" rx="9" ry="6" fill="#ff9fb2" opacity="0.55" />
            {/* body */}
            <ellipse cx="110" cy="188" rx="66" ry="42" fill="#d9ab7e" />
            {/* arms hugging the envelope */}
            <ellipse className="letter__bear-arm letter__bear-arm--left" cx="66" cy="168" rx="16" ry="24" fill="#d9ab7e" />
            <ellipse className="letter__bear-arm letter__bear-arm--right" cx="154" cy="168" rx="16" ry="24" fill="#d9ab7e" />
          </svg>

          <svg viewBox="0 0 140 100" className="letter__envelope-icon" aria-hidden="true">
            <rect x="2" y="2" width="136" height="96" rx="8" fill="var(--paper)" stroke="var(--soft-pink)" strokeWidth="2" />
            <path d="M4 8 L70 60 L136 8" fill="none" stroke="var(--rose)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="70" cy="52" r="12" fill="var(--rose)" />
            <path d="M64 52 Q70 58 76 52" stroke="var(--paper)" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>

          <span className="letter__hint">tap buat baca ✦</span>
        </button>

        {/* Opened letter card */}
        <div className={`letter__paper ${opened ? 'letter__paper--visible' : ''}`}>
          <div className="letter__paper-inner">
            {LETTER_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className="letter__p"
                style={{ transitionDelay: opened ? `${300 + i * 160}ms` : '0ms' }}
              >
                {p}
              </p>
            ))}
          </div>
          <button type="button" className="letter__close" onClick={() => setOpened(false)}>
            tutup lagi
          </button>
        </div>
      </div>
    </section>
  )
}