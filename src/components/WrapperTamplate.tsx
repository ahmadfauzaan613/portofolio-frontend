import React from 'react'
import Navbar from './Navbar'

export default function WrapperTemplate({
  children,
  container,
  viewNavbar,
}: {
  children: React.ReactNode
  container: boolean
  viewNavbar: boolean
}) {
  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      {viewNavbar && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
      )}

      <main
        className={`
          h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth
          ${viewNavbar ? 'pt-20' : ''}
        `}
      >
        <div className={container ? 'container mx-auto' : ''}>{children}</div>
      </main>
    </div>
  )
}
