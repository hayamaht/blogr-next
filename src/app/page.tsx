import Header from "@/components/layouts/header";
import Post from "@/components/post";
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/data";

export default async function Home() {
  const posts = await fetchPosts()
  
  return (
    <main>
      <Header />
      <Button>Click me</Button>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />  // <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
