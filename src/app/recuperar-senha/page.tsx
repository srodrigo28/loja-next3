'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle } from 'lucide-react'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [mensagem, setMensagem] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('idle')
    setMensagem('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/nova-senha`, // substitua se necessário
    })

    if (error) {
      setStatus('error')
      setMensagem(error.message || 'Erro ao enviar link de recuperação.')
    } else {
      setStatus('success')
      setMensagem('Enviamos um link de redefinição de senha para seu e-mail.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Recuperar Senha
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Insira seu e-mail para receber o link de redefinição.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Enviar link de recuperação
          </Button>
        </form>

        {status === 'success' && (
          <div className="flex items-center gap-2 mt-4 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            {mensagem}
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 mt-4 text-red-600 text-sm">
            <AlertTriangle className="w-4 h-4" />
            {mensagem}
          </div>
        )}
      </motion.div>
    </div>
  )
}
