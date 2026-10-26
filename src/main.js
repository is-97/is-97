import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAppStore } from './stores/app'
import './styles/base.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const appStore = useAppStore()

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

appStore.updateScroll()

window.addEventListener('scroll', rafThrottle(() => appStore.updateScroll()), { passive: true })

app.mount('#app')
