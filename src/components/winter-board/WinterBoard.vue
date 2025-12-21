<script setup lang="ts">
import type { WorkerMessage, WorkerRemoteMessage } from './worker/messages'
import RenderWorker from './worker?worker'

const containerRef = ref<HTMLDivElement>()
const readyWorker = ref<Worker>()

onMounted(() => {
  // Check if WebGPU is supported
  if (typeof navigator === 'undefined' || !navigator.gpu) {
    return
  }

  const worker = new RenderWorker()
  worker.addEventListener('message', (event) => {
    const msg = event.data as WorkerRemoteMessage
    if (msg.type === 'ready') {
      readyWorker.value = worker
    }
  })

  onUnmounted(() => {
    worker.terminate()
  })
})

watch([readyWorker, containerRef], ([worker, container]) => {
  if (!worker || !container)
    return

  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  const offscreenCanvas = canvas.transferControlToOffscreen()
  worker.postMessage(
    { type: 'attach', canvas: offscreenCanvas } satisfies WorkerMessage,
    [offscreenCanvas],
  )

  container.appendChild(canvas)

  const resizeObserver = new ResizeObserver(() => {
    // Reason: Our renderer is DPI-dependent. Using scale factor 2 for retina displays.
    const scaleFactor = 2
    const width = canvas.clientWidth * scaleFactor
    const height = canvas.clientHeight * scaleFactor
    worker.postMessage({
      type: 'resize',
      width,
      height,
    } satisfies WorkerMessage)
  })
  resizeObserver.observe(canvas)

  onUnmounted(() => {
    resizeObserver.disconnect()
    canvas.remove()
    worker.postMessage({ type: 'detach' } satisfies WorkerMessage)
  })
}, { immediate: true })
</script>

<template>
  <div
    v-if="readyWorker"
    ref="containerRef"
    class="winter-board"
  />
</template>

<style scoped>
.winter-board {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 100;
}
</style>
