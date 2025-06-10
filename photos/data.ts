export interface PhotoMate {
  text?: string
}

export interface Photo extends PhotoMate {
  name: string
  url: string
}

// Remote photo filenames
const remotePhotoFiles = [
  'yu_1.jpg',
  'yu_2.jpg',
  'yu_3.jpg',
  'yu_4.jpg',
  'yu_6.png',
  'yu_7.png',
  'yu_8.png',
  'yu_9.jpg',
  'yu_10.jpg',
  'yu_11.JPG',
  'yu_12.jpg',
  'yu_13.jpg',
  'DSCF0748.JPG',
  'DSCF0761.JPG',
  'DSCF0766.JPG',
  'DSCF0769.JPG',
  'DSCF0784.JPG',
  'DSCF0786.JPG',
  'DSCF0793.JPG',
  'DSCF0795.JPG',
  'DSCF0811.JPG',
  'DSCF0819.JPG',
  'DSCF0831.JPG',
  'DSCF0837.JPG',
  'DSCF0843.JPG',
  'DSCF0850.JPG',
  'DSCF0859.JPG',
  'DSCF0869.JPG',
  'DSCF0900.JPG',
  'DSCF0918.JPG',
  'DSCF1012.JPG',
  'DSCF1104.JPG',
  'DSCF1135.JPG',
  'DSCF1269.JPG',
  'DSCF1406.png',
  'DSCF1444.JPG',
  'DSCF1468.JPG',
  'DSCF1452.JPG',
  'DSCF1536.JPG',
  'DSCF1537.JPG',
  'DSCF1560.JPG',
  'DSCF1582.JPG',
  'DSCF1592.JPG',
  'DSCF1545.png',
  'DSCF1550.png',
  'DSCF1547.png',
  'DSCF1628.JPG',
  'DSCF1655.JPG',
  'DSCF1704.JPG',
  'DSCF1822.JPG',
  'DSCF1823.JPG',
]

const baseUrl = 'https://image.pseudoyu.com/images/'

// Convert filenames to photo objects
const remotePhotos = remotePhotoFiles.map(filename => ({
  name: filename.replace(/\.\w+$/, ''),
  url: baseUrl + filename,
}))

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
}).reverse()

export default photos
