import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function LoadingSkeleton() {
  return (
    <div className='p-2'>
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
      <Skeleton className='w-full h-10' />
    </div>
  )
}
