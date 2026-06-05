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

// Handle scroll and resize events
appStore.checkMobile()
appStore.updateScroll()

window.addEventListener('resize', () => appStore.checkMobile())
window.addEventListener('scroll', () => appStore.updateScroll(), { passive: true })

app.mount('#app')
