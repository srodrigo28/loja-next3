'use client'

import { FC, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Produto } from '@/types/produto'
import CardProduto from './CardProduto'

interface Props {
  produtos: Produto[]
  onProdutoClick: (produto: Produto) => void
}

const CarrosselProdutos: FC<Props> = ({ produtos, onProdutoClick }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1, // Desliza um item por vez
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      }),
    ]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!produtos || produtos.length === 0) return null

  return (
    <div className="overflow-hidden relative" ref={emblaRef}>
      {/* Slides com transição suave */}
      <div className="flex gap-3 px-1 transition-transform duration-500 ease-in-out">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="
              min-w-[100%]
              sm:min-w-[80%]
              md:min-w-[50%]
              lg:min-w-[33%]
              xl:min-w-[25%]
              transition-transform
            "
          >
            <CardProduto produto={produto} onClick={() => onProdutoClick(produto)} />
          </div>
        ))}
      </div>

      {/* Botões de navegação (visíveis apenas no sm+) */}
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
  )
}

export default CarrosselProdutos