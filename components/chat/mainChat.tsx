"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const initialMessages = [
  {
    id: 1,
    message: "Hola",
    userId: 1,
    user: "Maujin",
    hora: "10:00 AM",
    tipo: "TXT",
  },
  {
    id: 2,
    message: "Hola, En que lo puedo ayudar?",
    userId: 2,
    user: "Soporte",
    hora: "10:00 AM",
    tipo: "TXT",
  },
  {
    id: 3,
    message: "Hola buen dia, tengo problemas con mi internet",
    userId: 1,
    user: "Maujin",
    hora: "10:00 AM",
    tipo: "TXT",
  },
  {
    id: 4,
    message: "Tiene alguna fotografia",
    userId: 2,
    user: "Soporte",
    hora: "10:00 AM",
    tipo: "TXT",
  },
  {
    id: 5,
    message: "Si, aqui se la envio",
    userId: 1,
    user: "Maujin",
    hora: "10:00 AM",
    tipo: "TXT",
  },
  {
    id: 6,
    message: "https://via.placeholder.com/150",
    userId: 1,
    user: "Maujin",
    hora: "10:00 AM",
    tipo: "IMG",
  },
]

const CURRENT_USER = 1

export function MainChat() {
  const [messages, setMessages] = useState(initialMessages)
  const [text, setText] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

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
      <div className="flex h-[calc(100vh-6rem)] w-full flex-col rounded-md bg-zinc-900">
        {/* LISTA DE MENSAJES */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg) => {
            const isMe = msg.userId === CURRENT_USER

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
