// Local: app/dashboard/_components/modal/ProductImageGallery.tsx

import React from 'react';
import Image from 'next/image';

// Props que o componente espera receber do "cérebro" (EditarProdutoModal)
interface ProductImageGalleryProps {
  activeImageUrl: string | null;
  allImages: string[];
  productName: string;
  onThumbnailClick: (imageUrl: string) => void;
}

export function ProductImageGallery({ activeImageUrl, allImages, productName, onThumbnailClick }: ProductImageGalleryProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Imagem Principal (em destaque) */}
      <div className="flex-grow w-full md:w-2/3 aspect-square md:aspect-auto rounded-lg overflow-hidden relative bg-gray-100 dark:bg-gray-800">
        {activeImageUrl ? (
          <Image
            src={activeImageUrl}
            alt={`Imagem de ${productName}`}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Sem imagem principal
          </div>
        )}
      </div>

      {/* Miniaturas (Thumbnails) */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 md:h-[300px]">
        {allImages.map((imageUrl, index) => (
          <button
            key={index}
            onClick={() => onThumbnailClick(imageUrl)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden relative 
                        transition-all duration-200
                        ${activeImageUrl === imageUrl ? 
                          'ring-2 ring-blue-500 ring-offset-2' : 
                          'opacity-70 hover:opacity-100'
                        }`}
          >
            <Image
              src={imageUrl}
              alt={`Miniatura ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}