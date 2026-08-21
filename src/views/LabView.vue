<template>
  <div class="holo-lab" ref="labContainer">
    <!-- 顶部科技标头 -->
    <div class="page-header" ref="pageHeader">
      <div class="header-content">
        <div class="holo-badge">
          <span class="badge-icon">&#9673;</span>
          <span class="badge-text">PLAYGROUND // OPEN SOURCE MATRIX</span>
        </div>
        <h1 class="page-title">
          <span class="glitch-text" data-text="CYBER_LAB">CYBER_LAB</span>
        </h1>
        <div class="header-meta">
          <span class="meta-item">TOYS: 6 INTERACTIVE</span>
          <span class="meta-sep">//</span>
          <span class="meta-item">REPOS: 12+ CURATED</span>
          <span class="meta-sep">//</span>
          <span class="meta-item">STATUS: READY_TO_PLAY</span>
        </div>
      </div>

      <!-- Tab 切换导航 -->
      <div class="lab-tabs">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'arcade' }"
          @click="activeTab = 'arcade'"
        >
          <span class="tab-icon">🎮</span>
          <span>在线极客游乐场</span>
          <span class="tab-count">{{ labToys.length }}</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'repos' }"
          @click="activeTab = 'repos'"
        >
          <span class="tab-icon">⭐</span>
          <span>GitHub 神级好玩项目宝库</span>
          <span class="tab-count">{{ awesomeGithubProjects.length }}</span>
        </button>
      </div>

      <div class="header-scanner"></div>
    </div>

    <!-- TAB 1: 在线极客游乐场 -->
    <div v-if="activeTab === 'arcade'" class="arcade-container" ref="arcadeSection">
      <!-- 玩具侧边栏选择列表 -->
      <div class="toy-selector-list">
        <button
          v-for="toy in labToys"
          :key="toy.id"
          class="toy-card-nav"
          :class="{ active: currentToyId === toy.id }"
          @click="currentToyId = toy.id"
        >
          <div class="toy-nav-icon">{{ toy.icon }}</div>
          <div class="toy-nav-meta">
            <span class="toy-nav-badge">{{ toy.badge }}</span>
            <h4 class="toy-nav-name">{{ toy.name }}</h4>
            <span class="toy-nav-cat">{{ toy.category }}</span>
          </div>
          <div class="toy-nav-arrow">❯</div>
        </button>
      </div>

      <!-- 当前活动的游乐场舞台 -->
      <div class="toy-stage">
        <div class="stage-header" v-if="currentToyData">
          <div class="stage-info">
            <div class="stage-badge-wrap">
              <span class="stage-icon">{{ currentToyData.icon }}</span>
              <span class="stage-category">{{ currentToyData.category }}</span>
            </div>
            <h2 class="stage-title">{{ currentToyData.name }}</h2>
            <p class="stage-desc">{{ currentToyData.desc }}</p>
          </div>

          <div class="stage-actions">
            <a
              v-if="currentToyData.repoUrl"
              :href="currentToyData.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="repo-link"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>开源致敬: {{ currentToyData.repo }}</span>
            </a>
          </div>
        </div>

        <!-- 玩具动态渲染区域 -->
        <div class="stage-component-wrap">
          <transition name="stage-fade" mode="out-in">
            <component :is="currentToyComponent" :key="currentToyId" />
          </transition>
        </div>
      </div>
    </div>

    <!-- TAB 2: GitHub 神级好玩项目宝库 -->
    <div v-else class="repos-container" ref="reposSection">
      <!-- 类别筛选器 -->
      <div class="filter-pills">
        <button
          v-for="cat in repoCategories"
          :key="cat"
          class="pill-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 项目卡片网格 -->
      <div class="repos-grid">
        <div
          v-for="repo in filteredRepos"
          :key="repo.id"
          class="repo-card"
          ref="repoCardRefs"
        >
          <div class="card-glass"></div>
          <div class="card-border" :style="{ borderColor: repo.color }"></div>

          <div class="card-header">
            <div class="author-tag">{{ repo.author }} /</div>
            <div class="stars-badge">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#ffaa00"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span>{{ repo.stars }}</span>
            </div>
          </div>

          <h3 class="repo-name" :style="{ color: repo.color || '#00f0ff' }">
            {{ repo.name }}
          </h3>

          <div class="repo-tag-pill">
            <span class="cat-label">{{ repo.category }}</span>
            <span class="sub-label">{{ repo.tag }}</span>
          </div>

          <p class="repo-desc">{{ repo.desc }}</p>

          <div class="repo-highlights">
            <div v-for="(h, idx) in repo.highlights" :key="idx" class="highlight-item">
              <span class="h-bullet" :style="{ background: repo.color || '#00f0ff' }"></span>
              <span>{{ h }}</span>
            </div>
          </div>

          <div class="repo-footer">
            <a
              :href="repo.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="visit-repo-btn"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>查看仓库与源码</span>
              <span class="btn-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { labToys, awesomeGithubProjects } from '../data/labProjects'
import { gsap, bindCardTilt, isReducedMotion } from '../utils/gsap'

import MatrixRainToy from '../components/lab/MatrixRainToy.vue'
import Cyber2048Toy from '../components/lab/Cyber2048Toy.vue'
import NeonSnakeToy from '../components/lab/NeonSnakeToy.vue'
import WebTerminalToy from '../components/lab/WebTerminalToy.vue'
import CyberSoundboxToy from '../components/lab/CyberSoundboxToy.vue'
import GravitonSandboxToy from '../components/lab/GravitonSandboxToy.vue'

const activeTab = ref('arcade') // 'arcade', 'repos'
const currentToyId = ref('matrix-rain')
const selectedCategory = ref('全部')

const pageHeader = ref(null)
const arcadeSection = ref(null)
const reposSection = ref(null)
const repoCardRefs = ref([])

const toyComponentMap = {
  'matrix-rain': MatrixRainToy,
  'cyber-2048': Cyber2048Toy,
  'neon-snake': NeonSnakeToy,
  'hacker-terminal': WebTerminalToy,
  'cyber-soundbox': CyberSoundboxToy,
  'graviton-sandbox': GravitonSandboxToy
}

const currentToyComponent = computed(() => toyComponentMap[currentToyId.value] || MatrixRainToy)
const currentToyData = computed(() => labToys.find(t => t.id === currentToyId.value))

const repoCategories = computed(() => {
  const cats = ['全部']
  awesomeGithubProjects.forEach(p => {
    if (!cats.includes(p.category)) cats.push(p.category)
  })
  return cats
})

const filteredRepos = computed(() => {
  if (selectedCategory.value === '全部') return awesomeGithubProjects
  return awesomeGithubProjects.filter(p => p.category === selectedCategory.value)
})

let tiltCleanups = []

const bindTilts = () => {
  tiltCleanups.forEach(c => c())
  tiltCleanups = []

  if (isReducedMotion()) return

  nextTick(() => {
    const cards = document.querySelectorAll('.repo-card')
    cards.forEach(card => {
      const cleanup = bindCardTilt(card, { maxTilt: 6, scale: 1.02 })
      tiltCleanups.push(cleanup)
    })
  })
}

onMounted(() => {
  nextTick(() => {
    if (!isReducedMotion() && pageHeader.value) {
      gsap.fromTo(pageHeader.value,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
    }
    bindTilts()
  })
})

watch(activeTab, () => {
  bindTilts()
})

watch(selectedCategory, () => {
  bindTilts()
})

onBeforeUnmount(() => {
  tiltCleanups.forEach(c => c())
})
</script>

<style scoped>
.holo-lab {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 4rem;
}

/* 顶部 Header */
.page-header {
  position: relative;
  background: rgba(10, 15, 30, 0.6);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.holo-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.badge-icon {
  animation: spinSlow 6s linear infinite;
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.page-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.05em;
  margin-bottom: 0.8rem;
}

.glitch-text {
  position: relative;
  display: inline-block;
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.75rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.meta-sep {
  color: rgba(255, 255, 255, 0.2);
}

.header-scanner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary, #00f0ff), transparent);
  animation: scanLoop 3s ease-in-out infinite;
}

@keyframes scanLoop {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Tabs 切换 */
.lab-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(20, 25, 45, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text-muted, rgba(255, 255, 255, 0.7));
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

.tab-btn:hover {
  background: rgba(30, 40, 70, 0.9);
  border-color: rgba(0, 240, 255, 0.4);
  color: #fff;
}

.tab-btn.active {
  background: rgba(0, 240, 255, 0.15);
  border-color: var(--primary, #00f0ff);
  color: var(--primary, #00f0ff);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.tab-count {
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.7rem;
}

/* ================= 游乐场布局 ================= */
.arcade-container {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}

.toy-selector-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toy-card-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(12, 18, 35, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  text-align: left;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

.toy-card-nav:hover {
  background: rgba(20, 30, 60, 0.85);
  border-color: rgba(0, 240, 255, 0.35);
  transform: translateX(4px);
}

.toy-card-nav.active {
  background: rgba(0, 240, 255, 0.12);
  border-color: var(--primary, #00f0ff);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
}

.toy-card-nav.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--primary, #00f0ff);
  box-shadow: 0 0 8px var(--primary, #00f0ff);
}

.toy-nav-icon {
  font-size: 1.5rem;
}

.toy-nav-meta {
  flex: 1;
  min-width: 0;
}

.toy-nav-badge {
  font-size: 0.58rem;
  color: #00ff88;
  letter-spacing: 0.05em;
  font-weight: bold;
  display: block;
}

.toy-nav-name {
  font-size: 0.85rem;
  color: #fff;
  font-weight: 600;
  margin: 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toy-nav-cat {
  font-size: 0.68rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.toy-nav-arrow {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.8rem;
  transition: transform 0.2s;
}

.toy-card-nav.active .toy-nav-arrow {
  color: var(--primary, #00f0ff);
  transform: translateX(2px);
}

.toy-stage {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: rgba(12, 18, 35, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px 20px;
  backdrop-filter: blur(10px);
  flex-wrap: wrap;
  gap: 12px;
}

.stage-badge-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.stage-icon {
  font-size: 1.1rem;
}

.stage-category {
  font-size: 0.68rem;
  color: var(--primary, #00f0ff);
  font-weight: bold;
  letter-spacing: 0.05em;
}

.stage-title {
  font-family: var(--font-display, sans-serif);
  font-size: 1.15rem;
  color: #fff;
  margin-bottom: 4px;
}

.stage-desc {
  font-size: 0.8rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.65));
  line-height: 1.5;
  max-width: 650px;
}

.repo-link {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-muted, rgba(255, 255, 255, 0.7));
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.72rem;
  text-decoration: none;
  transition: all 0.2s;
  white-space: nowrap;
}

.stage-component-wrap {
  width: 100%;
}

.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.stage-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.stage-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ================= 仓库宝库布局 ================= */
.repos-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill-btn {
  background: rgba(15, 22, 40, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pill-btn:hover {
  border-color: rgba(0, 240, 255, 0.4);
  color: #fff;
}

.pill-btn.active {
  background: var(--primary, #00f0ff);
  color: #000;
  font-weight: bold;
  border-color: var(--primary, #00f0ff);
  box-shadow: 0 0 12px var(--primary, rgba(0, 240, 255, 0.4));
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.repo-card {
  position: relative;
  background: rgba(12, 18, 35, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.repo-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 240, 255, 0.4);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.author-tag {
  font-size: 0.75rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
  font-family: monospace;
}

.stars-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 170, 0, 0.12);
  border: 1px solid rgba(255, 170, 0, 0.3);
  color: #ffaa00;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 12px;
}

.repo-name {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.repo-tag-pill {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.cat-label {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.sub-label {
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  color: var(--primary, #00f0ff);
}

.repo-desc {
  font-size: 0.82rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.75));
  line-height: 1.6;
  margin-bottom: 14px;
  flex: 1;
}

.repo-highlights {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 10px 12px;
  border-radius: 8px;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.7);
}

.h-bullet {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.visit-repo-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #fff;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  transition: all 0.2s;
}

.visit-repo-btn:hover {
  background: rgba(0, 240, 255, 0.15);
  border-color: var(--primary, #00f0ff);
  color: var(--primary, #00f0ff);
}

.btn-arrow {
  font-size: 0.85rem;
  transition: transform 0.2s;
}

.visit-repo-btn:hover .btn-arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 900px) {
  .arcade-container {
    grid-template-columns: 1fr;
  }
}
</style>
