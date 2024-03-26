import type { Post, User } from '@prisma/client'

export type PostWithExtras = Post & {
  author: User
}

export type UserWithExtras = User & {
  posts: Post[];
}