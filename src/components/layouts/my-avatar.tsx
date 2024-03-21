import { User } from 'next-auth'
import React from 'react'
import LogoutButton from './logout-btn';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export default function MyAvatar({ 
  user 
}: {
  user: User
}) {
  const n = user.name!.substring(0,1);
  return (
    <div className='flex items-center space-x-2'>
      <Avatar>
        <AvatarImage src={user.image as string} />
        <AvatarFallback>{n}</AvatarFallback>
      </Avatar>
      <LogoutButton />
    </div>
  )
}
