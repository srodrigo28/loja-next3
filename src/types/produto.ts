// src/types/index.ts

export type Produto = {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number | null;
  imagem_principal: string | null;
  imagens_adicionais: string[] | null;
  ativo: boolean;
};
