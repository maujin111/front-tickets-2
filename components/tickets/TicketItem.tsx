"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { BotonMenuActions } from "@/components/botonMenu"
import { Action, ListItem, Priority } from "@/interfaces"
import { LucideIcon } from "lucide-react"

type Props = {
  item: ListItem
  icon: LucideIcon
  onSelect: (id: number) => void
  actions?: Action[]
  priorities: Priority[]
}

export function TicketItem({
  item,
  icon: Icon,
  onSelect,
  actions = [],
  priorities,
}: Props) {
  const priority = priorities.find((p) => p.id === item.priorityId)

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Item
          variant="outline"
          className="cursor-pointer border-l-4 bg-card shadow-sm hover:border-transparent hover:bg-muted/80"
          style={{
            borderLeftColor: priority?.color || "#d1d5db",
          }}
          onClick={() => onSelect(item.id)}
        >
          <ItemMedia variant="icon">
            <Icon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              #{item.id} {item.titulo}
            </ItemTitle>
            <ItemDescription>{item.subtitulo}</ItemDescription>
          </ItemContent>
          {actions.length > 0 && (
            <ItemActions>
              <BotonMenuActions actions={actions} item={item} />
            </ItemActions>
          )}
        </Item>
      </ContextMenuTrigger>
      {actions.length > 0 && (
        <ContextMenuContent className="w-48">
          <ContextMenuGroup>
            {actions.map((action) => (
              <ContextMenuItem
                key={action.id}
                onClick={() => action.action(item.id)}
              >
                {action.icon && <action.icon />}
                {action.title}
              </ContextMenuItem>
            ))}
          </ContextMenuGroup>
        </ContextMenuContent>
      )}
    </ContextMenu>
  )
}
