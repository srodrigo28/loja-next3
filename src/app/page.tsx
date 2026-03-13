import Link from "next/link"
import { ArrowRight, ShoppingBag, Store, Zap } from "lucide-react"

export default function SaaSLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 font-sans">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Loja SaaS</span>
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900 tracking-tight">LojaNext SaaS</span>
            </Link>
          </div>
          <div className="flex gap-x-6 items-center">
            <Link href="/planos" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition">
              Planos e Preços
            </Link>
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition">
              Entrar
            </Link>
            <Link href="/planos" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition">
              Criar Loja
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Novidade: Aceite PIX na sua loja com 0% de taxa.{' '}
              <Link href="/planos" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Ver planos <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Crie sua loja virtual gratuitamente em 5 minutos
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A plataforma definitiva para lojistas escalarem suas vendas. Tenha seu próprio link, receba pagamentos via PIX e gerencie seu estoque com inteligência.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/planos"
                className="flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition transform hover:-translate-y-1"
              >
                Começar de Graça <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Venda mais rápido</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tudo o que você precisa para gerenciar sua loja
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Venda produtos digitais ou físicos. Integre facilmente seu fluxo de caixa e não pague mensalidade absurda nem comissões por venda.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Zap className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Gestão Inteligente de Estoque
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Nosso app conta com calculadoras que prevêem o dia exato em que seu estoque irá acabar, com base na sua demanda de vendas.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <ShoppingBag className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Zero Taxas via PIX
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  No checkout transparente, o pagamento cai direto na sua conta bancária PIX. Sem taxa de aprovação de 5% de intermediadores.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
