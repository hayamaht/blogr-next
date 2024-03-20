import { User } from 'next-auth'
import React from 'react'
import LogoutButton from './logout-btn';

export default function MyAvatar({ 
  user 
}: {
  user: User
}) {
  console.log(user);
  return (
    <div>
      {user.image}
      <LogoutButton />
    </div>
  )
}
