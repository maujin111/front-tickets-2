"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

type Agent = {
  title: string
  url: string
  isActive?: boolean
}

type Area = {
  title: string
  url: string
  items: Agent[]
}

type SubItem = {
  title: string
  url: string
  items?: Area[]
}

type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: SubItem[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const [showAgentList, setShowAgentList] = useState(false)
  const [agentAreas, setAgentAreas] = useState<Area[]>([])

  const handleTicketsClick = (areas: Area[]) => {
    setAgentAreas(areas)
    setShowAgentList(true)
  }

  const handleBackClick = () => {
    setShowAgentList(false)
  }

  // Vista de áreas y agentes
  if (showAgentList) {
    return (
      <SidebarGroup>
        <div className="px-2 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
            className="w-full justify-start"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
        <SidebarGroupLabel>Bandejas de tickets</SidebarGroupLabel>
        <SidebarMenu>
          {agentAreas.map((area) => (
            <Collapsible
              key={area.title}
              asChild
              defaultOpen={false}
              className="group/area-collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <span className="font-medium">{area.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/area-collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {area.items.map((agent) => (
                      <SidebarMenuSubItem key={agent.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={agent.url}>
                            {agent.isActive && (
                              <span className="mr-2 h-2 w-2 shrink-0 rounded-full bg-green-500" />
                            )}
                            <span>{agent.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  // Vista principal del menú
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    // Si tiene items (áreas), mostrar botón para ir a la vista de agentes
                    if (subItem.items && subItem.items.length > 0) {
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            onClick={() => handleTicketsClick(subItem.items!)}
                          >
                            {subItem.title}
                            <ChevronRight className="ml-auto" />
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    }

                    // Si no tiene items, es un link simple
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>{subItem.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
