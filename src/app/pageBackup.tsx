'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/store/useAuthStore'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem_principal: string
}

export default function HomePage() {
  const { usuario } = useAuthStore()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from('produtos')
        .select('id, nome, descricao, preco, imagem_principal')
        .eq('ativo', true)
        .order('created_at', { ascending: false })

      if (!error) setProdutos(data || [])
    }

    carregarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Header fixo */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-sky-500 subpixel-antialiased">
            Minha<span className="text-gray-800">Loja</span>
          </div>

          <Input
            placeholder="Buscar produtos..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full max-w-md mx-4 md:flex hidden"
          />

          <div className="flex gap-2">
            {usuario ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Image
                  src={usuario.avatar_url}
                  alt={usuario.nome ?? ''}
                  className="w-10 h-10 rounded-full border"
                  width={40}
                  height={40}
                />
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="#">
                  <Button>Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 mt-10 relative">
        <div className="overflow-hidden relative" ref={emblaRef}>
          <div className="flex gap-3 px-1">
            {produtosFiltrados.map((produto, i) => (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 0.2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProdutoSelecionado(produto)}
                className="
                  min-w-[100%]
                  sm:min-w-[80%]
                  md:min-w-[50%]
                  lg:min-w-[33%]
                  xl:min-w-[25%]
                  transition-transform duration-300
                "
              >
                <div className="group overflow-hidden flex flex-col h-[460px] bg-white shadow-md hover:shadow-2xl w-full border border-transparent hover:border-blue-500 cursor-pointer">
                  <div className="relative h-[368px] overflow-hidden">
                    {produto.imagem_principal ? (
                      <Image
                        src={produto.imagem_principal}
                        alt={produto.nome}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <ImageOff className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="h-[92px] px-4 flex items-center justify-center border-t bg-white">
                    <h2 className="text-base font-semibold text-center text-gray-800 truncate">
                      {produto.nome}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botões de navegação responsivos */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20 hidden sm:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="bg-white/80 hover:bg-white transition-colors duration-200 rounded-full shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20 hidden sm:flex">
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="bg-white/80 hover:bg-white transition-colors duration-200 rounded-full shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Modal com responsividade */}
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
                onClick={e => e.stopPropagation()}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={produtoSelecionado.imagem_principal}
                    alt={produtoSelecionado.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{produtoSelecionado.nome}</h2>
                  <p className="text-gray-700 mb-4">{produtoSelecionado.descricao}</p>
                  <p className="text-blue-600 font-bold text-lg">R$ {produtoSelecionado.preco.toFixed(2)}</p>
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

      <footer className="bg-white border-t mt-12 text-gray-600 text-sm py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="font-bold text-blue-600 mb-2">MinhaLoja</h3>
            <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contato</h4>
            <p>Email: contato@minhaloja.com</p>
            <p>WhatsApp: (69) 99999-9999</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Links úteis</h4>
            <div className="flex flex-col">
              <Link href="/" className="text-blue-600 hover:underline">📄 1 Home</Link>
              <Link href="/login" className="text-blue-600 hover:underline">📄 2 Login</Link>
              <Link href="/dashboard" className="text-blue-600 hover:underline">📄 3 Dashboard</Link>
              <Link href="/dashboard/create" className="text-blue-600 hover:underline">📄 4 Criar Produto</Link>
              <Link href="/dashboard/show" className="text-blue-600 hover:underline">📄 5 Detalhes</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
