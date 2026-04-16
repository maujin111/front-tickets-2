"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Message } from "@/interfaces"
import { useSocket } from "@/contexts/SocketContext"

type Props = {
  messages?: Message[]
  selectedTicket?: any
  loading?: boolean
  readOnly?: boolean
  currentUserId?: number
}

export function TicketChat({
  messages: externalMessages = [],
  selectedTicket,
  loading = false,
  readOnly = false,
  currentUserId = 1,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(externalMessages)
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const { setCurrentTicketId } = useSocket()

  useEffect(() => {
    setMessages(externalMessages)
  }, [externalMessages])

  // Notificar cuando cambia el ticket seleccionado
  useEffect(() => {
    if (selectedTicket?.FECONV_IDEN) {
      setCurrentTicketId(selectedTicket.FECONV_IDEN)
    } else {
      setCurrentTicketId(null)
    }

    return () => {
      setCurrentTicketId(null)
    }
  }, [selectedTicket, setCurrentTicketId])

  const sendMessage = () => {
    if (!text.trim() || readOnly) return

    const newMessage: Message = {
      id: messages.length + 1,
      message: text,
      userId: currentUserId,
      user: "Yo",
      hora: new Date().toLocaleTimeString(),
      tipo: "TXT",
    }

    setMessages([...messages, newMessage])
    setText("")
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-full w-full flex-col rounded-md bg-card">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Cargando conversación...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              {selectedTicket
                ? "No hay mensajes en esta conversación"
                : "Selecciona un ticket para ver la conversación"}
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => {
              const isMe = msg.userId === currentUserId

              return (
                <div
                  key={msg.id}
                  className={`flex w-full ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-xl p-3 text-sm shadow-md ${
                      isMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="mb-1 text-xs opacity-70">
                      {isMe ? "Yo" : msg.user} • {msg.hora}
                    </div>

                    {msg.tipo === "TXT" ? (
                      <p>{msg.message}</p>
                    ) : (
                      <img
                        src={msg.message}
                        alt="img"
                        className="max-h-40 rounded-md"
                      />
                    )}
                  </div>
                </div>
              )
            })}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {!readOnly && (
        <div className="flex gap-2 border-t bg-muted/20 p-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      )}
    </div>
  )
}
