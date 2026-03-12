import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export function ProductActions() {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <Button size="lg" className="w-full h-12 bg-sky-400 hover:bg-sky-600 text-lg">
          Comprar
        </Button>
        <Button size="lg" variant="outline" className="w-full h-12 text-sky-500 border-sky-500 hover:bg-red-50 hover:text-red-700">
          Adicionar ao carrinho
        </Button>
      </div>

      {/* <div className="mt-6">
        <label htmlFor="cep" className="text-sm font-medium">Calcular frete e prazo</label>
        <div className="flex space-x-2 mt-1">
          <Input maxLength={9} id="cep" placeholder="Digite seu CEP" className="flex-grow" />
          <Button variant="outline">OK</Button>
        </div>
        <a href="#" className="text-xs text-blue-600 hover:underline mt-1 block">Não sei meu CEP</a>
      </div> */}

      <div className="mt-4 text-sm text-gray-600 space-y-2">
        
        {/* <div className="flex items-center">
          <Truck className="h-5 w-5 mr-2 text-green-600" />
          <span>Vendido e entregue por <span className="font-bold text-blue-600">Loja Online</span></span>
        </div> */}

        <div className="flex items-center">
          <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
          <span>Compra Garantida</span>
        </div>
      </div>
    </Card>
  );
}