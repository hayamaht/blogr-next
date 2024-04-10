'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Icons } from './icons';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export default function UserAuthForm() {
  const [ isLoading, setIsLoading ] = useState(false);

  const loginWthGithub = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/'}).then(res => {
        toast.success('Successfully logged in with Google')
      })
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'There was an error logging in with Google',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn(
      'flex justify-center '
    )}>
      <Button 
        isLoading={isLoading}
        className='w-full'
        onClick={loginWthGithub}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2'/>}
        Google
      </Button>
    </div>
  )
}
