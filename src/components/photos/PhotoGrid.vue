<script setup lang="ts">
import { computed } from 'vue'
import raw from '../../../photos/data'
import { galleryView } from '../../logics'

const props = defineProps<{
  limit?: number
}>()

const photos = computed(() => {
  if (props.limit)
    return raw.slice(0, props.limit)
  return raw
})

function toggleView() {
  galleryView.value = galleryView.value === 'cover' ? 'contain' : 'cover'
}
</script>

<template>
  <div>
    <div flex="~ gap-1 col items-center justify-center" absolute sm:fixed left-6 top-20>
      <button
        title="Switch view"
        rounded-full p2 op20 hover="op100 bg-#8881"
        @click="toggleView"
      >
        <div :class="galleryView === 'cover' ? 'i-ri-grid-line' : 'i-ri-layout-masonry-line'" />
      </button>
    </div>
    <div class="photos grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" max-w-500 mx-auto>
      <div v-for="photo, idx in photos" :key="idx" class="flex items-center justify-center">
        <img
          :src="photo.url"
          :alt="photo.text || photo.name"
          :data-photo-index="idx"
          loading="lazy"
          class="w-full"
          :class="galleryView === 'cover' ? 'aspect-square object-cover' : 'h-auto object-contain'"
        >
      </div>
    </div>
  </div>
</template>
