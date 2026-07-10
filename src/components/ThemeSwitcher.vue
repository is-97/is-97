<template>
  <div class="theme-switcher" :class="{ open: showMenu }">
    <!-- Trigger -->
    <button
      class="theme-trigger"
      @click="toggleMenu"
      :aria-label="'切换主题，当前：' + currentThemeName"
      :aria-expanded="showMenu"
    >
      <span class="trigger-orb" :style="orbStyle">
        <span class="orb-inner" :style="orbInnerStyle"></span>
      </span>
      <span class="trigger-ring" :class="{ active: showMenu }"></span>
    </button>

    <!-- Panel -->
    <Transition name="panel">
      <div v-if="showMenu" class="theme-panel">
        <div class="panel-arrow"></div>
        <div class="panel-inner">
          <div class="panel-head">
            <span class="head-label">THEME</span>
            <span class="head-current">{{ currentThemeName }}</span>
          </div>
          <div class="theme-grid">
            <button
              v-for="(theme, i) in themeList"
              :key="theme.id"
              class="theme-tile"
              :class="{ active: appStore.theme === theme.id }"
              :style="{ '--i': i }"
              @click="selectTheme(theme.id)"
            >
              <!-- Preview window -->
              <span class="tile-preview" :style="previewStyle(theme)">
                <span class="preview-bar" :style="{ background: theme.swatch[0] }"></span>
                <span class="preview-dots">
                  <span :style="{ background: theme.swatch[0] }"></span>
                  <span :style="{ background: theme.swatch[1] }"></span>
                </span>
                <span class="preview-lines">
                  <span></span>
                  <span></span>
                </span>
              </span>
              <!-- Label -->
              <span class="tile-info">
                <span class="tile-icon">{{ theme.icon }}</span>
                <span class="tile-name">{{ theme.name }}</span>
              </span>
              <!-- Active dot -->
              <span class="tile-active" :style="{ background: theme.swatch[0] }"></span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '../stores/app'
import { themeList, applyTheme } from '../styles/themes'

const appStore = useAppStore()
const showMenu = ref(false)

const currentTheme = computed(() => themeList.find(t => t.id === appStore.theme) || themeList[0])
const currentThemeName = computed(() => currentTheme.value?.name || '赛博朋克')

const orbStyle = computed(() => {
  const c = currentTheme.value?.swatch || ['#00f0ff', '#7000ff']
  return { background: `linear-gradient(135deg, ${c[0]}, ${c[1]})` }
})

const orbInnerStyle = computed(() => {
  const c = currentTheme.value?.swatch || ['#00f0ff', '#7000ff']
  return { boxShadow: `0 0 16px ${c[0]}, 0 0 4px ${c[0]}` }
})

function previewStyle(theme) {
  const bg = theme['--bg-deep'] || '#050510'
  return { background: bg }
}

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function selectTheme(themeId) {
  appStore.setTheme(themeId)
  applyTheme(themeId)
  showMenu.value = false
}

function handleClickOutside(e) {
  if (!e.target.closest('.theme-switcher')) {
    showMenu.value = false
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape') showMenu.value = false
}

onMounted(() => {
  applyTheme(appStore.theme)
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 200;
}

/* ====== Trigger ====== */
.theme-trigger {
  position: relative;
  width: 42px;
  height: 42px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.trigger-orb {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.orb-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  transition: box-shadow 0.4s ease;
}

.theme-trigger:hover .trigger-orb {
  transform: scale(1.12);
}

.trigger-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.35s ease;
}

.theme-trigger:hover .trigger-ring {
  border-color: var(--border-hover);
}

.trigger-ring.active {
  border-color: var(--primary);
  box-shadow: 0 0 20px var(--accent-glow);
}

/* ====== Panel ====== */
.theme-panel {
  position: absolute;
  top: calc(100% + 14px);
  right: -6px;
  z-index: 1000;
}

.panel-arrow {
  position: absolute;
  top: -5px;
  right: 22px;
  width: 12px;
  height: 12px;
  background: var(--card-bg);
  border-top: 1px solid var(--border-light);
  border-left: 1px solid var(--border-light);
  transform: rotate(45deg);
  border-radius: 2px 0 0 0;
}

.panel-inner {
  background: var(--card-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.panel-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0 4px 12px;
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 12px;
}

.head-label {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

.head-current {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--primary);
}

/* ====== Grid ====== */
.theme-grid {
  display: flex;
  gap: 10px;
}

/* ====== Tile ====== */
.theme-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  animation: tileIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
  animation-delay: calc(var(--i) * 0.05s);
}

@keyframes tileIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
}

.theme-tile:hover {
  border-color: var(--border-hover);
  background: var(--bg-card-hover);
  transform: translateY(-3px);
}

.theme-tile.active {
  border-color: var(--primary);
  box-shadow: 0 0 16px var(--accent-glow);
}

/* Preview window */
.tile-preview {
  width: 72px;
  height: 52px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.preview-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14px;
  opacity: 0.9;
}

.preview-dots {
  position: absolute;
  top: 4px;
  right: 6px;
  display: flex;
  gap: 4px;
}

.preview-dots span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  opacity: 0.7;
}

.preview-lines {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.preview-lines span {
  height: 3px;
  border-radius: 2px;
  background: var(--text-muted);
  opacity: 0.3;
}

.preview-lines span:first-child {
  width: 70%;
}

.preview-lines span:last-child {
  width: 45%;
}

/* Tile label */
.tile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.tile-icon {
  font-size: 0.9rem;
  line-height: 1;
}

.tile-name {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
  letter-spacing: 0.02em;
  transition: color 0.2s;
}

.theme-tile:hover .tile-name,
.theme-tile.active .tile-name {
  color: var(--text-main);
}

/* Active dot */
.tile-active {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 8px currentColor;
}

.theme-tile.active .tile-active {
  opacity: 1;
  transform: scale(1);
}

/* ====== Panel Transition ====== */
.panel-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.panel-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.panel-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.92);
}
.panel-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.95);
}

/* ====== Responsive ====== */
@media (max-width: 768px) {
  .theme-switcher {
    top: 14px;
    right: 14px;
  }

  .theme-trigger {
    width: 38px;
    height: 38px;
  }

  .trigger-orb {
    width: 30px;
    height: 30px;
  }

  .theme-panel {
    right: -10px;
  }

  .tile-preview {
    width: 64px;
    height: 46px;
  }
}
</style>
