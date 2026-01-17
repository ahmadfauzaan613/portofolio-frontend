import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import type { IUpdatePassProps } from '../type'

export default function UpdatePasswordModal({ isOpen, onOpenChange }: IUpdatePassProps) {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Password</DialogTitle>
          <DialogDescription>
            Change your admin password to keep your account secure.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <div className="relative">
              <Input id="oldPassword" type={showOld ? 'text' : 'password'} className="pr-10 py-5" />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input id="newPassword" type={showNew ? 'text' : 'password'} className="pr-10 py-5" />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="submit" className="w-full">
              Save Password
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
