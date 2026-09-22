import { afterEach, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../components/Header'
import { CartProvider } from '../state/CartContext'
import { CatalogPage } from './CatalogPage'

afterEach(cleanup)

it('synchronizes sidebar filters after header navigation while preserving unsubmitted drafts', () => {
  render(
    <MemoryRouter initialEntries={['/catalog?q=healing']}>
      <CartProvider><Header /><CatalogPage /></CartProvider>
    </MemoryRouter>,
  )
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('healing')
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'wand' } })
  fireEvent.click(screen.getByLabelText('Demo listings'))
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('wand')
  expect(screen.getByRole('heading', { name: /Results for/ })).toHaveTextContent('healing')

  fireEvent.change(screen.getByRole('searchbox', { name: 'Search the catalog' }), { target: { value: 'mandrake' } })
  fireEvent.click(screen.getByRole('button', { name: 'Search' }))
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('mandrake')
  expect(screen.getByLabelText('Canonical goods')).toBeChecked()

  fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'notebook' } })
  fireEvent.click(screen.getByLabelText('Demo listings'))
  expect(screen.getByRole('heading', { name: /Results for/ })).toHaveTextContent('mandrake')
  fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }))
  expect(screen.getByRole('heading', { name: /Results for/ })).toHaveTextContent('notebook')
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('notebook')
  expect(screen.getByLabelText('Demo listings')).toBeChecked()
})
