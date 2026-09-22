import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../components/Header'
import { CartProvider } from '../state/CartContext'
import { CatalogPage } from './CatalogPage'

beforeEach(() => vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ schemaVersion: 1, products: [], total: 0 }) })))
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

it('keeps draft text when results arrive and distinguishes errors from empty results', async () => {
  let finish!: (response: Response) => void
  vi.stubGlobal('fetch', vi.fn().mockImplementationOnce(() => new Promise<Response>((resolve) => { finish = resolve }))
    .mockResolvedValueOnce(new Response(JSON.stringify({ schemaVersion: 1, products: [], total: 0 }))))
  render(<MemoryRouter initialEntries={['/catalog?q=healing']}><CartProvider><CatalogPage /></CartProvider></MemoryRouter>)
  expect(screen.getByRole('status')).toHaveTextContent('Loading catalog')
  fireEvent.change(screen.getByRole('searchbox', { name: 'Search' }), { target: { value: 'draft' } })
  await act(async () => finish(new Response('failure', { status: 500 })))
  expect(screen.getByRole('alert')).toHaveTextContent('Unable to load')
  expect(screen.queryByText('No catalog entries found')).not.toBeInTheDocument()
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('draft')
  fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
  await screen.findByText('No catalog entries found')
  expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('draft')
})

it('synchronizes sidebar filters after header navigation while preserving unsubmitted drafts', async () => {
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
  await waitFor(() => expect(screen.queryByText('Loading catalog…')).not.toBeInTheDocument())
  expect(fetch).toHaveBeenLastCalledWith('/api/products?q=notebook&status=demo', expect.anything())
  fireEvent.click(screen.getByLabelText('All listings'))
  expect(fetch).toHaveBeenCalledTimes(3)
  fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }))
  await waitFor(() => expect(fetch).toHaveBeenLastCalledWith('/api/products?q=notebook&status=all', expect.anything()))
  await waitFor(() => expect(screen.queryByText('Loading catalog…')).not.toBeInTheDocument())
})
