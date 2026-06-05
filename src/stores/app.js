import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { themes } from '../styles/themes'

export const useAppStore = defineStore('app', () => {
  const theme = ref('cyberpunk')
  const sidebarCollapsed = ref(false)
  const isMobile = ref(false)
  const scrollY = ref(0)
  const scrollProgress = ref(0)

  const isDark = computed(() => true)
  const isTerminal = computed(() => theme.value === 'terminal')

  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem('app-theme', newTheme)
  }

  function loadTheme() {
    const saved = localStorage.getItem('app-theme')
    if (saved && themes[saved]) {
      theme.value = saved
    } else {
      // 清除旧主题或无效主题
      localStorage.setItem('app-theme', theme.value)
    }
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function checkMobile() {
    isMobile.value = window.innerWidth <= 768
  }

  function updateScroll() {
    scrollY.value = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
  }

  return {
    theme,
    sidebarCollapsed,
    isMobile,
    scrollY,
    scrollProgress,
    isDark,
    isTerminal,
    setTheme,
    loadTheme,
    toggleSidebar,
    checkMobile,
    updateScroll
  }
})
