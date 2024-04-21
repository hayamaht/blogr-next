import { auth } from '@/lib/auth-config'
import { fetchManyPosts, } from '@/lib/data'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const session = await auth()

  try {
    const posts = await fetchManyPosts(url, session)
    // console.log(posts)
    return new Response(JSON.stringify(posts))
  } catch (error) {
    console.error(`Error: ${error}`)
    return new Response('Could not fetch posts', { status: 500 })
  }
}