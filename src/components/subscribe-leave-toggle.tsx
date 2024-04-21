'use client'

import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { useRouter } from 'next/navigation'
import React, { startTransition } from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  subredditId: string
  subredditName: string
}

export default function SubscribeLeaveToggle({
  isSubscribed,
  subredditId,
  subredditName
}: SubscribeLeaveToggleProps) {
  const { loginToast } = useCustomToasts()
  const router = useRouter()

  const { mutate: subscribe, isPending: isSubLoading, } = useMutation({
    mutationFn: async () =>  {
      const payload: SubscribeToSubredditPayload = {
        subredditId
      }
      const { data } = await axios.post('/api/subreddit/subscribe', payload)
      return data as string
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast()
        }
      }

      return toast.error('There was a problem.', {
        description: 'Something went wrong. Please try again.',
      })
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })
      toast.success('Subscribed!', {
        description: `You are now subscribed to r/${subredditName}`,
      })
    },
  })

  const { mutate: unsubscribe, isPending: isUnsubLoading } = useMutation({
    mutationFn: async () =>  {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      }

      const { data } = await axios.post('/api/subreddit/unsubscribe', payload)
      return data as string
    },
    onError: (error: AxiosError) => {
      toast('Error', {
        description: error.response?.data as string,
      })
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
      toast('Unsubscribed!', {
        description: `You are now unsubscribed from/${subredditName}`,
      })
    },
  })

  return (
    isSubscribed ? (
      <Button
        className='w-full mt-1 mb-4'
        isLoading={isUnsubLoading}
        onClick={() => unsubscribe()}>
        Leave community
      </Button>
    ) : (
      <Button
        className='w-full mt-1 mb-4'
        isLoading={isSubLoading}
        onClick={() => subscribe()}>
        Join to post
      </Button>
    )
  )
}
