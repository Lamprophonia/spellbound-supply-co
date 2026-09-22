import { afterEach, expect, it, vi } from 'vitest'
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { useCatalog } from './useCatalog'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })
const response = () => new Response(JSON.stringify({ schemaVersion: 1, products: [], total: 0 }))

it('ignores outdated responses even when cancellation is not honored', async () => {
  let finishOld!: (response: Response) => void
  const fetchMock = vi.fn().mockImplementationOnce(() => new Promise<Response>((resolve) => { finishOld = resolve }))
    .mockResolvedValueOnce(response())
  vi.stubGlobal('fetch', fetchMock)
  const { result, rerender } = renderHook(({ url }) => useCatalog(url), { initialProps: { url: '/api/products?q=old' } })
  expect(result.current.loading).toBe(true)
  rerender({ url: '/api/products?q=new' })
  await waitFor(() => expect(result.current.data?.total).toBe(0))
  expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true)
  await act(async () => finishOld(new Response('failed', { status: 500 })))
  expect(result.current.failed).toBeUndefined()
  expect(result.current.url).toBe('/api/products?q=new')
})

it('exposes failure and permits retry', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(response()))
  const { result } = renderHook(() => useCatalog('/api/products'))
  await waitFor(() => expect(result.current.failed).toBe(true))
  expect(result.current.data).toBeUndefined()
  act(() => result.current.retry())
  await waitFor(() => expect(result.current.data?.total).toBe(0))
  expect(result.current.failed).toBeUndefined()
})
