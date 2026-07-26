import Lanyard from './Lanyard'
import { useOnScreen } from '../../useOnScreen'
import './Signature.css'

export default function Signature() {
  const { ref, visible } = useOnScreen<HTMLDivElement>(0.2)

  return (
    <section className="signature" id="dibuat-oleh">
      <div ref={ref} className={`signature__content ${visible ? 'signature__content--visible' : ''}`}>
        <p className="signature__label">made by</p>
        <Lanyard
          photo="/photos/me.jpg"
          name="Rey"
          role="hehe"
          idNumber="2607-Rey-2026"
          ropeColor={['#c8a8d8', '#8a5a9a', '#b888c8']}
          height={420}
        />
      </div>
    </section>
  )
}