import { PostWithAuthor } from '@/lib/definitions';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export default async function Post({
  post
}: {
  post: PostWithAuthor;
}) {
  //const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='text-muted-foreground'>
          { post.content }
        </div>
      </CardContent>
      <CardFooter>
        <Button>Read</Button>
      </CardFooter>
    </Card>
    // <div 
    //   //onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    // >
    //   <h2>{post.title}</h2>
    //   {/* <small>By {authorName}</small> */}
    //   <ReactMarkdown>
    //     {post.content}
    //   </ReactMarkdown>
    // </div>
  )
}
