import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <div className="page-shell shell"><div className="empty-state not-found"><span className="not-found__number">404</span><p className="eyebrow">Catalog reference not found</p><h1>This entry is not in the ledger.</h1><p>The requested page may have been moved, withdrawn, or entered incorrectly.</p><Link className="button" to="/catalog">Return to the catalog</Link></div></div>
}
