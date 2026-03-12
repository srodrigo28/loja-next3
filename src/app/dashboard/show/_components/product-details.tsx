import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function ProductDetails() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Detalhes do produto</h2>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-semibold">Descrição</AccordionTrigger>
          <AccordionContent className="text-base text-gray-700 leading-relaxed">
            Tecnologia de Amortecimento Cinético: Nossa espuma de entressola exclusiva não apenas absorve o impacto, mas o converte em um impulso explosivo, proporcionando mais energia e menos fadiga a cada passada.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-semibold">Ficha Técnica</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex justify-between"><span className="font-medium">Marca:</span><span>Sportivo</span></li>
              <li className="flex justify-between bg-gray-50 p-2 rounded"><span className="font-medium">Modelo</span><span>Eltric Wase</span></li>
              <li className="flex justify-between"><span className="font-medium">Ano Lançamento:</span><span>2024</span></li>
              {/* <li className="flex justify-between bg-gray-50 p-2 rounded"><span className="font-medium">Memória RAM</span><span>8GB</span></li> */}
              <li className="flex justify-between"><span className="font-medium">Categoria</span><span>Sport</span></li>
              {/* <li className="flex justify-between bg-gray-50 p-2 rounded"><span className="font-medium">Tela</span><span>6.7 Super Amoled</span></li> */}
              <li className="flex justify-between"><span className="font-medium">Fabricante</span><span>Treinamento Wase</span></li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}