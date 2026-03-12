'use client'

import { FC, useEffect } from 'react'
import { Produto } from '@/types/produto'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface Props {
  produto: Produto | null
  onClose: () => void
}

const ModalProduto: FC<Props> = ({ produto, onClose }) => {
  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!produto) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-xl overflow-hidden shadow-lg relative dark:bg-zinc-900"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botão de fechar (canto superior direito) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-zinc-800/80 rounded-full p-1 shadow hover:bg-white dark:hover:bg-zinc-800 transition"
            aria-label="Fechar"
          >
            <X className="w-5 h-5 text-zinc-700 dark:text-zinc-200" />
          </button>

          {/* Imagem principal */}
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] bg-gray-100 dark:bg-zinc-800">
            {produto.imagem_principal ? (
              <Image
                src={produto.imagem_principal}
                alt={produto.nome}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Sem imagem
              </div>
            )}
          </div>

          {/* Informações do produto */}
          <div className="p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {produto.nome}
            </h2>

            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
              {produto.descricao || 'Sem descrição disponível.'}
            </p>

            {produto.preco !== null ? (
              <p className="text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl mb-6">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
            ) : (
              <p className="text-gray-500 italic mb-6">Preço a consultar</p>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">
                Fechar
              </Button>
              <Link href="/dashboard/show" className="w-full sm:w-auto">
                <Button className="w-full">Ver Detalhes</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalProduto
