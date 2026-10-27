<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">跳转到主要内容</a>

    <header class="site-header">
      <div class="site-header-inner">
        <router-link to="/" class="brand">
          <img class="brand-mark" src="/favicon-x-v2.svg" alt="" width="40" height="40" />
          <span class="brand-copy">
            <strong>SHI ZHENXING</strong>
            <small>Frontend Lead</small>
          </span>
        </router-link>

        <nav class="desktop-nav" aria-label="主导航">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-link">
            {{ item.label }}
          </router-link>
        </nav>

        <button
          type="button"
          class="menu-toggle"
          :class="{ active: menuOpen }"
          :aria-expanded="menuOpen"
          aria-controls="mobile-navigation"
          :aria-label="menuOpen ? '关闭导航菜单' : '打开导航菜单'"
          @click="menuOpen = !menuOpen"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <Transition name="menu">
        <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="移动端导航">
          <router-link v-for="(item, index) in navItems" :key="item.path" :to="item.path" class="mobile-nav-link">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ item.label }}
          </router-link>
        </nav>
      </Transition>
    </header>

    <main id="main-content" class="site-main" tabindex="-1">
      <router-view v-slot="{ Component }">
        <Transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </main>

    <SiteFooter />

    <button
      type="button"
      class="scroll-to-top"
      :class="{ show: showScrollTop }"
      aria-label="返回顶部"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from './stores/app'
import SiteFooter from './components/SiteFooter.vue'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/experience', label: '工作经历' },
  { path: '/projects', label: '项目案例' },
  { path: '/lab', label: '实验室' }
]

const route = useRoute()
const appStore = useAppStore()
const menuOpen = ref(false)
const showScrollTop = computed(() => appStore.scrollY > 480)

watch(() => route.path, () => {
  menuOpen.value = false
})

const handleKeydown = (event) => {
  if (event.key === 'Escape') menuOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
.site-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid var(--color-line);
  background: rgba(243, 240, 232, 0.92);
  backdrop-filter: blur(18px);
}

.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(calc(100% - 48px), var(--page-width));
  min-height: 76px;
  margin: 0 auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 44px;
  text-decoration: none;
}

.brand-mark {
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
}

.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-copy strong {
  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.brand-copy small {
  margin-top: 0.18rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  position: relative;
  padding: 0.45rem 0;
  color: var(--color-ink-soft);
  font-size: 0.8rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--color-ink);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.25s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-ink);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.menu-toggle {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--color-line);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 16px;
  height: 1px;
  margin: 5px auto;
  background: var(--color-ink);
  transition: transform 0.2s ease;
}

.menu-toggle.active span:first-child {
  transform: translateY(3px) rotate(45deg);
}

.menu-toggle.active span:last-child {
  transform: translateY(-3px) rotate(-45deg);
}

.mobile-nav {
  display: none;
}

.site-main {
  flex: 1;
}

.skip-link {
  position: fixed;
  top: 12px;
  left: 50%;
  z-index: 1000;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.65rem 1rem;
  border: 1px solid var(--color-ink);
  background: var(--color-surface);
  color: var(--color-ink);
  font-size: 0.8rem;
  text-decoration: none;
  transform: translate(-50%, -160%);
  transition: transform 0.2s ease;
}

.skip-link:focus-visible {
  transform: translate(-50%, 0);
}

.scroll-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 80;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-line-strong);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-ink);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px);
  transition: opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

.scroll-to-top.show {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.scroll-to-top:hover {
  border-color: var(--color-ink);
}

.scroll-to-top svg {
  width: 17px;
  height: 17px;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .site-header-inner {
    width: min(calc(100% - 32px), var(--page-width));
    min-height: 68px;
  }

  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    width: min(calc(100% - 32px), var(--page-width));
    margin: 0 auto;
    padding: 0.5rem 0 1.2rem;
    border-top: 1px solid var(--color-line);
  }

  .mobile-nav-link {
    display: flex;
    align-items: baseline;
    gap: 0.9rem;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--color-line);
    font-family: var(--font-display);
    font-size: 1.65rem;
    line-height: 1;
    text-decoration: none;
  }

.mobile-nav-link.router-link-active {
  color: var(--color-accent);
}

  .mobile-nav-link span {
    color: var(--color-ink-faint);
    font-family: var(--font-mono);
    font-size: 0.58rem;
  }

  .scroll-to-top {
    right: 16px;
    bottom: 16px;
  }
}
</style>
