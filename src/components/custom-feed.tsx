import { auth } from "@/lib/auth-config"
import { notFound } from "next/navigation";
import db from "@/lib/prisma";

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

  return (
    <div> CustomFeed</div>
  )
}
