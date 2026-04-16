"use client"
import { Priority } from "@/interfaces"

type PrioritySelectorProps = {
  priorities: Priority[]
  selectedPriority: number | null
  onPriorityChange: (priorityId: number | null) => void
}

export function PrioritySelector({
  priorities,
  selectedPriority,
  onPriorityChange,
}: PrioritySelectorProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-xl border p-1">
      <div
        onClick={() => onPriorityChange(null)}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-200 ${
          selectedPriority === null
            ? "bg-gray-600 text-white shadow-sm"
            : "text-gray-500 hover:bg-white hover:shadow-sm"
        }`}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full ${
            selectedPriority === null ? "bg-white" : "bg-gray-400"
          }`}
        />
        <p className="text-[10px] font-bold tracking-tight uppercase">Todos</p>
      </div>

      {priorities.map((priority) => {
        const isActive = selectedPriority === priority.id
        return (
          <div
            key={priority.id}
            onClick={() => onPriorityChange(priority.id)}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-200 hover:shadow-sm"
            style={{
              backgroundColor: isActive
                ? priority.color || undefined
                : undefined,
              color: isActive ? "white" : undefined,
            }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: isActive
                  ? "white"
                  : priority.color || undefined,
              }}
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
