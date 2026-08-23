import type { Product } from '../../domain/catalog'

export const canonicalProducts: Product[] = [
  {
    sku: 'SSC-POT-0001',
    slug: 'common-healing-potion',
    name: 'Common Healing Potion',
    departmentId: 'potions-elixirs',
    contentStatus: 'canonical',
    shortDescription: 'A standardized vitality potion for minor injuries, ailments, or common sicknesses.',
    price: { amount: 5, denomination: 'Copper', unit: 'ounce' },
    art: 'bottle',
    facts: {
      category: 'Vitality potion',
      volatility: 'None',
      supplier: 'Bramblewick Bottling & Alchemical Works',
      recommendedUsage: 'Consume all at once',
      dosage: '1 oz per 50 lbs',
      onset: 'Immediate',
      primaryEffects: 'Heal minor injuries, ailments, or common sicknesses',
      notRecommendedFor: 'Major wounds, missing limbs, curses, magical ailments, or major infections',
      secondaryEffects: 'None',
      sideEffects: 'May include randomly colored urine for several days',
      minimumUserAge: 'None',
      minimumUserWeight: '50 lbs',
    },
  },
]
