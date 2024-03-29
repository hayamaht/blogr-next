import Header from "@/components/layouts/header";
import {LoadingHeaderSkeleton} from "@/components/layouts/skeletons";
import Posts from "@/components/posts";
import { PostsSkeleton } from "@/components/skeletons";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth-config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth()
  const user = session?.user;
  
  return (
    <main>
      <Suspense fallback={<LoadingHeaderSkeleton />}>
        <Header />
      </Suspense>
      
      <div className="p-4 container mx-auto mt-14">
      { user && (
        <div className="py-2">
          <Link href={'/post/create'} className={cn(
            'bg-primary',
            buttonVariants({
              variant: 'default',
            })
          )}>
            Create post
          </Link>
        </div>
      )}
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}
