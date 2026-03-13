"use client"

import { useState } from "react"
import { QrCode, TrendingUp, DollarSign, Settings } from "lucide-react"

export default function ConfigPixFinanceiro() {
  const [chavePix, setChavePix] = useState("")
  const [nomeRecebedor, setNomeRecebedor] = useState("")
  const [cidade, setCidade] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  
  // Mock dados para a calculadora de Vendas PIX
  const [vendasMensais, setVendasMensais] = useState(120)
  const [ticketMedio, setTicketMedio] = useState(145.50)
  
  const gmv = vendasMensais * ticketMedio

  const handleSave = (e: any) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <QrCode className="text-green-600" />
          Financeiro e PIX Online
        </h1>
        <p className="text-gray-500 mt-2">Configure sua chave para receber pagamentos via QR Code e acompanhe seu volume de vendas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Configuração da Chave PIX */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-4 flex items-center gap-2">
            <Settings size={20} />
            Configuração da Chave PIX
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chave PIX (Telefone, CPF, E-mail ou Aleatória)
              </label>
              <input 
                type="text" 
                required
                value={chavePix}
                onChange={(e) => setChavePix(e.target.value)}
                placeholder="Ex: 11999999999"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Recebedor (Exato como no banco)
              </label>
              <input 
                type="text" 
                required
                value={nomeRecebedor}
                onChange={(e) => setNomeRecebedor(e.target.value)}
                placeholder="Ex: Joao da Silva Santos"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2 text-transform uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade (Obrigatório para o BR Code)
              </label>
              <input 
                type="text" 
                required
                value={cidade}
                maxLength={15}
                onChange={(e) => setCidade(e.target.value.toUpperCase())}
                placeholder="Ex: SAO PAULO"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
              />
              <span className="text-xs text-gray-400 mt-1 block">Sem acentos, máximo 15 caracteres.</span>
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition duration-200 mt-2"
            >
              {isSaved ? "Salvo com Sucesso!" : "Salvar Configuração"}
            </button>
          </form>
        </div>

        {/* Calculadora de Fluxo de Caixa PIX */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm border border-green-100 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-green-900 border-b border-green-200 pb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Calculadora de Vendas via PIX
          </h2>
          
          <div className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Estimativa de Vendas no Mês (Qtd)
              </label>
              <input 
                type="number" 
                value={vendasMensais}
                onChange={(e) => setVendasMensais(Number(e.target.value))}
                className="w-full rounded-md border-green-200 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
                min="0"
              />
            </div>
            
            <div>
               <label className="block text-sm font-medium text-green-800 mb-1">
                Ticket Médio Projetado (R$)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input 
                  type="number" 
                  step="0.01"
                  value={ticketMedio}
                  onChange={(e) => setTicketMedio(Number(e.target.value))}
                  className="pl-10 w-full rounded-md border-green-200 bg-white shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
                  min="0"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-auto bg-white p-5 rounded-lg border border-green-100 text-center shadow-sm">
             <p className="text-sm text-gray-500 font-medium mb-1">Volume Bruto de Vendas Projetado (GMV)</p>
             <h3 className="text-3xl font-black text-green-600">
               {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gmv)}
             </h3>
             <div className="text-xs text-green-700 bg-green-100 inline-block px-2 py-1 rounded-full mt-3 font-semibold">
               Taxa PIX: 0% - Economia total estimada!
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
