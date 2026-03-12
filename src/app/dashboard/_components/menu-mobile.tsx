'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DialogTitle } from '@/components/ui/dialog'
import { useUserStore } from '@/store/useUserStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { user, clearUser } = useUserStore()

  function handleLogout() {
    clearUser()
    setOpen(false)
    router.push('/')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[260px] sm:w-[300px] p-5">
        <DialogTitle>Menu</DialogTitle>

        {/* Avatar + Nome do Usuário */}
        {user && (
          <div className="flex items-center gap-4 py-4 border-b">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar_url} alt={user.nome} />
              <AvatarFallback>
                {user.nome?.charAt(0) ?? 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">{user.nome}</div>
          </div>
        )}

        <div className="flex flex-col gap-6 py-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {user && (
            <>
              <Link
                href="/dashboard/perfil"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Meu perfil
              </Link>

              <Button
                variant="ghost"
                className="justify-start px-0 text-red-500 hover:text-red-600 hover:bg-transparent cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
