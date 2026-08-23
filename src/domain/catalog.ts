export const departmentIds = [
  'potions-elixirs',
  'scrolls-tomes',
  'wands-staves',
  'ingredients-reagents',
] as const

export type DepartmentId = (typeof departmentIds)[number]
export type ContentStatus = 'canonical' | 'demo'
export type Denomination = 'Copper' | 'Silver' | 'Gold' | 'Platinum' | 'Mythril'

export const denominations: Denomination[] = ['Copper', 'Silver', 'Gold', 'Platinum', 'Mythril']

const copperValue: Record<Denomination, number> = {
  Copper: 1,
  Silver: 100,
  Gold: 10_000,
  Platinum: 1_000_000,
  Mythril: 100_000_000,
}

export interface Department {
  id: DepartmentId
  name: string
  shortName: string
  description: string
  mark: string
}

export interface UnitPrice {
  amount: number
  denomination: Denomination
  unit: string
}

export interface ProductFacts {
  category?: string
  volatility?: string
  supplier?: string
  recommendedUsage?: string
  dosage?: string
  onset?: string
  primaryEffects?: string
  notRecommendedFor?: string
  secondaryEffects?: string
  sideEffects?: string
  minimumUserAge?: string
  minimumUserWeight?: string
}

export interface Product {
  sku: string
  slug: string
  name: string
  departmentId: DepartmentId
  contentStatus: ContentStatus
  shortDescription: string
  price: UnitPrice
  art: 'bottle' | 'book' | 'wand' | 'bundle'
  facts?: ProductFacts
}

export function formatUnitPrice(price: UnitPrice) {
  return `${price.amount} ${price.denomination} per ${price.unit}`
}

export function toCopper(amount: number, denomination: Denomination) {
  return amount * copperValue[denomination]
}

export function formatCurrency(copper: number) {
  if (copper === 0) return '0 Copper'
  let remainder = copper
  return [...denominations]
    .reverse()
    .flatMap((denomination) => {
      const quantity = Math.floor(remainder / copperValue[denomination])
      remainder %= copperValue[denomination]
      return quantity > 0 ? [`${quantity} ${denomination}`] : []
    })
    .join(' ')
}
