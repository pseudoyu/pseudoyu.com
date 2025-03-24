export interface PhotoMate {
  text?: string
}

export interface Photo extends PhotoMate {
  name: string
  url: string
}

// Remote photo URLs
const remotePhotos = [
  { name: 'yu_1', url: 'https://image.pseudoyu.com/images/yu_1.jpg' },
  { name: 'yu_2', url: 'https://image.pseudoyu.com/images/yu_2.jpg' },
  { name: 'yu_3', url: 'https://image.pseudoyu.com/images/yu_3.jpg' },
  { name: 'yu_4', url: 'https://image.pseudoyu.com/images/yu_4.jpg' },
  { name: 'yu_6', url: 'https://image.pseudoyu.com/images/yu_6.png' },
  { name: 'yu_7', url: 'https://image.pseudoyu.com/images/yu_7.png' },
  { name: 'yu_8', url: 'https://image.pseudoyu.com/images/yu_8.png' },
  { name: 'yu_9', url: 'https://image.pseudoyu.com/images/yu_9.jpg' },
  { name: 'yu_10', url: 'https://image.pseudoyu.com/images/yu_10.jpg' },
  { name: 'yu_11', url: 'https://image.pseudoyu.com/images/yu_11.JPG' },
  { name: 'yu_12', url: 'https://image.pseudoyu.com/images/yu_12.jpg' },
  { name: 'yu_13', url: 'https://image.pseudoyu.com/images/yu_13.jpg' },
]

// Optional: If you still need to load metadata from local JSON files
const metaInfo = Object.entries(
  import.meta.glob<PhotoMate>('./**/*.json', {
    eager: true,
    import: 'default',
  }),
).map(([name, data]) => {
  return {
    name: name.replace(/\.\w+$/, ''),
    data,
  }
})

// Create photos array from remote URLs, optionally combining with metadata
const photos = remotePhotos.map((photo): Photo => {
  return {
    ...metaInfo.find(info => info.name === photo.name)?.data,
    name: photo.name,
    url: photo.url,
  }
}).sort((a, b) => b.name.localeCompare(a.name))

export default photos
