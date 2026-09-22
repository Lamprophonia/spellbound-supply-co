import { useEffect, useState } from 'react'
import type { ProductsResponse } from '../domain/catalogApi'

type Result = { url: string; data?: ProductsResponse; failed?: boolean }
export function useCatalog(url: string) {
  const [result, setResult] = useState<Result>({ url: '' })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setResult({ url })
    async function load() {
      try {
        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error('Catalog request failed')
        const data: ProductsResponse = await response.json()
        if (data.schemaVersion !== 1 || !Array.isArray(data.products) || data.total !== data.products.length) throw new Error('Invalid catalog response')
        if (active) setResult({ url, data })
      } catch {
        if (active) setResult({ url, failed: true })
      }
    }
    void load()
    return () => { active = false; controller.abort() }
  }, [url, attempt])
  const current = result.url === url ? result : { url }
  return { ...current, loading: !current.data && !current.failed, retry: () => setAttempt((value) => value + 1) }
}
