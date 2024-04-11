import { User } from 'next-auth'
import React from 'react'
import LogoutButton from './logout-btn';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import UserAvatar from './user-avatar';

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
    </DropdownMenu>
  )
}
