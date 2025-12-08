import { create } from 'zustand'

export type User = {
  id: string
  name: string
  email: string
}

type UserState = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUser = create<UserState>((set) => ({
  user: null,

  setUser: (user) => {
    // ✅ Do NOT store token here — already handled in Login/Register
    set({ user })
  },

  clearUser: () => {
    localStorage.removeItem('token')
    set({ user: null })
  },
}))
