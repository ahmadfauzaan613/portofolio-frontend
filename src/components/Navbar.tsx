import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import NavbarData from '../data/NavbarData.json'

interface NavItem {
  name: string
  link: string
  navigate: string
}

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // CLICK OUTSIDE HANDLER
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleNavClick = (item: NavItem) => {
    // sudah di homepage → scroll
    if (location.pathname === '/' && item.link) {
      document.getElementById(item.link)?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // belum di homepage → navigate dulu
    navigate(item.navigate)

    // tunggu DOM render
    setTimeout(() => {
      document.getElementById(item.link)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div ref={menuRef}>
      <header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto container px-4 h-20 flex items-center justify-between">
          {/* LOGO */}
          <h1
            onClick={() => navigate('/')}
            className="text-2xl sm:text-3xl font-black cursor-pointer uppercase tracking-[0.2rem]"
          >
            ahmad
          </h1>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {(NavbarData.data as NavItem[]).map(item => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-medium uppercase tracking-tight transition-opacity hover:opacity-70"
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

          {/* MOBILE ACTIONS */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setOpen(prev => !prev)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-border backdrop-blur-md md:hidden">
          <nav className="flex flex-col px-4 py-4 gap-4 bg-background">
            {(NavbarData.data as NavItem[]).map(item => (
              <button
                key={item.name}
                onClick={() => {
                  handleNavClick(item)
                  setOpen(false)
                }}
                className="text-sm uppercase tracking-widest text-left hover:opacity-70 transition"
              >
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
