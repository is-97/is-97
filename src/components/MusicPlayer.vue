<template>
  <div class="music-player" v-if="shouldRender" ref="playerEl">
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="86"
      loading="lazy"
      :src="`https://music.163.com/outchain/player?type=2&id=${songId}&auto=0&height=66`"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap, isReducedMotion } from '../utils/gsap'

defineProps({
  songId: {
    type: String,
    required: true
  }
})

const shouldRender = ref(false)
const playerEl = ref(null)

onMounted(() => {
  setTimeout(() => {
    shouldRender.value = true
    nextTick(() => {
      if (!isReducedMotion() && playerEl.value) {
        gsap.fromTo(playerEl.value,
          { scale: 0.6, y: 30, opacity: 0 },
          { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
        )
      }
    })
  }, 1200)
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background: var(--surface-color);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.music-player:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .music-player {
    bottom: 80px;
    right: 10px;
    transform: scale(0.9);
    transform-origin: bottom right;
  }

  .music-player:hover {
    transform: scale(0.9) translateY(-5px);
  }
}
</style>
