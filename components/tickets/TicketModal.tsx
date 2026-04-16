"use client"

import { useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { TicketChat } from "./TicketChat"
import { useTicket } from "./hooks/useTicket"

type Props = {
  ticketId: number | null
  open: boolean
  onClose: () => void
}

export function TicketModal({ ticketId, open, onClose }: Props) {
  const { selectedTicket, messages, loading, loadTicket, clearTicket } =
    useTicket()

  useEffect(() => {
    if (open && ticketId) {
      loadTicket(ticketId)
    } else {
      clearTicket()
    }
  }, [open, ticketId])

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {selectedTicket
              ? `Ticket #${selectedTicket.FECONV_IDEN}`
              : "Cargando..."}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 h-[calc(100vh-8rem)]">
          <TicketChat
            messages={messages}
            selectedTicket={selectedTicket}
            loading={loading}
            showHeader={false}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
