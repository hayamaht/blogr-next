import { PostWithExtras } from '@/lib/definitions';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { buttonVariants } from './ui/button';
import { BookOpenIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { auth } from '@/lib/auth-config';

export default async function CardPost({
  post
}: {
  post: PostWithExtras;
}) {
  const session = await auth();
  const user = session?.user;
  const authorName = post.author ? post.author.name : "Unknown author";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className='flex items-center space-x-2'>
          <Avatar className='w-6 h-6'>
            <AvatarImage src={post.author.image!} />
            <AvatarFallback>{post.author.name?.substring(0,1)}</AvatarFallback>
          </Avatar>
          <div className='text-muted-foreground text-sm'>
            {authorName}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground line-clamp-2'>
          { post.content }
        </div>
      </CardContent>
      { user?.id === post.authorId && (
        <CardFooter>
            <Link href={"/post/" + post.id}
            className={cn(
              'space-x-2',
              buttonVariants()
            )}
          >
            <BookOpenIcon className='w-4 h-4'/>
            <span>Read</span>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
