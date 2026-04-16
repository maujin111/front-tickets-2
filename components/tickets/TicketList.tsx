"use client"

import { useState } from "react"
import { InboxIcon, Eye, Pencil, Trash2 } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemGroup } from "@/components/ui/item"
import { PrioritySelector } from "@/components/prioritySelector"
import { Action, ListItem, OrderBy, Priority, TabItems } from "@/interfaces"
import { TicketItem } from "./TicketItem"
import { TicketFilters } from "./TicketFilters"

type Props = {
  tickets: ListItem[]
  priorities: Priority[]
  tabs?: TabItems[]
  onSelect?: (id: number) => void
  actions?: Action[]
  showPrioritySelector?: boolean
  showFilters?: boolean
}

const defaultActions: Action[] = [
  { id: 1, title: "Ver", icon: Eye, action: (id) => console.log("Ver", id) },
  {
    id: 2,
    title: "Editar",
    icon: Pencil,
    action: (id) => console.log("Editar", id),
  },
  {
    id: 3,
    title: "Eliminar",
    icon: Trash2,
    action: (id) => console.log("Eliminar", id),
  },
]

export function TicketList({
  tickets,
  priorities,
  tabs = [],
  onSelect,
  actions = defaultActions,
  showPrioritySelector = true,
  showFilters = true,
}: Props) {
  const [orderBy, setOrderBy] = useState<OrderBy>("id")
  const [isDesc, setIsDesc] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null)

  const handleSelect = (id: number) => {
    if (onSelect) {
      onSelect(id)
    } else {
      console.log("Ticket seleccionado:", id)
    }
  }

  // Opciones de ordenamiento
  const orderOptions =
    tickets.length > 0
      ? Object.keys(tickets[0]).map((key) => ({
          label: key.toUpperCase(),
          value: key as OrderBy,
        }))
      : []

  // Ordenar tickets
  const sortedTickets = [...tickets].sort((a, b) => {
    const valA = a[orderBy]
    const valB = b[orderBy]

    if (valA && valB && valA < valB) return isDesc ? 1 : -1
    if (valA && valB && valA > valB) return isDesc ? -1 : 1
    return 0
  })

  // Filtrar por búsqueda y prioridad
  const filteredTickets = sortedTickets.filter((ticket) => {
    // Filtro de búsqueda
    if (searchValue) {
      const searchLower = searchValue.toLowerCase()
      const matchesSearch =
        ticket.titulo?.toLowerCase().includes(searchLower) ||
        ticket.subtitulo?.toLowerCase().includes(searchLower) ||
        ticket.id.toString().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Filtro de prioridad
    if (selectedPriority !== null) {
      return ticket.priorityId === selectedPriority
    }

    return true
  })

  const renderTickets = (ticketsToRender: ListItem[]) => (
    <ScrollArea className="h-[calc(100vh-13rem)]">
      <ItemGroup>
        {ticketsToRender.map((ticket) => (
          <TicketItem
            key={ticket.id}
            item={ticket}
            icon={InboxIcon}
            onSelect={handleSelect}
            actions={actions}
            priorities={priorities}
          />
        ))}
      </ItemGroup>
    </ScrollArea>
  )

  return (
    <div className="flex w-sm flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        {showFilters && (
          <TicketFilters
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            isDesc={isDesc}
            setIsDesc={setIsDesc}
            options={orderOptions}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        )}

        {tabs.length > 0 ? (
          <Tabs defaultValue="1">
            <ScrollArea className="h-10 w-full rounded-md bg-card">
              <TabsList variant="line">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id.toString()}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar className="" orientation="horizontal" />
            </ScrollArea>

            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id.toString()}>
                {renderTickets(
                  filteredTickets.filter((ticket) => ticket.tabId === tab.id)
                )}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          renderTickets(filteredTickets)
        )}
      </div>
      <div className="p-2">
        {showPrioritySelector && (
          <PrioritySelector
            priorities={priorities}
            selectedPriority={selectedPriority}
            onPriorityChange={setSelectedPriority}
          />
        )}
      </div>
    </div>
  )
}
