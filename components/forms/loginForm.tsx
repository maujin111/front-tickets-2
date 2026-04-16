"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { RoleSelectionModal } from "./RoleSelectionModal"
import { Usuario } from "@/lib/auth/types"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, selectRole } = useAuth()
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [roleOptions, setRoleOptions] = useState<Usuario[] | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(cedula, password)

      if (result.success && result.requiresRoleSelection && result.opciones) {
        // Mostrar modal de selección
        setRoleOptions(result.opciones)
        setIsLoading(false)
      } else if (!result.success) {
        setError(result.message || "Error al iniciar sesión")
        setIsLoading(false)
      }
      // Si success sin requiresRoleSelection, el login ya redirigió
    } catch (err) {
      setError("Error de conexión")
      setIsLoading(false)
    }
  }

  const handleRoleSelect = async (usuario: Usuario) => {
    setIsLoading(true)
    try {
      await selectRole(usuario)
      // selectRole ya maneja la redirección
    } catch (err) {
      setError("Error al seleccionar rol")
      setIsLoading(false)
      setRoleOptions(null)
    }
  }

  return (
    <>
      {roleOptions && (
        <RoleSelectionModal
          opciones={roleOptions}
          onSelect={handleRoleSelect}
          isLoading={isLoading}
        />
      )}

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Soporte Anfibius</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="cedula">Cédula o RUC</FieldLabel>
                  <Input
                    id="cedula"
                    type="text"
                    placeholder="XXXXXXXXXX"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                    disabled={isLoading}
                    className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </Field>
                {error && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}
                <Field>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
