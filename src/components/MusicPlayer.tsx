import { useEffect, useRef, useState } from 'react'
import './MusicPlayer.css'

const TRACK_SRC = '/song/lagu.mp3'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
        })
    }

    tryPlay()

    const onFirstInteraction = () => tryPlay()
    window.addEventListener('pointerdown', onFirstInteraction, { once: true })
    window.addEventListener('keydown', onFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction)
      window.removeEventListener('keydown', onFirstInteraction)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} loop preload="auto" />
      <button
        type="button"
        className={`music-player ${playing ? 'music-player--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
      >
        <span className="music-player__bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="music-player__label">{playing ? 'musik main' : 'putar musik'}</span>
      </button>
    </>
  )
}
