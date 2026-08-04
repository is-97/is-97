<template>
  <div class="theme-switcher" :class="{ open: showMenu }">
    <!-- Trigger -->
    <button
      class="theme-trigger"
      :class="{ active: showMenu }"
      @click="toggleMenu"
      :aria-label="'切换主题，当前：' + currentThemeName"
      :aria-expanded="showMenu"
    >
      <div class="trigger-content">
        <svg class="palette-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.21-1.79 4-4 4h-1.5a1.5 1.5 0 0 0-1.5 1.5c0 .41.16.8.44 1.09.28.28.44.68.44 1.09 0 1.25-1.02 2.32-2.88 2.32z"/>
          <circle cx="7.5" cy="11.5" r="1.2" fill="currentColor"/>
          <circle cx="12" cy="7.5" r="1.2" fill="currentColor"/>
          <circle cx="16.5" cy="11.5" r="1.2" fill="currentColor"/>
        </svg>
        <div class="swatch-dots">
          <span class="dot-primary" :style="{ background: currentTheme.swatch[0] }"></span>
          <span class="dot-secondary" :style="{ background: currentTheme.swatch[1] }"></span>
        </div>
      </div>
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
  height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  color: var(--text-muted);
}

.theme-trigger:hover {
  border-color: var(--border-hover);
  color: var(--text-main);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
}

.theme-trigger.active {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 0 16px var(--accent-glow);
}

.trigger-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.palette-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.theme-trigger:hover .palette-icon {
  transform: rotate(15deg);
}

.swatch-dots {
  display: flex;
  align-items: center;
  gap: 4px;
}

.dot-primary,
.dot-secondary {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.theme-trigger:hover .dot-primary {
  transform: scale(1.2);
}

.theme-trigger:hover .dot-secondary {
  transform: scale(1.2);
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
    height: 36px;
    padding: 0 10px;
    border-radius: 10px;
  }

  .palette-icon {
    width: 16px;
    height: 16px;
  }

  .dot-primary,
  .dot-secondary {
    width: 7px;
    height: 7px;
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
