<template>
  <div class="theme-switcher">
    <div class="theme-grid">
      <button
        v-for="(theme, key) in themeStore.themes"
        :key="key"
        class="theme-button"
        :class="{ active: themeStore.currentTheme === key }"
        @click="themeStore.setTheme(key)"
      >
        <div class="theme-preview" :style="getThemePreviewStyle(theme)"></div>
        <span class="theme-name">{{ theme.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const getThemePreviewStyle = (theme) => {
  return {
    background: theme.colors.background,
    border: `1px solid ${theme.colors.border}`
  }
}
</script>

<style scoped>
.theme-switcher {
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  border-radius: 6px;
  padding: 0.3rem;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 16px var(--shadow-color);
  width: 120px;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
}

.theme-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 3px;
}

.theme-button:hover {
  background: rgba(0, 0, 0, 0.1);
}

.theme-button.active {
  background: rgba(0, 0, 0, 0.15);
}

.theme-preview {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 2px;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
}

.theme-button.active .theme-preview {
  transform: scale(0.95);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.theme-name {
  font-size: 0.75rem;
  color: var(--text-secondary);
  white-space: nowrap;
  transition: all 0.2s ease;
  letter-spacing: 0.02em;
}

.theme-button.active .theme-name {
  color: var(--text-primary);
  font-weight: 500;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .theme-switcher {
    width: 110px;
    padding: 0.25rem;
  }

  .theme-grid {
    gap: 0.15rem;
  }

  .theme-button {
    padding: 0.15rem;
    gap: 0.1rem;
  }

  .theme-name {
    font-size: 0.7rem;
  }
}
</style>
