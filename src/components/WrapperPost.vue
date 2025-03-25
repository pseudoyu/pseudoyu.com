<script setup lang='ts'>
import { formatDate } from '~/logics'

// Add TypeScript declarations for window properties
declare global {
  interface Window {
    remark_config: {
      host: string
      site_id: string
      components: string[]
      max_shown_comments: number
      simple_view: boolean
      theme: string
      url: string
    }
    REMARK42?: {
      destroy: () => void
      createInstance: (config: any) => void
    }
  }
}

const { frontmatter } = defineProps({
  frontmatter: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()
const content = ref<HTMLDivElement>()

// Computed property to check if current page is a blog post or note
const shouldShowComments = computed(() => {
  const path = route.path

  // Don't show on homepage
  if (path === '/')
    return false

  // Show on /notes
  if (path === '/notes' || path.startsWith('/notes/'))
    return true

  // Show on blog posts with date pattern like /zh/YYYY/MM/DD/title
  const datePattern = /\/zh\/\d{4}\/\d{2}\/\d{2}\//
  if (datePattern.test(path))
    return true

  // Show on posts
  if (path.startsWith('/posts/'))
    return true

  return false
})

// Ensure consistent URL format for Remark42 - remove trailing slash
const normalizedUrl = computed(() => {
  if (typeof window === 'undefined')
    return ''

  // Get full URL (origin + pathname)
  let url = window.location.origin + route.path

  // Add trailing slash if not present for consistent comment storage
  if (!url.endsWith('/'))
    url = `${url}/`

  return url
})

// Detect current theme
const currentTheme = computed(() => {
  if (typeof window === 'undefined')
    return 'light'

  // Check if dark mode is enabled
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
})

// Watch for manual theme changes in document
function setupThemeObserver() {
  if (typeof window === 'undefined')
    return

  // Create a MutationObserver to directly watch for class changes on document element
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        // Force Remark42 to reinitialize with the new theme
        const remark42 = window.REMARK42
        if (remark42 && shouldShowComments.value) {
          const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
          window.remark_config.theme = newTheme
          remark42.destroy()
          remark42.createInstance(window.remark_config)
        }
      }
    }
  })

  // Start observing document element for class attribute changes
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  return observer
}

// Function to initialize Remark42
function initRemark42() {
  if (!shouldShowComments.value || typeof window === 'undefined')
    return

  const remark_config = {
    host: 'https://comments.pseudoyu.com',
    site_id: 'pseudoyu.com',
    components: ['embed', 'counter'],
    max_shown_comments: 20,
    simple_view: true,
    theme: currentTheme.value,
    url: normalizedUrl.value, // Use normalized URL with trailing slash
  }

  window.remark_config = remark_config

  // Reset Remark42 if already loaded
  const remark42 = window.REMARK42
  if (remark42) {
    remark42.destroy()
    remark42.createInstance(remark_config)
  }
  else {
    // Load each component as a module
    for (const component of remark_config.components) {
      const script = document.createElement('script')
      script.src = `${remark_config.host}/web/${component}.mjs`
      script.type = 'module'
      script.defer = true
      script.setAttribute('data-no-instant', '')
      document.head.appendChild(script)
    }
  }
}

onMounted(() => {
  const navigate = () => {
    if (location.hash) {
      const el = document.querySelector(decodeURIComponent(location.hash))
      if (el) {
        const rect = el.getBoundingClientRect()
        const y = window.scrollY + rect.top - 40
        window.scrollTo({
          top: y,
          behavior: 'smooth',
        })
        return true
      }
    }
  }

  const handleAnchors = (
    event: MouseEvent & { target: HTMLElement },
  ) => {
    const link = event.target.closest('a')

    if (
      !event.defaultPrevented
      && link
      && event.button === 0
      && link.target !== '_blank'
      && link.rel !== 'external'
      && !link.download
      && !event.metaKey
      && !event.ctrlKey
      && !event.shiftKey
      && !event.altKey
    ) {
      const url = new URL(link.href)
      if (url.origin !== window.location.origin)
        return

      event.preventDefault()
      const { pathname, hash } = url
      if (hash && (!pathname || pathname === location.pathname)) {
        window.history.replaceState({}, '', hash)
        navigate()
      }
      else {
        router.push({ path: pathname, hash })
      }
    }
  }

  useEventListener(window, 'hashchange', navigate)
  useEventListener(content.value!, 'click', handleAnchors, { passive: false })

  setTimeout(() => {
    if (!navigate())
      setTimeout(navigate, 1000)
  }, 1)

  // Initialize Remark42 with a slight delay to ensure DOM is ready
  setTimeout(initRemark42, 100)

  // Setup theme observer
  const observer = setupThemeObserver()

  // Clean up observer when component is unmounted
  onUnmounted(() => {
    observer?.disconnect()
  })
})

// Re-initialize Remark42 when route changes
watch(() => route.path, () => {
  setTimeout(initRemark42, 100)
})

// Add a watcher to reinitialize Remark42 when theme changes
watch(currentTheme, () => {
  initRemark42() // Immediately apply theme change
})

const ArtComponent = computed(() => {
  let art = frontmatter.art
  if (art === 'random')
    art = Math.random() > 0.5 ? 'plum' : 'dots'
  if (typeof window !== 'undefined') {
    if (art === 'plum')
      return defineAsyncComponent(() => import('./ArtPlum.vue'))
    else if (art === 'dots')
      return defineAsyncComponent(() => import('./ArtDots.vue'))
  }
  return undefined
})

// Add a computed property to determine parent route based on frontmatter type
const parentRoute = computed(() => {
  // If it's a note type article, always go to /notes
  if (frontmatter.type === 'note')
    return '/notes'

  // Original logic for other types
  return route.path.startsWith('/zh/') ? '/posts' : (route.path.split('/').slice(0, -1).join('/') || '/')
})
</script>

<template>
  <div>
    <ClientOnly v-if="ArtComponent">
      <component :is="ArtComponent" />
    </ClientOnly>
    <div
      v-if="frontmatter.display ?? frontmatter.title"
      class="prose m-auto mb-8"
      :class="[frontmatter.wrapperClass]"
    >
      <h1 class="mb-0 slide-enter-50">
        {{ frontmatter.display ?? frontmatter.title }}
      </h1>
      <p
        v-if="frontmatter.date"
        class="opacity-50 !-mt-6 slide-enter-50"
      >
        {{ formatDate(frontmatter.date, false) }} <span v-if="frontmatter.duration">· {{ frontmatter.duration }}</span>
      </p>
      <p v-if="frontmatter.place" class="mt--4!">
        <span op50>at </span>
        <a v-if="frontmatter.placeLink" :href="frontmatter.placeLink" target="_blank">
          {{ frontmatter.place }}
        </a>
        <span v-else font-bold>
          {{ frontmatter.place }}
        </span>
      </p>
      <p
        v-if="frontmatter.subtitle"
        class="opacity-50 !-mt-6 italic slide-enter"
      >
        {{ frontmatter.subtitle }}
      </p>
      <p
        v-if="frontmatter.draft"
        class="slide-enter" bg-orange-4:10 text-orange-4 border="l-3 orange-4" px4 py2
      >
        This is a draft post, the content may be incomplete. Please check back later.
      </p>
    </div>
    <article ref="content" :class="[frontmatter.tocAlwaysOn ? 'toc-always-on' : '', frontmatter.class]">
      <slot />
    </article>

    <!-- Comments section with Remark42 - only shown on blog posts and notes -->
    <div v-if="shouldShowComments" class="prose m-auto mt-8 mb-8 slide-enter animate-delay-500 print:hidden">
      <div class="comments">
        <div class="title">
          <span>Comments</span>
          <span class="counter"><span class="remark42__counter" :data-url="normalizedUrl" /></span>
        </div>
        <div id="remark42" />
      </div>

      <div class="mt-4">
        <span font-mono op50>> </span>
        <RouterLink
          :to="parentRoute"
          class="font-mono op50 hover:op75"
        >
          cd ..
        </RouterLink>
      </div>
    </div>

    <!-- Just navigation for non-blog pages -->
    <div v-else-if="route.path !== '/'" class="prose m-auto mt-8 mb-8 slide-enter animate-delay-500 print:hidden">
      <span font-mono op50>> </span>
      <RouterLink
        :to="parentRoute"
        class="font-mono op50 hover:op75"
      >
        cd ..
      </RouterLink>
    </div>
  </div>
</template>

<style>
.comments {
  margin-top: 2rem;
}

.comments .title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comments .counter {
  font-size: 0.875rem;
  opacity: 0.5;
}
</style>
