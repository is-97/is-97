import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css'
import { applyTheme } from './styles/themes'
import { useAppStore } from './stores/app'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize theme from localStorage
const appStore = useAppStore()
appStore.loadTheme()
applyTheme(appStore.theme)

// RAF throttle helper for scroll (avoids layout thrashing)
function rafThrottle(fn) {
  let raf = null
  return () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = null
      fn()
    })
  }
}

// Handle scroll and resize events
appStore.checkMobile()
appStore.updateScroll()

window.addEventListener('resize', () => appStore.checkMobile())
window.addEventListener('scroll', rafThrottle(() => appStore.updateScroll()), { passive: true })

app.mount('#app')