import Link from 'next/link'
import React from 'react'
import { Icons } from './icons'
import { auth } from '@/lib/auth-config'
import { buttonVariants } from '../ui/button';
import SearchBar from './search-bar';
import UserAccountNav from './user-account-nav';
import { ModeToggle } from './mode-toggle';

export default async function Navbar() {
  const session = await auth();

  return (
    <div className='fixed top-0 inset-x-0 h-fit 
      bg-primary border-b-2 border-border/50 z-50 py-2'
    >
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        {/* logo */}
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' />
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Breadit</p>
        </Link>

        <SearchBar />

        <div className='flex space-x-1'>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href='/sign-in' className={buttonVariants({
              variant: 'outline'
            })}>
              Sign In
            </Link>
          )}

          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
