<template>
  <div class="scroll-progress-bar" ref="progressBar"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { gsap, isReducedMotion } from '../utils/gsap'

const route = useRoute()
const progressBar = ref(null)
let scrollTriggerInstance = null

const initProgress = () => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
    scrollTriggerInstance = null
  }

  if (isReducedMotion() || !progressBar.value) return

  gsap.set(progressBar.value, { scaleX: 0, transformOrigin: 'left center' })

  scrollTriggerInstance = gsap.to(progressBar.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.1
    }
  }).scrollTrigger
}

watch(() => route.path, () => {
  setTimeout(() => {
    initProgress()
  }, 100)
})

onMounted(() => {
  initProgress()
})

onBeforeUnmount(() => {
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill()
  }
})
</script>

<style scoped>
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--primary, #00f0ff), var(--secondary, #7000ff), var(--accent, #ff0055));
  z-index: 1000;
  box-shadow: 0 0 12px var(--primary, #00f0ff);
  pointer-events: none;
  will-change: transform;
}
</style>
