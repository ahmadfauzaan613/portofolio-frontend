import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '../components/ui/button' // Pastikan path benar
import NavbarData from '../data/NavbarData.json'

interface NavItem {
  name: string
  link: string
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className="
        w-full
        bg-background/80
        backdrop-blur-md
        border-b
        border-border
      "
    >
      <div className="container mx-auto h-20 flex items-center justify-between">
        {/* LOGO */}
        <h1
          onClick={() => scrollToSection('home')}
          className="text-3xl font-black cursor-pointer uppercase tracking-[0.2rem]"
        >
          ahmad
        </h1>

        {/* NAV */}
        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {(NavbarData.data as NavItem[]).map(item => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.link)}
                className="
                  text-sm font-medium uppercase tracking-tight
                  transition-opacity hover:opacity-70
                "
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* THEME TOGGLE */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="border-muted-foreground/30"
          >
            {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
