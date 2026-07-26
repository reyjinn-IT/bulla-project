import { useState } from 'react'
import './Letter.css'

const LETTER_PARAGRAPHS = [
  'Bulla,',
  'Aku sebenernya bingung mulai dari mana, tapi aku mau mulai dari satu hal yang paling jujur: terimakasih banget ya, kamu udah hadir di dunia ini.',
  'Jujur, awalnya aku kira kamu itu cuma wanita yang sekadar cantik. Tapi ternyata aku salah besar. Kamu jauh lebih dari itu—kamu wanita yang begitu baik, dan kehadiran kamu selalu jadi pengingat buat aku untuk terus berusaha jadi orang baik juga.',
  'Setiap senyuman, kebaikan kecil yang kamu lakuin selalu bikin aku kagum. Kamu punya energi positif yang bikin tempat di sekitar kamu kerasa lebih hangat.',
  'Surat kecil ini cuma pengingat sederhana: makasih udah jadi Bulla yang sekarang—wanita yang gak cuma cantik di luar, tapi juga punya hati yang luar biasa baik.',
  'Tetep jadi diri kamu yang sekarang ya. Ada aku di sini, yang bakal selalu dukung kamu.',
]

const FLOWER_PETALS = 12

const FLOWER_MESSAGES = [
  'kalo kata LANY kamu itu "prettiest thing i`ve ever seen"',
]

export default function Letter() {
  const [opened, setOpened] = useState(false)
  const [flowerShown, setFlowerShown] = useState(false)
  const [flowerMsg, setFlowerMsg] = useState(FLOWER_MESSAGES[0])

  return (
    <section className="letter" id="pesan">
      {/* moon-sky background overlay */}
      <div className="letter__bg" aria-hidden="true" />

      <span className="letter__eyebrow">sebuah surat kecil</span>
      <h2 className="letter__heading">Klik amplopnya, Bulla</h2>

      <div className={`letter__stage ${opened ? 'letter__stage--opened' : ''}`}>
        {/* Bear — stays visible, moves to left when opened */}
        <div className={`letter__bear-wrap ${opened ? 'letter__bear-wrap--side' : ''}`}>
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
              <ellipse cx="110" cy="100" rx="6" ry="4.5" fill="#5a3a4a" />
              <path d="M110 104 Q110 112 100 113" stroke="#5a3a4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M110 104 Q110 112 120 113" stroke="#5a3a4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* eyes */}
              <circle cx="88" cy="82" r="5" fill="#5a3a4a" />
              <circle cx="132" cy="82" r="5" fill="#5a3a4a" />
              {/* eye sparkle */}
              <circle cx="90" cy="80" r="1.5" fill="#fff" />
              <circle cx="134" cy="80" r="1.5" fill="#fff" />
              {/* blush */}
              <ellipse cx="76" cy="98" rx="9" ry="6" fill="#ff9fb2" opacity="0.55" />
              <ellipse cx="144" cy="98" rx="9" ry="6" fill="#ff9fb2" opacity="0.55" />
              {/* body */}
              <ellipse cx="110" cy="188" rx="66" ry="42" fill="#d9ab7e" />
              {/* arms hugging */}
              <ellipse className="letter__bear-arm letter__bear-arm--left" cx="66" cy="168" rx="16" ry="24" fill="#d9ab7e" />
              <ellipse className="letter__bear-arm letter__bear-arm--right" cx="154" cy="168" rx="16" ry="24" fill="#d9ab7e" />
            </svg>

            <svg viewBox="0 0 140 100" className="letter__envelope-icon" aria-hidden="true">
              <rect x="2" y="2" width="136" height="96" rx="8" fill="#2a1a3a" stroke="#ff6b9d50" strokeWidth="2" />
              <path d="M4 8 L70 60 L136 8" fill="none" stroke="#ff6b9d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="70" cy="52" r="12" fill="#ff6b9d" />
              <path d="M64 52 Q70 58 76 52" stroke="#2a1a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>

            <span className="letter__hint">tap buat baca ✦</span>
          </button>
        </div>

        {/* Letter paper — slides in from right */}
        <div className={`letter__paper ${opened ? 'letter__paper--visible' : ''}`}>
          <div className="letter__paper-inner">
            {LETTER_PARAGRAPHS.map((p, i) => (
              <p
                key={i}
                className="letter__p"
                style={{ transitionDelay: opened ? `${400 + i * 140}ms` : '0ms' }}
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

      {/* ── Surprise notification badge ── */}
      <div className={`letter__surprise-badge ${opened ? 'letter__surprise-badge--visible' : ''}`}>
        <button
          type="button"
          className="letter__surprise-btn"
          onClick={() => {
            setFlowerMsg(FLOWER_MESSAGES[Math.floor(Math.random() * FLOWER_MESSAGES.length)])
            setFlowerShown(true)
          }}
          disabled={flowerShown}
          aria-label="Kejutan!"
        >
          <span className="letter__surprise-icon">🎀</span>
          <span className="letter__surprise-text">klik ini!</span>
          <span className="letter__surprise-dot" />
        </button>
      </div>

      {/* ── Surprise flower overlay ── */}
      {flowerShown && (
        <div className="letter__flower-overlay" onClick={() => setFlowerShown(false)}>
          <div className="letter__flower-stage">
            {/* sparkles around flower */}
            {[...Array(20)].map((_, i) => (
              <span
                key={`spark-${i}`}
                className="letter__flower-sparkle"
                style={{
                  '--angle': `${(360 / 20) * i}deg`,
                  '--dist': `${80 + Math.random() * 100}px`,
                  '--delay': `${0.1 + Math.random() * 0.5}s`,
                  '--size': `${6 + Math.random() * 10}px`,
                } as React.CSSProperties}
              >
                ✦
              </span>
            ))}

            {/* the flower */}
            <div className="letter__flower">
              {/* petals */}
              {[...Array(FLOWER_PETALS)].map((_, i) => (
                <span
                  key={`petal-${i}`}
                  className="letter__petal"
                  style={{
                    '--i': i,
                    '--total': FLOWER_PETALS,
                    '--delay': `${0.05 * i}s`,
                  } as React.CSSProperties}
                />
              ))}
              {/* flower center */}
              <span className="letter__flower-center">
                <span className="letter__flower-face">🌸</span>
              </span>
            </div>

            {/* message */}
            <p className="letter__flower-msg">
              {flowerMsg} <span className="letter__flower-msg-heart"></span>
            </p>

            <button
              type="button"
              className="letter__flower-close"
              onClick={() => setFlowerShown(false)}
            >
              tutup
            </button>
          </div>
        </div>
      )}
    </section>
  )
}