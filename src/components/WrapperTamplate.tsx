import React from 'react'
import Navbar from './Navbar'

export default function WrapperTamplate({
  children,
  container,
  viweNavbar,
}: {
  children: React.ReactNode
  container?: boolean
  viweNavbar?: boolean
}) {
  return (
    <>
      {viweNavbar && <Navbar />}
      <div className={`${container && 'container mx-auto mt-10'}`}>{children}</div>
    </>
  )
}
