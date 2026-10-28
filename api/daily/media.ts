import { isTelegramMedia } from './_shared.js'

export const config = {
  runtime: 'edge',
}

const PASSED_HEADERS = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified']
// Exact types only: an SVG served from this origin could run script on the blog
const MEDIA_TYPE = /^(?:image\/(?:jpeg|png|webp|gif)|video\/(?:mp4|webm))\s*(?:;|$)/i

/**
 * GET /api/daily/media?url=  Telegram photos and videos, which are blocked
 * in mainland China. Streams through with Range support for video seeking.
 */
export default async function handler(request: Request): Promise<Response> {
  const target = new URL(request.url).searchParams.get('url')
  if (!target)
    return new Response('Missing url', { status: 400 })
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
