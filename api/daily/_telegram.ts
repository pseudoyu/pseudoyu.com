import type { Cheerio, CheerioAPI } from 'cheerio/slim'
import type { AnyNode, Element, Text } from 'domhandler'
import type { DailyImage, DailyLink, DailyPage, DailyPost, DailyVideo } from './_shared.js'
// The slim build parses strings only; it skips undici and parse5, so the function starts faster
import { load } from 'cheerio/slim'
import { CHANNEL } from './_shared.js'

const TELEGRAM = 'https://t.me'
const TITLE_LENGTH = 60
const KEPT_TAGS = new Set(['b', 'strong', 'i', 'em', 'u', 's', 'del', 'code', 'pre', 'blockquote'])
const CHANNEL_POST = new RegExp(`^https://t\\.me/${CHANNEL}/(\\d+)`)
const ENTITIES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' }

export interface ChannelQuery {
  before?: number
  after?: number
  tag?: string
}

export function channelUrl({ before, after, tag }: ChannelQuery = {}): string {
  const params = new URLSearchParams()
  if (tag)
    params.set('q', `#${tag}`)
  if (before)
    params.set('before', String(before))
  if (after)
    params.set('after', String(after))
  const query = params.toString()
  return `${TELEGRAM}/s/${CHANNEL}${query ? `?${query}` : ''}`
}

export function postUrl(id: number): string {
  return `${TELEGRAM}/${CHANNEL}/${id}?embed=1&mode=tme`
}

export async function fetchChannel(query: ChannelQuery = {}): Promise<DailyPage> {
  return parseChannel(await fetchHtml(channelUrl(query)))
}

export async function fetchPost(id: number): Promise<DailyPost | null> {
  return parsePost(await fetchHtml(postUrl(id)))
}

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'accept': 'text/html',
      'user-agent': 'Mozilla/5.0 (compatible; pseudoyu.com/daily)',
    },
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok)
    throw new Error(`Telegram responded ${response.status} to ${url}`)
  return response.text()
}

/** Telegram lists posts oldest first; /daily shows the newest first */
export function parseChannel(html: string): DailyPage {
  const $ = load(html)
  // Present even on an empty search. Without it the layout changed, which must not look like "no posts"
  if (!$('.tgme_channel_history').length)
    throw new Error('Telegram channel page has no message history; did the layout change?')

  const posts = $('.tgme_widget_message')
    .toArray()
    .map(message => parseMessage($, $(message)))
    .filter(post => post !== null)
    .reverse()
  // Telegram only links pages that exist, so these cursors never lead to an empty page
  return {
    posts,
    before: cursorOf($('link[rel="prev"]').attr('href'), 'before'),
    after: cursorOf($('link[rel="next"]').attr('href'), 'after'),
  }
}

export function parsePost(html: string): DailyPost | null {
  const $ = load(html)
  if ($('.tgme_widget_message_error').length)
    return null
  const message = $('.tgme_widget_message[data-post]').first()
  if (!message.length)
    throw new Error('Telegram embed page has neither a post nor "Post not found"; did the layout change?')
  return parseMessage($, message)
}

/** "/s/pseudoyulife?before=4592" → 4592; an empty "?before=" means there is no such page */
function cursorOf(href = '', name: string): number | undefined {
  return Number(new URLSearchParams(href.split('?')[1]).get(name)) || undefined
}

function parseMessage($: CheerioAPI, message: Cheerio<Element>): DailyPost | null {
  const id = Number(message.attr('data-post')?.split('/')[1])
  const datetime = message.find('.tgme_widget_message_date time').attr('datetime')
  if (!id || !datetime || message.hasClass('service_message'))
    return null

  const text = message.find('.js-message_text').first()
  const post: DailyPost = {
    id,
    datetime,
    title: titleOf(text),
    html: text.contents().toArray().map(node => render($, node)).join('').trim(),
    images: imagesOf($, message),
    videos: videosOf($, message),
    link: linkOf(message),
    forwardedFrom: forwardedFromOf(message),
    reply: replyOf(message),
  }
  return post.html || post.images.length || post.videos.length || post.link ? post : null
}

/**
 * Rebuilds Telegram's message HTML from an allowlist: text, line breaks,
 * basic formatting and http(s) links. Everything else is dropped or unwrapped.
 */
function render($: CheerioAPI, node: AnyNode): string {
  if (isText(node))
    return escapeHtml(node.data)
  if (!isTag(node))
    return ''

  const inner = () => node.children.map((child: AnyNode) => render($, child)).join('')
  switch (node.name) {
    case 'br':
      return '<br>'
    case 'img':
      return ''
    case 'a':
      return renderLink(node.attribs.href, inner())
    case 'i':
      // Telegram draws emoji as a background image with the character inside
      if ($(node).hasClass('emoji'))
        return escapeHtml($(node).text())
  }
  return KEPT_TAGS.has(node.name) ? `<${node.name}>${inner()}</${node.name}>` : inner()
}

// Explicit guards: Vercel's TypeScript build does not narrow domhandler nodes by `type`
function isText(node: AnyNode): node is Text {
  return node.type === 'text'
}

function isTag(node: AnyNode): node is Element {
  return node.type === 'tag'
}

function renderLink(href = '', content: string): string {
  const query = href.startsWith('?') ? new URLSearchParams(href.slice(1)).get('q') : null
  if (query?.startsWith('#'))
    return `<a href="/daily?tag=${encodeURIComponent(query.slice(1))}">${content}</a>`
  if (/^https?:\/\//i.test(href))
    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${content}</a>`
  return content
}

function titleOf(text: Cheerio<Element>): string {
  const clone = text.clone()
  clone.find('br').replaceWith('\n')
  clone.find('blockquote').before('\n')
  const line = clone.text()
    .split('\n')
    .map(line => line.replace(/#[\p{L}\p{N}_]+/gu, '').replace(/\s+/g, ' ').trim())
    .find(Boolean) ?? ''
  const chars = [...line]
  return chars.length > TITLE_LENGTH ? `${chars.slice(0, TITLE_LENGTH).join('')}…` : line
}

function imagesOf($: CheerioAPI, message: Cheerio<Element>): DailyImage[] {
  return message.find('.tgme_widget_message_photo_wrap').toArray().flatMap((element) => {
    const wrap = $(element)
    const url = backgroundOf(wrap.attr('style'))
    // Albums carry the ratio; single photos size an inner box with padding
    const ratio = Number(wrap.attr('data-ratio')) || ratioOf(wrap.find('.tgme_widget_message_photo').attr('style'))
    return url ? [{ url, ratio }] : []
  })
}

function videosOf($: CheerioAPI, message: Cheerio<Element>): DailyVideo[] {
  return message.find('.tgme_widget_message_video_player').toArray().map((element) => {
    const player = $(element)
    return {
      url: player.find('video').attr('src') || undefined,
      poster: backgroundOf(player.find('.tgme_widget_message_video_thumb').attr('style')),
      ratio: ratioOf(player.find('.tgme_widget_message_video_wrap').attr('style')),
    }
  })
}

function linkOf(message: Cheerio<Element>): DailyLink | undefined {
  const preview = message.find('a.tgme_widget_message_link_preview').first()
  const url = preview.attr('href')
  if (!url || !/^https?:\/\//i.test(url))
    return undefined
  return {
    url,
    site: textOf(preview.find('.link_preview_site_name')),
    title: textOf(preview.find('.link_preview_title')),
    description: textOf(preview.find('.link_preview_description')),
    image: backgroundOf(preview.find('.link_preview_image, .link_preview_right_image').attr('style')),
  }
}

function forwardedFromOf(message: Cheerio<Element>): DailyPost['forwardedFrom'] {
  const from = message.find('.tgme_widget_message_forwarded_from_name').first()
  if (!from.length)
    return undefined
  const url = from.attr('href')
  return { name: from.text().trim(), url: url && /^https?:\/\//i.test(url) ? url : undefined }
}

function replyOf(message: Cheerio<Element>): DailyPost['reply'] {
  const reply = message.find('a.tgme_widget_message_reply').first()
  const href = reply.attr('href') ?? ''
  const id = href.match(CHANNEL_POST)?.[1]
  if (!id && !/^https?:\/\//i.test(href))
    return undefined
  return {
    url: id ? `/daily/${id}` : href,
    text: textOf(reply.find('.js-message_reply_text')) ?? '',
  }
}

function textOf(element: Cheerio<Element>): string | undefined {
  return element.text().replace(/\s+/g, ' ').trim() || undefined
}

function backgroundOf(style = ''): string | undefined {
  const url = style.match(/background-image:url\('(.+?)'\)/)?.[1]
  return url?.startsWith('//') ? `https:${url}` : url
}

/** Telegram sizes media boxes as width% / padding-top% of their container */
function ratioOf(style = ''): number | undefined {
  const width = Number(style.match(/(?:^|;)\s*width:\s*([\d.]+)%/)?.[1] ?? 100)
  const height = Number(style.match(/padding-top:\s*([\d.]+)%/)?.[1])
  return height ? width / height : undefined
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ENTITIES[char])
}
