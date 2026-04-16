"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Usuario } from "@/lib/auth/types"
import { useRouter } from "next/navigation"

interface AuthContextType {
  usuario: Usuario | null
  isLoading: boolean
  login: (
    cedula: string,
    password: string
  ) => Promise<{
    success: boolean
    message?: string
    requiresRoleSelection?: boolean
    opciones?: Usuario[]
  }>
  selectRole: (usuario: Usuario) => Promise<{ success: boolean }>
  logout: () => Promise<void>
  checkSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/session")
      const data = await response.json()

      if (data.authenticated && data.usuario) {
        setUsuario(data.usuario)
      } else {
        setUsuario(null)
      }
    } catch (error) {
      console.error("Error verificando sesión:", error)
      setUsuario(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  const login = async (cedula: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, password }),
      })

      const data = await response.json()

      // Si requiere selección de rol
      if (data.success && data.requiresRoleSelection && data.opciones) {
        return {
          success: true,
          requiresRoleSelection: true,
          opciones: data.opciones,
        }
      }

      // Login normal
      if (data.success && data.usuario) {
        setUsuario(data.usuario)
        router.push("/home/soporte/tickets")
        return { success: true }
      }

      return {
        success: false,
        message: data.message || "Error al iniciar sesión",
      }
    } catch (error) {
      console.error("Error en login:", error)
      return { success: false, message: "Error de conexión" }
    }
  }

  const selectRole = async (usuario: Usuario) => {
    try {
      const response = await fetch("/api/auth/select-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario }),
      })

      const data = await response.json()

      if (data.success && data.usuario) {
        setUsuario(data.usuario)
        router.push("/home/soporte/tickets")
        return { success: true }
      }

      return { success: false }
    } catch (error) {
      console.error("Error en selección de rol:", error)
      return { success: false }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUsuario(null)
      router.push("/login")
    } catch (error) {
      console.error("Error en logout:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ usuario, isLoading, login, selectRole, logout, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}
