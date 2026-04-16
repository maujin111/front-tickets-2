export interface Usuario {
  id: number
  nombre: string
  rol: "CLI" | "AGE"
  avanzado: boolean
  privilegios?: Privilegio[]
}

export interface Privilegio {
  SEPRIV_IDEN: number
  SEPRIV_DESC: string
}

export interface LoginResponse {
  success: boolean
  usuario?: Usuario
  message?: string
  requiresRoleSelection?: boolean
  opciones?: Usuario[]
}

export interface SessionData {
  usuario: Usuario
  expiresAt: number
}
