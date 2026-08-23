import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { CartProvider } from './state/CartContext'
import '@fontsource/libre-franklin/latin-400.css'
import '@fontsource/libre-franklin/latin-500.css'
import '@fontsource/libre-franklin/latin-600.css'
import '@fontsource/libre-franklin/latin-700.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-700.css'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
