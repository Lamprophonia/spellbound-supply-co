import type { Product } from '../../domain/catalog'

// These records exist only to exercise the storefront layout. They are not SSC canon.
export const demoProducts: Product[] = [
  {
    sku: 'DEMO-TOM-0001',
    slug: 'demonstration-field-notebook',
    name: 'Field Notebook (Demonstration)',
    departmentId: 'scrolls-tomes',
    contentStatus: 'demo',
    shortDescription: 'A noncanonical sample listing used to preview book merchandising.',
    price: { amount: 8, denomination: 'Copper', unit: 'copy' },
    art: 'book',
  },
  {
    sku: 'DEMO-WND-0001',
    slug: 'demonstration-practice-wand',
    name: 'Practice Wand (Demonstration)',
    departmentId: 'wands-staves',
    contentStatus: 'demo',
    shortDescription: 'A noncanonical sample listing used to preview implement merchandising.',
    price: { amount: 2, denomination: 'Silver', unit: 'wand' },
    art: 'wand',
  },
  {
    sku: 'DEMO-REA-0001',
    slug: 'demonstration-reagent-bundle',
    name: 'Reagent Bundle (Demonstration)',
    departmentId: 'ingredients-reagents',
    contentStatus: 'demo',
    shortDescription: 'A noncanonical sample listing used to preview ingredient merchandising.',
    price: { amount: 6, denomination: 'Copper', unit: 'bundle' },
    art: 'bundle',
  },
]
