'use client'

import { useTransition } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { BookOpenIcon } from 'lucide-react';

export default function EditPostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()
  
  return (
    <Button className='space-x-2 ' 
      disabled={isPending}
      // onClick={() => router.push(`/post/${id}`)}
      onClick={async () => {
        startTransition(async () => {
          await router.push(`/post/${id}`);
        })
      }}
    >
      {/* <svg className="motion-reduce:hidden animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> */}
      <BookOpenIcon className='w-4 h-4'/>
      <span>Read</span>
    </Button>
  )
}
