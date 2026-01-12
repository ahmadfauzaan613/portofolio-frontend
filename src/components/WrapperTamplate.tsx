import React from 'react'
import Navbar from './Navbar'

export default function WrapperTamplate({
  children,
  container,
}: {
  children: React.ReactNode
  container?: boolean
}) {
  return (
    <>
      <Navbar />
      <div className={`${container && 'container mx-auto mt-10'}`}>{children}</div>
    </>
  )
}
