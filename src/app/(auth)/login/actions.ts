'use server'

import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/store/useUserStore'

export async function handleLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error('Erro ao fazer login: ' + error.message)
  }

  if (!data.user) {
    throw new Error('Usuário não encontrado')
  }

  const { data: usuarioDB, error: userError } = await supabase
    .from('usuarios')
    .select('*')
    .eq('user_id', data.user.id)
    .single()

  if (userError) {
    throw new Error('Erro ao buscar dados do usuário: ' + userError.message)
  }

  // Armazena os dados no Zustand
  useUserStore.getState().setUser(usuarioDB)

  return usuarioDB
}
