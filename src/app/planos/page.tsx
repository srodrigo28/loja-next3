import Link from "next/link"
import { Check, Store, ArrowLeft } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen py-10 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Navbar simples */}
        <div className="flex items-center justify-between pb-8 border-b border-gray-100 mb-16">
          <Link href="/" className="flex items-center justify-center gap-2">
             <Store className="h-6 w-6 text-indigo-600" />
             <span className="font-bold text-lg text-gray-900 tracking-tight">LojaNext SaaS</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1">
             <ArrowLeft size={16}/> Voltar para a Home
          </Link>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Planos & Preços</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Escolha o formato ideal para o seu negócio
          </p>
        </div>
        
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 mb-16">
          Comece totalmente grátis ou acelere suas vendas com as ferramentas avançadas e automações para lojistas profissionais.
        </p>
        
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-8 xl:gap-x-12 px-4 xl:px-20">
          
          {/* PLANO FREE */}
          <div className="rounded-3xl p-8 ring-1 ring-gray-200 hover:shadow-lg transition-shadow bg-gray-50/50">
            <h3 id="tier-freelancer" className="text-xl font-bold leading-8 text-gray-900">
              Plano Free
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Perfeito para testar a ferramenta e realizar as primeiras vendas gratuitas na sua cidade local.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">R$ 0</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/mês</span>
            </p>
            <Link
              href="/signup?plan=free"
              className="mt-6 block rounded-md bg-white hover:bg-gray-50 border border-indigo-200 px-3 py-2.5 text-center text-sm font-semibold text-indigo-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 transition"
            >
              Criar Loja Grátis
            </Link>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Limite de até 20 Produtos cadastrados
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Subdomínio URL prático (seudominio.loja.com)
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Vitrine pública simples e carrinho
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Recepção via PIX (QR Code manual via Copia/Cola sem taxa)
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Suporte via comunidade
              </li>
            </ul>
          </div>

          {/* PLANO PRO */}
          <div className="rounded-3xl p-8 ring-2 ring-indigo-600 shadow-xl bg-white relative">
            <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  Mais Popular
                </span>
            </div>
            
            <h3 id="tier-startup" className="text-xl font-bold leading-8 text-indigo-600">
              Plano Pro
            </h3>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Um estúdio completo para escalabilidade de vendas e controle de suprimento.
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight text-gray-900">R$ 49,90</span>
              <span className="text-sm font-semibold leading-6 text-gray-600">/mês</span>
            </p>
            <Link
              href="/signup?plan=pro"
              className="mt-6 block rounded-md bg-indigo-600 hover:bg-indigo-500 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 transition"
            >
              Adquirir Plano Pro
            </Link>
            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
              <li className="flex gap-x-3 font-semibold text-gray-900">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Tudo do Free, mais:
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                <strong>Cadastro Ilimitado de Produtos</strong>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                <strong>Calculadora de Controle de Estoque Avançado</strong> - Saiba quando seu produto vai esgotar antes mesmo da escassez real.
              </li>
              <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                <strong>Plano de Vendas e Calculadora Financeira</strong> - Preveja o GMV total recebido por PIX.
              </li>
               <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Análise com gráficos em tempo real no Dashboard
              </li>
               <li className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                Suporte Prioritário Whatsapp
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
