import { unstable_noStore } from "next/cache";
import db from "@/lib/prisma";
import { z } from "zod";
import { Session } from "next-auth";

export async function fetchFirstSubreddit(slug: string) {
  try {
    const data = await db.subreddit.findFirst({
      where: {
        name: slug
      },
    });
    return data
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchFirstSubredditInclude(slug: string) {
  try {
    const data = await db.subreddit.findFirst({
      where: {
        name: slug
      },
      include: {
        posts: {
          include: {
            author: true,
            votes: true,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchFirstSubredditIncludeAll(slug: string) {
  try {
    const data = await db.subreddit.findFirst({
      where: {
        name: slug
      },
      include: {
        posts: {
          include: {
            author: true,
            votes: true,
            comments: true,
            subreddit: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 2,
        },
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchFirstSubscription(slug: string, userId: string) {
  try {
    const data = await db.subscription.findFirst({
      where: {
        subreddit: {
          name: slug
        },
        user: {
          id: userId
        },
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchCountSubscription(slug: string) {
  try {
    const data = await db.subscription.count({
      where: {
        subreddit: {
          name: slug
        }
      },
    });

    return data;
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchFirstVote(userId: string, postId: string) {
  try {
    const data = await db.vote.findFirst({
      where: {
        userId: userId,
        postId: postId,
      }
    })
    return data
  } catch (error) {
    console.error('Database Error: ', error);
  }
}

export async function fetchUniquePost(id: string) {
  try {
    const data = await db.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        votes: true,
      },
    })
    return data
  } catch (error) {
    console.error('Database Error: ', error);
  }
}


export async function fetchManySubscriptions(userId: string) {
  try {
    const data = await db.subscription.findMany({
      where: {
        userId: userId,
      },
      include: {
        subreddit: true,
      },
    })
    return data
  } catch (error) {
    console.error('Database Error: ', error);
    return []
  }
}

export async function fetchManyPosts(
  url: URL, session?: Session | null
) {

  let whereClause = {}
  const { _limit, _page, subredditName } = z.object({
    _limit: z.string(),
    _page: z.string(),
    subredditName: z.string().nullish().optional(),
  }).parse({
    subredditName: url.searchParams.get('subredditName'),
    _limit: url.searchParams.get('limit'),
    _page: url.searchParams.get('page'),
  })

  const limit = parseInt(_limit)
  const page = parseInt(_page)

  try {
    let followedCommunitiesIds: string[] = []

    if (session) {
      const followedCommunities = await fetchManySubscriptions(session.user.id)
      followedCommunitiesIds = followedCommunities.map((sub) => sub.subreddit.id)
    }

    if (subredditName) {
      whereClause = {
        subreddit: {
          name: subredditName,
        },
      }
    } else if (session) {
      whereClause = {
        subreddit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      }
    }

    const posts = await db.post.findMany({
      where: whereClause,
      take: limit,
      skip: (page - 1) * limit, // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        subreddit: true,
        votes: true,
        author: true,
        comments: true,
      },
    })
    return posts
  } catch (error) {
    console.error('Database Error: ', error);
    return []
  }
}