import { prisma } from "@/lib/prisma"

export const etiquetasRepository = {
  getPrioridades() {
    return prisma.pEDIA_ETIQ.findMany({
      where: {
        PEETIQ_PRIO: true,
      },
      select: {
        PEETIQ_IDEN: true,
        PEETIQ_NOM: true,
        PEETIQ_COLOR: true,
        PEETIQ_NIVE: true,
      },
    })
  },
}
