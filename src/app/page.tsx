'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Produto } from '@/types/produto'
import CarrosselProdutos from './_components/home/CarrosselProdutos'
import Link from 'next/link'
import { HeaderHome } from './_components/home/HeaderHome'
import FooterHome from './_components/home/FooterHome'

export default function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: false })

      if (!error) setProdutos(data || [])
      setTimeout(() => setLoading(false), 1600)
    }

    carregarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  )

  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ backgroundColor: '#ffffff', opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/loader.gif" alt="Carregando" width={120} height={120} priority />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <HeaderHome />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 mt-10 relative">
        <Input
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md mx-auto mb-6 hidden md:flex"
        />

        <CarrosselProdutos
          produtos={produtosFiltrados}
          onProdutoClick={(produto) => setProdutoSelecionado(produto)}
        />

        <AnimatePresence>
          {produtoSelecionado && (
            <motion.div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProdutoSelecionado(null)}
            >
              <motion.div
                className="bg-white w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={produtoSelecionado.imagem_principal || ''}
                    alt={produtoSelecionado.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{produtoSelecionado.nome}</h2>
                  <p className="text-gray-700 mb-4">{produtoSelecionado.descricao}</p>
                  <p className="text-blue-600 font-bold text-lg">
                    R$ {produtoSelecionado.preco?.toFixed(2)}
                  </p>
                  <div className="flex gap-2 mt-6">
                    <Button
                      className="bg-red-400 hover:bg-red-500 duration-300 transform"
                      onClick={() => setProdutoSelecionado(null)}
                    >
                      Fechar
                    </Button>
                    <Link href="/dashboard/show">
                      <Button className="bg-sky-400 hover:bg-sky-500 duration-300 transform">
                        Detalhes
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FooterHome />
    </div>
  )
}
