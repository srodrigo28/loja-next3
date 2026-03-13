'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [loading, setLoading] = useState(false)
  
  const router = useRouter()

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nome, email: email, password: senha })
      })
      
      const data = await response.json()

      if (!response.ok) {
        setErro(data.error || 'Erro ao realizar cadastro.')
        setLoading(false)
        return
      }

      setSucesso('Conta criada com sucesso! Redirecionando para o Login...')
      
      setTimeout(() => {
        router.push('/login')
      }, 2500)

    } catch (err) {
      setErro('Erro de conexão com o servidor. Verifique se a API Flask está rodando.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.form
        onSubmit={handleCadastro}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-sm text-center mb-2">
          <Link href="/" className="text-indigo-600 hover:underline">
            ← Voltar para a Home
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900">Crie sua Conta SaaS</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Cadastre-se para montar sua loja virtual PIX.
        </p>

        {erro && <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{erro}</p>}
        {sucesso && <p className="text-green-600 font-medium text-sm text-center bg-green-50 p-2 rounded">{sucesso}</p>}

        <Input
          type="text"
          placeholder="Seu Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Seu E-mail Profissional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Crie uma Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500" disabled={loading || !!sucesso}>
          {loading ? 'Cadastrando...' : 'Criar Conta Grátis'}
        </Button>

        <div className="text-sm text-center mt-4">
          Já tem uma conta?{' '}
          <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
            Faça login
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
