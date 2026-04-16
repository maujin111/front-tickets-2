"use client"

import { Usuario } from "@/lib/auth/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { User, UserCog } from "lucide-react"

type Props = {
  opciones: Usuario[]
  onSelect: (usuario: Usuario) => void
  isLoading?: boolean
}

export function RoleSelectionModal({ opciones, onSelect, isLoading }: Props) {
  const cliente = opciones.find((u) => u.rol === "CLI")
  const agente = opciones.find((u) => u.rol === "AGE")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Selecciona tu rol</CardTitle>
          <CardDescription>
            Tu usuario tiene acceso a múltiples roles. Elige cómo deseas
            continuar:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {cliente && (
            <Button
              variant="outline"
              className="flex h-auto w-full items-start justify-start gap-4 p-4"
              onClick={() => onSelect(cliente)}
              disabled={isLoading}
            >
              <User className="mt-1 h-5 w-5 shrink-0" />
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold">Continuar como Cliente</span>
                <span className="text-sm text-muted-foreground">
                  {cliente.nombre}
                </span>
              </div>
            </Button>
          )}

          {agente && (
            <Button
              variant="outline"
              className="flex h-auto w-full items-start justify-start gap-4 p-4"
              onClick={() => onSelect(agente)}
              disabled={isLoading}
            >
              <UserCog className="mt-1 h-5 w-5 shrink-0" />
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold">Continuar como Agente</span>
                <span className="text-sm text-muted-foreground">
                  {agente.nombre}
                </span>
              </div>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
