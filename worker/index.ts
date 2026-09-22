import { products } from '../src/data/products'
import { departmentIds } from '../src/domain/catalog'
import { filterProducts } from '../src/domain/search'

const allow = 'GET, HEAD, OPTIONS'
function json(request: Request, body: unknown, status = 200, extra = {}) {
  return new Response(request.method === 'HEAD' ? null : JSON.stringify(body), {
    status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  })
}
export function handleCatalogRequest(request: Request): Response {
  const url = new URL(request.url)
  if (url.pathname !== '/api/products') return json(request, { error: { code: 'NOT_FOUND', message: 'Unknown API endpoint.' } }, 404)
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { Allow: allow } })
  if (!['GET', 'HEAD'].includes(request.method)) return json(request, { error: { code: 'METHOD_NOT_ALLOWED', message: `Supported methods: ${allow}.` } }, 405, { Allow: allow })
  const invalid = (parameter: string) => json(request, {
    error: { code: 'INVALID_QUERY_PARAMETER', parameter, message: `Invalid query parameter: ${parameter}.` },
  }, 400)
  const seen = new Set<string>()
  for (const name of url.searchParams.keys()) {
    if (!['q', 'departmentId', 'status'].includes(name) || seen.has(name)) return invalid(name)
    seen.add(name)
  }
  const departmentId = url.searchParams.get('departmentId') ?? ''
  if (departmentId && !departmentIds.some((id) => id === departmentId)) return invalid('departmentId')
  const status = url.searchParams.get('status') ?? 'canonical'
  if (status !== 'canonical' && status !== 'demo' && status !== 'all') return invalid('status')
  const matches = filterProducts(products, { query: url.searchParams.get('q') ?? '', departmentId, contentStatus: status })
  return json(request, { schemaVersion: 1, products: matches, total: matches.length })
}
export default {
  fetch(request: Request) {
    try { return handleCatalogRequest(request) }
    catch { return json(request, { error: { code: 'INTERNAL_SERVER_ERROR', message: 'Unable to load products.' } }, 500) }
  },
} satisfies ExportedHandler
