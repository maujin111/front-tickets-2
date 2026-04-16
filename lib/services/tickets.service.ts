import { ticketsRepository } from "../repositories/ticket.respository"

const maptoItemList = (
  tickets: Awaited<ReturnType<typeof ticketsRepository.getTicketsByUserId>>
) => {
  return tickets.map((ticket) => ({
    id: ticket.FECONV_IDEN,
    titulo: ticket.FECONV_DETA,
    subtitulo: ticket.FECONV_EMPR,
    tabId: ticket.PEETAP_IDEN,
    priorityId: ticket.FECONV_PRIO,
  }))
}
export const ticketsService = {
  async getTicketsById(id: number) {
    return ticketsRepository.getTicketsById(id)
  },

  async getTicketsByUserId(userId: number) {
    const tickets = await ticketsRepository.getTicketsByUserId(userId)
    return maptoItemList(tickets)
  },

  async getConversationByTicketId(ticketId: number) {
    return ticketsRepository.getConversationByTicketId(ticketId)
  },
}
