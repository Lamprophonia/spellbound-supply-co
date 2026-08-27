import type { DepartmentId, ProductImage } from '../domain/catalog.ts'

export const categoryPlaceholderImages: Record<DepartmentId, ProductImage> = {
  'potions-elixirs': {
    src: '/products/placeholders/potions-elixirs-v1.jpg',
    alt: 'Representative amber potion bottle sealed with burgundy wax on an apothecary table',
    status: 'placeholder',
  },
  'scrolls-tomes': {
    src: '/products/placeholders/scrolls-tomes-v1.jpg',
    alt: 'Representative dark green clothbound tome with aged brass fittings',
    status: 'placeholder',
  },
  'wands-staves': {
    src: '/products/placeholders/wands-staves-v1.jpg',
    alt: 'Representative oak channeling wand displayed on a worn green presentation pad',
    status: 'placeholder',
  },
  'ingredients-reagents': {
    src: '/products/placeholders/ingredients-reagents-v1.jpg',
    alt: 'Representative bundle of dried botanical reagent with a paper packet and inventory tag',
    status: 'placeholder',
  },
}
