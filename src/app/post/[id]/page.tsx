import { Button, buttonVariants } from '@/components/ui/button';
import { fetchPostById } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, BackpackIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function PostPage({ 
  params: { id } 
}: { 
  params: { id: string } 
}) {
  const post = await fetchPostById(id);

  if(!post) {
    notFound();
  }

  return (
    <section className='container mx-auto my-20 space-y-4'>
      <div>
        <Link href={'/'} className={cn(
          'space-x-2',
          buttonVariants({variant: 'link'})
        )}>
          <ArrowLeftIcon  />
          <span>Back</span>
        </Link>
      </div>
      <div className='flex'>

      </div>
      <h2 className='text-3xl font-bold'>{post.title}</h2>
      <p>{post.content}</p>
    </section>
  )
}
