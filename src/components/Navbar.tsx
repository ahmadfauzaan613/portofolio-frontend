import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../components/ui/button' // Pastikan path benar
import NavbarData from '../data/NavbarData.json'

interface NavItem {
  name: string
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  // Fungsi toggle simpel
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="relative border-b p-4 z-50 bg-background text-foreground">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">ahmad</h1>

          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {(NavbarData?.data as NavItem[]).map((item, i) => (
                <p
                  className="text-sm font-medium uppercase tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
                  key={i}
                >
                  {item.name}
                </p>
              ))}
            </nav>

            <Button
              variant="outline"
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
        </div>
      </div>
    </div>
  )
}
