import { TicketsPageContent } from "./TicketsPageContent"
import { ticketsApi } from "@/lib/api/tickets"
import { etapasService } from "@/lib/services/etapas.service"
import { etiquetasService } from "@/lib/services/etiquetas.service"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export default async function TicketsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const priorities = await etiquetasService.getPrioridades()
  const tickets = await ticketsApi.getTicketsByUserId(session.usuario.id)
  const etapas = await etapasService.getEtapasByArea(3)

  return (
    <TicketsPageContent
      priorities={priorities}
      tickets={tickets}
      etapas={etapas}
      currentUserId={session.usuario.id}
    />
  )
}
