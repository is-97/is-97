<template>
  <div class="scroll-progress" :style="{ width: progress + '%' }"></div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const progress = computed(() => appStore.scrollProgress)
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  z-index: 1000;
  transition: width 0.1s ease-out;
  box-shadow: 0 0 10px var(--primary);
}
</style>
