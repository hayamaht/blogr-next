'use client'

import axios, { AxiosError } from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { CreateSubredditPayload } from "@/lib/validators/subreddit"
import { useCustomToasts } from '@/hooks/use-custom-toasts'
import { toast } from 'sonner'

export default function CreatePage() {
  const router = useRouter()
  const [ input, setInput ] = useState<string>('')
  const { loginToast } = useCustomToasts()

  const { mutate: createCommunity, status } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      }

      const { data } = await axios.post('/api/subreddit', payload)
      return data as string
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          toast.error('Subreddit already exists.', {
            description: 'Please try another name.'
          })
          return 
        }

        if (err.response?.status === 422) {
          toast.error('Invalid subreddit name.', {
            description: 'Please choose a name between 3 and 21 letters.'
          })
          return
        }

        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      toast.error('There was an error', {
        description: 'Could not create subreddit'
      })
    }
  })

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-background border border-border shadow-lg w-full h-fit p-4 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            disabled={status === 'pending'}
            variant='secondary'
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={status === 'pending'}
            disabled={input.length === 0}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}
