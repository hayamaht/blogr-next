import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { buttonVariants } from '../ui/button'
import { auth } from '@/lib/auth-config';
import MyAvatar from './my-avatar';

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className='p-2 w-full border-b bg-primary fixed top-0 left-0 z-50 drop-shadow'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link href={'/'} className='font-bold text-xl'>
          LOGO
        </Link>

        <div className='flex items-center space-x-2'>
          <ModeToggle />
          {user ? (
            <MyAvatar user={user}/>
          ) : (
            <Link href={'/login'} className={buttonVariants({
              variant: 'outline'
            })}>
              Login
            </Link>
          )}
          
        </div>
      </div>
    </header>
  )
}
