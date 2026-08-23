import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { canonicalProducts } from './src/data/canonical/products.ts'

function canonicalProductDataPlugin(): Plugin {
  return {
    name: 'canonical-product-data',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'data/products.json',
        source: `${JSON.stringify({ schemaVersion: 1, products: canonicalProducts }, null, 2)}\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), canonicalProductDataPlugin()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
