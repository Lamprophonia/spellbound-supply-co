import { canonicalProducts } from './canonical/products'
import { demoProducts } from './demo/products'

export const products = [...canonicalProducts, ...demoProducts]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
