import { User } from 'next-auth'
import React from 'react'

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>
}

export default function UserAccountNav({ 
  user 
}: UserAccountNavProps) {
  console.log(user);
  
  return (
    <div>UserAccountNav</div>
  )
}
