import { fetchPostById } from '@/lib/data'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function EditPostPage({
  params: {
    id,
  }
}: {
  params: {
    id: string
  }
}) {
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }
  
  return (
    <div>
      {post.id}
      {post.title}
    </div>
  )
}
