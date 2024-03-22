import Header from "@/components/layouts/header";
import Posts from "@/components/posts";
import { PostsSkeleton } from "@/components/skeletons";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth-config";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth()
  const user = session?.user;
  
  return (
    <main>
      <Header />
      { user && <div className="p-2">
        <Link href={'/post/create'} className={buttonVariants({
          variant: 'default',
        })}>
          Create post
        </Link>
      </div>}
      <div className="p-4 container mx-auto mt-12">
        <Suspense fallback={<PostsSkeleton />}>
          <Posts />
        </Suspense>
      </div>
    </main>
  );
}
