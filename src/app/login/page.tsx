'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store/useUserStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha })
      })
      
      const data = await response.json()

      if (!response.ok) {
        setErro(data.error || 'Email ou senha incorretos.')
        setLoading(false)
        return
      }

      // Salva o usuário no contexto do Zustand incluindo o Token
      setUser({
        id: data.user_id,
        nome: data.name,
        email: email,
        token: data.access_token
      })

      router.push('/dashboard')
    } catch (err) {
      setErro('Erro de conexão com a API.')
    } finally {
      setLoading(false)
    }
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Acessando...' : 'Entrar'}
        </Button>
      </motion.form>
    </div>
  )
}
