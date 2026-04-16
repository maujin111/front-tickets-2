"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { getSocket, disconnectSocket } from "@/lib/socket"
import { useAuth } from "./AuthContext"
import { toast } from "sonner"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  currentTicketId: number | null
  setCurrentTicketId: (ticketId: number | null) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { usuario } = useAuth()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [currentTicketId, setCurrentTicketId] = useState<number | null>(null)

  useEffect(() => {
    if (!usuario) {
      // Si no hay usuario, desconectar socket
      if (socket) {
        disconnectSocket()
        setSocket(null)
        setIsConnected(false)
      }
      return
    }

    const initSocket = async () => {
      try {
        // Obtener el token de la sesión
        const response = await fetch("/api/auth/session")
        const data = await response.json()

        if (data.authenticated && data.token) {
          const newSocket = getSocket(data.token)

          newSocket.on("connect", () => {
            console.log("Socket conectado")
            setIsConnected(true)
          })

          newSocket.on("disconnect", () => {
            console.log("Socket desconectado")
            setIsConnected(false)
          })

          // Escuchar eventos de mensajes nuevos
          newSocket.on("mensaje", (data: string) => {
            const mensaje = JSON.parse(data)
            console.log("Nuevo mensaje recibido:", mensaje)

            // Solo notificar si NO estamos viendo ese ticket
            if (mensaje.FECONV_IDEN !== currentTicketId) {
              toast.info(`Nuevo mensaje en ticket #${mensaje.FECONV_IDEN}`, {
                description:
                  mensaje.FEDCNV_DETA?.substring(0, 50) ||
                  "Has recibido un nuevo mensaje",
                duration: 5000,
              })
            }
          })

          // Escuchar asignaciones
          newSocket.on("asignacion", (data: string) => {
            const asignacion = JSON.parse(data)
            console.log("Nueva asignación:", asignacion)

            if (asignacion.tipo === 1 && usuario.rol === "AGE") {
              toast.success("Nuevo ticket asignado", {
                description: `Se te ha asignado el ticket #${asignacion.FECONV_IDEN}`,
                duration: 5000,
              })
            }
          })

          // Escuchar cierre de tickets
          newSocket.on("cerrar-ticket", (data: string) => {
            const ticket = JSON.parse(data)
            console.log("Ticket cerrado:", ticket)

            toast.info(`Ticket #${ticket.FECONV_IDEN} cerrado`, {
              duration: 3000,
            })
          })

          setSocket(newSocket)
        }
      } catch (error) {
        console.error("Error al inicializar socket:", error)
      }
    }

    initSocket()

    return () => {
      if (socket) {
        socket.off("connect")
        socket.off("disconnect")
        socket.off("mensaje")
        socket.off("asignacion")
        socket.off("cerrar-ticket")
      }
    }
  }, [usuario])

  // Actualizar el listener cuando cambia el ticket actual
  useEffect(() => {
    if (!socket) return

    // Re-registrar el listener con el nuevo currentTicketId
    socket.off("mensaje")
    socket.on("mensaje", (data: string) => {
      const mensaje = JSON.parse(data)
      console.log("Nuevo mensaje recibido:", mensaje)

      // Solo notificar si NO estamos viendo ese ticket
      if (mensaje.FECONV_IDEN !== currentTicketId) {
        toast.info(`Nuevo mensaje en ticket #${mensaje.FECONV_IDEN}`, {
          description:
            mensaje.FEDCNV_DETA?.substring(0, 50) ||
            "Has recibido un nuevo mensaje",
          duration: 5000,
        })
      }
    })
  }, [currentTicketId, socket])

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, currentTicketId, setCurrentTicketId }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error("useSocket debe usarse dentro de un SocketProvider")
  }
  return context
}
