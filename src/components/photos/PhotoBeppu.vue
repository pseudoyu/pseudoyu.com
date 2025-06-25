<script setup lang="ts">
import type { Photo } from '../../../photos/data'

const photos: Photo[] = [
  {
    name: 'DSCF1269',
    url: 'https://image.pseudoyu.com/images/DSCF1269.JPG',
  },
  {
    name: 'DSCF1406',
    url: 'https://image.pseudoyu.com/images/DSCF1406.png',
  },
  {
    name: 'DSCF1444',
    url: 'https://image.pseudoyu.com/images/DSCF1444.JPG',
  },
  {
    name: 'DSCF1468',
    url: 'https://image.pseudoyu.com/images/DSCF1468.JPG',
  },
  {
    name: 'DSCF1452',
    url: 'https://image.pseudoyu.com/images/DSCF1452.JPG',
  },
]
</script>

<template>
  <PhotoSlide :photos="photos" />
</template>
