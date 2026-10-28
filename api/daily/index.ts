import { fetchChannel, fetchPost } from './_telegram.js'

// Vercel's CDN keeps each answer for five minutes, like the old daily.pseudoyu.com
const CACHE = 'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
const POST_ID = /^[1-9]\d*$/
const TAG = /^[\p{L}\p{N}_]+$/u
// Anything else would only add CDN cache entries, each costing a fresh Telegram fetch
const PARAMS = new Set(['id', 'before', 'after', 'tag'])

/**
 * GET /api/daily?before=&after=&tag=  one page of posts, newest first
 * GET /api/daily?id=                  one post
 */
export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams
  const [id, before, after] = ['id', 'before', 'after'].map(name => params.get(name))
  const tag = params.get('tag')
  if ([...params.keys()].some(name => !PARAMS.has(name))
    || [id, before, after].some(value => value !== null && !POST_ID.test(value))
    || (tag !== null && !TAG.test(tag))) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  try {
    if (id) {
      const post = await fetchPost(Number(id))
      return Response.json(post ?? { error: 'Not found' }, { status: post ? 200 : 404, headers: { 'cache-control': CACHE } })
    }
    const page = await fetchChannel({
      before: Number(before) || undefined,
      after: Number(after) || undefined,
      tag: tag ?? undefined,
    })
    return Response.json(page, { headers: { 'cache-control': CACHE } })
  }
  catch (error) {
    console.error(error)
    return Response.json({ error: 'Telegram is unavailable' }, { status: 502 })
  }
}
