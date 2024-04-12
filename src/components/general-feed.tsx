import db from '@/lib/prisma'
import PostFeed from './post-feed'

export default async function GeneralFeed() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: 4,
  })

  return <PostFeed initialPosts={posts} />
}
