<template>
  <Analytics />
  <CyberBackground />
  <ParticleBackground v-if="!isMobile && !prefersReducedMotion && !isLowEndDevice" />
  <ScrollProgress />

  <ThemeSwitcher />

  <div class="app">
    <nav class="cyber-nav" role="navigation" aria-label="主导航" ref="navEl">
      <div class="nav-brand">
        <div class="brand-logo">SZX</div>
        <span class="brand-sub">DEVELOPER</span>
      </div>

      <div class="nav-links" ref="navLinksEl">
        <router-link to="/" class="nav-item" aria-label="首页">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </span>
            <span class="nav-text">简介</span>
          </div>
          <div class="active-glow"></div>
        </router-link>

        <router-link to="/experience" class="nav-item" aria-label="工作经历">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </span>
            <span class="nav-text">经历</span>
          </div>
          <div class="active-glow"></div>
        </router-link>

        <router-link to="/projects" class="nav-item" aria-label="项目展示">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <span class="nav-text">项目</span>
          </div>
          <div class="active-glow"></div>
        </router-link>

        <router-link to="/lab" class="nav-item" aria-label="实验室与玩具箱">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            </span>
            <span class="nav-text">实验室</span>
          </div>
          <div class="active-glow"></div>
        </router-link>
      </div>

      <div class="nav-footer">
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span>ONLINE</span>
        </div>
      </div>
    </nav>

    <div class="content-area">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
      <CyberFooter />
    </div>

    <button
      class="scroll-to-top"
      :class="{ show: showScrollTop }"
      @click="scrollToTop"
      aria-label="返回顶部"
      ref="scrollTopBtn"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
    <Live2dWidget v-if="!isMobile" />
    <MusicPlayer v-if="!isMobile" songId="2007985391" />
    <CyberTerminalFloating v-if="!isMobile" />
    <CursorTrail v-if="!isMobile" />
    <KonamiEasterEgg />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from './stores/app'
import CyberBackground from './components/CyberBackground.vue'
import CyberFooter from './components/CyberFooter.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Live2dWidget from './components/Live2dWidget.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import CyberTerminalFloating from './components/CyberTerminalFloating.vue'
import CursorTrail from './components/CursorTrail.vue'
import KonamiEasterEgg from './components/KonamiEasterEgg.vue'
import { Analytics } from '@vercel/analytics/vue'
import { gsap, isReducedMotion } from './utils/gsap'

const route = useRoute()
const appStore = useAppStore()
const showScrollTop = computed(() => appStore.scrollY > 300)

const isMobile = computed(() => appStore.isMobile)

const prefersReducedMotion = ref(false)
const isLowEndDevice = ref(false)

const navEl = ref(null)
const navLinksEl = ref(null)
const scrollTopBtn = ref(null)

onMounted(() => {
  prefersReducedMotion.value = isReducedMotion()

  const checkDeviceCapability = () => {
    const memory = navigator.deviceMemory
    const hardwareConcurrency = navigator.hardwareConcurrency
    const mobile = window.innerWidth <= 768

    isLowEndDevice.value =
      (memory && memory < 4) ||
      (hardwareConcurrency && hardwareConcurrency < 4) ||
      mobile
  }

  checkDeviceCapability()
  window.addEventListener('resize', checkDeviceCapability)

  // 导航栏初次入场动画
  if (!prefersReducedMotion.value && navEl.value && navLinksEl.value) {
    const isDesk = window.innerWidth > 768
    gsap.fromTo(navEl.value,
      isDesk ? { x: -30, opacity: 0 } : { y: 30, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }
    )

    const items = navLinksEl.value.querySelectorAll('.nav-item')
    if (items.length > 0) {
      gsap.fromTo(items,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          delay: 0.2,
          ease: 'back.out(1.7)'
        }
      )
    }
  }
})

// 返回顶部按钮 GSAP 弹跳动画
watch(showScrollTop, (show) => {
  if (!scrollTopBtn.value || prefersReducedMotion.value) return

  if (show) {
    gsap.fromTo(scrollTopBtn.value,
      { scale: 0.4, y: 20, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
    )
  } else {
    gsap.to(scrollTopBtn.value, {
      scale: 0.4,
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
  }
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion.value ? 'auto' : 'smooth'
  })
}
</script>

<style>
:root {
  --nav-width: 100px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  position: relative;
}

body {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  background: var(--bg-deep, #040712);
  color: var(--text-main, #ffffff);
  min-height: 100vh;
  min-width: 0;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track, #040712);
}
::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb, rgba(255, 255, 255, 0.2));
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--scrollbar-thumb-hover, #00f0ff);
}

.app {
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  position: relative;
}

/* Minimalist Nav */
.cyber-nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--nav-width);
  background: var(--nav-bg, rgba(5, 5, 16, 0.6));
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-light, rgba(255, 255, 255, 0.08));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  z-index: 100;
  transition: width 0.3s ease;
}

.nav-brand {
  margin-bottom: 3rem;
  text-align: center;
}

.brand-logo {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text-main, #ffffff);
  letter-spacing: 0.1em;
  margin-bottom: 0.2rem;
}

.brand-sub {
  font-size: 0.6rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  letter-spacing: 0.2em;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 0 1rem;
}

.nav-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.nav-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 2;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.nav-text {
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.5;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.active-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--accent-glow, rgba(0, 240, 255, 0.15)), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

/* Hover & Active States */
.nav-item:hover .nav-text,
.nav-item.router-link-active .nav-text {
  opacity: 1;
}

.nav-item:hover {
  color: var(--text-main, #ffffff);
  transform: scale(1.05);
}

.nav-item:hover .active-glow {
  opacity: 0.5;
}

.nav-item.router-link-active {
  color: var(--primary, #00f0ff);
}

.nav-item.router-link-active .active-glow {
  opacity: 1;
}

.nav-item.router-link-active .nav-icon svg {
  filter: drop-shadow(0 0 8px var(--primary, rgba(0, 240, 255, 0.5)));
}

.nav-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 20px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ff88;
}

/* Content Area */
.content-area {
  flex: 1;
  min-height: 0;
  margin-left: var(--nav-width);
  min-height: 100vh;
  padding: 2rem;
  width: calc(100% - var(--nav-width));
  transition: margin-left 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}

.content-area > * {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
}

/* 页面过渡动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Hide Live2D and MusicPlayer on mobile */
@media (max-width: 768px) {
  .live2d-container {
    display: none !important;
  }
  .music-player {
    display: none !important;
  }
}

/* Scroll Top Button */
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background: var(--bg-card, rgba(5, 5, 16, 0.8));
  border: 1px solid var(--border-light, rgba(255, 255, 255, 0.08));
  border-radius: 50%;
  color: var(--text-main, #ffffff);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  z-index: 50;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

.scroll-to-top.show {
  pointer-events: auto;
}

.scroll-to-top:hover {
  border-color: var(--primary, #00f0ff);
  color: var(--primary, #00f0ff);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  html,
  body {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: clip !important;
    position: relative;
    touch-action: pan-y;
  }

  #app,
  .app,
  .content-area {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: clip !important;
    box-sizing: border-box;
  }

  .content-area > * {
    max-width: 100% !important;
    box-sizing: border-box;
  }

  :root {
    --nav-width: 0px;
  }

  .cyber-nav {
    width: 100%;
    height: 64px;
    top: auto;
    bottom: 0;
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-top: 1px solid var(--border-light, rgba(255, 255, 255, 0.08));
    justify-content: space-around;
    background: var(--nav-bg, rgba(5, 5, 16, 0.92));
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .nav-brand, .nav-footer {
    display: none;
  }

  .nav-links {
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
    gap: 0;
  }

  .nav-item {
    height: 100%;
    width: auto;
    flex: 1;
    border-radius: 0;
  }

  .nav-content {
    gap: 3px;
  }

  .nav-icon svg {
    width: 18px;
    height: 18px;
  }

  .nav-text {
    font-size: 0.58rem;
  }

  .content-area {
    margin-left: 0;
    padding: 1rem;
    padding-bottom: calc(90px + env(safe-area-inset-bottom, 0px));
    width: 100%;
  }

  .scroll-to-top {
    bottom: 5rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}
</style>
