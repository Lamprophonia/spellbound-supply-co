import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { filterProducts } from './search'

describe('catalog filtering', () => {
  it('finds products by SKU', () => {
    expect(filterProducts(products, { query: 'SSC-POT-0001' }).map((product) => product.name)).toEqual([
      'Common Healing Potion',
    ])
  })

  it('combines department and content-status filters', () => {
    expect(filterProducts(products, { departmentId: 'potions-elixirs', contentStatus: 'demo' })).toEqual([])
  })
})
