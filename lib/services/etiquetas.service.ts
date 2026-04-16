import { etiquetasRepository } from "../repositories/etiquetas.repository"

const maptoEtiqueta = (
  prioridades: Awaited<ReturnType<typeof etiquetasRepository.getPrioridades>>
) => {
  return prioridades.map((prioridad) => ({
    id: prioridad.PEETIQ_IDEN,
    label: prioridad.PEETIQ_NOM,
    color: prioridad.PEETIQ_COLOR,
    value: prioridad.PEETIQ_NIVE?.toString() || null,
  }))
}

export const etiquetasService = {
  async getPrioridades() {
    const prioridades = await etiquetasRepository.getPrioridades()
    return maptoEtiqueta(prioridades)
  },
}
