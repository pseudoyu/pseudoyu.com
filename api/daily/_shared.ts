// Shared by the api/daily functions and the browser bundle (src/components/Daily*.vue),
// and imported by the edge media proxy: keep it free of imports, Node APIs and cheerio.

// The public Telegram channel behind /daily, and the timezone its posts are shown in
export const CHANNEL = 'pseudoyulife'
export const TIMEZONE = 'Asia/Shanghai'
export const SITE = 'https://www.pseudoyu.com'

export interface DailyImage {
  url: string
  /** width / height */
  ratio?: number
}

export interface DailyVideo {
  /** Missing when Telegram only plays it in the app */
  url?: string
  poster?: string
  ratio?: number
}

export interface DailyLink {
  url: string
  site?: string
  title?: string
  description?: string
  image?: string
}

export interface DailyPost {
  id: number
  datetime: string
  title: string
  html: string
  images: DailyImage[]
  videos: DailyVideo[]
  link?: DailyLink
  forwardedFrom?: { name: string, url?: string }
  reply?: { url: string, text: string }
}

/** GET /api/daily: one page of posts, newest first, with cursors to the pages Telegram has around it */
export interface DailyPage {
  posts: DailyPost[]
  before?: number
  after?: number
}

// Only Telegram's media CDN, so the proxy never becomes an open relay
const MEDIA_HOSTS = ['telesco.pe', 'cdn-telegram.org']

export function isTelegramMedia(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url)
    return protocol === 'https:' && MEDIA_HOSTS.some(host => hostname === host || hostname.endsWith(`.${host}`))
  }
  catch {
    return false
  }
}

/**
 * Telegram media is blocked in mainland China, so it goes through our own proxy.
 * It names a file of a post ("photo-1", "video-0", "poster-0", "link"), so the
 * proxy only ever serves media of this channel.
 */
export function mediaUrl(postId: number, file: string, origin = ''): string {
  return `${origin}/api/daily/media?post=${postId}&file=${file}`
}

/** The Telegram URL of a file named as in mediaUrl, if the post has it */
export function mediaOf(post: DailyPost, file: string): string | undefined {
  if (file === 'link')
    return post.link?.image
  const [, kind, index] = file.match(/^(photo|video|poster)-(\d+)$/) ?? []
  if (kind === 'photo')
    return post.images[Number(index)]?.url
  if (kind === 'video')
    return post.videos[Number(index)]?.url
  if (kind === 'poster')
    return post.videos[Number(index)]?.poster
  return undefined
}

const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export interface DailyDateParts {
  year: string
  month: string
  day: string
  time: string
}

const partsFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIMEZONE,
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

/** The timeline groups posts by year and month and shows day and time beside each one, in Shanghai time */
export function dailyDateParts(datetime: string): DailyDateParts {
  const parts = partsFormat.formatToParts(new Date(datetime))
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value ?? ''
  return { year: part('year'), month: part('month'), day: part('day'), time: `${part('hour')}:${part('minute')}` }
}

export function formatDailyDate(datetime: string): string {
  const parts = dateFormat.formatToParts(new Date(datetime))
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value
  return `${part('month')} ${part('day')}, ${part('year')} · ${part('hour')}:${part('minute')}`
}
