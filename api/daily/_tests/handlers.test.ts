import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
// The blog has no test framework; Node's built-in runner keeps it that way
// eslint-disable-next-line test/no-import-node-test
import { afterEach, describe, it, mock } from 'node:test'
import { GET as getFeed } from '../feed.js'
import { GET as getDaily } from '../index.js'
import getMedia from '../media.js'

const fixture = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf-8')

function stubFetch(respond: () => Response) {
  const calls: { url: string, headers: Headers, redirect?: RequestRedirect }[] = []
  mock.method(globalThis, 'fetch', async (input: string | URL, init?: RequestInit) => {
    calls.push({ url: String(input), headers: new Headers(init?.headers), redirect: init?.redirect })
    return respond()
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
    assert.ok(xml.includes('https://www.pseudoyu.com/api/daily/media?url=https%3A%2F%2Fcdn5.telesco.pe%2Ffile%2FaB8HzM1T7wit'))
  })
})

describe('GET /api/daily/media', () => {
  const mediaRequest = (target: string, headers?: HeadersInit) =>
    new Request(`https://www.pseudoyu.com/api/daily/media?url=${encodeURIComponent(target)}`, { headers })

  it('streams Telegram media with the visitor\'s range and a long cache', async () => {
    const calls = stubFetch(() => new Response('part', {
      status: 206,
      headers: { 'content-type': 'video/mp4', 'content-range': 'bytes 0-3/100', 'set-cookie': 'a=b' },
    }))
    const response = await getMedia(mediaRequest('https://cdn5.telesco.pe/file/v.mp4', { range: 'bytes=0-3', cookie: 'secret=1' }))

    assert.equal(calls[0].url, 'https://cdn5.telesco.pe/file/v.mp4')
    assert.equal(calls[0].headers.get('range'), 'bytes=0-3')
    assert.equal(calls[0].headers.get('cookie'), null)
    assert.equal(response.status, 206)
    assert.equal(response.headers.get('content-range'), 'bytes 0-3/100')
    assert.equal(response.headers.get('set-cookie'), null)
    assert.match(response.headers.get('cache-control')!, /max-age=86400/)
    assert.equal(await response.text(), 'part')
  })

  it('refuses anything outside Telegram\'s CDN without fetching it', async () => {
    const calls = stubFetch(() => new Response(''))
    assert.equal((await getMedia(new Request('https://www.pseudoyu.com/api/daily/media'))).status, 400)
    for (const target of ['https://evil.example/a.jpg', 'https://cdn5.telesco.pe.evil.example/a.jpg', 'http://cdn5.telesco.pe/a.jpg', 'not a url'])
      assert.equal((await getMedia(mediaRequest(target))).status, 403, target)
    assert.equal(calls.length, 0)
  })

  it('refuses upstream content that is not an image or a video', async () => {
    stubFetch(() => new Response('<script>alert(1)</script>', { headers: { 'content-type': 'text/html' } }))
    const response = await getMedia(mediaRequest('https://cdn5.telesco.pe/file/page'))
    assert.equal(response.status, 502)
    assert.equal(await response.text(), 'Unsupported media')
  })

  it('refuses SVG, which could run script on the blog\'s origin', async () => {
    stubFetch(() => new Response('<svg><script>alert(1)</script></svg>', { headers: { 'content-type': 'image/svg+xml' } }))
    const response = await getMedia(mediaRequest('https://cdn5.telesco.pe/file/a.svg'))
    assert.equal(response.status, 502)
  })

  it('does not follow an upstream redirect, which could leave Telegram\'s CDN', async () => {
    const calls = stubFetch(() => new Response(null, { status: 302, headers: { location: 'https://evil.example/a.jpg' } }))
    const response = await getMedia(mediaRequest('https://cdn5.telesco.pe/file/a.jpg'))
    assert.equal(calls[0].redirect, 'manual')
    assert.equal(response.status, 502)
  })
})
