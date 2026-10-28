import { isTelegramMedia, mediaOf } from './_shared.js'
import { fetchPost } from './_telegram.js'

export const config = {
  runtime: 'edge',
}

const POST_ID = /^[1-9]\d{0,6}$/
const FILE = /^(?:(?:photo|video|poster)-\d{1,2}|link)$/
const PARAMS = new Set(['post', 'file'])
const PASSED_HEADERS = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified']
// Exact types only: an SVG served from this origin could run script on the blog
const MEDIA_TYPE = /^(?:image\/(?:jpeg|png|webp|gif)|video\/(?:mp4|webm))\s*(?:;|$)/i

/**
 * GET /api/daily/media?post=4617&file=video-0  a photo or video of a channel
 * post, which Telegram's CDN serves but mainland China blocks. The URL is looked
 * up from the post itself, so the proxy cannot be pointed at other channels'
 * files. Streams through with Range support for video seeking.
 */
export default async function handler(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams
  const id = params.get('post') ?? ''
  const file = params.get('file') ?? ''
  if ([...params.keys()].some(name => !PARAMS.has(name)) || !POST_ID.test(id) || !FILE.test(file))
    return new Response('Bad request', { status: 400 })

  let target: string | undefined
  try {
    const post = await fetchPost(Number(id))
    target = post ? mediaOf(post, file) : undefined
  }
  catch {
    return new Response('Telegram is unavailable', { status: 502 })
  }
  if (!target)
    return new Response('Not found', { status: 404, headers: { 'cache-control': 'no-store' } })
  if (!isTelegramMedia(target))
    return new Response('Not allowed', { status: 403 })

  const range = request.headers.get('range')
  let upstream: Response
  try {
    // A followed redirect could land outside Telegram's CDN; a 3xx fails the type check below
    upstream = await fetch(target, { headers: range ? { range } : {}, redirect: 'manual' })
  }
  catch {
    return new Response('Upstream fetch failed', { status: 502 })
  }
  if (!MEDIA_TYPE.test(upstream.headers.get('content-type') ?? ''))
    return new Response('Unsupported media', { status: 502 })

  const headers = new Headers({
    'cache-control': upstream.ok ? 'public, max-age=86400, s-maxage=86400' : 'no-store',
    'x-content-type-options': 'nosniff',
  })
  for (const name of PASSED_HEADERS) {
    const value = upstream.headers.get(name)
    if (value)
      headers.set(name, value)
  }
  return new Response(upstream.body, { status: upstream.status, headers })
}
