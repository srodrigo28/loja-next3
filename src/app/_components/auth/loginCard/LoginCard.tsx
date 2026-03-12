'use client'

import { FC, FormEventHandler } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>
  email: string
  setEmail: (email: string) => void
  senha: string
  setSenha: (senha: string) => void
  erro: string
}

const LoginCard: FC<Props> = ({ onSubmit, email, setEmail, senha, setSenha, erro }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Imagem no topo - 33% do card */}
      <div className="relative w-full h-[160px]">
        <Image
          src="https://www.moskitcrm.com/hubfs/53_Como%20Aumentar%20as%20Vendas%20Online.png"
          alt="Logo da Minha Loja"
          fill
          className="object-cover"
        />
      </div>

      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Entrar na Minha Loja
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
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

          {/* Esqueci minha senha */}
          <div className="text-right">
            <Link href="/recuperar-senha" className="text-sm text-blue-600 hover:underline">
              Esqueci minha senha
            </Link>
          </div>

          {erro && <p className="text-red-500 text-sm font-medium">{erro}</p>}

          <Button type="submit" className="w-full mt-2">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginCard
