import { canonicalProducts } from './canonical/products'
import { demoProducts } from './demo/products'

export const products = [...canonicalProducts, ...demoProducts].sort((left, right) => left.sku.localeCompare(right.sku))

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
