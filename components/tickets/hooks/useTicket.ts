import { useState } from "react"
import { Message } from "@/interfaces"
import {
  getTicketById,
  getConversationByTicketId,
} from "@/app/home/soporte/tickets/actions"

export function useTicket() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTicket = async (ticketId: number) => {
    setLoading(true)
    setError(null)

    try {
      const ticketResult = await getTicketById(ticketId)

      if (!ticketResult.success || !ticketResult.data) {
        setError(ticketResult.error || "Error al cargar ticket")
        return
      }

      const conversationResult = await getConversationByTicketId(ticketId)

      if (!conversationResult.success || !conversationResult.data) {
        setError(conversationResult.error || "Error al cargar conversación")
        return
      }

      setSelectedTicket(ticketResult.data)

      // Ordenar mensajes por fecha
      const sortedConversation = [...conversationResult.data].sort((a, b) => {
        const dateA = a.FEDCNV_FECH ? new Date(a.FEDCNV_FECH).getTime() : 0
        const dateB = b.FEDCNV_FECH ? new Date(b.FEDCNV_FECH).getTime() : 0
        return dateA - dateB
      })

      const mappedMessages: Message[] = sortedConversation.map(
        (msg, index) => ({
          id: index + 1,
          message: msg.FEDCNV_DETA || "",
          userId: msg.SECLAV_CODI || 0,
          user: msg.SECLAV_CODI ? `Usuario ${msg.SECLAV_CODI}` : "Usuario",
          hora: msg.FEDCNV_FECH
            ? new Date(msg.FEDCNV_FECH).toLocaleTimeString()
            : new Date().toLocaleTimeString(),
          tipo: msg.FEDCNV_TIPO || "TXT",
        })
      )

      setMessages(mappedMessages)
    } catch (err) {
      console.error("Error al cargar ticket:", err)
      setError("Error al cargar el ticket")
    } finally {
      setLoading(false)
    }
  }

  const clearTicket = () => {
    setSelectedTicket(null)
    setMessages([])
    setError(null)
  }

  return {
    selectedTicket,
    messages,
    loading,
    error,
    loadTicket,
    clearTicket,
  }
}
