import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Star } from "lucide-react";
import Link from "next/link";

export function ProductInfo() {
  return (
    <div className="flex flex-col space-y-4 relative">
      <Link href="/" className="absolute top-2 right-2 z-10">
        <Badge variant="outline" className="bg-red-500 py-2 text-white">X</Badge>
      </Link>
      <div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive">MAIS VENDIDO</Badge>
          <Badge variant="outline">OFERTA DO DIA</Badge>
          
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          Tênis Sportivo Eltric Wase
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          (Cód. Item 156324887)
        </p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Star className="h-4 w-4 text-gray-300" />
          </div>
          <span>(321 avaliações)</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-1 hover:text-red-500">
            <Heart className="h-5 w-5" />
            <span>Favoritar</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <Share2 className="h-5 w-5" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-500 line-through">R$ 699,00</p>
        <p className="text-4xl font-bold text-red-600">R$ 499,05</p>
        <p className="text-sm text-green-600">
          no Pix com 10% de desconto
        </p>
        <p className="text-gray-700 mt-2">
          ou <span className="font-bold">R$ 2.004,50</span> em até 5x de R$ 99,81 sem juros
        </p>
      </div>
    </div>
  );
}