<script lang="ts">
import type { DailyPage } from '../../api/daily/_shared'
import { useHead } from '@unhead/vue'
import { reactive } from 'vue'
import { CHANNEL } from '../../api/daily/_shared'

// Pages loaded during this visit, by API URL. Going Back renders them at once,
// so the router can restore the scroll position instead of landing on "loading…"
const loadedPages = reactive(new Map<string, DailyPage>())
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

// Posts come from Telegram at visit time, so the prerendered page only holds the loading state
const { data, error, execute } = useFetch(apiUrl, {
  immediate: false,
  refetch: true,
  // Navigating mid-load aborts the old request, which VueUse would otherwise report as an error
  onFetchError: ctx => ctx.error?.name === 'AbortError' ? { error: null } : ctx,
}).json<DailyPage>()
onMounted(execute)

watch(data, (value) => {
  if (value)
    loadedPages.set(apiUrl.value, value)
})
const page = computed(() => loadedPages.get(apiUrl.value))
const posts = computed(() => page.value?.posts ?? [])
// Number photos across the whole page so the image preview can step from one post into the next
const photoStarts = computed(() => posts.value.map((_, index) =>
  posts.value.slice(0, index).reduce((count, post) => count + post.images.length, 0)))

function pageLink(cursor: 'before' | 'after', id: number) {
  return { path: '/daily', query: { ...(tag.value && { tag: tag.value }), [cursor]: id } }
}

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Daily - pseudoyu', href: '/daily/feed.xml' }],
})
</script>

<template>
  <div>
    <p class="!mt-0 text-sm op50 flex flex-wrap gap-x-4 gap-y-1 items-center">
      <!-- The prerendered page has no query, so the tag only appears once the app runs -->
      <span v-if="tag && mounted" font-medium>
        #{{ tag }}
        <RouterLink to="/daily" class="ml-1 font-normal">show all</RouterLink>
      </span>
      <a :href="`https://t.me/${CHANNEL}`" target="_blank" rel="noopener">
        <span i-ri-telegram-line /> Telegram
      </a>
      <a href="/daily/feed.xml" target="_blank">
        <span i-ri-rss-line /> RSS
      </a>
    </p>

    <div v-if="!page && error" py2 op50>
      { couldn't load posts from Telegram }
      <button underline @click="execute()">
        try again
      </button>
    </div>
    <div v-else-if="!page" py2 op50>
      { loading… }
    </div>
    <div v-else-if="!posts.length" py2 op50>
      { nothing here yet }
      <RouterLink v-if="paged || tag" to="/daily">
        back to latest
      </RouterLink>
    </div>
    <template v-else>
      <template v-for="(post, index) in posts" :key="post.id">
        <hr v-if="index">
        <DailyEntry :post="post" :photo-index="photoStarts[index]" />
      </template>
      <nav v-if="page.after || page.before" flex justify-between font-mono text-sm mt-12>
        <RouterLink v-if="page.after" :to="pageLink('after', page.after)" class="!border-none op50 hover:op75">
          ← newer
        </RouterLink>
        <span v-else />
        <RouterLink v-if="page.before" :to="pageLink('before', page.before)" class="!border-none op50 hover:op75">
          older →
        </RouterLink>
      </nav>
    </template>
  </div>
</template>
