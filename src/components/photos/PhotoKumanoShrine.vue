<script setup lang="ts">
import type { Photo } from '../../../photos/data'

const photos: Photo[] = [
  {
    name: 'DSCF0831',
    url: 'https://image.pseudoyu.com/images/DSCF0831.JPG',
  },
  {
    name: 'DSCF0837',
    url: 'https://image.pseudoyu.com/images/DSCF0837.JPG',
  },
  {
    name: 'DSCF0843',
    url: 'https://image.pseudoyu.com/images/DSCF0843.JPG',
  },
  {
    name: 'DSCF0850',
    url: 'https://image.pseudoyu.com/images/DSCF0850.JPG',
  },
  {
    name: 'DSCF0859',
    url: 'https://image.pseudoyu.com/images/DSCF0859.JPG',
  },
  {
    name: 'DSCF0869',
    url: 'https://image.pseudoyu.com/images/DSCF0869.JPG',
  },
]
</script>

<template>
  <PhotoSlide :photos="photos" />
</template>
