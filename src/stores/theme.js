import { ref } from 'vue'
import { defineStore } from 'pinia'
import { themes } from '../styles/themes'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref(localStorage.getItem('theme') || 'dark')

  function setTheme (theme) {
    if (!themes[theme]) return
    currentTheme.value = theme
    localStorage.setItem('theme', theme)
    applyTheme(theme)
  }

  function applyTheme (theme) {
    const root = document.documentElement
    const colors = themes[theme].colors

    // 设置 CSS 变量
    root.style.setProperty('--primary-color', colors.primary)
    root.style.setProperty('--secondary-color', colors.secondary)
    root.style.setProperty('--background', colors.background)
    root.style.setProperty('--surface-color', colors.surface)
    root.style.setProperty('--text-primary', colors.text.primary)
    root.style.setProperty('--text-secondary', colors.text.secondary)
    root.style.setProperty('--text-accent', colors.text.accent)
    root.style.setProperty('--border-color', colors.border)
    root.style.setProperty('--shadow-color', colors.shadow)
  }

  // 初始化主题
  if (typeof window !== 'undefined') {
    applyTheme(currentTheme.value)
  }

  return {
    currentTheme,
    setTheme,
    themes
  }
})
