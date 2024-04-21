import { createVote, deleteVote, updateVote } from "@/lib/actions"
import { auth } from "@/lib/auth-config"
import { fetchFirstVote, fetchUniquePost } from "@/lib/data"
import { redis } from "@/lib/redis"
import { PostVoteValidator } from "@/lib/validators/vote"
import { CachedPost } from "@/types/redis"
import { Post, User, Vote, VoteType } from "@prisma/client"
import { z } from "zod"

const CACHE_AFTER_UPVOTES = 1
const setVote = async (post: Post & { votes: Vote[], author: User }, voteType: VoteType, postId: string) => {
  const votesAmt = post.votes.reduce((acc, vote) => {
    if (vote.type === 'UP') return acc + 1
    if (vote.type === 'DOWN') return acc - 1
    return acc
  }, 0)

  if (votesAmt >= CACHE_AFTER_UPVOTES) {
    const cachePayload: CachedPost = {
      authorUsername: post.author.username ?? '',
      content: JSON.stringify(post.content),
      id: post.id,
      title: post.title,
      currentVote: voteType,
      createdAt: post.createdAt,
    }

    await redis.hset(`post:${postId}`, cachePayload) // Store the post data as a hash
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }
    
    const userId = session.user.id;
    const body = await req.json()
    const { postId, voteType } = PostVoteValidator.parse(body)
    const existingVote = await fetchFirstVote(userId, postId)
    const post = await fetchUniquePost(postId)

    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    if (!existingVote) {
      // if no existing vote, create a new vote
      await createVote(voteType, postId, userId)
      // Recount the votes
      await setVote(post, voteType, postId)
      return new Response('OK')
    }

    if (existingVote.type === voteType) {
      // if the existing vote is the same as the new vote, 
      // delete the vote
      await deleteVote(postId, userId)
      // Recount the votes
      await setVote(post, voteType, postId)
      return new Response('OK')
    }
    
    // if vote type is different, update the vote
    await updateVote(voteType, postId, userId)
    await setVote(post, voteType, postId)
    return new Response('OK')

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}