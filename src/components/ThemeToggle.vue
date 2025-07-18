<template>
  <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换到浅色主题' : '切换到深色主题'">
    <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'"></i>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const updateTheme = () => {
  const root = document.documentElement
  
  if (isDark.value) {
    // 深色主题
    root.style.setProperty('--background-color', '#1a1a1a')
    root.style.setProperty('--surface-color', '#2d2d2d')
    root.style.setProperty('--text-primary', '#ffffff')
    root.style.setProperty('--text-secondary', '#a0a0a0')
    root.style.setProperty('--border-color', '#404040')
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)')
    root.style.setProperty('--primary-color', '#3b82f6')
    root.style.setProperty('--secondary-color', '#6b7280')
  } else {
    // 浅色主题
    root.style.setProperty('--background-color', '#ffffff')
    root.style.setProperty('--surface-color', '#f8fafc')
    root.style.setProperty('--text-primary', '#1f2937')
    root.style.setProperty('--text-secondary', '#6b7280')
    root.style.setProperty('--border-color', '#e5e7eb')
    root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)')
    root.style.setProperty('--primary-color', '#3b82f6')
    root.style.setProperty('--secondary-color', '#6b7280')
  }
}

onMounted(() => {
  // 从本地存储读取主题设置
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // 检测系统主题偏好
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  updateTheme()
})
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
}

.theme-toggle:hover {
  background: var(--background-color);
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}
</style>
