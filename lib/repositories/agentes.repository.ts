import { prisma } from "@/lib/prisma"

export const agentesRepository = {
  async getAgentesActivosPorArea() {
    // Primero obtenemos todas las áreas que tienen agentes activos
    const areas = await prisma.pEDIA_AREA.findMany({
      select: {
        PEAREA_IDEN: true,
        PEAREA_NOMA: true,
      },
    })

    // Luego obtenemos los agentes activos agrupados por área
    const agentes = await prisma.sEDIA_CLAV.findMany({
      where: {
        SECLAV_ESTA: true, // Solo agentes activos
        PEAREA_IDEN: {
          not: null,
        },
      },
      select: {
        SECLAV_CODI: true,
        SECLAV_USUA: true,
        SECLAV_NOMB: true,
        SECLAV_APEL: true,
        PEAREA_IDEN: true,
        SECLAV_ACTI: true, // Estado de actividad en línea
      },
      orderBy: {
        SECLAV_USUA: "asc",
      },
    })

    return { areas, agentes }
  },

  async getAgentesBySoporteArea() {
    // ID del área de soporte técnico (ajustar según tu configuración)
    const AREA_SOPORTE = 3

    const agentes = await prisma.sEDIA_CLAV.findMany({
      where: {
        SECLAV_ESTA: true,
        PEAREA_IDEN: AREA_SOPORTE,
      },
      select: {
        SECLAV_CODI: true,
        SECLAV_USUA: true,
        SECLAV_NOMB: true,
        SECLAV_APEL: true,
        SECLAV_ACTI: true,
      },
      orderBy: {
        SECLAV_USUA: "asc",
      },
    })

    return agentes
  },
}
