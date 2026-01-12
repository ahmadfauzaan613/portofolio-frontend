import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function Portofolio() {
  return (
    <div>
      <h1 className="text-8xl uppercase text-center tracking-wide">Portofolio</h1>
      <div className="mt-16 flex items-center gap-x-3 justify-end">
        <p>Categories</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="
        w-28 justify-between
        bg-transparent
        border-white/15
        text-sm font-medium
        hover:bg-white/5
        focus:ring-0
      "
            >
              <span>All</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="
      w-40
      rounded-lg
      border border-white/10
      bg-neutral-900
      p-1
      shadow-lg
      backdrop-blur
    "
          >
            {['All', 'Frontend', 'Backend', 'Fullstack'].map(item => (
              <DropdownMenuItem
                key={item}
                className="
              flex items-center justify-between
              text-sm
              rounded-sm
              px-3 py-2
              cursor-pointer
              focus:bg-white/5
            "
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
