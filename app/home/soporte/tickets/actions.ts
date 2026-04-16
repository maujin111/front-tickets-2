"use server"

import { ticketsApi } from "@/lib/api/tickets"

export async function getTicketById(id: number) {
  try {
    const ticket = await ticketsApi.getTicketById(id)
    return { success: true, data: ticket }
  } catch (error) {
    console.error("Error al obtener ticket:", error)
    return { success: false, error: "Error al cargar el ticket" }
  }
}

export async function getConversationByTicketId(ticketId: number) {
  try {
    const conversation = await ticketsApi.getConversationByTicketId(ticketId)
    return { success: true, data: conversation }
  } catch (error) {
    console.error("Error al obtener conversación:", error)
    return { success: false, error: "Error al cargar la conversación" }
  }
}
