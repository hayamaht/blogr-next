import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { buttonVariants } from '../ui/button'
import { getServerSession } from 'next-auth';

export default async function Header() {
  const session = await getServerSession();
  console.log(session);
  
  return (
    <header className='p-2 w-full border-b flex items-center justify-between'>
      <Link href={'/'} className='font-bold text-xl'>
        LOGO
      </Link>

      <div className='flex items-center space-x-2'>
        <ModeToggle />
        <Link href={'/login'} className={buttonVariants({
          variant: 'outline'
        })}>
          Login
        </Link>
        
      </div>
    </header>
  )
}
