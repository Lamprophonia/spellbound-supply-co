import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <BrandMark />
          <div><strong>Spellbound Supply Co.</strong><span>Purveyors since 1684</span></div>
        </div>
        <div>
          <h2>Customer provisions</h2>
          <ul><li><Link to="/catalog">Browse catalog</Link></li><li><Link to="/cart">View cart</Link></li></ul>
        </div>
        <div>
          <h2>Merchant notice</h2>
          <p>This demonstration storefront conducts no real transactions. Product records marked as demonstrations are not canonical SSC data.</p>
        </div>
      </div>
      <div className="shell footer-legal">© 1684–2026 Spellbound Supply Co. All customary rights reserved.</div>
    </footer>
  )
}
