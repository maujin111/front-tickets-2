import { prisma } from "@/lib/prisma"

// Repository + Service consolidado
export const ticketsApi = {
  // Obtener ticket por ID
  async getTicketById(id: number) {
    return prisma.fEDIA_CONV.findFirst({
      where: {
        FECONV_IDEN: id,
      },
    })
  },

  // Obtener tickets por usuario
  async getTicketsByUserId(userId: number) {
    const tickets = await prisma.fEDIA_CONV.findMany({
      where: {
        FECONV_SCCA: userId.toString(),
      },
      select: {
        FECONV_IDEN: true,
        FECONV_DETA: true,
        FECONV_EMPR: true,
        FECONV_PRIO: true,
        PEETAP_IDEN: true,
      },
    })

    // Mapear a formato ListItem
    return tickets.map((ticket) => ({
      id: ticket.FECONV_IDEN,
      titulo: ticket.FECONV_DETA,
      subtitulo: ticket.FECONV_EMPR,
      tabId: ticket.PEETAP_IDEN,
      priorityId: ticket.FECONV_PRIO,
    }))
  },

  // Obtener conversación de un ticket
  async getConversationByTicketId(ticketId: number) {
    return prisma.fEDIA_DCNV.findMany({
      where: {
        FECONV_IDEN: ticketId,
      },
    })
  },
}
