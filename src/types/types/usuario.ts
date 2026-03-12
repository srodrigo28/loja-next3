// src/types/usuario.ts

export type Usuario = {
  id: number
  nome: string
  email: string
  telefone: string
  avatar_url: string | null
  papel: string
  user_id: string
  created_at?: string
}
