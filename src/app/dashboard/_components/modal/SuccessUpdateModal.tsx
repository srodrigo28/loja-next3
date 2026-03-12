// Local: app/dashboard/_components/modal/SuccessUpdateModal.tsx

"use client";

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Produto } from '@/types/produto';
import { CheckCircle2 } from 'lucide-react';

interface SuccessUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Produto | null;
}

export function SuccessUpdateModal({ isOpen, onClose, product }: SuccessUpdateModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex flex-col items-center text-center gap-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <DialogTitle className="text-xl">Produto Atualizado!</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 my-4">
          <div className="w-24 h-24 rounded-md overflow-hidden relative bg-gray-100 dark:bg-gray-800">
            {product.imagem_principal ? (
              <Image
                src={product.imagem_principal}
                alt={`Imagem de ${product.nome}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                Sem Img
              </div>
            )}
          </div>
          <p className="font-medium text-center text-gray-900 dark:text-gray-100">
            {product.nome}
          </p>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button type="button" onClick={onClose} className="w-full">
            Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}