'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HandCoins } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function HeaderHome() {
  const { user, clearUser } = useUserStore()
  const router = useRouter()

  function handleLogout() {
    clearUser()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between w-full px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/" className="flex items-center gap-1 text-sky-500">
            <HandCoins className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">Loja Online</span>
          </Link>
        </div>

        {/* Navegação */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="hidden md:inline-flex">Dashboard</Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar_url} alt={user.nome} />
                      <AvatarFallback>
                        {user?.nome?.charAt(0) ?? 'U'}
                      </AvatarFallback>
                    </Avatar>
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
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="outline" className="hidden md:inline-flex">Login</Button>
              </Link>
              <Link href="/dashboard/cadastro-usuario">
                <Button className="hidden md:inline-flex">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
