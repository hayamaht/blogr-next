'use client'

import { formatTimeToNow } from '@/lib/utils'
import type { Post, User, Vote } from '@prisma/client'
import { MessageSquareIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import EditorOutput from './editor-output'
import PostVoteClient from './post-vote-client'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  subredditName: string
  currentVote?: PartialVote
  commentAmt: number
}

export default function Post({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subredditName,
  commentAmt,
}: PostProps) {
  const pRef = useRef<HTMLParagraphElement>(null)
  
  return (
    <div className='rounded-md bg-background border border-border shadow'>
      <div className='p-2 flex justify-between'>
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={_votesAmt}
          initialVote={_currentVote?.type}
        />

        <div className='flex-1'>
          <div className='max-h-40 mt-1 text-xs text-foreground'>
            {subredditName ? (
              <>
                <a
                  className='underline text-primary text-sm underline-offset-2'
                  href={`/r/${subredditName}`}>
                  r/{subredditName}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.name}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className='text-xl underline font-semibold py-2 leading-6 text-foreground'>
              {post.title}
            </h1>
          </a>

          <div
            className='relative text-sm max-h-40 w-full overflow-clip'
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className='absolute bottom-0 left-0 h-24 w-full 
                bg-gradient-to-t from-background to-transparent'></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className='bg-secondary rounded-b-md z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/r/${subredditName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquareIcon className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}
