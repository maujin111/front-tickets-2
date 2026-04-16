"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Code,
  Headset,
  Handshake,
  ChartCandlestick,
} from "lucide-react"

import { NavProjects } from "@/components/navigation/nav-projects"
import { NavUser } from "@/components/navigation/nav-user"
import { TeamSwitcher } from "@/components/navigation/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main-enhanced"

type Agent = {
  title: string
  url: string
  isActive?: boolean
}

type AreaWithAgents = {
  title: string
  url: string
  items: Agent[]
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  agentsByArea?: AreaWithAgents[]
}

export function AppSidebar({ agentsByArea = [], ...props }: AppSidebarProps) {
  const data = {
    user: {
      name: "Mauricio Ordoñez",
      email: "@maujin",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Sistema de tickets",
        logo: GalleryVerticalEnd,
        plan: "Anfibius",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
  }

  // Construir el menú de navegación con los agentes dinámicos
  const navMain = [
    {
      title: "Soporte Técnico",
      url: "#",
      icon: Headset,
      isActive: true,
      items: [
        {
          title: "Tickets",
          url: "/home/soporte/tickets",
          items: agentsByArea.length > 0 ? agentsByArea : undefined,
        },
        {
          title: "Visitas",
          url: "#",
        },
        {
          title: "Agendas",
          url: "#",
        },
      ],
    },
    {
      title: "Programacion",
      url: "#",
      icon: Code,
      items: [
        {
          title: "ToDo",
          url: "#",
        },
        {
          title: "Bugs",
          url: "#",
        },
      ],
    },
    {
      title: "Comercial",
      url: "#",
      icon: Handshake,
      items: [
        {
          title: "Firmero",
          url: "#",
        },
        {
          title: "Eventos",
          url: "#",
        },
        {
          title: "Clientes",
          url: "#",
        },
      ],
    },
    {
      title: "Reporteria",
      url: "#",
      icon: ChartCandlestick,
      items: [
        {
          title: "Estadisticas",
          url: "#",
        },
        {
          title: "Reportes",
          url: "#",
        },
        {
          title: "Tabulaciones",
          url: "#",
        },
      ],
    },
    {
      title: "Configuración",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Soporte",
          url: "#",
        },
        {
          title: "Visitas",
          url: "#",
        },
        {
          title: "Usuarios",
          url: "#",
        },
        {
          title: "Modulos",
          url: "#",
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
