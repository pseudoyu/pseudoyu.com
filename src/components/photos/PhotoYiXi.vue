<script setup lang="ts">
import type { Photo } from '../../../photos/data'

const photos: Photo[] = [
  {
    name: 'songbenzai_yixi_03',
    url: 'https://image.pseudoyu.com/images/songbenzai_yixi_03.jpg',
  },
  {
    name: 'songbenzai_yixi_04',
    url: 'https://image.pseudoyu.com/images/songbenzai_yixi_04.jpg',
  },
  {
    name: 'songbenzai_yixi_05',
    url: 'https://image.pseudoyu.com/images/songbenzai_yixi_05.jpg',
  },
  {
    name: 'songbenzai_yixi_06',
    url: 'https://image.pseudoyu.com/images/songbenzai_yixi_06.jpg',
  },
  {
    name: 'songbenzai_yixi_07',
    url: 'https://image.pseudoyu.com/images/songbenzai_yixi_07.jpg',
  },
]
</script>

<template>
  <PhotoSlide :photos="photos" />
</template>
