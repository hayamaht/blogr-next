'use client'

import { User } from 'next-auth'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import UserAvatar from './user-avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export default function UserAccountNav({ user }: UserAccountNavProps) {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar 
          user={{ name: user.name || null, image: user.image || null }}
          className='h-8 w-8'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className='gap-3 p-2'>
          <div className='space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='w-11/12 truncate text-sm text-muted-foreground'>
                {user.email} 
              </p>
            )}
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href={'/'}>Feed</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={'/r/create'}>Create Community</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={'/setting'}>Setting</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}>
          Sign out
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
