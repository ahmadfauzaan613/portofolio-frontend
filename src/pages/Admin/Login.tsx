import { Eye, EyeOff } from 'lucide-react'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useLogin } from '../../hooks/Auth/useLogin'
import type { LoginForm } from '../../type'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { mutate, isPending, error } = useLogin()
  const { register, handleSubmit, formState } = useForm<LoginForm>()
  const onSubmit = (data: LoginForm) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/admin/profile')
      },
    })
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md px-4">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <div className="mb-10 flex justify-center">
            <h1 className="text-4xl font-bold uppercase tracking-tighter">Admin</h1>
          </div>

          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register('username', { required: 'Username is required' })}
                name="username"
                id="username"
                placeholder="Username"
                className="h-12"
              />
              {formState.errors.username && (
                <p className="text-sm text-red-500">{formState.errors.username.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register('password', { required: 'Password is required' })}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                {formState.errors.password && (
                  <p className="text-sm text-red-500">{formState.errors.password.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 cursor-pointer mt-4 bg-white text-black"
              size="lg"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
            {error && (
              <p className="text-center text-sm text-red-500">Invalid username or password</p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
