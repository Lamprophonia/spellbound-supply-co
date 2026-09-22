# Catalog API v1

Status: implemented; deployment follows the repository's main-branch GitHub integration.

Implementation handoff: [QA task #14](https://github.com/Lamprophonia/spellbound-supply-playwright/issues/14), milestone 12 — API testing fundamentals. This task tracks coverage and CI work in the separate QA repository. Do not close it from the SUT change or use an auto-closing commit/PR reference.

## Compatibility decisions

Preserving existing observable search behavior takes precedence over the earlier proposal:

- Search joins SKU, name, shortDescription, then `Object.values(facts)` in authored property order with single spaces, skipping falsy values. Both the joined text and trimmed query use `toLocaleLowerCase()`. Substrings may cross field boundaries. For example, `SSC-POT-0001 Common` matches the healing potion. The proposed independent-field matching would remove this existing match.
- Sorting retains ascending `sku.localeCompare()` order. The proposed code-unit ordering and locale-independent lowercasing could change non-ASCII case/order behavior. Runtime locale defaults therefore still apply.
- All existing facts values remain searchable; new facts values are automatically included, as before. The proposed frozen search-field list is not imposed.

## Endpoint and parameters

`GET /api/products` is public and read-only. Decode using URLSearchParams semantics; names are case-sensitive. Combine filters with AND; return all matching records, no pagination.

| Parameter | Rules |
| --- | --- |
| q | Optional; trim surrounding whitespace and search as described above. Omitted, empty, whitespace-only = unrestricted. No tokenization, fuzzy search, or accent folding. |
| departmentId | Exact case-sensitive ID; omission or empty = unrestricted. No trimming; unknown nonempty values, including whitespace, return 400. |
| status | Omission defaults to canonical. Exact values canonical, demo, all. Empty/whitespace/other values return 400. all includes both kinds of record. |

Valid departments: `potions-elixirs`, `scrolls-tomes`, `wands-staves`, `ingredients-reagents`.

Reject unknown names (including page/limit) and duplicate parameters, even identical duplicates. Validation order: scan URL entries in order for unknown names/repeated occurrences; then validate departmentId; then status. Return the first error.

Searchable top-level values: sku, name, shortDescription. Current searchable facts keys (all optional string values): category, volatility, supplier, format, author, edition, binding, extent, language, material, core, dimensions, finish, attunement, grade, origin, packageSize, storage, shelfLife, recommendedUsage, dosage, onset, primaryEffects, notRecommendedFor, secondaryEffects, sideEffects, minimumUserAge, minimumUserWeight. Missing facts are skipped. Slug, price, image, handling, departmentId and contentStatus are not searched.

## Response schema

Success: HTTP 200, `Content-Type: application/json; charset=utf-8`, `Cache-Control: no-store`.

```ts
interface ProductsResponse {
  schemaVersion: 1
  products: Product[]
  total: number // exactly products.length
}
interface Product {
  sku: string
  slug: string
  name: string
  departmentId: 'potions-elixirs' | 'scrolls-tomes' | 'wands-staves' | 'ingredients-reagents'
  contentStatus: 'canonical' | 'demo'
  shortDescription: string
  price: {
    amount: number
    denomination: 'Copper' | 'Silver' | 'Gold' | 'Platinum' | 'Mythril'
    unit: string
  }
  image: { src: string; alt: string; status: 'placeholder' | 'final' }
  facts?: ProductFacts // optional string properties listed above
  handling?: { title: string; notes: string[]; disclaimer?: string }
}
```

image.src is site-root-relative. Optional properties are omitted rather than null. Property order is not contractual (although authored facts order participates in legacy search). No currency conversion: prices retain their canonical amount, denomination and unit. Mandrake SSC-REA-0018 remains 12 Copper/packet; its separate intentional cart override stays at 13. The API never imports cart pricing.

No matches: HTTP 200 with `{"schemaVersion":1,"products":[],"total":0}`.

Complete example: `GET /api/products?q=SSC-POT-0001`

```json
{
  "schemaVersion": 1,
  "products": [{
    "sku": "SSC-POT-0001",
    "slug": "common-healing-potion",
    "name": "Common Healing Potion",
    "departmentId": "potions-elixirs",
    "contentStatus": "canonical",
    "shortDescription": "A standardized vitality potion for minor injuries, ailments, or common sicknesses.",
    "price": { "amount": 5, "denomination": "Copper", "unit": "ounce" },
    "image": {
      "src": "/products/placeholders/potions-elixirs-v1.jpg",
      "alt": "Representative amber potion bottle sealed with burgundy wax on an apothecary table",
      "status": "placeholder"
    },
    "facts": {
      "category": "Vitality potion",
      "volatility": "None",
      "supplier": "Bramblewick Bottling & Alchemical Works",
      "recommendedUsage": "Consume all at once",
      "dosage": "1 oz per 50 lbs",
      "onset": "Immediate",
      "primaryEffects": "Heal minor injuries, ailments, or common sicknesses",
      "notRecommendedFor": "Major wounds, missing limbs, curses, magical ailments, or major infections",
      "secondaryEffects": "None",
      "sideEffects": "May include randomly colored urine for several days",
      "minimumUserAge": "None",
      "minimumUserWeight": "50 lbs"
    },
    "handling": {
      "title": "Bottled preparation handling",
      "notes": [
        "Bottle securely stoppered and wax sealed",
        "Cushioned upright in a rigid shipping container",
        "Tamper seal inspected before dispatch",
        "Standard courier permitted unless otherwise marked"
      ],
      "disclaimer": "Inspect the seal and label before use. Do not consume merchandise damaged in transit."
    }
  }],
  "total": 1
}
```

## Errors and methods

400: `{"error":{"code":"INVALID_QUERY_PARAMETER","parameter":"status","message":"..."}}`.
code and decoded parameter name are stable; message wording is not.

GET validates and returns JSON. HEAD performs the same validation and returns GET status/headers with no body, even for errors. OPTIONS returns 204, no body, `Allow: GET, HEAD, OPTIONS`; ignores query parameters.

Other methods return 405 with `Allow: GET, HEAD, OPTIONS` and `{"error":{"code":"METHOD_NOT_ALLOWED","message":"..."}}`; method validation precedes query validation.

Unexpected errors: 500 with `{"error":{"code":"INTERNAL_SERVER_ERROR","message":"..."}}`. Unknown API paths, including /api/products/, return 404 with `{"error":{"code":"NOT_FOUND","message":"..."}}` before method/query validation. HEAD always omits the body.

JSON errors have the same content type and no-store header as success. No CORS headers are added; website calls are same-origin and external Playwright HTTP clients do not require CORS.

## UI behavior and scope

Catalog/department results use this API on applied URL changes. Department routes pass departmentId. Draft edits do not fetch until submission; status=all is serialized explicitly (fixing an existing omission that incorrectly applied canonical). The issue #12 keyed form resets only with URL/department changes, not request completion. Loading is announced, errors offer retry and are not represented as empty results, and canceled/outdated requests cannot replace newer state.

Home, product details, and cart continue using bundled records in this milestone. /data/products.json remains a build-generated canonical-only snapshot. Canonical TypeScript is still the only authored canonical product source. No DB, accounts, write endpoints, or new dependencies.

## Local operation and deployment

Run `npm run build` first to populate dist. Run `npm run dev:api` in one terminal, then `npm run dev` in another. Open Vite's printed URL (normally http://localhost:5173). /api is proxied to http://127.0.0.1:8787. Direct API example: http://127.0.0.1:8787/api/products?q=mandrake. For the built website and API together, use http://127.0.0.1:8787 after building. `npm run preview` also proxies /api to the same local Worker.

`npm run types:worker` regenerates checked-in Worker types after config changes. `npm test` runs handler and UI implementation tests; `npm run build` checks application/config/Worker TypeScript and builds static assets. Wrangler bundles Worker code separately.

With the local server running, `node scripts/smoke-catalog.mjs` verifies actual API HTTP responses, SPA fallback and the generated data snapshot. Set CATALOG_BASE_URL to the Vite URL to exercise its proxy instead. Generated worker/worker-configuration.d.ts is development-only and is not shipped to the browser.

Vite development also proxies /data/products.json to the local Worker, since that snapshot is generated by the production build. Rebuild after catalog edits to refresh that snapshot; Worker API source changes reload automatically.

Deployment uses the existing `npm run build` and `npx wrangler deploy` GitHub integration. wrangler.jsonc now supplies main and routes /api/* through the Worker ahead of SPA fallback. No database provisioning, secrets, or additional bindings. API requests invoke Worker code and consume the account's Worker request allowance.

References: https://developers.cloudflare.com/workers/static-assets/routing/worker-script/ and https://developers.cloudflare.com/workers/languages/typescript/#generate-types
