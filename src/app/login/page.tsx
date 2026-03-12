'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/useUserStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (authError || !authData.user) {
      setErro('Email ou senha incorretos.')
      return
    }

    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('user_id', authData.user.id)
      .single()

    if (userError || !usuario) {
      setErro('Usuário não encontrado na base de dados.')
      return
    }

    setUser(usuario)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="text-sm text-center mb-2">
          <Link href="/" className="text-sky-600 hover:underline">
            ← Voltar para a página principal
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center">Login</h2>

        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <div className="text-sm text-right">
          <Link href="/recuperar-senha" className="text-sky-600 hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </motion.form>
    </div>
  )
}
