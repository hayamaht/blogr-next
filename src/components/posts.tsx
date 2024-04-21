// import { fetchPosts } from '@/lib/data'
import React from 'react'
import CardPost from './card-post';

export default async function Posts() {
  // const posts = await fetchPosts();

  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {/* { posts?.map((post) => (
        <CardPost key={post.id} post={post} />
      ))} */}
    </div>
  )
}
