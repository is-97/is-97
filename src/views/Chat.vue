<template>
  <div class="chat-view">
    <div class="chat-container">
      <ChatInterface />
    </div>
  </div>
</template>

<script setup>
import ChatInterface from '../components/ChatInterface.vue'
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.body.classList.add('chat-page')
})

onUnmounted(() => {
  document.body.classList.remove('chat-page')
})
</script>

<style scoped>
.chat-view {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 0;
  margin: 0;
  position: relative; /* 保持在 content-area 内部流中，但占满空间 */
}

.chat-container {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}
</style>
