<script lang="ts">
import type { DailyPage, DailyPost } from '../../api/daily/_shared'
import { useHead } from '@unhead/vue'
import { reactive } from 'vue'
import { CHANNEL, dailyDateParts } from '../../api/daily/_shared'

interface Timeline {
  posts: DailyPost[]
  /** Cursor for the next older page; missing once the channel's first post is in */
  before?: number
}

// Everything loaded during this visit, by the API URL the timeline started from. Going Back
// renders it at once, so the router can restore the scroll position however far down it was
const timelines = reactive(new Map<string, Timeline>())

/** Newest first, one copy of each post; `incoming` wins over `kept` */
function merge(kept: DailyPost[], incoming: DailyPost[]): DailyPost[] {
  const byId = new Map([...kept, ...incoming].map(post => [post.id, post]))
  return [...byId.values()].sort((a, b) => b.id - a.id)
}
</script>

<script setup lang="ts">
const route = useRoute()
const mounted = useMounted()

const tag = computed(() => typeof route.query.tag === 'string' ? route.query.tag : '')
const paged = computed(() => Boolean(route.query.before || route.query.after))

const apiUrl = computed(() => {
  const params = new URLSearchParams()
  for (const name of ['tag', 'before', 'after']) {
    const value = route.query[name]
    // Telegram's hashtag search ignores case, so one spelling keeps one cache entry
    if (typeof value === 'string' && value)
      params.set(name, name === 'tag' ? value.toLowerCase() : value)
  }
  const query = params.toString()
  return `/api/daily${query ? `?${query}` : ''}`
})

// The newest posts come from Telegram at visit time, so the prerendered page only holds the loading state
const { data, error, execute } = useFetch(apiUrl, {
  immediate: false,
  refetch: true,
  // Navigating mid-load aborts the old request, which VueUse would otherwise report as an error
  onFetchError: ctx => ctx.error?.name === 'AbortError' ? { error: null } : ctx,
}).json<DailyPage>()
onMounted(execute)

watch(data, (page) => {
  if (!page)
    return
  const current = timelines.get(apiUrl.value)
  // A refresh puts new posts on top and keeps the older ones already loaded below
  timelines.set(apiUrl.value, current
    ? { posts: merge(current.posts, page.posts), before: current.before }
    : { posts: page.posts, before: page.before })
})

const timeline = computed(() => timelines.get(apiUrl.value))
const posts = computed(() => timeline.value?.posts ?? [])

// Like the blog's other lists there are no paging links: older posts load as the end comes near
const end = ref<HTMLElement>()
const nearEnd = useElementVisibility(end, { rootMargin: '0px 0px 800px 0px' })
const loadingOlder = ref(false)
const olderError = ref(false)
watch(apiUrl, () => olderError.value = false)

async function loadOlder() {
  const key = apiUrl.value
  const current = timelines.get(key)
  if (!current?.before || loadingOlder.value)
    return
  loadingOlder.value = true
  olderError.value = false
  try {
    const params = new URLSearchParams(key.split('?')[1])
    params.delete('after')
    params.set('before', String(current.before))
    const response = await fetch(`/api/daily?${params}`)
    if (!response.ok)
      throw new Error(`/api/daily answered ${response.status}`)
    const page: DailyPage = await response.json()
    const latest = timelines.get(key) ?? current
    // A cursor that does not move back would load the same page forever
    const before = page.before && page.before < current.before ? page.before : undefined
    timelines.set(key, { posts: merge(latest.posts, page.posts), before })
  }
  catch {
    olderError.value = true
  }
  finally {
    loadingOlder.value = false
  }
}

// Keeps loading while the end stays in view, as on a tall screen
watchEffect(() => {
  if (nearEnd.value && timeline.value?.before && !loadingOlder.value && !olderError.value)
    loadOlder()
})

// The outlined year (as on /posts and /notes) and the month start each new period
const rows = computed(() => {
  let photos = 0
  return posts.value.map((post, index) => {
    const date = dailyDateParts(post.datetime)
    const previous = index ? dailyDateParts(posts.value[index - 1].datetime) : undefined
    const newYear = date.year !== previous?.year
    const row = {
      post,
      year: newYear ? date.year : undefined,
      month: newYear || date.month !== previous?.month ? date.month : undefined,
      // Photos are numbered across the whole page so the image preview steps from one post into the next
      photoIndex: photos,
    }
    photos += post.images.length
    return row
  })
})

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Daily - pseudoyu', href: '/daily/feed.xml' }],
})
</script>

<template>
  <div>
    <p class="!mt-0 text-sm op50 flex flex-wrap gap-x-4 gap-y-1 items-center">
      <!-- The prerendered page has no query, so these only appear once the app runs -->
      <span v-if="tag && mounted" font-medium>
        #{{ tag }}
        <RouterLink to="/daily" class="ml-1 font-normal">show all</RouterLink>
      </span>
      <RouterLink v-if="paged && mounted" :to="tag ? { path: '/daily', query: { tag } } : '/daily'">
        show latest
      </RouterLink>
      <a :href="`https://t.me/${CHANNEL}`" target="_blank" rel="noopener">
        <span i-ri-telegram-line /> Telegram
      </a>
      <a href="/daily/feed.xml" target="_blank">
        <span i-ri-rss-line /> RSS
      </a>
    </p>

    <div v-if="!timeline && error" py2 op50>
      { couldn't load posts from Telegram }
      <button underline @click="execute()">
        try again
      </button>
    </div>
    <div v-else-if="!timeline" py2 op50>
      { loading… }
    </div>
    <div v-else-if="!posts.length" py2 op50>
      { nothing here yet }
      <RouterLink v-if="paged || tag" to="/daily">
        back to latest
      </RouterLink>
    </div>
    <template v-else>
      <template v-for="row in rows" :key="row.post.id">
        <div v-if="row.year" select-none relative h20 pointer-events-none>
          <span text-8em color-transparent absolute left--3rem top--2rem font-bold text-stroke-2 text-stroke-hex-aaa op10>{{ row.year }}</span>
        </div>
        <div v-if="row.month" class="text-xs uppercase tracking-[0.2em] op50" :class="row.year ? 'mt-2' : 'mt-12'">
          {{ row.month }}
        </div>
        <DailyEntry :post="row.post" :photo-index="row.photoIndex" :class="row.month ? 'mt-4' : 'mt-8'" />
      </template>
      <div ref="end" pt-10 text-sm op50>
        <template v-if="olderError">
          { couldn't load older posts }
          <button underline @click="olderError = false">
            try again
          </button>
        </template>
        <template v-else-if="timeline.before">
          { loading… }
        </template>
      </div>
    </template>
  </div>
</template>
