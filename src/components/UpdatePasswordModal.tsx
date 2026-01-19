import { Eye, EyeOff, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import type { FormValues, IUpdatePassProps } from '../type'
import { Button } from './ui/button'

export default function UpdatePasswordModal({
  isOpen,
  onOpenChange,
  onSubmit,
  isLoading,
}: IUpdatePassProps) {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>()

  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  const handleClose = (open: boolean) => {
    if (!open) reset()
    onOpenChange(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md rounded-xl bg-black">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Lock className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg font-semibold">Update Password</DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            Change your admin password to keep your account secure.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          <div className="grid gap-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <div className="relative">
              <Input
                type={showOld ? 'text' : 'password'}
                placeholder="Old Password"
                {...register('oldPassword', {
                  required: 'Old password is required',
                })}
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {formState.errors.oldPassword && (
                <p className="text-sm text-red-500">{formState.errors.oldPassword.message}</p>
              )}
            </div>
          </div>

          {/* New Password */}
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                type={showNew ? 'text' : 'password'}
                className="h-12 pr-10"
                placeholder="New Password"
                {...register('newPassword', {
                  required: 'New password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {formState.errors.newPassword && (
                <p className="text-sm text-red-500">{formState.errors.newPassword.message}</p>
              )}
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="submit"
            className="w-full bg-white cursor-pointer text-black"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
