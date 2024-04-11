import CustomFeed from "@/components/custom-feed";
import GeneralFeed from "@/components/general-feed";
import Header from "@/components/layouts/header";
import {LoadingHeaderSkeleton} from "@/components/layouts/skeletons";
import Posts from "@/components/posts";
import { PostsSkeleton } from "@/components/skeletons";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth-config";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth()
  
  return (
    <>
      <h1 className='font-bold text-3xl md:text-4xl'>Your feed</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* subreddit info */}
        <div className='overflow-hidden h-fit rounded-lg border border-border order-first md:order-last shadow-lg'>
          <div className='bg-primary/70 px-2 py-1'>
            <p className='font-semibold py-3 flex items-center gap-2 '>
              <HomeIcon className='h-4 w-4' />
              Home
            </p>
          </div>
          <div className='px-6 py-4 text-sm leading-6'>
            <div className='flex justify-between gap-x-4 py-3'>
              <p className='text-foreground'>
                Your personal Breadit frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: 'w-full mt-4 mb-6',
              })}
              href={`/r/create`}>
              Create Community
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
