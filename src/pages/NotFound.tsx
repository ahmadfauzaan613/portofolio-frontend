import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="h-screen grid place-items-center text-center">
      <div className="space-y-4">
        <h1 className="text-8xl font-black tracking-tight">404</h1>

        <p className="text-sm uppercase tracking-widest text-muted-foreground">Page Not Found</p>

        <p
          onClick={() => navigate('/')}
          className="text-xs cursor-pointer hover:opacity-60 transition-opacity"
        >
          BACK
        </p>
      </div>
    </div>
  )
}
