import { FormEvent } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { departments, getDepartment } from '../data/departments'
import { products } from '../data/products'
import { filterProducts } from '../domain/search'
import type { ContentStatus } from '../domain/catalog'
import { NotFoundPage } from './NotFoundPage'

export function CatalogPage() {
  const { departmentId } = useParams()
  const department = departmentId ? getDepartment(departmentId) : undefined
  const [searchParams, setSearchParams] = useSearchParams()
  if (departmentId && !department) return <NotFoundPage />

  const query = searchParams.get('q') ?? ''
  const statusParam = searchParams.get('status')
  const contentStatus: ContentStatus | 'all' = statusParam === 'canonical' || statusParam === 'demo' ? statusParam : 'all'
  const results = filterProducts(products, { query, departmentId, contentStatus })

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next = new URLSearchParams()
    const nextQuery = String(data.get('q') ?? '').trim()
    const nextStatus = String(data.get('status') ?? 'all')
    if (nextQuery) next.set('q', nextQuery)
    if (nextStatus !== 'all') next.set('status', nextStatus)
    setSearchParams(next)
  }

  return (
    <div className="page-shell shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span>{department?.name ?? 'Catalog'}</span></nav>
      <header className="page-header">
        <p className="eyebrow">General catalog · Current issue</p>
        <h1>{department?.name ?? 'All catalog goods'}</h1>
        <p>{department?.description ?? 'Browse all presently catalogued merchandise by department, name, or stock number.'}</p>
      </header>
      <div className="catalog-layout">
        <aside className="filters" aria-label="Catalog filters">
          <form onSubmit={applyFilters}>
            <div className="filter-heading"><h2>Refine catalog</h2><span>{results.length} {results.length === 1 ? 'item' : 'items'}</span></div>
            <div className="field">
              <label htmlFor="catalog-search">Search</label>
              <input id="catalog-search" name="q" type="search" defaultValue={query} placeholder="Name or stock no." />
            </div>
            <fieldset>
              <legend>Record status</legend>
              {(['all', 'canonical', 'demo'] as const).map((status) => (
                <label className="radio-label" key={status}><input type="radio" name="status" value={status} defaultChecked={contentStatus === status} /><span>{status === 'all' ? 'All listings' : status === 'canonical' ? 'Canonical goods' : 'Demo listings'}</span></label>
              ))}
            </fieldset>
            <button className="button button--full" type="submit">Apply filters</button>
            {(query || contentStatus !== 'all') && <Link className="clear-link" to={department ? `/departments/${department.id}` : '/catalog'}>Clear filters</Link>}
          </form>
          <div className="department-list">
            <h2>Departments</h2>
            <Link className={!department ? 'active' : ''} to="/catalog">All goods</Link>
            {departments.map((item) => <Link className={item.id === department?.id ? 'active' : ''} to={`/departments/${item.id}`} key={item.id}>{item.name}</Link>)}
          </div>
        </aside>
        <section aria-labelledby="results-heading">
          <div className="results-heading"><h2 id="results-heading">{query ? `Results for “${query}”` : department?.shortName ?? 'All goods'}</h2><span>Ordered by stock number</span></div>
          {results.length > 0 ? <div className="product-grid product-grid--catalog">{results.map((product) => <ProductCard key={product.sku} product={product} />)}</div> : <div className="empty-state"><span aria-hidden="true">∅</span><h2>No catalog entries found</h2><p>Try another term or broaden the record-status filter.</p><Link className="button button--outline" to={department ? `/departments/${department.id}` : '/catalog'}>Clear filters</Link></div>}
        </section>
      </div>
    </div>
  )
}
