import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='p-2 bg-stone-500 w-full '>
      <Link href={'/'} className='font-bold text-xl'>
        LOGO
      </Link>

      <div className='flex items-center space-x-2'>
        <Link href={'/login'} className='text-white'>
          Login
        </Link>
      </div>
    </header>
  )
}
