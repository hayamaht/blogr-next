import { PostWithAuthor } from '@/lib/definitions';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button, buttonVariants } from './ui/button';
import { BookOpenIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function CardPost({
  post
}: {
  post: PostWithAuthor;
}) {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className='text-muted-foreground'>{authorName}</div>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground line-clamp-2'>
          { post.content }
        </div>
      </CardContent>
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
    </Card>
  )
}
