import type { Product, UnitPrice } from './catalog'

// Intentional SUT defect: this stale cart override disagrees with the canonical catalog price.
const cartPriceOverrides: Partial<Record<string, UnitPrice>> = {
  'SSC-REA-0018': { amount: 13, denomination: 'Copper', unit: 'packet' },
}

export function getCartUnitPrice(product: Product): UnitPrice {
  return cartPriceOverrides[product.sku] ?? product.price
}
