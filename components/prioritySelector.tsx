"use client"
import { useState } from "react"
import { Priority } from "@/interfaces"

type PrioritySelectorProps = {
  priorities: Priority[]
}

export function PrioritySelector({ priorities }: PrioritySelectorProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-xl border p-1">
      <div
        onClick={() => setSelectedId(null)}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-200 ${
          selectedId === null
            ? "bg-gray-600 text-white shadow-sm"
            : "text-gray-500 hover:bg-white hover:shadow-sm"
        }`}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full ${selectedId === null ? "bg-white" : "bg-gray-400"}`}
        />
        <p className="text-[10px] font-bold tracking-tight uppercase">Todos</p>
      </div>

      {priorities.map((priority) => {
        const isActive = selectedId === priority.id
        return (
          <div
            key={priority.id}
            onClick={() => setSelectedId(priority.id)}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-200 ${
              isActive
                ? `${priority.color} text-white shadow-sm`
                : "text-gray-300 hover:bg-white hover:text-gray-800 hover:shadow-sm"
            }`}
          >
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                isActive ? "bg-white" : priority.color
              }`}
            />
            <p className="text-[10px] font-bold tracking-tight uppercase">
              {priority.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
