'use client'

import { VoteType } from "@prisma/client"
import { useEffect, useState } from "react"
import { usePrevious } from '@mantine/hooks'
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { PostVoteRequest } from "@/lib/validators/vote"
import { toast } from "sonner"
import { useCustomToasts } from "@/hooks/use-custom-toasts"

interface PostVoteClientProps {
  postId: string
  initialVotesAmt: number
  initialVote?: VoteType | null
}

export default function PostVoteClient({
  postId,
  initialVotesAmt,
  initialVote
}: PostVoteClientProps) {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
  const [currentVote, setCurrentVote] = useState(initialVote)
  const prevVote = usePrevious(currentVote)
  const { loginToast } = useCustomToasts()

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote)
  }, [initialVote])

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      }

      await axios.patch('/api/subreddit/post/vote', payload)
    },
    onError: (err, voteType) => {
      if (voteType === 'UP') setVotesAmt((prev) => prev - 1)
      else setVotesAmt((prev) => prev + 1)

      // reset current vote
      setCurrentVote(prevVote)

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      console.error(err)

      return toast.error('Something went wrong.', {
        description: 'Your vote was not registered. Please try again.',
      })
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined)
        if (type === 'UP') setVotesAmt((prev) => prev - 1)
        else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type)
        if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
        else if (type === 'DOWN')
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
      }
    },
  })
  
  return (
    <div className='flex flex-col gap-2 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
      {/* up vote */}
      <Button
        onClick={() => vote('UP')}
        size='sm'
        variant='ghost'
        aria-label='upvote'>
        <ArrowBigUpIcon
          className={cn('h-5 w-5 text-foreground/50', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
          })}
        />
      </Button>

      {/* score */}
      <p className='text-center py-2 font-medium text-sm text-foreground/50'>
        {votesAmt}
      </p>

      {/* down vote */}
      <Button
        onClick={() => vote('DOWN')}
        size='sm'
        className={cn({
          'text-emerald-500': currentVote === 'DOWN',
        })}
        variant='ghost'
        aria-label='downvote'>
        <ArrowBigDownIcon
          className={cn('h-5 w-5 text-foreground/50', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </Button>
    </div>
  )
}
