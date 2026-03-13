import { useUserStore } from '@/store/useUserStore'

interface ApiOptions extends RequestInit {
  requireAuth?: boolean
}

export function useApi() {
  const { user, clearUser } = useUserStore()
  
  const fetchApi = async (endpoint: string, options: ApiOptions = {}) => {
    const { requireAuth = true, ...customOptions } = options
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'
    const url = `${baseUrl}${endpoint}`
    
    const headers = new Headers(customOptions.headers)
    
    // Injeta cabeçalho JSON se houver body JSON
    if (customOptions.body && typeof customOptions.body === 'string' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
    }

    if (requireAuth) {
      if (!user?.token) {
        throw new Error('Usuário não autenticado.')
      }
      headers.set('Authorization', `Bearer ${user.token}`)
    }

    const response = await fetch(url, {
      ...customOptions,
      headers
    })

    if (response.status === 401 && requireAuth) {
      clearUser()
      window.location.href = '/login'
    }

    return response
  }

  return { fetchApi }
}
