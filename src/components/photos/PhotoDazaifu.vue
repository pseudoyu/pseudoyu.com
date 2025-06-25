<script setup lang="ts">
import type { Photo } from '../../../photos/data'

// 'DSCF1536.JPG',
//   'DSCF1537.JPG',
//   'DSCF1560.JPG',
//   'DSCF1582.JPG',
//   'DSCF1592.JPG',
//   'DSCF1545.png',
//   'DSCF1550.png',
//   'DSCF1547.png',
const photos: Photo[] = [
  {
    name: 'DSCF1536',
    url: 'https://image.pseudoyu.com/images/DSCF1536.JPG',
  },
  {
    name: 'DSCF1537',
    url: 'https://image.pseudoyu.com/images/DSCF1537.JPG',
  },
  {
    name: 'DSCF1560',
    url: 'https://image.pseudoyu.com/images/DSCF1560.JPG',
  },
  {
    name: 'DSCF1582',
    url: 'https://image.pseudoyu.com/images/DSCF1582.JPG',
  },
  {
    name: 'DSCF1592',
    url: 'https://image.pseudoyu.com/images/DSCF1592.JPG',
  },
  {
    name: 'DSCF1545',
    url: 'https://image.pseudoyu.com/images/DSCF1545.png',
  },
  {
    name: 'DSCF1550',
    url: 'https://image.pseudoyu.com/images/DSCF1550.png',
  },
  {
    name: 'DSCF1547',
    url: 'https://image.pseudoyu.com/images/DSCF1547.png',
  },
]
</script>

<template>
  <PhotoSlide :photos="photos" />
</template>
