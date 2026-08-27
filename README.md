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

Canonical, storefront-owned information lives in `src/data/canonical`. The catalog currently contains 16 products: four in each principal department. `SSC-POT-0001`, the Common Healing Potion, remains the original reference record.

Temporary products used to exercise the storefront live in `src/data/demo`. Every demo record has `contentStatus: 'demo'`, uses a `DEMO-` stock number, and is visibly identified as noncanonical in the interface.

Undefined product information is left undefined. The application does not infer dosage rounding, availability, delivery times, reviews, or other undocumented business rules.

`npm run build` serializes the canonical TypeScript source to `dist/data/products.json` for external QA consumers. The UI continues to import the TypeScript source directly.

## Currency and cart behavior

Prices retain an amount, denomination, and unit. Currency uses a 100-to-1 ladder: 100 Copper equals 1 Silver, 100 Silver equals 1 Gold, 100 Gold equals 1 Platinum, and 100 Platinum equals 1 Mythril. The cart converts line items to Copper internally and displays the combined total using the largest applicable denominations.

## Brand artwork

The desktop masthead uses a transparent horizontal lockup derived from the supplied heritage SSC artwork. The original parchment version is retained alongside it as a brand source. Narrow layouts use the compact SSC seal so the brand remains legible without dominating the mobile header.

## Product artwork

Products currently use four generated category-level photographs under `public/products/placeholders`. Each image is classified as `placeholder` in the product data and visibly described as representative. Product-specific and supplier-specific photography can replace these files incrementally without changing the rendering contract.

## SUT scope

The current static application is sufficient for deterministic catalog, search, routing, local-cart, currency, accessibility, and client-persistence tests. The next useful ecommerce milestone is a non-payment checkout flow with delivery details, order review, and a deterministic confirmation record.

A database, login, and permissions are intentionally deferred. They should be introduced only when the evaluation suite needs cross-session server persistence, account ownership, or role-based authorization; adding them earlier would increase operational complexity without improving the present test surface.

Deliberate defects should be introduced only after a passing baseline is tagged. Add one defect per commit or branch, give it a narrow observable effect, and retain a corresponding test that passes against the baseline and fails for the intended reason against the faulty version.

## Deployment note

`npm run build` produces the static `dist` directory served by Cloudflare Workers. `wrangler.jsonc` configures SPA fallback routing for client-side React Router routes.
