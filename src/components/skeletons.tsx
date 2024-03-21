import { Skeleton } from "./ui/skeleton"

export function PostSkeleton() {
  return (
    <div>
      <Skeleton className="h-12 w-full" />
    </div>
  )
}

export function PostsSkeleton() {
  return (
    <div className="space-y-2">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}