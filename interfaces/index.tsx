import { LucideIcon } from "lucide-react"

export interface ListItem {
  id: number
  titulo: string
  subtitulo: string
  tabId: number
  priorityId: number
}

export interface Action {
  id: number
  title: string
  icon: LucideIcon
  action: (id: number) => void
}

export interface TabItems {
  id: number
  label: string
}

export interface BasicActions {}

export type OrderBy = keyof ListItem

export interface Priority {
  id: number
  label: string
  color: string
  value: string
}
