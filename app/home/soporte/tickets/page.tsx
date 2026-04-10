import { MainChat } from "@/components/chat/mainChat"
import { TicketList } from "@/components/listas/ticketList"

export default function TicketsPage() {
  return (
    <div>
      <div className="flex gap-2">
        <MainChat />
        <TicketList />
      </div>
    </div>
  )
}
