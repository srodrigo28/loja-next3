// Local: app/dashboard/_components/modal/ProductEditForm.tsx

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Tipo para os dados que este formulário gerencia
type EditFormData = {
  nome: string;
  descricao: string | null;
  preco: number | null;
  ativo: boolean;
};

// Props que o componente espera receber do "cérebro" (EditarProdutoModal)
interface ProductEditFormProps {
  formData: Partial<EditFormData>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

export function ProductEditForm({ formData, onFormChange, onSwitchChange }: ProductEditFormProps) {
  return (
    <div className="grid gap-4 mt-2">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="nome" className="text-right">Nome</Label>
        <Input 
          id="nome" 
          value={formData.nome || ''} 
          onChange={onFormChange} 
          className="col-span-3" 
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="descricao" className="text-right mt-2">Descrição</Label>
        <Textarea 
          id="descricao" 
          value={formData.descricao || ''} 
          onChange={onFormChange} 
          className="col-span-3" 
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="preco" className="text-right">Preço</Label>
        <Input 
          id="preco" 
          type="number" 
          step="0.01" 
          value={formData.preco || ''} 
          onChange={onFormChange} 
          className="col-span-3" 
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="ativo" className="text-right">Ativo</Label>
        <Switch 
          id="ativo" 
          checked={!!formData.ativo} 
          onCheckedChange={onSwitchChange} 
        />
      </div>
    </div>
  );
}