import { etapasRepository } from "../repositories/etapas.repository"

const maptoTabItem = (
  etapas: Awaited<ReturnType<typeof etapasRepository.getEtapasByArea>>
) => {
  if (!etapas) return []
  return etapas.map((etapa) => ({
    id: etapa.PEETAP_IDEN,
    label: etapa.PEETAP_NOMB,
  }))
}

export const etapasService = {
  async getEtapasByArea(id: number) {
    const etapas = await etapasRepository.getEtapasByArea(id)
    return maptoTabItem(etapas)
  },
}
