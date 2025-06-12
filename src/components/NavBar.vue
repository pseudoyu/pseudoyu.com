<script setup lang="ts">
function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const { y: scroll } = useWindowScroll()
</script>

<template>
  <header class="header z-40">
    <RouterLink
      class="w-12 h-12 absolute xl:fixed m-5 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </RouterLink>
    <button
      title="Scroll to top"
      fixed right-3 bottom-3 w-10 h-10 hover:op100 rounded-full
      hover-bg-hex-8883 transition duration-300 z-100 print:hidden
      :class="scroll > 300 ? 'op30' : 'op0! pointer-events-none'"
      @click="toTop()"
    >
      <div i-ri-arrow-up-line />
    </button>
    <nav class="nav">
      <div class="spacer" />
      <div class="right" print:op0>
        <RouterLink to="/posts" title="Blog">
          <span class="lt-md:hidden">Blog</span>
          <div i-ri-article-line md:hidden />
        </RouterLink>
        <RouterLink to="/projects" title="Projects">
          <span class="lt-md:hidden">Projects</span>
          <div i-ri-lightbulb-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/talks" class="lt-md:hidden" title="Talks">
          <span class="lt-md:hidden">Talks</span>
          <div i-ri-mic-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/media" title="Media">
          <span class="lt-md:hidden">Media</span>
          <div i-ri-movie-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/sponsors-list" title="Sponsors">
          <span class="lt-md:hidden">Sponsors</span>
          <div i-ri-heart-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/chat" title="Let's Chat">
          <span class="lt-md:hidden">Let's Chat</span>
          <div i-ri-chat-1-line class="md:hidden" />
        </RouterLink>
        <RouterLink to="/friends" class="lt-md:hidden" title="Friends">
          <div i-ri-user-heart-line />
        </RouterLink>
        <RouterLink to="/podcasts" class="lt-md:hidden" title="Podcasts">
          <div i-ri-mic-line />
        </RouterLink>
        <a href="https://photography.pseudoyu.com" target="_blank" title="Photos">
          <div i-ri-camera-3-line />
        </a>
        <a href="https://github.com/pseudoyu" target="_blank" title="GitHub" class="lt-md:hidden">
          <div i-uil-github-alt />
        </a>
        <!-- <a href="https://bsky.app/profile/pseudoyu" target="_blank" title="Bluesky" class="lt-md:hidden">
          <div i-ri-bluesky-line />
        </a> -->
        <a href="/feed.xml" target="_blank" title="RSS" class="lt-md:hidden">
          <div i-la-rss-square style="font-size:1.25rem; margin: 0 -0.125rem;" />
        </a>
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.logo {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
