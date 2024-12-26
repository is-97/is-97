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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -2rem;
  overflow: hidden;
}

.chat-container {
  width: 100%;
  max-width: 1200px;
  height: calc(100vh - 4rem);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  box-shadow: 0 8px 32px var(--shadow-color);
  overflow: hidden;
  position: relative;
}
</style>
