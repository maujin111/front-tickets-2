"use client"

import { ScrollArea } from "../ui/scroll-area"
import { Eye, InboxIcon, Pencil, Trash2 } from "lucide-react"
import { Listas } from "./listas"
import { Action, ListItem, OrderBy, Priority, TabItems } from "@/interfaces"
import { FilterList } from "./filterList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { PrioritySelector } from "../prioritySelector"

const ListIcon = InboxIcon

const ListAction = (id: number) => console.log("Action", id)

const Ver = (id: number) => console.log("Ver", id)
const Editar = (id: number) => console.log("Editar", id)
const Eliminar = (id: number) => console.log("Eliminar", id)

const priorities: Priority[] = [
  { id: 1, label: "Baja", color: "bg-green-500", value: "low" },
  { id: 2, label: "Media", color: "bg-yellow-500", value: "medium" },
  { id: 3, label: "Alta", color: "bg-orange-500", value: "high" },
  { id: 4, label: "Urgente", color: "bg-red-500", value: "urgent" },
]

const ItemListData: ListItem[] = [
  {
    id: 123,
    titulo: "Problema de conexión",
    subtitulo: "Empresa S.A.",
    tabId: 1,
    priorityId: 4,
  },
  {
    id: 124,
    titulo: "Error al iniciar sesión",
    subtitulo: "Juan Pérez",
    tabId: 2,
    priorityId: 3,
  },
  {
    id: 125,
    titulo: "Impresora no responde",
    subtitulo: "María Gómez",
    tabId: 3,
    priorityId: 2,
  },
  {
    id: 126,
    titulo: "Sistema lento",
    subtitulo: "Tech Corp",
    tabId: 1,
    priorityId: 1,
  },
  {
    id: 127,
    titulo: "Reinicio inesperado del equipo",
    subtitulo: "Ana López",
    tabId: 1,
    priorityId: 1,
  },
]

const TabsItemsData: TabItems[] = [
  { id: 1, label: "Pendiente" },
  { id: 2, label: "En proceso" },
  { id: 3, label: "Por actualizar" },
]

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

const orderOptions = Object.keys(ItemListData[0]).map((key) => ({
  label: key.toUpperCase(),
  value: key as OrderBy,
}))

export function TicketList() {
  const [orderBy, setOrderBy] = useState<OrderBy>("id")
  const [isDesc, setIsDesc] = useState(false)

  const sortedItems = [...ItemListData].sort((a, b) => {
    let valA = a[orderBy]
    let valB = b[orderBy]

    if (valA < valB) return isDesc ? 1 : -1
    if (valA > valB) return isDesc ? -1 : 1
    return 0
  })

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex flex-col gap-2">
        <FilterList
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          isDesc={isDesc}
          setIsDesc={setIsDesc}
          options={orderOptions}
        />
        <ScrollArea>
          <Tabs defaultValue="1">
            <TabsList variant="line">
              {TabsItemsData.map((i) => (
                <TabsTrigger value={i.id.toString()}> {i.label}</TabsTrigger>
              ))}
            </TabsList>
            {TabsItemsData.map((i) => (
              <TabsContent value={i.id.toString()}>
                <Listas
                  ItemListData={sortedItems.filter(
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
        </ScrollArea>
      </div>
      <PrioritySelector priorities={priorities} />
    </div>
  )
}
