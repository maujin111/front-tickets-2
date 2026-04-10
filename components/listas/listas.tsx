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
    <ScrollArea>
      <ItemGroup>
        {ItemListData.map((item) => {
          const priority = priorities.find((p) => p.id === item.priorityId)
          const borderColor = priority
            ? priority.color.replace("bg-", "border-")
            : "border-border"

          return (
            <ContextMenu key={item.id}>
              <ContextMenuTrigger asChild>
                <Item
                  variant="outline"
                  className={`cursor-pointer hover:border-transparent hover:bg-muted/50 shadow-sm border-l-4 ${borderColor}`}
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
