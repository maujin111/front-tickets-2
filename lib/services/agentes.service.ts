import { agentesRepository } from "../repositories/agentes.repository"

export const agentesService = {
  async getAgentesActivosPorArea() {
    const { areas, agentes } =
      await agentesRepository.getAgentesActivosPorArea()

    // Agrupar agentes por área
    return areas
      .map((area) => ({
        id: area.PEAREA_IDEN,
        nombre: area.PEAREA_NOMA,
        agentes: agentes
          .filter((agente) => agente.PEAREA_IDEN === area.PEAREA_IDEN)
          .map((agente) => ({
            id: agente.SECLAV_CODI,
            usuario: agente.SECLAV_USUA,
            nombre: agente.SECLAV_NOMB,
            apellido: agente.SECLAV_APEL,
            activo: agente.SECLAV_ACTI || false,
          })),
      }))
      .filter((area) => area.agentes.length > 0) // Solo áreas con agentes
  },

  async getAgentesParaSidebar() {
    const { areas, agentes } =
      await agentesRepository.getAgentesActivosPorArea()

    // Crear estructura para el sidebar
    const agentesPorArea = areas
      .map((area) => {
        const agentesArea = agentes
          .filter((agente) => agente.PEAREA_IDEN === area.PEAREA_IDEN)
          .map((agente) => ({
            title:
              agente.SECLAV_CODI === 0
                ? "Bandeja de Entrada"
                : agente.SECLAV_USUA ||
                  `${agente.SECLAV_NOMB} ${agente.SECLAV_APEL}`.trim(),
            url: `/home/soporte/tickets?agente=${agente.SECLAV_CODI}`,
            isActive: agente.SECLAV_ACTI || false,
          }))

        if (agentesArea.length === 0) return null

        return {
          title: area.PEAREA_NOMA || "Sin área",
          url: "#",
          items: agentesArea,
        }
      })
      .filter((area): area is NonNullable<typeof area> => area !== null)

    return agentesPorArea
  },
}
