import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meu SaaS de Lojas',
  description: 'Plataforma multi-tenancy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
