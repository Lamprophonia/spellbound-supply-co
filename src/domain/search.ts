import type { Product } from './catalog'

export interface CatalogFilters {
  query?: string
  departmentId?: string
  contentStatus?: 'all' | 'canonical' | 'demo'
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  const query = filters.query?.trim().toLocaleLowerCase()
  return products.filter((product) => {
    if (filters.departmentId && product.departmentId !== filters.departmentId) return false
    if (filters.contentStatus && filters.contentStatus !== 'all' && product.contentStatus !== filters.contentStatus) return false
    if (!query) return true
    const searchable = [
      product.sku,
      product.name,
      product.shortDescription,
      product.facts?.category,
      product.facts?.supplier,
    ].filter(Boolean).join(' ').toLocaleLowerCase()
    return searchable.includes(query)
  })
}
