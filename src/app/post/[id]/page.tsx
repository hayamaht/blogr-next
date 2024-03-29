import DeletePostButton from '@/components/delete-post-btn';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth-config';
import { fetchPostById } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, BackpackIcon, CircleXIcon, Edit2Icon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostPage({ 
  params: { id } 
}: { 
  params: { id: string } 
}) {
  const post = await fetchPostById(id);
  const session = await auth();
  const user = session?.user;

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
        { user && (
          <div className='flex space-x-2 border-t border-b border-border w-full py-2'>
            <Link href={'./' + post.id + '/edit'} className={cn(
              'space-x-2',
              buttonVariants()
            )}>
              <Edit2Icon className='w-4 h-4' />
              <span>Edit</span>
            </Link>
            <DeletePostButton post={post} />
          </div>
        )}
      </div>
      <h2 className='text-3xl font-bold'>{post.title}</h2>
      <p>{post.content}</p>
    </section>
  )
}
