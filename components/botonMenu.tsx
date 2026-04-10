import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { EllipsisVertical } from "lucide-react"
import { Action, ListItem } from "@/interfaces"

export function BotonMenuActions({
  actions,
  item,
}: {
  actions: Action[]
  item: ListItem
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.id}
            onClick={() => action.action(item.id)}
          >
            {action.icon && <action.icon />}
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
