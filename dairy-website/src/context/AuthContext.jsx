import { createContext, useContext, useState, useEffect } from 'react'
import { getMe, login as loginApi, register as registerApi, logout as logoutApi } from '../api/authApi'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    getMe()
      .then((data) => {
        if (mounted) {
          setUser(data.user || null)
        }
      })
      .catch(() => {
        if (mounted) {
          setUser(null)
        }
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  async function login(email, password) {
    const data = await loginApi(email, password)
    setUser(data.user || null)
    return data
  }

  async function register(name, email, password) {
    const data = await registerApi(name, email, password)
    setUser(data.user || null)
    return data
  }

  async function logout() {
    await logoutApi()
    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
