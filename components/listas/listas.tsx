"use client"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { Action, ListItem, Priority } from "@/interfaces"
import { ScrollArea } from "../ui/scroll-area"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../ui/item"
import { BotonMenuActions } from "../botonMenu"
import { LucideIcon } from "lucide-react"

type ListProps = {
  ItemListData: ListItem[]
  ListIcon: LucideIcon
  ListAction: (id: number) => void
  actions: Action[]
  priorities: Priority[]
}

export function Listas({
  ItemListData,
  ListIcon,
  ListAction,
  actions,
  priorities,
}: ListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-14rem)]">
      <ItemGroup>
        {ItemListData.map((item) => {
          const priority = priorities.find((p) => p.id === item.priorityId)

          return (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <Item
                  variant="outline"
                  className="cursor-pointer border-l-4 shadow-sm hover:border-transparent hover:bg-muted/50"
                  style={{
                    borderLeftColor: priority?.color || "#d1d5db",
                  }}
                  onClick={() => ListAction(item.id)}
                >
                  <ItemMedia variant="icon">
                    <ListIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {" "}
                      #{item.id} {item.titulo}
                    </ItemTitle>
                    <ItemDescription>{item.subtitulo}</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <BotonMenuActions actions={actions} item={item} />
                  </ItemActions>
                </Item>
              </ContextMenuTrigger>
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
            </ContextMenu>
          )
        })}
      </ItemGroup>
    </ScrollArea>
  )
}
