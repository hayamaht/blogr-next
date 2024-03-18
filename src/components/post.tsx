import { PostWithAuthor } from '@/lib/definitions';
import React from 'react'
import ReactMarkdown from 'react-markdown';

export default async function Post({
  post
}: {
  post: PostWithAuthor;
}) {
  //const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div 
      //onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2>{post.title}</h2>
      {/* <small>By {authorName}</small> */}
      <ReactMarkdown>
        {post.content}
      </ReactMarkdown>
    </div>
  )
}
