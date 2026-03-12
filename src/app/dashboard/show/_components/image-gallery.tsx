'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from 'next/image';

const productImages = [
  { id: 1, src: 'https://andaraki.fbitsstatic.net/img/p/tenis-nike-feminino-air-max-nuaxis-hf-1233-101-81266/330627.jpg?w=575&h=575&v=202501231554&qs=ignore', alt: 'Produto 1' },
  { id: 2, src: 'https://cdnimg.etiquetaunica.com.br/products/webp/tenis-nike-air-max-270-go-preto-rwx40-1718819005-0000003_v2.webp', alt: 'Produto 2' },
  { id: 3, src: 'https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/evolaioe/catalog/produtos/unissex/1000/1000ptoam-1.jpeg', alt: 'Produto 3' },
];

export function ImageGallery() {
  return (
    <Card className="overflow-hidden">
      <Carousel className="w-full">
        <CarouselContent>
          {productImages.map((img) => (
            <CarouselItem key={img.id}>
              <CardContent className="flex aspect-square items-center justify-center p-0">
                <Image src={img.src} alt={img.alt} width={600} height={600} className="object-cover" />
              </CardContent>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>
    </Card>
  );
}