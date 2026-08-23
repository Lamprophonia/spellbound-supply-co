# Spellbound Supply Co.

A fictional ecommerce storefront for a long-established retailer of thaumaturgic goods. This repository is intended to serve as a System Under Test for the separate `llm-qa-playwright-evals` project.

## Run locally

```bash
npm install
npm run dev
```

Other useful commands:

```bash
npm test
npm run build
npm run preview
```

## Architecture

- React, TypeScript, and Vite provide a small static single-page application.
- React Router owns stable, readable routes for the catalog, departments, products, and cart.
- Search and record-status filters are encoded in the URL query string so a test can reproduce them directly.
- Cart state uses a small React context and persists to the browser's `localStorage` under `ssc-cart-v1`.
- Product stock numbers (`sku`) are the stable business identifiers. Slugs are used only for readable URLs.
- Semantic elements, labels, visible text, and accessible names are the preferred automation surface. The app intentionally avoids blanket `data-testid` attributes.

## Product data status

Canonical, user-approved information lives in `src/data/canonical`. At present, this contains only `SSC-POT-0001`, the Common Healing Potion.

Temporary products used to exercise the storefront live in `src/data/demo`. Every demo record has `contentStatus: 'demo'`, uses a `DEMO-` stock number, and is visibly identified as noncanonical in the interface.

Undefined product information is left undefined. The application does not infer dosage rounding, availability, delivery times, reviews, or other undocumented business rules.

## Currency and cart behavior

Prices retain an amount, denomination, and unit. Currency uses a 100-to-1 ladder: 100 Copper equals 1 Silver, 100 Silver equals 1 Gold, 100 Gold equals 1 Platinum, and 100 Platinum equals 1 Mythril. The cart converts line items to Copper internally and displays the combined total using the largest applicable denominations.

## Brand artwork

The desktop masthead uses a transparent horizontal lockup derived from the supplied heritage SSC artwork. The original parchment version is retained alongside it as a brand source. Narrow layouts use the compact SSC seal so the brand remains legible without dominating the mobile header.

## Deployment note

`npm run build` produces a static `dist` directory suitable for a static host such as Cloudflare Pages. Because client-side routing uses the browser history API, the eventual host must route unknown document requests to `index.html`. No provider-specific configuration is included yet.
