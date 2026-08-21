<template>
  <div class="floating-terminal-wrapper">
    <!-- 悬浮触发微章胶囊 -->
    <button
      class="terminal-trigger-pill"
      :class="{ 'is-open': isOpen }"
      @click="toggleTerminal"
      title="极客终端 (按 ~ 快捷呼出)"
    >
      <span class="pill-dot"></span>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>
      </svg>
      <span class="pill-text">CLI</span>
      <span class="key-tag">~</span>
    </button>

    <!-- 弹窗/抽屉终端 -->
    <div v-if="isOpen" class="terminal-drawer-mask" @click="isOpen = false">
      <div class="terminal-drawer-panel" @click.stop>
        <div class="drawer-header">
          <div class="header-left">
            <span class="header-status"></span>
            <span class="header-name">QUICK CYBER TERMINAL // NODE-9527</span>
          </div>
          <button class="close-btn" @click="isOpen = false">✕</button>
        </div>
        <div class="drawer-content">
          <WebTerminalToy />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import WebTerminalToy from './lab/WebTerminalToy.vue'

const isOpen = ref(false)

const toggleTerminal = () => {
  isOpen.value = !isOpen.value
}

const handleGlobalKeyDown = (e) => {
  // 按 ~ (Backquote) 或 ` 切换
  if (e.key === '`' || e.key === '~') {
    // 忽略当正在普通的 input / textarea 中输入时的按键
    const activeEl = document.activeElement
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') && !activeEl.classList.contains('terminal-input')) {
      return
    }
    e.preventDefault()
    toggleTerminal()
  } else if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown)
})
</script>

<style scoped>
.floating-terminal-wrapper {
  position: fixed;
  bottom: 24px;
  right: 80px;
  z-index: 999;
}

.terminal-trigger-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 20, 35, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.35);
  backdrop-filter: blur(12px);
  color: var(--primary, #00f0ff);
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 240, 255, 0.15);
  transition: all 0.25s ease;
  font-family: monospace;
}

.terminal-trigger-pill:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: #00f0ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 240, 255, 0.4);
}

.pill-dot {
  width: 6px;
  height: 6px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 6px #00ff88;
}

.pill-text {
  font-size: 0.72rem;
  font-weight: bold;
  letter-spacing: 0.05em;
}

.key-tag {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.6rem;
  padding: 1px 5px;
  border-radius: 4px;
}

/* 抽屉弹窗 */
.terminal-drawer-mask {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 16, 0.75);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.terminal-drawer-panel {
  background: rgba(10, 15, 28, 0.96);
  border: 1px solid rgba(0, 240, 255, 0.4);
  border-radius: 16px;
  width: 100%;
  max-width: 680px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 240, 255, 0.2);
  overflow: hidden;
  animation: scaleUp 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: rgba(15, 25, 45, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88;
  box-shadow: 0 0 8px #00ff88;
}

.header-name {
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--primary, #00f0ff);
  font-weight: bold;
}

.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.close-btn:hover {
  color: #ff0055;
}

.drawer-content {
  padding: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@media (max-width: 768px) {
  .floating-terminal-wrapper {
    right: 20px;
    bottom: 80px;
  }
}
</style>
