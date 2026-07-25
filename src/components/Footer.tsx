import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      {/* Mini moon */}
      <div className="footer__moon" aria-hidden="true" />
      <p className="footer__note">makasih udah baca sampai sini. semangat terus, ya.</p>
      <span className="footer__heart" aria-hidden="true">
        ✦
      </span>
    </footer>
  )
}
