<template>
  <div class="live2d-container">
    <div id="live2d-widget"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 添加自定义样式到 head
  const style = document.createElement('style')
  style.textContent = `
    #waifu {
      z-index: 999999 !important;
    }
    #waifu-tips {
      z-index: 999999 !important;
    }
    #live2d {
      z-index: 999999 !important;
    }
  `
  document.head.appendChild(style)

  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js'
  script.async = true
  document.body.appendChild(script)
})
</script>

<style scoped>
.live2d-container {
  position: fixed;
  left: 20px;
  bottom: 100px;
  width: 280px;
  height: 250px;
  z-index: 999999;
  pointer-events: none;
}

#live2d-widget {
  pointer-events: auto;
}

@media (max-width: 768px) {
  .live2d-container {
    left: 10px;
    bottom: 120px;
    transform: scale(0.8);
    transform-origin: bottom left;
  }
}
</style>
