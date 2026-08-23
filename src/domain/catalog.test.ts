import { describe, expect, it } from 'vitest'
import { formatCurrency, formatUnitPrice, toCopper } from './catalog'
import { canonicalProducts } from '../data/canonical/products'
import { demoProducts } from '../data/demo/products'

describe('catalog data boundaries', () => {
  it('keeps canonical and demonstration records separate', () => {
    expect(canonicalProducts.every((product) => product.contentStatus === 'canonical')).toBe(true)
    expect(demoProducts.every((product) => product.contentStatus === 'demo')).toBe(true)
  })

  it('formats price without applying currency conversion', () => {
    expect(formatUnitPrice(canonicalProducts[0].price)).toBe('5 Copper per ounce')
  })

  it('converts each denomination at a 100-to-1 ratio', () => {
    expect(toCopper(1, 'Silver')).toBe(100)
    expect(toCopper(1, 'Gold')).toBe(10_000)
    expect(toCopper(1, 'Platinum')).toBe(1_000_000)
    expect(toCopper(1, 'Mythril')).toBe(100_000_000)
  })

  it('formats a mixed total using the largest denominations first', () => {
    expect(formatCurrency(219)).toBe('2 Silver 19 Copper')
  })
})
