import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/navigation/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { HeaderProvider } from "@/contexts/HeaderContext"
import { DynamicHeader } from "@/components/navigation/DynamicHeader"
import { agentesService } from "@/lib/services/agentes.service"

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Cargar los agentes agrupados por área
  const agentsByArea = await agentesService.getAgentesParaSidebar()

  return (
    <HeaderProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar agentsByArea={agentsByArea} />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2 bg-card px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
              </div>
              <DynamicHeader />
            </header>
            <div className="flex flex-1 flex-col overflow-hidden">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </HeaderProvider>
  )
}
