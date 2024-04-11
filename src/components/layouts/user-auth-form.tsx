'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { Icons } from './icons';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export default function UserAuthForm() {
  const [ isLoading, setIsLoading ] = useState(false);

  const loginWith = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: '/'})
      toast.success(`Successfully logged in with ${provider.toUpperCase()}`)
    } catch (error) {
      toast.error('Something went wrong', {
        description: `There was an error logging in with ${provider.toUpperCase()}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn(
      'space-y-2 '
    )}>
      <Button 
        isLoading={isLoading}
        className='w-full'
        onClick={() => loginWith('google')}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.google className='h-4 w-4 mr-2'/>}
        Google
      </Button>

      <Button 
        isLoading={isLoading}
        className='w-full'
        onClick={() => loginWith('github')}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.github className='h-4 w-4 mr-2'/>}
        Github
      </Button>
    </div>
  )
}
