import Header from '@/components/layouts/header'
import React from 'react'

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="mt-14">
        {children}
      </div>
    </>
  )
}
