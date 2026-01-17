import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import AppSidebar from '.././components/AppSidebar'
import { Button } from '.././components/ui/button'
import { SidebarProvider, SidebarTrigger } from '.././components/ui/sidebar'

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6 ">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px mx-2" />
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium">Overview</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="cursor-pointer border-muted-foreground/20 hover:bg-muted h-10 w-10"
              >
                {theme === 'dark' ? (
                  <Moon className="h-6 w-6 transition-all" />
                ) : (
                  <Sun className="h-6 w-6 transition-all" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </header>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
