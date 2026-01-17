import { Eye, EyeOff, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { theme, setTheme } = useTheme()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
      <div className="absolute right-6 top-6">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 cursor-pointer border-muted-foreground/20 hover:bg-muted transition-all"
        >
          {theme === 'dark' ? (
            <Moon className="h-5 w-5 transition-all" />
          ) : (
            <Sun className="h-5 w-5 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <form className="w-full max-w-md px-4">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="mb-10 flex justify-center">
            <h1 className="text-4xl font-bold uppercase tracking-tighter">Admin</h1>
          </div>

          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input name="username" id="username" placeholder="Username" className="h-12" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 cursor-pointer mt-4" size="lg">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
