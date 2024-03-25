import { PostWithAuthor } from '@/lib/definitions';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BookOpenIcon } from 'lucide-react';
import Link from 'next/link';

export default async function CardPost({
  post
}: {
  post: PostWithAuthor;
}) {
  console.log(post.author);
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
        <Link href="/post/${}" className='space-x-2'>
          <BookOpenIcon className='w-4 h-4'/>
          <span>Read</span>
        </Link>
      </CardFooter>
    </Card>
  )
}
