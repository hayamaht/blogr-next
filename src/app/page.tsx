import Post from "@/components/post";
import { fetchPosts } from "@/lib/data";

export default async function Home() {
  const posts = await fetchPosts()
  
  return (
    <main>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />  // <Post key={post.id} post={post} />
      ))}
    </main>
  );
}
