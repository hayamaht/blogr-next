import type { Post, User } from '@prisma/client'

export type PostWithAuthor = Post & {
  // author: {
  //   name: string,
  //   email: string,
  // }
  //user: User
}