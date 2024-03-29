import React from 'react'
import { Skeleton } from '../ui/skeleton'

export function LoadingSkeleton() {
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

export function LoadingHeaderSkeleton() {
  return (
    <div className='p-2'>
      <Skeleton className='w-full h-10' />
    </div>
  )
}
