"use client"

import { useEffect, useState } from "react"
import { TicketList, TicketChat, useTicket } from "@/components/tickets"
import { TicketHeader } from "@/components/tickets/TicketHeader"
import { ListItem, Priority, TabItems, OrderBy } from "@/interfaces"
import { useHeader } from "@/contexts/HeaderContext"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type Props = {
  priorities: Priority[]
  tickets: ListItem[]
  etapas: TabItems[]
  currentUserId: number
}

const filterOptions: { label: string; value: OrderBy }[] = [
  { label: "ID", value: "id" },
  { label: "Título", value: "titulo" },
  { label: "Prioridad", value: "priorityId" },
  { label: "Estado", value: "tabId" },
]

export function TicketsPageContent({
  priorities,
  tickets,
  etapas,
  currentUserId,
}: Props) {
  const { selectedTicket, messages, loading, loadTicket } = useTicket()
  const { setHeaderContent } = useHeader()
  const [orderBy, setOrderBy] = useState<OrderBy>("id")
  const [isDesc, setIsDesc] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    if (selectedTicket) {
      setHeaderContent(
        <TicketHeader
          ticket={selectedTicket}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          isDesc={isDesc}
          setIsDesc={setIsDesc}
          filterOptions={filterOptions}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      )
    } else {
      setHeaderContent(
        <div className="flex w-full max-w-md items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar tickets..." className="h-8 text-sm" />
        </div>
      )
    }
  }, [selectedTicket, setHeaderContent, orderBy, isDesc, searchValue])

  return (
    <div className="flex h-[calc(100vh-4rem)] gap-2 p-4">
      <TicketChat
        messages={messages}
        selectedTicket={selectedTicket}
        loading={loading}
        currentUserId={currentUserId}
      />
      <TicketList
        tickets={tickets}
        priorities={priorities}
        tabs={etapas}
        onSelect={loadTicket}
        showFilters={false}
      />
    </div>
  )
}
