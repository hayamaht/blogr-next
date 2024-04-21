import { auth } from "@/lib/auth-config"
import { notFound } from "next/navigation";
import db from "@/lib/prisma";
import PostFeed from "./post-feed";

export default async function CustomFeed() {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  })

  const posts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunities.map(community => community.subreddit.name)
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: 2,
  })

  return (
    <PostFeed initialPosts={posts} />
  )
}
