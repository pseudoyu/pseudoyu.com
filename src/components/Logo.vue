<template>
  <img src="/avatar.webp" alt="Avatar" class="avatar">
</template>

<style scoped>
.avatar {
  width: 100%;
  height: auto;
  max-width: 100px;
  border-radius: 50%;
}

@media (prefers-reduced-motion) {
  .avatar {
    animation: none !important;
  }
}

@media print {
  .avatar {
    animation: none !important;
  }
}

@keyframes grow {
  0% {
    transform: scale(0.9);
  }
  40% {
    transform: scale(1);
  }
  85% {
    transform: scale(1);
  }
  95%,
  to {
    transform: scale(0.9);
  }
}

.avatar {
  animation: grow 10s ease forwards infinite;
  transform-origin: center;
}
</style>
