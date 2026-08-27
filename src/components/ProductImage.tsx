import type { Product } from '../domain/catalog'

export function ProductImage({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-image${large ? ' product-image--large' : ''}`}>
      <img src={product.image.src} alt={product.image.alt} loading={large ? 'eager' : 'lazy'} decoding="async" />
      <span className="product-image__caption">
        {product.image.status === 'placeholder' && 'Representative image · '}
        Stock no. {product.sku}
      </span>
    </div>
  )
}
