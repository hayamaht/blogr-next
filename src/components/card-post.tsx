import { PostWithExtras } from '@/lib/definitions';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { auth } from '@/lib/auth-config';
import EditPostButton from './edit-post-btn';

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
          { post.content?.toString() }
        </div>
      </CardContent>
      { user?.id === post.authorId && (
        <CardFooter>
          <EditPostButton id={post.id} />
        </CardFooter>
      )}
    </Card>
  )
}
