"use client"

import * as React from "react"
import {
  Calendar,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  Users,
  TicketCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { title } from "node:process"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Inicio",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Dashboard",
          url: "/home",
          icon: LayoutDashboard,
        },
        {
          title: "Tickets",
          url: "#",
          icon: Ticket,
        },
      ],
    },
    {
      title: "Agendas y Visitas",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Agenda",
          url: "#",
          icon: Calendar,
        },
        {
          title: "Visitas",
          url: "#",
          icon: Users,
        },
      ],
    },
    {
      title: "Personas",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Clientes",
          url: "#",
          icon: Users,
        },
        {
          title: "Agentes",
          url: "#",
          icon: Users,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={cn(
          "border-b border-sidebar-border transition-all duration-200",
          isCollapsed ? "p-2" : "px-4 py-6"
        )}
      >
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <div className="flex animate-in flex-col gap-0.5 overflow-hidden duration-300 fade-in slide-in-from-left-2">
              <span className="truncate leading-none font-bold tracking-tight text-sidebar-foreground">
                Tickets
              </span>
              <span className="truncate text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                Sistema de Gestión
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-2 px-2 py-4">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title} className="py-0">
            {!isCollapsed && (
              <SidebarGroupLabel className="mb-1 animate-in px-2 text-xs font-semibold text-muted-foreground/70 duration-500 fade-in">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className="group/menu-button rounded-lg px-3 py-5 transition-all duration-200 hover:bg-sidebar-accent"
                    >
                      <a
                        href={item.url}
                        className="flex w-full items-center gap-3"
                      >
                        <item.icon className="h-4.5 w-4.5 shrink-0 text-muted-foreground transition-colors group-hover/menu-button:text-primary" />
                        {!isCollapsed && (
                          <>
                            <span className="truncate font-medium">
                              {item.title}
                            </span>
                            <ChevronRight className="pointer-events-none ml-auto h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all duration-300 group-hover/menu-button:translate-x-0 group-hover/menu-button:opacity-100" />
                          </>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Perfil"
              className="h-12 w-full justify-start gap-3 rounded-xl px-2 transition-colors hover:bg-sidebar-accent"
            >
              <div className="flex w-full items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                  JD
                </div>
                {!isCollapsed && (
                  <div className="flex flex-1 animate-in flex-col truncate duration-300 fade-in">
                    <span className="truncate text-sm font-semibold">
                      John Doe
                    </span>
                    <span className="truncate text-xs font-medium text-muted-foreground">
                      Administrador
                    </span>
                  </div>
                )}
                {!isCollapsed && (
                  <Settings className="h-4 w-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground" />
                )}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {!isCollapsed && (
            <SidebarMenuItem>
              <SidebarMenuButton className="mt-2 h-10 w-full justify-start gap-3 rounded-lg px-3 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4" />
                <span className="font-medium">Cerrar Sesión</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
