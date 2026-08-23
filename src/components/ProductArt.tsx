import type { Product } from '../domain/catalog'

export function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-art product-art--${product.art}${large ? ' product-art--large' : ''}`} aria-hidden="true">
      <div className="product-art__sun" />
      {product.art === 'bottle' && <div className="drawing drawing--bottle"><i /><b>SSC</b><span /></div>}
      {product.art === 'book' && <div className="drawing drawing--book"><i /><b>DEMO</b></div>}
      {product.art === 'wand' && <div className="drawing drawing--wand"><i /><span>✦</span></div>}
      {product.art === 'bundle' && <div className="drawing drawing--bundle"><i /><i /><i /><b /></div>}
      <span className="product-art__caption">Stock no. {product.sku}</span>
    </div>
  )
}
