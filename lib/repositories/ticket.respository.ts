import { prisma } from "@/lib/prisma"

export const ticketsRepository = {
  getTicketsById(id: number) {
    return prisma.fEDIA_CONV.findFirst({
      where: {
        FECONV_IDEN: id,
      },
    })
  },

  getTicketsByUserId(userId: number) {
    return prisma.fEDIA_CONV.findMany({
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
  },

  getConversationByTicketId(ticketId: number) {
    return prisma.fEDIA_DCNV.findMany({
      where: {
        FECONV_IDEN: ticketId,
      },
    })
  },
}
