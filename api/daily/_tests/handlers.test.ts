import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
// The blog has no test framework; Node's built-in runner keeps it that way
// eslint-disable-next-line test/no-import-node-test
import { afterEach, describe, it, mock } from 'node:test'
import { GET as getFeed } from '../feed.js'
import { GET as getDaily } from '../index.js'
import getMedia from '../media.js'

const fixture = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf-8')

function stubFetch(respond: (url: string) => Response) {
  const calls: { url: string, headers: Headers, redirect?: RequestRedirect }[] = []
  mock.method(globalThis, 'fetch', async (input: string | URL, init?: RequestInit) => {
    calls.push({ url: String(input), headers: new Headers(init?.headers), redirect: init?.redirect })
    return respond(String(input))
  })
  return calls
}

afterEach(() => mock.restoreAll())

describe('GET /api/daily', () => {
  it('returns the posts of the requested page and caches them for five minutes', async () => {
    const calls = stubFetch(() => new Response(fixture('channel.html')))
    const response = await getDaily(new Request('https://www.pseudoyu.com/api/daily?tag=music&before=4592'))

    assert.equal(calls[0].url, 'https://t.me/s/pseudoyulife?q=%23music&before=4592')
    assert.equal(response.status, 200)
    assert.match(response.headers.get('cache-control')!, /s-maxage=300/)
    const { posts } = await response.json() as { posts: { id: number }[] }
    assert.deepEqual(posts.map(post => post.id), [4633, 4617, 4595, 4572, 3980, 4178])
  })

  it('returns one post by id', async () => {
    const calls = stubFetch(() => new Response(fixture('embed-4617.html')))
    const response = await getDaily(new Request('https://www.pseudoyu.com/api/daily?id=4617'))

    assert.equal(calls[0].url, 'https://t.me/pseudoyulife/4617?embed=1&mode=tme')
    assert.equal(response.status, 200)
    assert.equal((await response.json() as { id: number }).id, 4617)
  })

  it('answers 404 for a post Telegram does not have', async () => {
    stubFetch(() => new Response(fixture('embed-missing.html')))
    const response = await getDaily(new Request('https://www.pseudoyu.com/api/daily?id=99999'))
    assert.equal(response.status, 404)
  })

  it('rejects malformed cursors and tags without calling Telegram', async () => {
    const calls = stubFetch(() => new Response(''))
    // Unknown parameters too: each one would be a separate CDN cache entry and a fresh Telegram fetch
    for (const query of ['before=abc', 'after=-1', 'id=1e3', 'tag=a%20b', 'tag=', 'x=1', 'tag=music&utm_source=a']) {
      const response = await getDaily(new Request(`https://www.pseudoyu.com/api/daily?${query}`))
      assert.equal(response.status, 400, query)
    }
    assert.equal(calls.length, 0)
  })

  it('answers 502 without caching when Telegram fails', async () => {
    stubFetch(() => new Response('', { status: 500 }))
    mock.method(console, 'error', () => {})
    const response = await getDaily(new Request('https://www.pseudoyu.com/api/daily'))
    assert.equal(response.status, 502)
    assert.equal(response.headers.get('cache-control'), null)
  })

  it('answers 502 without caching when Telegram\'s page layout changed', async () => {
    stubFetch(() => new Response('<html><body><div class="new_layout"></div></body></html>'))
    mock.method(console, 'error', () => {})
    for (const query of ['', '?id=4617']) {
      const response = await getDaily(new Request(`https://www.pseudoyu.com/api/daily${query}`))
      assert.equal(response.status, 502, query)
      assert.equal(response.headers.get('cache-control'), null)
    }
  })
})

describe('GET /daily/feed.xml', () => {
  it('lists the latest posts as RSS items that link back to /daily', async () => {
    const calls = stubFetch(() => new Response(fixture('channel.html')))
    const response = await getFeed()
    const xml = await response.text()

    assert.equal(calls[0].url, 'https://t.me/s/pseudoyulife')
    assert.match(response.headers.get('content-type')!, /^application\/rss\+xml/)
    assert.equal(xml.match(/<item>/g)?.length, 6)
    assert.ok(xml.includes('<link>https://www.pseudoyu.com/daily/4633</link>'))
    assert.ok(xml.includes('<title>去 Randy 家作客，厨艺大比拼！</title>'))
    assert.ok(xml.includes('&lt;a href=&quot;https://www.pseudoyu.com/daily?tag=douban&quot;&gt;#douban&lt;/a&gt;'))
    assert.ok(xml.includes('&lt;img src=&quot;https://www.pseudoyu.com/api/daily/media?post=4595&amp;amp;file=photo-0&quot;&gt;'))
  })
})

describe('GET /api/daily/media', () => {
  const mediaRequest = (query: string, headers?: HeadersInit) =>
    new Request(`https://www.pseudoyu.com/api/daily/media?${query}`, { headers })
  // Telegram's embed page of post 4617 (a video) for t.me, the given answer for its CDN
  const telegram = (media: () => Response) => (url: string) =>
    url.startsWith('https://t.me/') ? new Response(fixture('embed-4617.html')) : media()

  it('streams a file of a channel post with the visitor\'s range and a long cache', async () => {
    const calls = stubFetch(telegram(() => new Response('part', {
      status: 206,
      headers: { 'content-type': 'video/mp4', 'content-range': 'bytes 0-3/100', 'set-cookie': 'a=b' },
    })))
    const response = await getMedia(mediaRequest('post=4617&file=video-0', { range: 'bytes=0-3', cookie: 'secret=1' }))

    assert.equal(calls[0].url, 'https://t.me/pseudoyulife/4617?embed=1&mode=tme')
    assert.match(calls[1].url, /^https:\/\/cdn\d\.telesco\.pe\/file\/.+\?token=/)
    assert.equal(calls[1].headers.get('range'), 'bytes=0-3')
    assert.equal(calls[1].headers.get('cookie'), null)
    assert.equal(response.status, 206)
    assert.equal(response.headers.get('content-range'), 'bytes 0-3/100')
    assert.equal(response.headers.get('set-cookie'), null)
    assert.match(response.headers.get('cache-control')!, /max-age=86400/)
    assert.equal(await response.text(), 'part')
  })

  it('only takes a post number and a file name, so it cannot fetch arbitrary URLs', async () => {
    const calls = stubFetch(() => new Response(''))
    for (const query of ['', 'url=https%3A%2F%2Fcdn5.telesco.pe%2Ffile%2Fa.jpg', 'post=4617', 'post=abc&file=photo-0', 'post=4617&file=..%2Fx', 'post=4617&file=photo-0&url=x'])
      assert.equal((await getMedia(mediaRequest(query))).status, 400, query)
    assert.equal(calls.length, 0)
  })

  it('answers 404 without caching for a missing post or a file the post does not have', async () => {
    stubFetch(url => url.includes('/99999') ? new Response(fixture('embed-missing.html')) : new Response(fixture('embed-4617.html')))
    for (const query of ['post=99999&file=photo-0', 'post=4617&file=photo-0', 'post=4617&file=link']) {
      const response = await getMedia(mediaRequest(query))
      assert.equal(response.status, 404, query)
      assert.equal(response.headers.get('cache-control'), 'no-store')
    }
  })

  it('refuses upstream content that is not an image or a video', async () => {
    stubFetch(telegram(() => new Response('<script>alert(1)</script>', { headers: { 'content-type': 'text/html' } })))
    const response = await getMedia(mediaRequest('post=4617&file=poster-0'))
    assert.equal(response.status, 502)
    assert.equal(await response.text(), 'Unsupported media')
  })

  it('refuses SVG, which could run script on the blog\'s origin', async () => {
    stubFetch(telegram(() => new Response('<svg><script>alert(1)</script></svg>', { headers: { 'content-type': 'image/svg+xml' } })))
    const response = await getMedia(mediaRequest('post=4617&file=poster-0'))
    assert.equal(response.status, 502)
  })

  it('does not follow an upstream redirect, which could leave Telegram\'s CDN', async () => {
    const calls = stubFetch(telegram(() => new Response(null, { status: 302, headers: { location: 'https://evil.example/a.jpg' } })))
    const response = await getMedia(mediaRequest('post=4617&file=poster-0'))
    assert.equal(calls[1].redirect, 'manual')
    assert.equal(response.status, 502)
  })
})
