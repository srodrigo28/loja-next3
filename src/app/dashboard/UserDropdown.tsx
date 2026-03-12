'use client'

import { useUserStore } from '@/store/useUserStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function UserDropdown() {
  const router = useRouter()
  const { user, clearUser } = useUserStore()

  function handleLogout() {
    clearUser()
    router.push('/')
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer w-10 h-10 border">
          <AvatarImage src={user.avatar_url} alt={user.nome} />
          <AvatarFallback>{user.nome?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 mt-2">
        <div className="px-3 py-2 text-sm text-muted-foreground">
          Olá, <span className="font-semibold">{user.nome.split(' ')[0]}</span>
        </div>

        <DropdownMenuItem asChild>
          <Link href="/dashboard/perfil">Ver Perfil</Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600">
          Sair da Conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
