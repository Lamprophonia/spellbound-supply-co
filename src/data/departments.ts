import type { Department } from '../domain/catalog'

export const departments: Department[] = [
  {
    id: 'potions-elixirs',
    name: 'Potions & Elixirs',
    shortName: 'Potions',
    description: 'Bottled preparations for practical household and professional use.',
    mark: 'I',
  },
  {
    id: 'scrolls-tomes',
    name: 'Scrolls & Tomes',
    shortName: 'Books',
    description: 'Printed, bound, and rolled works for the discerning practitioner.',
    mark: 'II',
  },
  {
    id: 'wands-staves',
    name: 'Wands & Staves',
    shortName: 'Wands',
    description: 'Implements for personal, academic, and commercial thaumaturgy.',
    mark: 'III',
  },
  {
    id: 'ingredients-reagents',
    name: 'Ingredients & Reagents',
    shortName: 'Reagents',
    description: 'Materials and sundries for laboratory, workshop, and hearth.',
    mark: 'IV',
  },
]

export function getDepartment(id: string) {
  return departments.find((department) => department.id === id)
}
