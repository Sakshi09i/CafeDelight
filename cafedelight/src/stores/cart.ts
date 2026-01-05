import { create } from 'zustand'
import type { MenuItem } from '../data/menu'

export type CartItem = MenuItem & { quantity: number }

type CartState = {
  items: Record<string, CartItem>
  add: (item: MenuItem) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

export const useCart = create<CartState>((set) => ({
  items: {},

  add: (item) =>
    set((state) => {
      const exists = state.items[item.id]
      const quantity = exists ? exists.quantity + 1 : 1

      return {
        items: {
          ...state.items,
          [item.id]: { ...item, quantity },
        },
      }
    }),

  increment: (id) =>
    set((state) => {
      const curr = state.items[id]
      if (!curr) return { items: state.items }

      return {
        items: {
          ...state.items,
          [id]: { ...curr, quantity: curr.quantity + 1 },
        },
      }
    }),

  decrement: (id) =>
    set((state) => {
      const curr = state.items[id]
      if (!curr) return { items: state.items }

      const qty = curr.quantity - 1
      const items = { ...state.items }

      if (qty <= 0) delete items[id]
      else items[id] = { ...curr, quantity: qty }

      return { items }
    }),

  remove: (id) =>
    set((state) => {
      const items = { ...state.items }
      delete items[id]
      return { items }
    }),

  clear: () => set({ items: {} }),
}))

// =======================
// SELECTORS
// =======================

export function selectCartArray(
  items: Record<string, CartItem>
): CartItem[] {
  return Object.values(items)
}

export function selectTotal(
  items: Record<string, CartItem>
): number {
  return Object.values(items).reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )
}

// =======================
// ✅ BACKEND-SAFE MAPPER
// =======================
export function mapCartToOrderItems(items: Record<string, CartItem>) {
  return Object.values(items).map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }))
}
