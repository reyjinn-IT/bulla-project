import Lanyard from './Lanyard'
import './Signature.css'

export default function Signature() {
  return (
    <section className="signature" id="dibuat-oleh">
      <p className="signature__label">dibuat sama</p>
      <Lanyard photo="/photos/me.jpg" name="Gw" role="yang bikin web ini" />
    </section>
  )
}
