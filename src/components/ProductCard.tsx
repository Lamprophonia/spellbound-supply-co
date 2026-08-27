import { Link } from 'react-router-dom'
import type { Product } from '../domain/catalog'
import { formatUnitPrice } from '../domain/catalog'
import { useCart } from '../state/CartContext'
import { ProductImage } from './ProductImage'
import { StatusBadge } from './StatusBadge'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  return (
    <article className="product-card">
      <Link className="product-card__art-link" to={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <ProductImage product={product} />
      </Link>
      <div className="product-card__body">
        <StatusBadge status={product.contentStatus} />
        <p className="stock-number">{product.sku}</p>
        <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p className="product-card__description">{product.shortDescription}</p>
        <div className="product-card__purchase">
          <p className="price"><strong>{product.price.amount} {product.price.denomination}</strong><span>per {product.price.unit}</span></p>
          <button className="button button--small" type="button" onClick={() => addItem(product)}>Add to cart</button>
        </div>
      </div>
    </article>
  )
}
