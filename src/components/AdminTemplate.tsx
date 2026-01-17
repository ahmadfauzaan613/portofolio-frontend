import AppSidebar from '.././components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '.././components/ui/sidebar'

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 ">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px mx-2" />
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
