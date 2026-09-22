import assert from 'node:assert/strict'

const base = process.env.CATALOG_BASE_URL ?? 'http://127.0.0.1:8787'
for (const [path, method, expected] of [
  ['/api/products?q=mandrake', 'GET', 200],
  ['/api/products?status=bad', 'GET', 400],
  ['/api/products', 'POST', 405],
  ['/api/products', 'HEAD', 200],
  ['/api/products', 'OPTIONS', 204],
  ['/api/missing', 'GET', 404],
  ['/catalog?q=wand', 'GET', 200],
  ['/data/products.json', 'GET', 200],
]) {
  const response = await fetch(base + path, {
    method, headers: path.startsWith('/catalog') ? { 'Sec-Fetch-Mode': 'navigate' } : {},
  })
  assert.equal(response.status, expected, `${method} ${path}`)
  const body = await response.text()
  if (method === 'HEAD' || method === 'OPTIONS') assert.equal(body, '')
  else if (path.startsWith('/catalog')) assert.match(response.headers.get('content-type'), /text\/html/)
  else {
    assert.match(response.headers.get('content-type'), /application\/json/)
    const data = JSON.parse(body)
    if (path.includes('q=mandrake')) {
      assert.equal(data.products[0].price.amount, 12)
      assert.equal(data.total, 1)
    }
  }
  console.log(`${method} ${path}: ${response.status}`)
}
