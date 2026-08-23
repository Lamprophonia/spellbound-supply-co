import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import type { Product } from '../domain/catalog'

interface CartLine {
  sku: string
  quantity: number
}

interface CartState {
  lines: CartLine[]
}

type CartAction =
  | { type: 'add'; sku: string }
  | { type: 'setQuantity'; sku: string; quantity: number }
  | { type: 'remove'; sku: string }
  | { type: 'clear' }

interface CartContextValue extends CartState {
  itemCount: number
  announcement: string
  addItem: (product: Product) => void
  setQuantity: (sku: string, quantity: number) => void
  removeItem: (sku: string) => void
  clearCart: () => void
}

const STORAGE_KEY = 'ssc-cart-v1'

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((line) => line.sku === action.sku)
      if (existing) {
        return {
          lines: state.lines.map((line) =>
            line.sku === action.sku ? { ...line, quantity: line.quantity + 1 } : line,
          ),
        }
      }
      return { lines: [...state.lines, { sku: action.sku, quantity: 1 }] }
    }
    case 'setQuantity':
      if (action.quantity < 1) return { lines: state.lines.filter((line) => line.sku !== action.sku) }
      return {
        lines: state.lines.map((line) =>
          line.sku === action.sku ? { ...line, quantity: action.quantity } : line,
        ),
      }
    case 'remove':
      return { lines: state.lines.filter((line) => line.sku !== action.sku) }
    case 'clear':
      return { lines: [] }
  }
}

function readInitialState(): CartState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { lines: [] }
    const parsed = JSON.parse(stored) as CartState
    if (!Array.isArray(parsed.lines)) return { lines: [] }
    return {
      lines: parsed.lines.filter(
        (line) => typeof line.sku === 'string' && Number.isInteger(line.quantity) && line.quantity > 0,
      ),
    }
  } catch {
    return { lines: [] }
  }
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, readInitialState)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((sum, line) => sum + line.quantity, 0)
    return {
      ...state,
      itemCount,
      announcement,
      addItem(product) {
        dispatch({ type: 'add', sku: product.sku })
        setAnnouncement(`${product.name} added to cart.`)
      },
      setQuantity(sku, quantity) {
        dispatch({ type: 'setQuantity', sku, quantity })
      },
      removeItem(sku) {
        dispatch({ type: 'remove', sku })
      },
      clearCart() {
        dispatch({ type: 'clear' })
        setAnnouncement('Cart cleared.')
      },
    }
  }, [announcement, state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
