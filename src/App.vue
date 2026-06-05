<template>
  <Analytics />
  <CyberBackground />
  <ParticleBackground />
  <ScrollProgress />

  <ThemeSwitcher />

  <div class="app">
    <nav class="cyber-nav">
      <div class="nav-brand">
        <div class="brand-logo">SZX</div>
        <span class="brand-sub">DEVELOPER</span>
      </div>

      <div class="nav-links">
        <router-link to="/" class="nav-item">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </span>
            <span class="nav-text">简介</span>
          </div>
          <div class="active-glow"></div>
        </router-link>

        <router-link to="/experience" class="nav-item">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </span>
            <span class="nav-text">经历</span>
          </div>
          <div class="active-glow"></div>
        </router-link>

        <router-link to="/projects" class="nav-item">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <span class="nav-text">项目</span>
          </div>
          <div class="active-glow"></div>
        </router-link>

        <router-link to="/chat" class="nav-item">
          <div class="nav-content">
            <span class="nav-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </span>
            <span class="nav-text">AI助手</span>
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
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <CyberFooter v-if="!isChatPage" />
    </div>

    <button class="scroll-to-top" :class="{ show: showScrollTop }" @click="scrollToTop">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
    <Live2dWidget />
    <MusicPlayer songId="2007985391" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from './stores/app'
import CyberBackground from './components/CyberBackground.vue'
import CyberFooter from './components/CyberFooter.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Live2dWidget from './components/Live2dWidget.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { Analytics } from '@vercel/analytics/vue'

const route = useRoute()
const appStore = useAppStore()
const isChatPage = computed(() => route.path === '/chat')
const showScrollTop = computed(() => appStore.scrollY > 300)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syncopate:wght@400;700&family=JetBrains+Mono:wght@400;500&family=Rajdhani:wght@400;500;600;700&display=swap');

:root {
  --nav-width: 100px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  background: var(--bg-deep, #050510);
  color: var(--text-main, #ffffff);
  min-height: 100vh;
  min-width: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--scrollbar-track, #050510);
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
  opacity: 0;
  transform: translateY(5px);
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
  transform: translateY(0);
}

.nav-item:hover {
  color: var(--text-main, #ffffff);
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

/* Fullscreen pages like Chat */
.content-area:has(.chat-interface),
.content-area:has(.chat-view) {
  height: 100vh;
  min-height: 100vh;
  padding: 0;
  max-width: none;
  overflow: hidden;
}

.content-area:has(.chat-interface) > *,
.content-area:has(.chat-view) > * {
  max-width: none;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
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
  transition: all 0.3s ease;
  z-index: 50;
  backdrop-filter: blur(10px);
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

.scroll-to-top.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.scroll-to-top:hover {
  border-color: var(--primary, #00f0ff);
  color: var(--primary, #00f0ff);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  :root {
    --nav-width: 0px;
  }

  .cyber-nav {
    width: 100%;
    height: 70px;
    top: auto;
    bottom: 0;
    flex-direction: row;
    padding: 0;
    border-right: none;
    border-top: 1px solid var(--border-light, rgba(255, 255, 255, 0.08));
    justify-content: space-around;
    background: var(--nav-bg, rgba(5, 5, 16, 0.9));
  }

  .nav-brand, .nav-footer {
    display: none;
  }

  .nav-links {
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
  }

  .nav-item {
    height: 100%;
    width: auto;
    flex: 1;
  }

  .nav-text {
    font-size: 0.6rem;
  }

  .content-area {
    margin-left: 0;
    padding-bottom: 90px;
  }

  .content-area:has(.chat-interface),
  .content-area:has(.chat-view) {
    height: calc(100vh - 70px);
    min-height: calc(100vh - 70px);
    padding-bottom: 0;
  }

  .scroll-to-top {
    bottom: 5rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}
</style>
