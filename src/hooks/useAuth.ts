import { useState, useEffect, createContext, useContext } from 'react'
import type { User } from 'firebase/auth'
import { subscribeAuth } from '@/services/authService'

interface AuthState {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthState>({ user: null, loading: true })

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, loading: true })

  useEffect(() => {
    return subscribeAuth((user) => {
      setState({ user, loading: false })
    })
  }, [])

  return state
}
