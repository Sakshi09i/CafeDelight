import { create } from 'zustand'

export type Role = 'USER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: Role
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: any, token: string) => void
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

// ======================
// SAFE INITIAL LOAD
// ======================
function loadUser(): User | null {
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const useAuth = create<AuthState>((set) => {
  const storedUser = loadUser()
  const storedToken = localStorage.getItem('token')

  return {
    user: storedUser,
    token: storedToken,
    isAuthenticated: Boolean(storedUser && storedToken),

    // ======================
    // LOGIN
    // ======================
    login: (user, token) => {
      const normalizedUser: User = {
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role === 'ADMIN' ? 'ADMIN' : 'USER',
      }

      localStorage.setItem('user', JSON.stringify(normalizedUser))
      localStorage.setItem('token', token)

      set({
        user: normalizedUser,
        token,
        isAuthenticated: true,
      })
    },

    // ======================
    // LOGOUT
    // ======================
    logout: () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      })
    },

    // ======================
    // UPDATE PROFILE
    // ======================
    updateUser: (data) =>
      set((state) => {
        if (!state.user) return state

        const updatedUser = { ...state.user, ...data }
        localStorage.setItem('user', JSON.stringify(updatedUser))

        return { user: updatedUser }
      }),
  }
})
