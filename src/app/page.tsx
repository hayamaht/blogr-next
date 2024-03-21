import Header from "@/components/layouts/header";
import Post from "@/components/post";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/lib/auth-config";
import { fetchPosts } from "@/lib/data";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPosts();
  const session = await auth()
  const user = session?.user;
  
  console.log(posts);
  
  return (
    <main>
      <Header />
      { user && <div className="p-2">
        <Link href={'/post/create'} className={buttonVariants({
          variant: 'default',
        })}>
          Create post
        </Link>
      </div>}
      <div className="p-4">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />  // <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
