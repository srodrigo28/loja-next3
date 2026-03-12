import { ImageGallery } from "./_components/image-gallery";
import { ProductActions } from "./_components/product-actions";
import { ProductDetails } from "./_components/product-details";
import { ProductInfo } from "./_components/product-info";

export default function ProductPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* Layout principal com Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna da Galeria de Imagens (ocupa 2 espaços no grid em telas grandes) */}
            <div className="lg:col-span-2">
              <ImageGallery />
            </div>

            {/* Coluna de Informações e Ações */}
            <div className="flex flex-col space-y-6">
              <ProductInfo />
              <ProductActions />
            </div>
          </div>
        </div>

        {/* Seção de Detalhes abaixo do grid principal */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-sm">
          <ProductDetails />
        </div>
      </main>
    </div>
  );
}