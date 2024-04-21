import SubscribeLeaveToggle from '@/components/subscribe-leave-toggle'
import ToFeedButton from '@/components/to-feed-button'
import { buttonVariants } from '@/components/ui/button'
import { auth } from '@/lib/auth-config'
import { fetchCountSubscription, fetchFirstSubredditInclude, fetchFirstSubscription } from '@/lib/data'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

export default async function layout({
  children,
  params: { slug },
}: {
  children: ReactNode
  params: { slug: string }
}) {
  const session = await auth()
  const subreddit = await fetchFirstSubredditInclude(slug)
  const subscription = !session?.user
    ? undefined
    : await fetchFirstSubscription(slug, session.user.id)

  const isSubscribed = !!subscription

  if (!subreddit) return notFound()

  const memberCount = await fetchCountSubscription(slug)

  return (
    <div className='sm:container max-w-7xl mx-auto h-full pt-12'>
      <div>
        <ToFeedButton />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
          <ul className='flex flex-col col-span-2 space-y-6'>{children}</ul>

          {/* info sidebar */}
          <div className='overflow-hidden h-fit rounded-lg border border-border order-first md:order-last bg-background/5'>
            <div className='px-6 py-4'>
              <p className='font-semibold py-3'>About r/{subreddit.name}</p>
            </div>
            <div className='divide-y divide-primary px-6 py-4 text-sm leading-6'>
              <div className='flex justify-between gap-x-4 py-3'>
                <div className='text-foreground/50'>Created</div>
                <div className='text-foreground'>
                  <time dateTime={subreddit.createdAt.toDateString()}>
                    {format(subreddit.createdAt, 'MMMM d, yyyy')}
                  </time>
                </div>
              </div>
              <div className='flex justify-between gap-x-4 py-3'>
                <div className='text-foreground/50'>Members</div>
                <div className='flex items-start gap-x-2'>
                  <div className='text-foreground'>{memberCount}</div>
                </div>
              </div>

              {subreddit.creatorId === session?.user?.id ? (
                <div className='flex justify-between gap-x-4 py-3'>
                  <div className='text-foreground/50'>You created this community</div>
                </div>
              ) : null}

              {subreddit.creatorId !== session?.user?.id ? (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  subredditId={subreddit.id}
                  subredditName={subreddit.name}
                />
              ) : null}
              <Link
                className={buttonVariants({
                  variant: 'default',
                  className: 'w-full',
                })}
                href={`/r/${slug}/submit`}>
                Create Post
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
