<script setup lang="ts">
import type { DailyPost } from '../../api/daily/_shared'
import { CHANNEL, formatDailyDate, mediaUrl } from '../../api/daily/_shared'

const { post, photoIndex = 0 } = defineProps<{
  post: DailyPost
  /** Where this post's photos start in the page, so ←/→ in the image preview (App.vue) walks through them */
  photoIndex?: number
}>()

const columns = computed(() => [2, 4].includes(post.images.length) ? 2 : 3)
</script>

<template>
  <article class="daily-entry">
    <RouterLink :to="`/daily/${post.id}`" class="!border-none text-sm op50 hover:op75 transition-opacity" :title="post.datetime">
      <time :datetime="post.datetime">{{ formatDailyDate(post.datetime) }}</time>
    </RouterLink>

    <div v-if="post.forwardedFrom" text-sm op50 mt-1>
      <div i-ri-share-forward-line />
      Forwarded from
      <a v-if="post.forwardedFrom.url" :href="post.forwardedFrom.url" target="_blank" rel="noopener">{{ post.forwardedFrom.name }}</a>
      <span v-else>{{ post.forwardedFrom.name }}</span>
    </div>

    <component
      :is="post.reply.url.startsWith('/') ? 'RouterLink' : 'a'"
      v-if="post.reply"
      v-bind="post.reply.url.startsWith('/') ? { to: post.reply.url } : { href: post.reply.url, target: '_blank', rel: 'noopener' }"
      class="!border-none flex gap-1.5 items-baseline text-sm op50 hover:op75 transition-opacity mt-1"
    >
      <div i-ri-reply-line flex-none />
      <span class="line-clamp-1">{{ post.reply.text }}</span>
    </component>

    <div v-if="post.html" class="daily-content mt-2" v-html="post.html" />

    <!-- Same photo idiom as PhotoSlide / PhotoGrid: a `photos` container, utilities as attributes
         (so the preview in App.vue does not inherit the crop) and data-photo-index for ←/→ -->
    <div v-if="post.images.length === 1" class="photos" mt-4>
      <img
        :src="mediaUrl(post.id, 'photo-0')"
        :style="{ aspectRatio: post.images[0].ratio, width: `min(100%, ${28 * (post.images[0].ratio ?? 1)}rem)` }"
        :data-photo-index="photoIndex"
        alt=""
        loading="lazy"
        rounded-lg
      >
    </div>
    <div v-else-if="post.images.length" class="photos" grid gap-1 mt-4 :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }">
      <img
        v-for="(image, index) in post.images"
        :key="image.url"
        :src="mediaUrl(post.id, `photo-${index}`)"
        :data-photo-index="photoIndex + index"
        alt=""
        loading="lazy"
        w-full aspect-square object-cover rounded-lg
      >
    </div>

    <template v-for="(video, index) in post.videos" :key="video.poster ?? video.url">
      <video
        v-if="video.url"
        :src="mediaUrl(post.id, `video-${index}`)"
        :poster="video.poster && mediaUrl(post.id, `poster-${index}`)"
        :style="{ aspectRatio: video.ratio }"
        controls
        playsinline
        preload="none"
        w-full rounded-lg
      />
      <a
        v-else
        :href="`https://t.me/${CHANNEL}/${post.id}`"
        target="_blank"
        rel="noopener"
        class="!border-none relative block mt-4"
      >
        <img v-if="video.poster" :src="mediaUrl(post.id, `poster-${index}`)" :style="{ aspectRatio: video.ratio }" class="w-full my-0! rounded-lg" alt="">
        <span absolute inset-0 flex items-center justify-center gap-1 text-white bg-black:40 rounded-lg>
          <div i-ri-play-circle-line text-xl />
          Watch on Telegram
        </span>
      </a>
    </template>

    <div v-if="post.link" border="~ base rounded-lg" mt-4 of-hidden>
      <a :href="post.link.url" target="_blank" rel="noopener" class="!border-none flex gap-3 hover:bg-gray-500/5 transition-colors">
        <div flex-1 min-w-0 px-3 py-2>
          <div v-if="post.link.site" text-xs op50>{{ post.link.site }}</div>
          <div v-if="post.link.title" font-medium line-clamp-1>{{ post.link.title }}</div>
          <div v-if="post.link.description" text-sm op60 line-clamp-2 leading-normal>{{ post.link.description }}</div>
        </div>
        <div v-if="post.link.image" relative w-24 flex-none>
          <img :src="mediaUrl(post.id, 'link')" class="absolute inset-0 h-full my-0! object-cover" alt="" loading="lazy">
        </div>
      </a>
    </div>
  </article>
</template>

<style scoped>
/* Posts often end with a bare URL that would otherwise push past a phone screen */
.daily-content {
  overflow-wrap: anywhere;
}

.daily-content :deep(blockquote) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
