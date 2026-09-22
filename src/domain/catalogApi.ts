import type { Product } from './catalog'
export interface ProductsResponse {
  schemaVersion: 1
  products: Product[]
  total: number
}
