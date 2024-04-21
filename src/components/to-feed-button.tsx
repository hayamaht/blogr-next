'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { buttonVariants } from './ui/button'
import { ChevronLeftIcon } from 'lucide-react'

const getSubredditPath = (pathname: string) => {
  const splitPath = pathname.split('/')
  if (splitPath.length === 3) return '/'
  else if (splitPath.length > 3) return `/${splitPath[1]}/${splitPath[2]}`
  return '/'
}

export default function ToFeedButton() {
  const pathname = usePathname()
  const subredditPath = getSubredditPath(pathname)

  return (
    <a href={subredditPath} className={buttonVariants()}>
      <ChevronLeftIcon className='h-4 w-4' />
      {subredditPath === '/' ? 'Back home' : 'Back to community'}
    </a>
  )
}
