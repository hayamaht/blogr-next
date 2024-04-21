import Editor from '@/components/editor'
import { Button } from '@/components/ui/button'
import { fetchFirstSubreddit } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function SubmitPage({ params }: PageProps) {
  const subreddit = await fetchFirstSubreddit(params.slug)

  if (!subreddit) {
    return notFound()
  }

  return (
    <div className='flex flex-col items-start gap-6'>
      {/* heading */}
      <div className='border-b border-primary pb-5'>
        <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-foreground'>
            Create Post
          </h3>
          <p className='ml-2 mt-1 truncate text-sm text-foreground'>
            in r/{params.slug}
          </p>
        </div>
      </div>

      {/* form */}
      <Editor subredditId={subreddit.id} />

      {/* <div className='w-full flex justify-end'>
        <Button type='submit' 
          className='w-full' 
          form='subreddit-post-form'>
          Post
        </Button>
      </div> */}
    </div>
  )
}
