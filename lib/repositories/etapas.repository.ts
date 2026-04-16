import { prisma } from "@/lib/prisma"

export const etapasRepository = {
  getEtapasByArea(id: number) {
    return prisma.pEDIA_ETAP.findMany({
      where: {
        PEAREA_IDEN: id,
        PEETAP_ESTA: true,
      },
    })
  },
}
