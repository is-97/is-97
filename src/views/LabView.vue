<template>
  <div class="lab-page page-shell">
    <header class="page-intro">
      <p class="eyebrow">Playground / Experimental Interfaces</p>
      <h1 class="display-title">
        工作之外，<br>
        <em>继续折腾。</em>
      </h1>
      <p>
        一些关于 Canvas、Web Audio、物理模拟和终端交互的小实验，以及我持续关注的优质开源项目。
      </p>
    </header>

    <section class="playground-section">
      <aside class="toy-list">
        <p class="list-label">Interactive Toys / {{ labToys.length }}</p>
        <button
          v-for="(toy, index) in labToys"
          :key="toy.id"
          type="button"
          class="toy-nav"
          :class="{ active: currentToyId === toy.id }"
          @click="currentToyId = toy.id"
        >
          <span class="toy-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="toy-nav-copy">
            <strong>{{ toy.name.split(' (')[0] }}</strong>
            <small>{{ toy.category }}</small>
          </span>
          <span class="toy-nav-arrow" aria-hidden="true">→</span>
        </button>
      </aside>

      <div class="toy-panel">
        <header class="toy-panel-head">
          <div>
            <p class="eyebrow">Live Demo</p>
            <h2>{{ currentToyData?.name }}</h2>
            <p>{{ currentToyData?.desc }}</p>
          </div>
          <div class="panel-actions">
            <a
              v-if="currentToyData?.repoUrl"
              :href="currentToyData.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="source-link"
            >
              Source ↗
            </a>
            <button v-if="demoActive" type="button" class="close-demo" @click="demoActive = false">
              关闭演示
            </button>
          </div>
        </header>

        <div v-if="!demoActive" class="launch-panel">
          <div class="launch-copy">
            <p class="eyebrow">Interactive Playground</p>
            <h3>进入交互模式</h3>
            <button type="button" class="launch-button" @click="demoActive = true">
              启动演示
              <span aria-hidden="true">→</span>
            </button>
            <p class="launch-note">演示会保留独立的交互与视觉主题，启动后可在右上角关闭。</p>
          </div>
          <div class="launch-index" aria-hidden="true">0{{ labToys.findIndex(toy => toy.id === currentToyId) + 1 }}</div>
        </div>

        <div v-else class="toy-frame">
          <Transition name="toy-fade" mode="out-in">
            <component :is="currentToyComponent" :key="currentToyId" />
          </Transition>
        </div>
      </div>
    </section>

    <section class="open-source-section">
      <header class="repo-heading">
        <div>
          <p class="eyebrow">Open Source / {{ awesomeGithubProjects.length }} Curated</p>
          <h2 class="display-title">值得一看的开源项目</h2>
        </div>
        <div class="repo-filters">
          <button
            v-for="category in repoCategories"
            :key="category"
            type="button"
            :class="{ active: selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </header>

      <div class="repo-grid">
        <a
          v-for="repo in filteredRepos"
          :key="repo.id"
          :href="repo.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-card"
        >
          <div class="repo-topline">
            <span>@{{ repo.author }}</span>
            <span>{{ repo.stars }}</span>
          </div>
          <h3>{{ repo.name }}</h3>
          <p>{{ repo.desc }}</p>
          <ul>
            <li v-for="highlight in repo.highlights" :key="highlight">{{ highlight }}</li>
          </ul>
          <div class="repo-footer">
            <span>{{ repo.category }}</span>
            <span aria-hidden="true">↗</span>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { awesomeGithubProjects, labToys } from '../data/labProjects'

import MatrixRainToy from '../components/lab/MatrixRainToy.vue'
import Cyber2048Toy from '../components/lab/Cyber2048Toy.vue'
import NeonSnakeToy from '../components/lab/NeonSnakeToy.vue'
import WebTerminalToy from '../components/lab/WebTerminalToy.vue'
import CyberSoundboxToy from '../components/lab/CyberSoundboxToy.vue'
import GravitonSandboxToy from '../components/lab/GravitonSandboxToy.vue'

const currentToyId = ref('matrix-rain')
const selectedCategory = ref('全部')
const demoActive = ref(false)

const toyComponentMap = {
  'matrix-rain': MatrixRainToy,
  'cyber-2048': Cyber2048Toy,
  'neon-snake': NeonSnakeToy,
  'hacker-terminal': WebTerminalToy,
  'cyber-soundbox': CyberSoundboxToy,
  'graviton-sandbox': GravitonSandboxToy
}

const currentToyComponent = computed(() => toyComponentMap[currentToyId.value] || MatrixRainToy)
const currentToyData = computed(() => labToys.find(toy => toy.id === currentToyId.value))

const repoCategories = computed(() => {
  const categories = ['全部']
  awesomeGithubProjects.forEach(project => {
    if (!categories.includes(project.category)) categories.push(project.category)
  })
  return categories
})

const filteredRepos = computed(() => {
  if (selectedCategory.value === '全部') return awesomeGithubProjects
  return awesomeGithubProjects.filter(project => project.category === selectedCategory.value)
})

watch(currentToyId, () => {
  demoActive.value = false
})
</script>

<style scoped>
.lab-page {
  padding-top: 5rem;
}

.page-intro {
  max-width: 920px;
  padding-bottom: 4.5rem;
  border-bottom: 1px solid var(--color-ink);
}

.page-intro h1 {
  margin: 1.2rem 0 2rem;
  font-size: clamp(3.8rem, 7.3vw, 7rem);
}

.page-intro > p:last-child {
  max-width: 650px;
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 1rem;
  line-height: 1.85;
}

.playground-section {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 2.5rem;
  padding-top: 4rem;
}

.list-label {
  margin: 0 0 1rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.toy-list {
  align-self: start;
  border-top: 1px solid var(--color-ink);
}

.toy-nav {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 16px;
  gap: 0.7rem;
  align-items: center;
  width: 100%;
  padding: 0.95rem 0;
  border: 0;
  border-bottom: 1px solid var(--color-line);
  background: transparent;
  color: var(--color-ink-soft);
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
}

.toy-nav:hover,
.toy-nav.active {
  color: var(--color-ink);
}

.toy-nav.active .toy-index {
  color: var(--color-accent);
}

.toy-index {
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.62rem;
}

.toy-nav-copy {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  min-width: 0;
}

.toy-nav-copy strong {
  overflow: hidden;
  font-size: 0.78rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.toy-nav-copy small {
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.58rem;
}

.toy-nav-arrow {
  color: var(--color-ink-faint);
  font-size: 0.75rem;
}

.toy-panel {
  min-width: 0;
}

.toy-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 1.4rem;
}

.toy-panel-head h2 {
  margin: 0.35rem 0 0.55rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 400;
  line-height: 1.05;
}

.toy-panel-head > div > p:last-child {
  max-width: 720px;
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 0.84rem;
  line-height: 1.7;
}

.source-link {
  flex: none;
  padding-bottom: 0.12rem;
  border-bottom: 1px solid var(--color-line-strong);
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  text-decoration: none;
}

.source-link:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.panel-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 0.6rem;
}

.close-demo {
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  background: transparent;
  color: var(--color-ink-soft);
  cursor: pointer;
  font-size: 0.7rem;
}

.close-demo:hover {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.launch-panel {
  position: relative;
  display: flex;
  align-items: flex-start;
  min-height: 420px;
  padding: 2.4rem;
  overflow: hidden;
  border: 1px solid var(--color-line);
  background:
    linear-gradient(rgba(24, 23, 20, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(24, 23, 20, 0.04) 1px, transparent 1px),
    var(--color-surface);
  background-size: 32px 32px;
}

.launch-copy {
  position: relative;
  z-index: 1;
  max-width: 640px;
}

.launch-copy h3 {
  margin: 0.6rem 0 0.7rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.4vw, 3.4rem);
  font-weight: 400;
  line-height: 1.05;
}

.launch-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--color-ink);
  border-radius: 2px;
  background: var(--color-ink);
  color: var(--color-paper);
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
}

.launch-button:hover {
  border-color: var(--color-accent);
  background: var(--color-accent);
}

.launch-note {
  margin: 0.8rem 0 0;
  color: var(--color-ink-faint);
  font-size: 0.65rem;
}

.launch-index {
  position: absolute;
  right: 2rem;
  bottom: 1.5rem;
  color: var(--color-line-strong);
  font-family: var(--font-display);
  font-size: clamp(6rem, 13vw, 11rem);
  line-height: 0.8;
}

.toy-frame {
  min-height: 520px;
  padding: 12px;
  border: 1px solid var(--color-line);
  background: var(--color-surface);
}

.open-source-section {
  padding-top: 7rem;
}

.repo-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-ink);
}

.repo-heading h2 {
  margin-top: 0.55rem;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
}

.repo-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.4rem;
}

.repo-filters button {
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  background: transparent;
  color: var(--color-ink-soft);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.55rem;
}

.repo-filters button:hover,
.repo-filters button.active {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.repo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-left: 1px solid var(--color-line);
}

.repo-card {
  display: flex;
  flex-direction: column;
  min-height: 290px;
  padding: 1.35rem;
  border-right: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  background: rgba(251, 250, 246, 0.38);
  color: var(--color-ink);
  text-decoration: none;
  transition: background 0.2s ease;
}

.repo-card:hover {
  background: var(--color-surface);
}

.repo-topline {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.6rem;
}

.repo-card h3 {
  margin: 0 0 0.6rem;
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 1.1;
}

.repo-card > p {
  margin: 0 0 1rem;
  color: var(--color-ink-soft);
  font-size: 0.78rem;
  line-height: 1.7;
}

.repo-card ul {
  display: grid;
  gap: 0.35rem;
  margin: 0 0 1.2rem;
  padding: 0;
  list-style: none;
}

.repo-card li {
  padding-left: 0.8rem;
  color: var(--color-ink-faint);
  font-size: 0.68rem;
  line-height: 1.55;
}

.repo-card li::before {
  content: '·';
  margin-left: -0.8rem;
  margin-right: 0.45rem;
}

.repo-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-line);
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.6rem;
}

.toy-fade-enter-active,
.toy-fade-leave-active {
  transition: opacity 0.18s ease;
}

.toy-fade-enter-from,
.toy-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .playground-section {
    grid-template-columns: 1fr;
  }

  .toy-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .list-label {
    grid-column: 1 / -1;
  }

  .toy-nav:nth-child(odd) {
    padding-right: 1rem;
  }

  .toy-nav:nth-child(even) {
    padding-left: 1rem;
    border-left: 1px solid var(--color-line);
  }

  .repo-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .repo-filters {
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .lab-page {
    padding-top: 3rem;
  }

  .page-intro {
    padding-bottom: 3rem;
  }

  .page-intro h1 {
    margin-bottom: 1.8rem;
    font-size: clamp(2.3rem, 10.5vw, 3.8rem);
  }

  .playground-section {
    gap: 2rem;
    padding-top: 3rem;
  }

  .toy-list {
    grid-template-columns: 1fr;
  }

  .toy-nav:nth-child(odd),
  .toy-nav:nth-child(even) {
    padding-right: 0;
    padding-left: 0;
    border-left: 0;
  }

  .toy-panel-head {
    flex-direction: column;
    gap: 1rem;
  }

  .panel-actions {
    justify-content: flex-start;
  }

  .launch-panel {
    min-height: 420px;
    padding: 1.5rem;
  }

  .launch-copy h3 {
    font-size: clamp(1.9rem, 10vw, 2.8rem);
  }

  .launch-index {
    right: 1rem;
    bottom: 1rem;
    font-size: 6rem;
  }

  .toy-frame {
    min-height: 400px;
    padding: 6px;
  }

  .open-source-section {
    padding-top: 4.5rem;
  }

  .repo-grid {
    grid-template-columns: 1fr;
  }

  .repo-card {
    min-height: 0;
    padding: 1.15rem;
  }
}
</style>
