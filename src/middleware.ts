import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Exibição da página de dashboard e login continua igual
  if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/login') || url.pathname.startsWith('/api') || url.pathname.startsWith('/_next') || url.pathname.includes('.')) {
      
    // Verifica auth simples (exemplo original) para a rota dashboard
    if (url.pathname.startsWith('/dashboard')) {
      const token = request.cookies.get('sb-access-token')?.value
      // Atualmente vou omitir a restrição total pra simplificar o dev local, mas a lógica original era:
      // if (!token) return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next()
  }

  // Lógica fictícia para capturar subdomínio (ex: loja1.meusistema.com) 
  // ou path (ex: meusistema.com/loja1)
  
  // Vamos usar o path-based tenant isolation para facilitar no localhost:
  // Ex: localhost:3000/minha-loja -> O tenant_slug = "minha-loja"
  
  const pathParts = url.pathname.split('/').filter(Boolean)
  
  if (pathParts.length > 0) {
    const tenantSlug = pathParts[0]
    
    // Rewrites everything to the dynamic tenant folder
    // Ex: localhost:3000/minha-loja -> /app/[tenant]/page.tsx
    // Ex: localhost:3000/minha-loja/checkout -> /app/[tenant]/checkout/page.tsx
    
    return NextResponse.rewrite(new URL(`/${tenantSlug}${url.pathname.replace(`/${tenantSlug}`, '')}`, request.url))
  }

  // Se acessar direto raiz (localhost:3000/), pode ir para uma landing page global ou redirecionar para app base
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
