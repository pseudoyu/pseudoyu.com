<script setup lang="ts">
import type { DailyPost } from '../../api/daily/_shared'
import { useHead } from '@unhead/vue'
import { isDark } from '~/logics'
import { CHANNEL, dailyDateParts } from '../../api/daily/_shared'

const route = useRoute('/daily/[id]')

const { data, error, statusCode, isFetching, execute } = useFetch(() => `/api/daily?id=${route.params.id}`, {
  immediate: false,
  refetch: true,
  // Navigating mid-load aborts the old request, which VueUse would otherwise report as an error
  onFetchError: ctx => ctx.error?.name === 'AbortError' ? { error: null } : ctx,
}).json<DailyPost>()
onMounted(execute)

const missing = computed(() => statusCode.value === 400 || statusCode.value === 404)
// The day column only shows the day, so the month and year go above the post
const month = computed(() => {
  const date = data.value && dailyDateParts(data.value.datetime)
  return date ? `${date.month} ${date.year}` : ''
})

// Telegram's discussion widget replaces this script with the comments iframe; rebuilt on theme change
const comments = ref<HTMLElement>()
watch([data, comments, isDark], () => {
  if (!data.value || !comments.value)
    return
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://telegram.org/js/telegram-widget.js?22'
  script.dataset.telegramDiscussion = `${CHANNEL}/${data.value.id}`
  script.dataset.commentsLimit = '50'
  script.dataset.colorful = '1'
  if (isDark.value)
    script.dataset.dark = '1'
  comments.value.replaceChildren(script)
})

useHead({
  title: () => data.value?.title ? `${data.value.title} - Daily - pseudoyu` : 'Daily - pseudoyu',
})
</script>

<template>
  <div>
    <div v-if="missing" py2 op50>
      { this post isn't on the channel }
      <RouterLink to="/daily">
        back to daily
      </RouterLink>
    </div>
    <div v-else-if="error" py2 op50>
      { couldn't load this post from Telegram }
      <button underline @click="execute()">
        try again
      </button>
    </div>
    <div v-else-if="!data || isFetching" py2 op50>
      { loading… }
    </div>
    <template v-else>
      <div class="text-xs uppercase tracking-[0.2em] op50">
        {{ month }}
      </div>
      <DailyEntry :post="data" mt-4 />
      <!-- Lined up with the post's text, right of the day column -->
      <p text-sm op50 pl-14>
        <a :href="`https://t.me/${CHANNEL}/${data.id}`" target="_blank" rel="noopener">
          <span i-ri-telegram-line /> View on Telegram
        </a>
      </p>
      <div ref="comments" pl-14 />
    </template>
  </div>
</template>
