// Local: src/app/(protected)/add-product/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Upload, X as XIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useApi } from "@/hooks/useApi";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type FormData = {
  nome: string;
  descricao: string;
  preco: string;
  categoria: string;
  link_afiliado: string;
  status: "disponivel" | "aguardando";
  ativo: boolean;
};

export default function AddProductPage() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    link_afiliado: "",
    status: "disponivel",
    ativo: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { fetchApi } = useApi();

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Por favor, adicione a imagem principal.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      // 1. Upload da imagem para o Supabase Storage
      const storageFilePath = `produtos/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("box")
        .upload(storageFilePath, file);
        
      if (uploadError) throw new Error("Erro ao fazer upload da imagem.");
      
      const { data: { publicUrl } } = supabase.storage.from("box").getPublicUrl(storageFilePath);
      
      // 2. Enviar dados do produto para a nossa API Flask
      const response = await fetchApi('/api/admin/produtos/', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.nome,
          description: formData.descricao || '',
          price: formData.preco ? parseFloat(formData.preco) : 0,
          stock: 100, // Ajustar depois caso crie campo de estoque
          image_url: publicUrl,
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || "Erro ao criar produto na API.");
      }

      alert("Produto cadastrado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      let errorMessage = "Ocorreu um erro desconhecido.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Erro detalhado:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full py-6 sm:py-5">
      <div className="container mx-auto max-w-3xl px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl sm:text-2xl">Cadastrar Novo Produto</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button asChild variant="ghost" size="icon">
                      <Link href="/dashboard">
                        <XIcon className="h-5 w-5 text-gray-600" />
                        <span className="sr-only">Voltar ao Dashboard</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voltar ao Dashboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Preencha os dados abaixo para adicionar um item à sua loja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">
                  Nome do Produto <span className="text-red-500">*</span>
                </Label>
                <Input id="nome" value={formData.nome} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" value={formData.descricao} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço (ex: 49.99)</Label>
                  <Input id="preco" type="number" step="0.01" value={formData.preco} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input id="categoria" value={formData.categoria} onChange={handleChange} />
                </div>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="link_afiliado">Link de Afiliado (opcional)</Label>
                <Input id="link_afiliado" value={formData.link_afiliado} onChange={handleChange} />
              </div> */}

              {/* Bloco de Status e Ativo corrigido e com responsividade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div className="space-y-2">
                  <Label>Status do Produto</Label>
                  <RadioGroup
                    value={formData.status}
                    onValueChange={(value: "disponivel" | "aguardando") =>
                      setFormData((prev) => ({ ...prev, status: value }))
                    }
                    className="flex space-x-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="disponivel" id="status-disponivel" />
                      <Label htmlFor="status-disponivel">Disponível</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aguardando" id="status-aguardando" />
                      <Label htmlFor="status-aguardando">Aguardando</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Visibilidade na Loja</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      id="ativo"
                      checked={formData.ativo}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, ativo: checked }))
                      }
                    />
                    <Label htmlFor="ativo">Produto Ativo</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Imagem Principal <span className="text-red-500">*</span>
                </Label>
                {!preview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
                    <Label htmlFor="file-upload" className="w-full cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Clique para carregar a imagem
                      </p>
                    </Label>
                    <Input id="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                  </div>
                ) : (
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 group">
                    <Image
                      width={192}
                      height={192}
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-sky-400 hover:bg-sky-500 duration-300" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar Produto"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}