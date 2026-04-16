"use client"

import {
  Archive,
  ArrowDown01,
  ArrowUp01,
  FileText,
  Mail,
  MoreVertical,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { OrderBy } from "@/interfaces"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

type Props = {
  orderBy: OrderBy
  setOrderBy: (value: OrderBy) => void
  isDesc: boolean
  setIsDesc: (value: boolean) => void
  options: { label: string; value: OrderBy }[]
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function TicketFilters({
  orderBy,
  setOrderBy,
  isDesc,
  setIsDesc,
  options,
  searchValue,
  onSearchChange,
}: Props) {
  return (
    <div className="flex min-w-sm gap-2">
      <Input
        placeholder="Buscar"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
      />

      <Select onValueChange={(value) => setOrderBy(value as OrderBy)}>
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={() => setIsDesc(!isDesc)}>
        {isDesc ? <ArrowDown01 /> : <ArrowUp01 />}
      </Button>
    </div>
  )
}
