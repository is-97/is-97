<template>
  <div class="theme-switcher">
    <button
      class="theme-btn"
      @click="toggleMenu"
      :title="'当前主题: ' + currentThemeName"
    >
      <span class="theme-icon">{{ currentThemeIcon }}</span>
    </button>
    <Transition name="menu">
      <div v-if="showMenu" class="theme-menu">
        <button
          v-for="theme in themeList"
          :key="theme.id"
          class="theme-option"
          :class="{ active: appStore.theme === theme.id }"
          @click="selectTheme(theme.id)"
        >
          <span class="option-icon">{{ theme.icon }}</span>
          <span class="option-name">{{ theme.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '../stores/app'
import { themeList, applyTheme } from '../styles/themes'

const appStore = useAppStore()
const showMenu = ref(false)

const currentTheme = computed(() => themeList.find(t => t.id === appStore.theme) || themeList[0])
const currentThemeName = computed(() => currentTheme.value?.name || '赛博朋克')
const currentThemeIcon = computed(() => currentTheme.value?.icon || '⚡')

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function selectTheme(themeId) {
  appStore.setTheme(themeId)
  applyTheme(themeId)
  showMenu.value = false
}

onMounted(() => {
  applyTheme(appStore.theme)
})

// Close menu when clicking outside
function handleClickOutside(e) {
  if (!e.target.closest('.theme-switcher')) {
    showMenu.value = false
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClickOutside)
}
</script>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 200;
}

.theme-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.theme-btn:hover {
  border-color: var(--primary);
  box-shadow: 0 0 15px var(--accent-glow);
  transform: scale(1.1);
}

.theme-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.6rem 1rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: var(--font-body);
  font-size: 0.9rem;
}

.theme-option:hover {
  background: var(--bg-card-hover);
  color: var(--text-main);
}

.theme-option.active {
  color: var(--primary);
  background: var(--chip-bg);
}

.option-icon {
  font-size: 1.1rem;
}

.option-name {
  white-space: nowrap;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.menu-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.menu-leave-to {
  opacity: 0;
  transform: translateY(-5px) scale(0.95);
}
</style>
