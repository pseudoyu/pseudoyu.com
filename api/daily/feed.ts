import type { DailyPost } from './_shared.js'
import { mediaUrl, SITE } from './_shared.js'
import { fetchChannel } from './_telegram.js'

const CACHE = 'public, max-age=300, s-maxage=300, stale-while-revalidate=3600'
const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&apos;' }

/** Served at /daily/feed.xml (see vercel.json) */
export async function GET(): Promise<Response> {
  try {
    const { posts } = await fetchChannel()
    return new Response(renderFeed(posts), {
      headers: { 'content-type': 'application/rss+xml; charset=utf-8', 'cache-control': CACHE },
    })
  }
  catch (error) {
    console.error(error)
    return new Response('Telegram is unavailable', { status: 502 })
  }
}

function renderFeed(posts: DailyPost[]): string {
  const items = posts.map(post => [
    '    <item>',
    `      <title>${escapeXml(post.title || `Daily #${post.id}`)}</title>`,
    `      <link>${SITE}/daily/${post.id}</link>`,
    `      <guid isPermaLink="true">${SITE}/daily/${post.id}</guid>`,
    `      <pubDate>${new Date(post.datetime).toUTCString()}</pubDate>`,
    `      <description>${escapeXml(renderContent(post))}</description>`,
    '    </item>',
  ].join('\n'))

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    '    <title>Daily - pseudoyu</title>',
    `    <link>${SITE}/daily</link>`,
    `    <atom:link href="${SITE}/daily/feed.xml" rel="self" type="application/rss+xml"/>`,
    '    <description>Aggregate the content I consume and create on the Internet.</description>',
    '    <language>zh-CN</language>',
    ...items,
    '  </channel>',
    '</rss>',
  ].join('\n')
}

function renderContent(post: DailyPost): string {
  // Readers open items outside the site, so every link and image needs the full origin
  const html = post.html.replaceAll('href="/', `href="${SITE}/`)
  const images = post.images.map(image => `<p><img src="${mediaUrl(image.url, SITE)}"></p>`)
  // Telegram's video links expire; the poster leads to the post instead
  const videos = post.videos.flatMap(video => video.poster
    ? [`<p><a href="${SITE}/daily/${post.id}"><img src="${mediaUrl(video.poster, SITE)}"></a></p>`]
    : [])
  const link = post.link
    ? `<p><a href="${escapeXml(post.link.url)}">${escapeXml(post.link.title ?? post.link.url)}</a></p>`
    : ''
  return [html && `<p>${html}</p>`, ...images, ...videos, link].join('')
}

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, char => ENTITIES[char])
}
