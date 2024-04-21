import axios from "axios"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const href = url.searchParams.get('url')

  if (!href) {
    return new Response('Invalid href', { status: 400 })
  }

  const res = await axios.get(href)
  const titleMatch = res.data.match(
    /<title>(.*?)<\/title>/
  )
  const description = res.data.match(
    /<meta name="description" content="(.*?)">/
  )
  const imageMatch = res.data.match(
    /<meta property="og:image" content="(.*?)"/
  )

  const title = titleMatch ? titleMatch[1] : ''
  const imageUrl = imageMatch ? imageMatch[1] : ''

  return new Response(JSON.stringify({
    success: true,
    meta: {
      title,
      image: { url: imageUrl }
    }
  }))
}