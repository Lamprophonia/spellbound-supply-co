import { describe, expect, it } from 'vitest'
import { canonicalProducts } from '../data/canonical/products'
import { getCartUnitPrice } from './cartPricing'

describe('cart pricing characterization', () => {
  it('preserves the deliberate mandrake price discrepancy for SUT evaluation', () => {
    const mandrake = canonicalProducts.find((product) => product.sku === 'SSC-REA-0018')!

    expect(mandrake.price).toEqual({ amount: 12, denomination: 'Copper', unit: 'packet' })
    expect(getCartUnitPrice(mandrake)).toEqual({ amount: 13, denomination: 'Copper', unit: 'packet' })
  })

  it('does not alter the Common Healing Potion cart price', () => {
    const healingPotion = canonicalProducts.find((product) => product.sku === 'SSC-POT-0001')!

    expect(getCartUnitPrice(healingPotion)).toEqual(healingPotion.price)
  })
})
