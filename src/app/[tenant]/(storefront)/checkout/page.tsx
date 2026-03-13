"use client"

import { useEffect, useState } from "react"
import { QrCode, Copy, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Componente simples para gerar o Payload do PIX (Copia e Cola)
// Na vida real você usaria uma biblioteca como 'pix-payload-generator' ou a API do banco.
function generatePixPayload(chavePix: string, nomeRecebedor: string, cidade: string, valor: number) {
  // Isso é um MOCK simplificado do padrão EMV (BR Code) apenas para demonstração visual
  const valorFormatado = valor.toFixed(2).padStart(10, "0")
  const nomeLimpo = nomeRecebedor.replace(/ /g, "").substring(0, 25).toUpperCase()
  const cidadeLimpa = cidade.replace(/ /g, "").substring(0, 15).toUpperCase()
  
  return `00020126580014br.gov.bcb.pix0136${chavePix}52040000530398654${valorFormatado}5802BR59${nomeLimpo.length.toString().padStart(2, "0")}${nomeLimpo}60${cidadeLimpa.length.toString().padStart(2, "0")}${cidadeLimpa}62070503***6304ABCD`
}

export default function CheckoutPixPage({ params }: { params: { tenant: string } }) {
  const { tenant } = params
  const [pixPayload, setPixPayload] = useState("")
  const [copiado, setCopiado] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  // Mock dados do carrinho
  const valorTotalCarrinho = 299.90

  useEffect(() => {
    // 1. Busca os dados da loja pra pegar a chave PIX configurada
    // Idealmente, a rota de GET /api/lojas/<slug> retornaria os dados públicos do PIX da loja (chave, nome, cidade)
    async function fetchStorePixConfig() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/lojas/${tenant}`)
        if (!res.ok) throw new Error("Loja não encontrada")
        const lojaData = await res.json()
        
        // Mock da configuração PIX da loja (isso viria do banco de dados atrelado à lojaData)
        const mockConfigPix = {
          chave: "suporte@loja.com",
          nome: lojaData.name.substring(0, 25).toUpperCase(),
          cidade: "SAO PAULO"
        }
        
        const payload = generatePixPayload(
          mockConfigPix.chave, 
          mockConfigPix.nome, 
          mockConfigPix.cidade, 
          valorTotalCarrinho
        )
        
        setPixPayload(payload)
      } catch (err: any) {
        setError("Não foi possível carregar as informações de pagamento desta loja.")
      } finally {
        setLoading(false)
      }
    }

    fetchStorePixConfig()
  }, [tenant])

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Gerando pagamento...</div>

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg mb-6">
        <Link href={`/${tenant}`} className="text-blue-600 flex items-center gap-2 hover:underline">
          <ArrowLeft size={16} /> Voltar para a loja
        </Link>
      </div>
      
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-green-600 p-6 text-center text-white">
          <QrCode size={48} className="mx-auto mb-3" />
          <h1 className="text-2xl font-bold">Pagamento via PIX</h1>
          <p className="opacity-90 mt-1">Sua compra foi reservada. Faltam apenas alguns passos!</p>
        </div>

        <div className="p-8">
          {error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-center">{error}</div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="text-gray-500 mb-1">Valor do Pedido</div>
              <div className="text-4xl font-black text-gray-800 mb-8">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotalCarrinho)}
              </div>

               {/* Mock Visual do QR Code (Pode ser substituido por uma lib de Canvas QR Code) */}
               <div className="bg-gray-100 p-4 rounded-xl mb-6 relative group cursor-pointer" onClick={handleCopyPix}>
                 {/* Fake QRCode representation */}
                 <div className="w-48 h-48 bg-white mx-auto flex items-center justify-center p-2 border-2 border-dashed border-gray-300 rounded-lg">
                    <QrCode size={140} className="text-gray-800" />
                 </div>
                 <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium flex items-center gap-2"><Copy size={18}/> Copiar Código</span>
                 </div>
               </div>
               
               <p className="text-sm text-gray-600 text-center mb-4">
                 Abra o app do seu banco, escolha <strong>PIX Copia e Cola</strong> e cole o código abaixo:
               </p>

               <div className="w-full relative">
                 <input 
                   type="text" 
                   value={pixPayload} 
                   readOnly 
                   className="w-full bg-gray-50 border border-gray-200 text-gray-500 text-sm rounded-lg p-3 pr-12 font-mono outline-none"
                 />
                 <button 
                   onClick={handleCopyPix}
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-200 hover:bg-green-100 hover:text-green-700 text-gray-600 rounded-md transition-colors"
                   title="Copiar PIX"
                 >
                   {copiado ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                 </button>
               </div>

               {copiado && (
                 <p className="text-green-600 font-medium text-sm mt-3 animate-pulse">
                   Código PIX copiado com sucesso!
                 </p>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
