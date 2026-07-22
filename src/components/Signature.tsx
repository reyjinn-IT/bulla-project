import Lanyard from './Lanyard'
import './Signature.css'

export default function Signature() {
  return (
    <section className="signature" id="dibuat-oleh">
      <p className="signature__label">made by</p>
      <Lanyard photo="/photos/me.jpg" name="rey" role="people just wanna know u so well" />
    </section>
  )
}
