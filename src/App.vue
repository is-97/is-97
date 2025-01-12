<template>
  <div class="app">
    <nav>
      <div class="nav-links">
        <router-link to="/">个人简介</router-link>
        <router-link to="/experience">工作经历</router-link>
        <router-link to="/projects">项目经验</router-link>
        <router-link to="/chat">AI 助手</router-link>
      </div>
    </nav>
    <div class="content-area">
      <ThemeSwitcher class="theme-switcher-fixed" />
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <button class="scroll-to-top" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
    <Live2dWidget />
    <MusicPlayer songId="2007985391" />
  </div>
</template>

<script setup>
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import Live2dWidget from './components/Live2dWidget.vue'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<style>
:root {
  --primary-color: #3b82f6;
  --secondary-color: #9333ea;
  --background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%);
  --surface-color: rgba(255, 255, 255, 0.05);
  --text-primary: #fff;
  --text-secondary: #a0aec0;
  --text-accent: #3b82f6;
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-color: rgba(0, 0, 0, 0.2);
  --z-index-nav: 100;
  --z-index-theme: 200;
  --z-index-live2d: 999999;
}

body {
  margin: 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--background);
  color: var(--text-primary);
  min-height: 100vh;
}

body.chat-page {
  overflow: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  border-right: 1px solid var(--border-color);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: var(--z-index-nav);
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.nav-links a {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-links a:hover {
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
}

.nav-links a.router-link-active {
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color);
}

.nav-links a.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--primary-color);
  border-radius: 0 3px 3px 0;
}

.theme-switcher-fixed {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: var(--z-index-theme);
}

.content-area {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: calc(100% - 200px);
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
}

.content-area > * {
  width: 1000px;
  max-width: 100%;
}

@media (max-width: 1200px) {
  .content-area > * {
    width: 100%;
  }
}

@media (max-width: 768px) {
  nav {
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    border-right: none;
    border-top: 1px solid var(--border-color);
  }

  .nav-links {
    flex-direction: row;
    padding: 0;
    gap: 1rem;
  }

  .nav-links a {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .nav-links a.router-link-active::before {
    left: 0;
    right: 0;
    top: auto;
    bottom: -0.8rem;
    width: auto;
    height: 2px;
  }

  .content-area {
    margin-left: 0;
    width: 100%;
    padding: 1rem;
    padding-bottom: 5rem;
  }

  .content-area > * {
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 20px var(--shadow-color);
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.scroll-to-top:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.scroll-to-top svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
  transition: transform 0.3s ease;
}

.scroll-to-top:hover svg {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 5rem;
    right: 1rem;
    width: 36px;
    height: 36px;
  }
  
  .scroll-to-top svg {
    width: 18px;
    height: 18px;
  }
}
</style>