import { z } from 'zod'

export const perfilSchema = z.object({
  nome: z.string().min(3, 'Nome muito curto'),
  telefone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
})

export type FormData = z.infer<typeof perfilSchema>
