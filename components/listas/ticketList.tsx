"use client"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Eye, InboxIcon, Pencil, Trash2 } from "lucide-react"
import { Listas } from "./listas"
import { Action, ListItem, OrderBy, Priority, TabItems } from "@/interfaces"
import { FilterList } from "./filterList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PrioritySelector } from "../prioritySelector"

const ListIcon = InboxIcon

const Ver = (id: number) => console.log("Ver", id)
const Editar = (id: number) => console.log("Editar", id)
const Eliminar = (id: number) => console.log("Eliminar", id)

type Props = {
  priorities: Priority[]
  ItemListData: ListItem[]
  TabsItemsData: TabItems[]
  onTicketSelect?: (id: number) => void
}

const actions: Action[] = [
  { id: 1, title: "Ver", icon: Eye, action: (id) => Ver(id) },
  { id: 2, title: "Editar", icon: Pencil, action: (id) => Editar(id) },
  {
    id: 3,
    title: "Eliminar",
    icon: Trash2,
    action: (id) => Eliminar(id),
  },
]

export function TicketList({
  priorities,
  ItemListData,
  TabsItemsData,
  onTicketSelect,
}: Props) {
  const [orderBy, setOrderBy] = useState<OrderBy>("id")
  const [isDesc, setIsDesc] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null)

  const ListAction = (id: number) => {
    if (onTicketSelect) {
      onTicketSelect(id)
    } else {
      console.log("Action", id)
    }
  }

  const orderOptions = Object.keys(ItemListData[0]).map((key) => ({
    label: key.toUpperCase(),
    value: key as OrderBy,
  }))

  const sortedItems = [...ItemListData].sort((a, b) => {
    const valA = a[orderBy]
    const valB = b[orderBy]

    if (valA && valB && valA < valB) return isDesc ? 1 : -1
    if (valA && valB && valA > valB) return isDesc ? -1 : 1
    return 0
  })

  // Filtrar por prioridad
  const filteredItems =
    selectedPriority !== null
      ? sortedItems.filter((item) => item.priorityId === selectedPriority)
      : sortedItems

  return (
    <div className="flex w-sm flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <Tabs defaultValue="1">
          <ScrollArea className="h-10 w-full">
            <TabsList variant="line">
              {TabsItemsData &&
                TabsItemsData.map((i) => (
                  <TabsTrigger key={i.id} value={i.id.toString()}>
                    {" "}
                    {i.label}
                  </TabsTrigger>
                ))}
            </TabsList>
            <ScrollBar className="mt-2" orientation="horizontal" />
          </ScrollArea>
          {TabsItemsData &&
            TabsItemsData.map((i) => (
              <TabsContent key={i.id} value={i.id.toString()}>
                <Listas
                  ItemListData={filteredItems.filter(
                    (sort) => sort.tabId == i.id
                  )}
                  ListIcon={ListIcon}
                  ListAction={ListAction}
                  actions={actions}
                  priorities={priorities}
                />
              </TabsContent>
            ))}
        </Tabs>
      </div>
      <PrioritySelector
        priorities={priorities}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />
    </div>
  )
}
