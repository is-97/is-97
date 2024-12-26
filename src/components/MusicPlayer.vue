<template>
  <div class="music-player">
    <iframe 
      frameborder="no" 
      border="0" 
      marginwidth="0" 
      marginheight="0" 
      width="330" 
      height="86" 
      :src="`https://music.163.com/outchain/player?type=2&id=${songId}&auto=0&height=66`"
    ></iframe>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  songId: {
    type: String,
    required: true
  }
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
  transition: transform 0.3s ease;
}

.music-player:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .music-player {
    bottom: 80px; /* 避免在移动设备上遮挡底部导航 */
    right: 10px;
    transform: scale(0.9);
    transform-origin: bottom right;
  }
  
  .music-player:hover {
    transform: scale(0.9) translateY(-5px);
  }
}
</style>
