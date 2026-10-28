import type { DailyPost } from '../_shared.js'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
// The blog has no test framework; Node's built-in runner keeps it that way
// eslint-disable-next-line test/no-import-node-test
import { describe, it } from 'node:test'
import { formatDailyDate, isTelegramMedia, mediaUrl } from '../_shared.js'
import { channelUrl, parseChannel, parsePost, postUrl } from '../_telegram.js'

const fixture = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf-8')

// Real Telegram markup for posts 4178 (reply), 3980 (forward), 4572 (album),
// 4595 (photo), 4617 (video) and 4633 (link preview), in Telegram's page order.
const { posts } = parseChannel(fixture('channel.html'))
const byId = (id: number) => posts.find(post => post.id === id) as DailyPost

function message(id: number, inner: string) {
  return `<div class="tgme_widget_message_wrap"><div class="tgme_widget_message" data-post="pseudoyulife/${id}">${inner}<a class="tgme_widget_message_date"><time datetime="2026-01-01T00:00:00+00:00"></time></a></div></div>`
}

/** A channel page the way Telegram serves it: paging links in the head, posts in the history section */
function channelPage(messages: string, head = '') {
  return `<html><head>${head}</head><body><section class="tgme_channel_history js-message_history">${messages}</section></body></html>`
}

describe('channelUrl', () => {
  it('points at the public channel page', () => {
    assert.equal(channelUrl(), 'https://t.me/s/pseudoyulife')
  })

  it('turns a tag into a hashtag search and keeps the cursor', () => {
    assert.equal(channelUrl({ tag: 'music', before: 4592 }), 'https://t.me/s/pseudoyulife?q=%23music&before=4592')
    assert.equal(channelUrl({ after: 4500 }), 'https://t.me/s/pseudoyulife?after=4500')
  })
})

describe('postUrl', () => {
  it('points at the embed page of one post', () => {
    assert.equal(postUrl(4617), 'https://t.me/pseudoyulife/4617?embed=1&mode=tme')
  })
})

describe('parseChannel', () => {
  it('lists posts newest first', () => {
    assert.deepEqual(posts.map(post => post.id), [4633, 4617, 4595, 4572, 3980, 4178])
  })

  it('keeps the original timestamp', () => {
    assert.equal(byId(4595).datetime, '2026-09-18T01:50:15+00:00')
  })

  it('cleans the message text and points hashtags at /daily', () => {
    assert.equal(
      byId(4595).html,
      '📺 看过不良一族寻爱记 第二季 <a href="/daily?tag=douban">#douban</a> <a href="/daily?tag=watched">#watched</a><br><br>评分: ★★★★☆<br><blockquote>备注: 堪比《單身即地獄》第五季的精彩程度，每个人都太有活了，结局的时候竟然还有点燃</blockquote><br><br><a href="https://movie.douban.com/subject/38061818/" target="_blank" rel="noopener">https://movie.douban.com/subject/38061818/</a>',
    )
  })

  it('titles a post with its first line of real text', () => {
    assert.equal(byId(4595).title, '📺 看过不良一族寻爱记 第二季')
    assert.equal(byId(4572).title, '去 Randy 家作客，厨艺大比拼！')
    assert.equal(byId(4633).title, '🐦 参见叶天帝 @yetone ！！畅聊三个半小时，疯狂偷学 Agent 开发技巧中 🤩')
    assert.equal(byId(4617).title, '这几周住在东京浅草，离车站有点远，每次出门或是回住所都要步行十几分钟，也都会路过浅草寺，有一整片草坪，天气好的时候很多人…')
  })

  it('reads a single photo with its aspect ratio', () => {
    const [image, ...rest] = byId(4595).images
    assert.equal(rest.length, 0)
    assert.match(image.url, /^https:\/\/cdn5\.telesco\.pe\/file\/aB8HzM1T7wit/)
    assert.ok(Math.abs(image.ratio! - 100 / 124.81481481481) < 0.0001)
  })

  it('reads every photo of an album', () => {
    const images = byId(4572).images
    assert.deepEqual(images.map(image => image.url.slice(0, 41)), [
      'https://cdn5.telesco.pe/file/ajRe8tLMkay4',
      'https://cdn5.telesco.pe/file/ULGUCKF9loMl',
    ])
    assert.deepEqual(images.map(image => image.ratio), [1.3355592654424, 1.3333333333333])
  })

  it('reads a video with its poster', () => {
    const [video] = byId(4617).videos
    assert.match(video.url!, /^https:\/\/cdn\d\.telesco\.pe\/file\/.+\?token=/)
    assert.match(video.poster!, /^https:\/\/cdn5\.telesco\.pe\/file\/ZHbV-zuEcHsv/)
    assert.equal(video.ratio, 100 / 56.25)
    assert.equal(byId(4617).images.length, 0)
  })

  it('reads a link preview', () => {
    const link = byId(4633).link!
    assert.equal(link.url, 'https://fixupx.com/pseudo_yu/status/2115085451409416285')
    assert.equal(link.site, 'FixupX')
    assert.equal(link.title, 'pseudoyu (@pseudo_yu)')
    assert.equal(link.description, '参见叶天帝 @yetone ！！畅聊三个半小时，疯狂偷学 Agent 开发技巧中 🤩')
    assert.match(link.image!, /^https:\/\/cdn4\.telesco\.pe\/file\/NEr-347KtYJ6/)
    assert.equal(byId(3980).link!.image, undefined)
  })

  it('reads where a post was forwarded from', () => {
    assert.deepEqual(byId(3980).forwardedFrom, { name: 'Reorx’s Forge', url: 'https://t.me/reorx_share/5826' })
    assert.equal(byId(4595).forwardedFrom, undefined)
  })

  it('links a reply to the post it answers on /daily', () => {
    assert.deepEqual(byId(4178).reply, {
      url: '/daily/4176',
      text: '📖 写在离开 Folo 之后 #article 同样的经历，类似的感受 https://innei.in/posts/experience/after-leaving-folo',
    })
  })

  it('drops scripts, images, styles and unsafe links from the text', () => {
    const { posts: [post] } = parseChannel(channelPage(message(1, '<div class="tgme_widget_message_text js-message_text"><script>alert(1)</script><img src="x" onerror="alert(1)"><a href="javascript:alert(1)" onclick="x()">click</a> <b style="color:red">bold</b> &lt;tag&gt;</div>')))
    assert.equal(post.html, 'click <b>bold</b> &lt;tag&gt;')
  })

  it('skips service messages and posts with nothing to show', () => {
    const html = message(2, '<div class="tgme_widget_message_text js-message_text">kept</div>')
      + message(3, '<div class="tgme_widget_message_sticker_wrap"></div>')
      + message(4, '<div class="tgme_widget_message_text js-message_text">Channel created</div>').replace('class="tgme_widget_message"', 'class="tgme_widget_message service_message"')
    assert.deepEqual(parseChannel(channelPage(html)).posts.map(post => post.id), [2])
  })

  it('takes the older and newer cursors from Telegram\'s own paging links', () => {
    const page = parseChannel(channelPage('', '<link rel="prev" href="/s/pseudoyulife?q=%23music&before=3773"><link rel="next" href="/s/pseudoyulife?after=4591">'))
    assert.equal(page.before, 3773)
    assert.equal(page.after, 4591)
  })

  it('has no cursor where Telegram has no page, including an empty before=', () => {
    const page = parseChannel(channelPage('', '<link rel="prev" href="/s/pseudoyulife?before=">'))
    assert.equal(page.before, undefined)
    assert.equal(page.after, undefined)
  })

  it('throws instead of reporting an empty channel when the page layout changed', () => {
    assert.throws(() => parseChannel('<html><body><div class="new_layout"></div></body></html>'))
  })

  it('only emits media URLs the proxy will serve', () => {
    const urls = posts.flatMap(post => [
      ...post.images.map(image => image.url),
      ...post.videos.flatMap(video => [video.url, video.poster]),
      post.link?.image,
    ]).filter(url => url !== undefined)
    // 2 album photos, 1 photo, 1 video and its poster, 1 link preview image
    assert.equal(urls.length, 6)
    assert.deepEqual(urls.filter(url => !isTelegramMedia(url)), [])
  })
})

describe('parsePost', () => {
  it('reads the post from its embed page', () => {
    const post = parsePost(fixture('embed-4617.html'))
    assert.equal(post?.id, 4617)
    assert.equal(post?.videos.length, 1)
  })

  it('returns null when Telegram says the post does not exist', () => {
    assert.equal(parsePost(fixture('embed-missing.html')), null)
  })

  it('throws instead of reporting a missing post when the page layout changed', () => {
    assert.throws(() => parsePost('<html><body><div class="new_layout"></div></body></html>'))
  })
})

describe('mediaUrl', () => {
  it('routes Telegram media through the blog proxy', () => {
    assert.equal(mediaUrl('https://cdn5.telesco.pe/file/a.jpg'), '/api/daily/media?url=https%3A%2F%2Fcdn5.telesco.pe%2Ffile%2Fa.jpg')
    assert.equal(mediaUrl('https://cdn5.telesco.pe/file/a.jpg', 'https://www.pseudoyu.com'), 'https://www.pseudoyu.com/api/daily/media?url=https%3A%2F%2Fcdn5.telesco.pe%2Ffile%2Fa.jpg')
  })
})

describe('formatDailyDate', () => {
  it('shows the time in Shanghai, across the date line', () => {
    assert.equal(formatDailyDate('2026-09-18T01:50:15+00:00'), 'Sep 18, 2026 · 09:50')
    assert.equal(formatDailyDate('2025-12-01T20:00:00+00:00'), 'Dec 2, 2025 · 04:00')
  })
})
