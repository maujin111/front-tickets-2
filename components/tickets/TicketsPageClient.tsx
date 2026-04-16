"use client"

import { useState } from "react"
import { MainChat } from "@/components/chat/mainChat"
import { TicketList } from "@/components/listas/ticketList"
import { ListItem, Message, Priority, TabItems } from "@/interfaces"
import {
  getTicketById,
  getConversationByTicketId,
} from "@/app/home/soporte/tickets/actions"
import { FEDIA_CONV } from "@/prisma/generated/prisma"

type Props = {
  priorities: Priority[]
  tickets: ListItem[]
  etapas: TabItems[]
}

export function TicketsPageClient({ priorities, tickets, etapas }: Props) {
  const [selectedTicket, setSelectedTicket] = useState<FEDIA_CONV | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  const handleTicketSelect = async (ticketId: number) => {
    setLoading(true)
    try {
      const ticketResult = await getTicketById(ticketId)

      if (!ticketResult.success || !ticketResult.data) {
        console.error("Error al cargar ticket:", ticketResult.error)
        return
      }
      const conversationResult = await getConversationByTicketId(ticketId)

      if (!conversationResult.success || !conversationResult.data) {
        console.error("Error al cargar conversación:", conversationResult.error)
        return
      }

      setSelectedTicket(ticketResult.data)

      const mappedMessages = conversationResult.data.map((msg, index) => ({
        id: index + 1,
        message: msg.FEDCNV_DETA || "",
        userId: msg.SECLAV_CODI || 0,
        user: msg.SECLAV_CODI === 52 ? "Maujin" : "Soporte",
        hora: msg.FEDCNV_FECH
          ? new Date(msg.FEDCNV_FECH).toLocaleTimeString()
          : new Date().toLocaleTimeString(),
        tipo: msg.FEDCNV_TIPO?.toLocaleUpperCase() || "TXT",
      }))

      setMessages(mappedMessages)
    } catch (error) {
      console.error("Error al cargar ticket:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex gap-2">
      <MainChat
        messages={messages}
        selectedTicket={selectedTicket}
        loading={loading}
      />
      <TicketList
        priorities={priorities}
        ItemListData={tickets}
        TabsItemsData={etapas}
        onTicketSelect={handleTicketSelect}
      />
    </div>
  )
}
