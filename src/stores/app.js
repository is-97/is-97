import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const scrollY = ref(0)

  function updateScroll() {
    scrollY.value = window.scrollY
  }

  return {
    scrollY,
    updateScroll
  }
})
