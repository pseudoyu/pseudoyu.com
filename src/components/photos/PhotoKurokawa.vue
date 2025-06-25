<script setup lang="ts">
import type { Photo } from '../../../photos/data'

const photos: Photo[] = [
  {
    name: 'DSCF0748',
    url: 'https://image.pseudoyu.com/images/DSCF0748.JPG',
  },
  {
    name: 'DSCF0761',
    url: 'https://image.pseudoyu.com/images/DSCF0761.JPG',
  },
  {
    name: 'DSCF0766',
    url: 'https://image.pseudoyu.com/images/DSCF0766.JPG',
  },
  {
    name: 'DSCF0769',
    url: 'https://image.pseudoyu.com/images/DSCF0769.JPG',
  },
  {
    name: 'DSCF0784',
    url: 'https://image.pseudoyu.com/images/DSCF0784.JPG',
  },
  {
    name: 'DSCF0786',
    url: 'https://image.pseudoyu.com/images/DSCF0786.JPG',
  },
  {
    name: 'DSCF0793',
    url: 'https://image.pseudoyu.com/images/DSCF0793.JPG',
  },
  {
    name: 'DSCF0795',
    url: 'https://image.pseudoyu.com/images/DSCF0795.JPG',
  },
  {
    name: 'DSCF0811',
    url: 'https://image.pseudoyu.com/images/DSCF0811.JPG',
  },
  {
    name: 'DSCF0819',
    url: 'https://image.pseudoyu.com/images/DSCF0819.JPG',
  },
]
</script>

<template>
  <PhotoSlide :photos="photos" />
</template>
