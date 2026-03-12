'use client'

import Link from 'next/link'

const FooterHome = () => {
  return (
    <footer className="bg-white border-t mt-12 text-gray-600 text-sm py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-bold text-blue-600 mb-2">MinhaLoja</h3>
          <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contato</h4>
          <p>Email: contato@minhaloja.com</p>
          <p>WhatsApp: (69) 99999-9999</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Links úteis</h4>
          <div className="flex flex-col">
            <Link href="/" className="text-blue-600 hover:underline">📄 1 Home</Link>
            <Link href="/login" className="text-blue-600 hover:underline">📄 2 Login</Link>
            <Link href="/dashboard" className="text-blue-600 hover:underline">📄 3 Dashboard</Link>
            <Link href="/dashboard/create" className="text-blue-600 hover:underline">📄 4 Criar Produto</Link>
            <Link href="/dashboard/show" className="text-blue-600 hover:underline">📄 5 Detalhes</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterHome
