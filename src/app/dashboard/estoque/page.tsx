"use client"

import { useState } from "react"
import { Package, Calculator, TrendingDown, AlertCircle } from "lucide-react"

export default function CalculadoraEstoque() {
  const [estoqueAtual, setEstoqueAtual] = useState(100)
  const [vendasPorDia, setVendasPorDia] = useState(5)
  
  const diasRestantes = vendasPorDia > 0 ? Math.floor(estoqueAtual / vendasPorDia) : 0
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Calculator className="text-blue-600" />
          Calculadora de Estoque
        </h1>
        <p className="text-gray-500 mt-2">Estime a duração do seu estoque com base na sua taxa de vendas diária atual.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Painel de Controles */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Parâmetros</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estoque Atual (Qtd de Itens)
            </label>
            <div className="relative">
              <Package className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input 
                type="number" 
                value={estoqueAtual}
                onChange={(e) => setEstoqueAtual(Number(e.target.value))}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-lg"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Taxa de Vendas (Itens por dia)
            </label>
            <div className="relative">
              <TrendingDown className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input 
                type="number" 
                value={vendasPorDia}
                onChange={(e) => setVendasPorDia(Number(e.target.value))}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-lg"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Painel de Resultados */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100 flex flex-col gap-4 justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-blue-800">Previsão de Esgotamento</h2>
          
          <div className="my-4">
            <span className="text-6xl font-black text-blue-600">{diasRestantes}</span>
            <span className="text-2xl font-bold text-blue-800 ml-2">Dias</span>
          </div>
          
          <p className="text-blue-700">Seu estoque atual será suficiente para suprir a demanda pelos próximos <strong>{diasRestantes} dias</strong> contínuos.</p>
          
          {diasRestantes <= 7 && (
            <div className="mt-4 flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded-md w-full justify-center">
              <AlertCircle size={20} />
              <span className="font-semibold text-sm">Atenção: Estoque em nível crítico! Considere repor.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
