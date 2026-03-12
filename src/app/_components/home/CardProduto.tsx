'use client'

import { FC } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Produto } from '@/types/produto'

interface Props {
  produto: Produto
  onClick: () => void
}

const CardProduto: FC<Props> = ({ produto, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card
        className="group overflow-hidden flex flex-col h-[460px] 
        bg-white shadow-md hover:shadow-2xl w-80
        transition duration-300 ease-in-out border border-transparent 
        hover:border-blue-500"
      >
        <div className="relative h-[368px] overflow-hidden bg-gray-100">
          {produto.imagem_principal ? (
            <Image
              src={produto.imagem_principal}
              alt={produto.nome}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 font-semibold">
              Sem imagem
            </div>
          )}
        </div>

        <div className="h-[92px] px-4 flex items-center justify-center border-t bg-white">
          <h2 className="text-base font-semibold text-center text-gray-800 truncate">
            {produto.nome}
          </h2>
        </div>
      </Card>
    </div>
  )
}

export default CardProduto
