'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HandCoins } from 'lucide-react'
import { MobileMenu } from './menu-mobile'
import { useUserStore } from '@/store/useUserStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const { user, clearUser } = useUserStore()
  const router = useRouter()

  function handleLogout() {
    clearUser()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between w-full px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 text-sky-500 font-semibold">
          <HandCoins className="h-6 w-6" />
          <span className="text-xl font-bold">Loja Online</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || ''} alt={user.nome} />
                    <AvatarFallback>{user.nome?.charAt(0) ?? 'U'}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.nome?.split(' ')[0]}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push('/dashboard/perfil')}>
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Menu Mobile */}
        <MobileMenu />
      </div>
    </header>
  )
}