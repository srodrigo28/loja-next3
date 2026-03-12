import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Usuario {
  id: number
  nome: string
  email: string
  telefone: string
  avatar_url: string
  papel: string
}

interface UserStore {
  user: Usuario | null
  setUser: (user: Usuario) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)