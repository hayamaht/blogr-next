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
    <section>
      test
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam nulla doloribus asperiores quis provident omnis rerum quia autem dicta, sed necessitatibus quas ab, voluptatum accusantium error, earum dolores. Illum, ut?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit culpa, aliquid nam ab distinctio provident earum voluptas delectus tempora voluptate? Velit repudiandae voluptate vel. Nisi voluptatibus ipsum a omnis ullam.
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci quo impedit est illo, nisi, eligendi, vero non asperiores numquam recusandae fugit esse! Vero, officia dolores minima placeat quod atque ullam.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas assumenda cum iste nam, blanditiis laboriosam, omnis esse illo eaque molestias neque rem iure maxime maiores praesentium nemo accusamus, tenetur fuga?
      
    </section>
    // <main>
    //   <Suspense fallback={<LoadingHeaderSkeleton />}>
    //     <Header />
    //   </Suspense>
      
    //   <div className="p-4 container mx-auto pt-16">
    //     <div className="flex items-center justify-between">
    //       <h1 className="text-3xl font-bold">Posts</h1>
    //       <Link href={'/t'} >test</Link>
    //       { user && (
    //         <div className="py-2">
    //           <Link href={'/post/create'} className={cn(
    //             'bg-primary',
    //             buttonVariants({
    //               variant: 'default',
    //             })
    //           )}>
    //             Create post
    //           </Link>
    //         </div>
    //       )}
    //     </div>
    //     <Suspense fallback={<PostsSkeleton />}>
    //       <Posts />
    //     </Suspense>
    //   </div>
    // </main>
  );
}
