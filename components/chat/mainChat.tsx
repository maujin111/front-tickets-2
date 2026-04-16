"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Message } from "@/interfaces"

const CURRENT_USER = 1

type Props = {
  messages?: Message[]
  selectedTicket?: any
  loading?: boolean
}

export function MainChat({
  messages: externalMessages,
  selectedTicket,
  loading,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(externalMessages || [])
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  // Actualizar mensajes cuando cambien los mensajes externos
  useEffect(() => {
    if (externalMessages) {
      setMessages(externalMessages)
    }
  }, [externalMessages])

  const sendMessage = () => {
    if (!text.trim()) return

    const newMessage = {
      id: messages.length + 1,
      message: text,
      userId: CURRENT_USER,
      user: "Maujin",
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
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-[calc(100vh-4rem)] w-full flex-col rounded-md bg-card">
        {/* LISTA DE MENSAJES */}
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
                const isMe = msg.userId == CURRENT_USER

                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-xl p-3 text-sm shadow-md ${
                        isMe ? "bg-black text-white" : "bg-gray-200 text-black"
                      }`}
                    >
                      <div className="mb-1 text-xs opacity-70">
                        {msg.user} • {msg.hora}
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

        {/* INPUT */}
        <div className="bg-zinc flex gap-2 p-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Enviar</Button>
        </div>
      </div>
    </div>
  )
}
