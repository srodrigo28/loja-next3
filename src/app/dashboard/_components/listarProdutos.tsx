// Local: app/dashboard/_components/listarProdutos.tsx

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

import { Produto } from '@/types/produto'; 
// NOVO: Importando o modal de sucesso que criamos
import { SuccessUpdateModal } from './modal/SuccessUpdateModal';
import { EditarProdutoModal } from './modal/editarProdutoModal';

export function ListarProdutos() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados do modal de edição
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);

  // ====================================================================
  // NOVOS ESTADOS para controlar o modal de sucesso
  // ====================================================================
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Produto | null>(null);


  const { fetchApi } = useApi();

  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await fetchApi('/api/admin/produtos/');
      if (!response.ok) throw new Error('Falha ao carregar produtos');
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error("Erro ao carregar produtos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product: Produto) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (productId: string) => {
    // Nota: Como ainda não implementamos integração reversa de Storage via Flask, 
    // a imagem ficará órfã temporariamente no Supabase bucket, ou você pode
    // criar um webhook no Flask futuramente.
    try {
      const response = await fetchApi(`/api/admin/produtos/${productId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao deletar');
      }

      alert("Produto excluído com sucesso!");
      setProducts(products.filter(p => p.id !== productId));
    } catch (err: any) {
      alert("Erro ao excluir produto: " + err.message);
    }
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p className="text-red-500">Erro ao carregar produtos: {error}</p>;

  return (
    <>
      {/* Versão para desktop */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagem</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.imagem_principal ? (
                    <Image
                      src={product.imagem_principal}
                      alt={product.nome}
                      width={64}
                      height={64}
                      className="rounded-md object-cover w-16 h-16"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
                      <span className="text-xs text-gray-500">Sem Img</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.nome}</TableCell>
                <TableCell>
                  <Badge variant={product.ativo ? "default" : "destructive"}>
                    {product.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {product.preco ? `R$ ${product.preco.toFixed(2).replace('.', ',')}` : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso irá excluir permanentemente o produto {product.nome} do banco de dados.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>
                            Sim, excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão para mobile */}
      <div className="lg:hidden space-y-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              {product.imagem_principal ? (
                <Image
                  src={product.imagem_principal}
                  alt={product.nome}
                  width={80}
                  height={80}
                  className="rounded-md object-cover w-20 h-20"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-500">Sem Img</span>
                </div>
              )}
              
              <div className="flex-1">
                <CardTitle className="text-lg">{product.nome}</CardTitle>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-semibold text-sky-500">
                    {product.preco ? `R$ ${product.preco.toFixed(2).replace('.', ',')}` : 'N/A'}
                  </span>
                  <Badge variant={product.ativo ? "default" : "destructive"}>
                    {product.ativo ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" className='w-full' onClick={() => handleEditClick(product)}>
                <Edit className="h-4 w-4 mr-2" /> Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className='w-full'>
                    <Trash2 className="h-4 w-4 mr-2" /> Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                   <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso irá excluir permanentemente o produto {product.nome} do banco de dados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(product.id)}>
                      Sim, excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* ==================================================================== */}
      {/* SEÇÃO DE MODAIS ATUALIZADA                                           */}
      {/* ==================================================================== */}
      
      {/* Modal de Edição */}
      {selectedProduct && (
        <EditarProdutoModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProduct}
          onUpdateSuccess={() => {
            setIsEditModalOpen(false);       // 1. Fecha o modal de edição
            setUpdatedProduct(selectedProduct); // 2. Guarda o produto que foi atualizado
            setIsSuccessModalOpen(true);     // 3. Abre o modal de sucesso
            fetchProducts();                 // 4. Recarrega a lista
          }}
        />
      )}

      {/* NOVO: Renderização do Modal de Sucesso */}
      <SuccessUpdateModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        product={updatedProduct}
      />
    </>
  );
}