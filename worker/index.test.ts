// @vitest-environment node
import { expect, it } from 'vitest'
import worker from './index'
import { products } from '../src/data/products'
import { filterProducts } from '../src/domain/search'

const request = (query = '', method = 'GET') => worker.fetch(new Request(`http://localhost/api/products${query}`, { method }))

it('returns the complete canonical catalog and preserves authored prices', async () => {
  const response = request()
  expect(response.status).toBe(200)
  expect(response.headers.get('content-type')).toBe('application/json; charset=utf-8')
  expect(response.headers.get('cache-control')).toBe('no-store')
  const data = await response.json() as { schemaVersion: number; products: typeof products; total: number }
  expect(data.schemaVersion).toBe(1)
  expect(data.products).toEqual(products.filter((p) => p.contentStatus === 'canonical'))
  expect(data.total).toBe(data.products.length)
  expect(data.products.find((p) => p.sku === 'SSC-REA-0018')?.price.amount).toBe(12)
})

it.each(['mandrake', '  HEALING  ', '', '   ', 'SSC-POT-0001 Common', 'no-such-product'])('preserves existing search for %s', async (q) => {
  const data = await request(`?q=${encodeURIComponent(q)}&status=all`).json() as { products: typeof products }
  expect(data.products).toEqual(filterProducts(products, { query: q, contentStatus: 'all' }))
})

it('combines filters, supports demos, and returns successful empty results', async () => {
  const data = await request('?status=demo&departmentId=wands-staves&q=practice').json() as { products: typeof products; total: number }
  expect(data.products.map((p) => p.sku)).toEqual(['DEMO-WND-0001'])
  expect(data.total).toBe(1)
  expect(await request('?departmentId=potions-elixirs&status=demo').json()).toEqual({ schemaVersion: 1, products: [], total: 0 })
  expect(await request('?departmentId=&q=%20').json()).toEqual(await request().json())
})

it.each([
  ['?status=', 'status'], ['?status=ALL', 'status'], ['?status=%20', 'status'],
  ['?departmentId=bad', 'departmentId'], ['?departmentId=%20', 'departmentId'],
  ['?q=a&q=a', 'q'], ['?status=all&status=all', 'status'], ['?page=', 'page'],
  ['?status=bad&departmentId=bad', 'departmentId'], ['?status=bad&unknown=1', 'unknown'],
])('rejects invalid query %s', async (query, parameter) => {
  const response = request(query)
  expect(response.status).toBe(400)
  expect(await response.json()).toMatchObject({ error: { code: 'INVALID_QUERY_PARAMETER', parameter } })
})

it('supports HEAD and OPTIONS and rejects writes before validating filters', async () => {
  for (const query of ['', '?status=bad']) {
    const head = request(query, 'HEAD')
    expect(head.status).toBe(request(query).status)
    expect([...head.headers]).toEqual([...request(query).headers])
    expect(await head.text()).toBe('')
  }
  const options = request('?status=bad', 'OPTIONS')
  expect(options.status).toBe(204)
  expect(options.headers.get('allow')).toBe('GET, HEAD, OPTIONS')
  expect(await options.text()).toBe('')
  for (const method of ['POST', 'PUT', 'PATCH', 'DELETE']) {
    const response = request('?status=bad', method)
    expect(response.status).toBe(405)
    expect(response.headers.get('allow')).toBe('GET, HEAD, OPTIONS')
    expect(await response.json()).toMatchObject({ error: { code: 'METHOD_NOT_ALLOWED' } })
  }
  expect(worker.fetch(new Request('http://localhost/api/missing')).status).toBe(404)
})
