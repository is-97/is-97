<template>
  <div class="cyber-deep-space">
    <div class="starfield"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap, isReducedMotion } from '../utils/gsap'

onMounted(() => {
  if (!isReducedMotion()) {
    gsap.fromTo('.cyber-deep-space',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
  }
})
</script>

<style scoped>
.cyber-deep-space {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;

  background:
    radial-gradient(circle at 20% 25%, rgba(0, 240, 255, 0.07) 0%, transparent 55%),
    radial-gradient(circle at 80% 30%, rgba(120, 40, 255, 0.06) 0%, transparent 55%),
    radial-gradient(circle at 50% 85%, rgba(0, 140, 255, 0.05) 0%, transparent 60%),
    radial-gradient(circle at 50% 50%, #091024 0%, #060b1a 50%, #040712 100%);
}

/* 均匀细腻的星尘点缀 */
.starfield {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 30px 40px, rgba(255, 255, 255, 0.65), transparent),
    radial-gradient(1px 1px at 90px 130px, rgba(0, 240, 255, 0.6), transparent),
    radial-gradient(1px 1px at 170px 75px, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1.5px 1.5px at 230px 200px, rgba(0, 240, 255, 0.7), transparent),
    radial-gradient(1px 1px at 300px 120px, rgba(255, 255, 255, 0.45), transparent);
  background-size: 300px 300px;
  opacity: 0.35;
  animation: starfieldDrift 140s linear infinite;
}

@keyframes starfieldDrift {
  0% { transform: translateY(0); }
  100% { transform: translateY(-300px); }
}
</style>
