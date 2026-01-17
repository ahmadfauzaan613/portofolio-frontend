import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/Auth/useAuthMe'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme()
  const { isLoading, isError } = useAuth()

  if (!resolvedTheme) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (isError) {
    return <Navigate to="/admin" replace />
  }

  return children
}
