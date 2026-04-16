import { agentesService } from "@/lib/services/agentes.service"
import { AppSidebarClient } from "./sidebar-client"

export async function AppSidebar(props: any) {
  // Obtener los agentes agrupados por área
  const agentsByArea = await agentesService.getAgentesParaSidebar()

  return <AppSidebarClient agentsByArea={agentsByArea} {...props} />
}
