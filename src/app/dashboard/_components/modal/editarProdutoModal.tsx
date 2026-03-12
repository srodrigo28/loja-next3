// Local: app/dashboard/_components/modal/EditarProdutoModal.tsx

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from "@/lib/supabaseClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Produto } from '@/types/produto'; 

type EditFormData = {
  nome: string;
  descricao: string | null;
  preco: number | null;
  ativo: boolean;
}

// ATUALIZADO: A interface agora define que onUpdateSuccess recebe um 'Produto'
interface EditarProdutoModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Produto | null;
  onUpdateSuccess: (product: Produto) => void; 
}

export function EditarProdutoModal({ isOpen, onClose, product, onUpdateSuccess }: EditarProdutoModalProps) {
  const [formData, setFormData] = useState<Partial<EditFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeImageUrl, setActiveImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome,
        descricao: product.descricao,
        preco: product.preco,
        ativo: product.ativo,
      });
      setActiveImageUrl(product.imagem_principal);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdate = async () => {
    if (!product) return;
    setIsSubmitting(true);
    
    const updatedData = {
      nome: formData.nome,
      descricao: formData.descricao,
      preco: formData.preco ? parseFloat(String(formData.preco)) : null,
      ativo: formData.ativo,
    };

    const { error } = await supabase
      .from('produtos')
      .update(updatedData)
      .eq('id', product.id);

    setIsSubmitting(false);
    
    if (error) {
      alert("Erro ao atualizar o produto: " + error.message);
    } else {
      // AJUSTE FINAL: Remove o alert e avisa o componente pai passando o produto
      onUpdateSuccess(product); 
    }
  };

  let allImages: string[] = [];
  if (product) {
    if (product.imagem_principal) {
      allImages.push(product.imagem_principal);
    }
    if (product.imagens_adicionais && Array.isArray(product.imagens_adicionais)) {
      allImages = [...allImages, ...product.imagens_adicionais];
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Altere os dados e gerencie as imagens do seu produto.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-1 max-h-[75vh] md:max-h-none overflow-y-auto md:overflow-y-visible px-2 -mx-2">
          
          <div className="flex flex-col md:flex-row gap-4">
            
            <div className="flex-grow w-full md:w-2/3 aspect-square md:aspect-auto rounded-lg overflow-hidden relative bg-gray-100 dark:bg-gray-800">
              {activeImageUrl ? (
                <Image
                  src={activeImageUrl}
                  alt={`Imagem de ${product?.nome}`}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Sem imagem principal
                </div>
              )}
            </div>

            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 md:h-[300px]">
              {allImages.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageUrl(imageUrl)}
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
          
          <div className="grid gap-4 mt-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">Nome</Label>
              <Input id="nome" value={formData.nome || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="descricao" className="text-right mt-2">Descrição</Label>
              <Textarea id="descricao" value={formData.descricao || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preco" className="text-right">Preço</Label>
              <Input id="preco" type="number" step="0.01" value={formData.preco || ''} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ativo" className="text-right">Ativo</Label>
              <Switch id="ativo" checked={!!formData.ativo} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, ativo: checked }))} />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="button" onClick={handleUpdate} disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}