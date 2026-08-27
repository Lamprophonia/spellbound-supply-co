import { Link, useParams } from 'react-router-dom'
import { ProductImage } from '../components/ProductImage'
import { StatusBadge } from '../components/StatusBadge'
import { getDepartment } from '../data/departments'
import { getProductBySlug } from '../data/products'
import { formatUnitPrice } from '../domain/catalog'
import { useCart } from '../state/CartContext'
import { NotFoundPage } from './NotFoundPage'

const factLabels: Record<string, string> = {
  category: 'Category', volatility: 'Thaumaturgic volatility', supplier: 'Supplier', format: 'Format', author: 'Author', edition: 'Edition', binding: 'Binding', extent: 'Extent', language: 'Language', material: 'Material', core: 'Core', dimensions: 'Dimensions', finish: 'Finish', attunement: 'Attunement', grade: 'Grade', origin: 'Origin', packageSize: 'Package size', storage: 'Storage', shelfLife: 'Shelf life', recommendedUsage: 'Recommended usage', dosage: 'Dosage', onset: 'Onset', primaryEffects: 'Primary effects', notRecommendedFor: 'Not recommended for', secondaryEffects: 'Secondary effects', sideEffects: 'Side effects', minimumUserAge: 'Minimum user age', minimumUserWeight: 'Minimum user weight',
}

export function ProductPage() {
  const { productSlug } = useParams()
  const product = productSlug ? getProductBySlug(productSlug) : undefined
  const { addItem } = useCart()
  if (!product) return <NotFoundPage />
  const department = getDepartment(product.departmentId)!
  const facts = product.facts ? Object.entries(product.facts).filter(([, value]) => value !== undefined) : []
  const handling = product.handling ?? {
    title: 'General merchandise handling',
    notes: ['Stock number checked before dispatch', 'Packed to prevent ordinary transit damage', 'Standard courier permitted'],
    disclaimer: 'Special handling requirements, where applicable, are recorded with the merchandise.',
  }

  return (
    <div className="page-shell shell">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to={`/departments/${department.id}`}>{department.name}</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav>
      <article className="product-detail">
        <div className="product-detail__art"><ProductImage product={product} large /></div>
        <div className="product-detail__main">
          <StatusBadge status={product.contentStatus} />
          <p className="stock-number">Stock no. {product.sku}</p>
          <h1>{product.name}</h1>
          <p className="product-detail__description">{product.shortDescription}</p>
          <div className="detail-rule" />
          <p className="detail-price"><strong>{product.price.amount} {product.price.denomination}</strong><span>per {product.price.unit}</span></p>
          <div className="purchase-panel">
            <button className="button button--large" type="button" onClick={() => addItem(product)}>Add 1 {product.price.unit} to cart</button>
            <p>Price recorded as {formatUnitPrice(product.price)}. Cart totals use SSC’s 100-to-1 currency ladder.</p>
          </div>
          <ul className="dispatch-notes" aria-label="Fulfilment notes"><li><span aria-hidden="true">✓</span> Catalogued by stable stock number</li>{product.facts?.volatility === 'None' && <li><span aria-hidden="true">✓</span> Standard courier permitted</li>}</ul>
        </div>
      </article>

      {product.contentStatus === 'demo' ? (
        <section className="demo-notice" aria-labelledby="demo-notice-heading"><span aria-hidden="true">!</span><div><h2 id="demo-notice-heading">Demonstration record</h2><p>This product was created solely to exercise the storefront layout. Its name, price, supplier information, and product properties are not canonical Spellbound Supply Co. business data.</p></div></section>
      ) : (
        <div className="detail-sections">
          <section aria-labelledby="specification-heading"><p className="eyebrow">Official particulars</p><h2 id="specification-heading">Product specification</h2><dl className="facts-list">{facts.map(([key, value]) => <div key={key}><dt>{factLabels[key]}</dt><dd>{value}</dd></div>)}</dl></section>
          <aside className="handling-card" aria-labelledby="handling-heading"><p className="eyebrow">Packing & dispatch</p><h2 id="handling-heading">{handling.title}</h2><ul>{handling.notes.map((note) => <li key={note}>{note}</li>)}</ul>{handling.disclaimer && <p>{handling.disclaimer}</p>}</aside>
        </div>
      )}
    </div>
  )
}
