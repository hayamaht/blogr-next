import MiniCreatePost from '@/components/mini-create-post'
import PostFeed from '@/components/post-feed'
import { auth } from '@/lib/auth-config'
import { fetchFirstSubredditIncludeAll } from '@/lib/data'
import { notFound } from 'next/navigation'
import React from 'react'

interface PageProps {
  params: {
    slug: string
  }
}

export default async function SlugPage({ params }: PageProps ) {
  const session = await auth()
  const { slug } = params
  const subreddit = await fetchFirstSubredditIncludeAll(slug)

  if (!subreddit) {
    return notFound()
  }

  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl h-14'>
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  )
}
