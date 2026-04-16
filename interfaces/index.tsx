import { LucideIcon } from "lucide-react"

export interface ListItem {
  id: number
  titulo: string | null
  subtitulo: string | null
  tabId: number | null
  priorityId: number | null
}

export interface Action {
  id: number
  title: string
  icon: LucideIcon
  action: (id: number) => void
}

export interface TabItems {
  id: number
  label: string | null
}

export type OrderBy = keyof ListItem

export interface Priority {
  id: number
  label: string | null
  color: string | null
  value: string | null
}

export interface Message {
  id: number
  message: string
  userId: number
  user: string
  hora: string
  tipo: string
}
