"use client"

import { User, Phone, History } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { FEDIA_CONV } from "@/prisma/generated/prisma"
import { TicketFilters } from "./TicketFilters"
import { OrderBy } from "@/interfaces"

interface TicketHeaderProps {
  ticket: FEDIA_CONV
  orderBy: OrderBy
  setOrderBy: (value: OrderBy) => void
  isDesc: boolean
  setIsDesc: (value: boolean) => void
  filterOptions: { label: string; value: OrderBy }[]
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function TicketHeader({
  ticket,
  orderBy,
  setOrderBy,
  isDesc,
  setIsDesc,
  filterOptions,
  searchValue,
  onSearchChange,
}: TicketHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 text-sm">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex gap-2">
          <Badge
            variant="secondary"
            className="h-5 shrink-0 text-xs font-normal"
          >
            #{ticket.FECONV_IDEN}
          </Badge>

          <Separator orientation="vertical" className="h-4 shrink-0" />

          <span className="max-w-md flex-1 truncate font-medium">
            {ticket.FECONV_DETA}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span className="max-w-32 truncate">{ticket.FECONV_CONT}</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => console.log("Ver historial")}
          >
            <History className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-4" />
        </div>
      </div>

      <TicketFilters
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        isDesc={isDesc}
        setIsDesc={setIsDesc}
        options={filterOptions}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
    </div>
  )
}
