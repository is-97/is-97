<template>
  <div class="project-detail" :class="{ loaded: isLoaded }" v-if="project">
    <div class="page-header">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        返回
      </button>
      <h1 class="project-title">{{ project.name }}</h1>
      <p class="project-period">{{ project.period }}</p>
    </div>

    <div class="detail-layout">
      <div class="detail-card">
        <div class="card-glass"></div>
        <div class="card-content">
          <div class="section">
            <h2 class="section-title">项目描述</h2>
            <p class="project-description">{{ project.description }}</p>
          </div>

          <div class="section">
            <h2 class="section-title">主要成就</h2>
            <ul class="achievements-list">
              <li v-for="(achievement, i) in project.achievements" :key="i">
                <span class="bullet">⟐</span>
                <span class="text">{{ achievement }}</span>
              </li>
            </ul>
          </div>

          <div class="section">
            <h2 class="section-title">技术栈</h2>
            <div class="tech-stack">
              <span v-for="(tech, i) in project.techStack" :key="i" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="section" v-if="hasLinks">
            <h2 class="section-title">相关链接</h2>
            <div class="links">
              <a v-if="project.links?.demo" :href="project.links.demo" target="_blank" class="link-btn demo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                在线预览
              </a>
              <a v-if="project.links?.github" :href="project.links.github" target="_blank" class="link-btn github">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="not-found" v-else>
    <div class="not-found-content">
      <h1>404</h1>
      <p>项目未找到</p>
      <button class="back-btn" @click="goBack">返回项目列表</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '../data/projects'

const route = useRoute()
const router = useRouter()
const isLoaded = ref(false)

const project = computed(() => {
  return projects.find(p => p.id === route.params.id) || null
})

const hasLinks = computed(() => {
  return project.value?.links?.demo || project.value?.links?.github
})

const goBack = () => {
  router.push('/projects')
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
</script>

<style scoped>
.project-detail {
  padding: 2rem 0;
  max-width: 1000px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.project-detail.loaded {
  opacity: 1;
  transform: translateY(0);
}

.page-header {
  margin-bottom: 3rem;
  padding-left: 3rem;
  border-left: 4px solid var(--primary);
  background: linear-gradient(90deg, var(--accent-glow), transparent);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  background: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.back-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.project-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 10px var(--accent-glow);
}

.project-period {
  font-family: 'JetBrains Mono', monospace;
  color: var(--primary);
  font-size: 1rem;
  margin: 0;
}

.detail-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.detail-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}

.card-glass {
  position: absolute;
  inset: 0;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  z-index: 0;
}

.card-content {
  position: relative;
  z-index: 1;
  padding: 2.5rem;
}

.section {
  margin-bottom: 2.5rem;
}

.section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

.project-description {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 1.1rem;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.achievements-list li {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border-radius: 8px;
  border-left: 2px solid var(--primary);
  color: var(--text-main);
  line-height: 1.6;
  transition: all 0.3s ease;
}

.achievements-list li:hover {
  background: var(--bg-card-hover);
  transform: translateX(5px);
}

.bullet {
  color: var(--primary);
  font-weight: bold;
}

.tech-stack {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-radius: 20px;
  color: var(--primary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  box-shadow: 0 0 10px var(--accent-glow);
}

.links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.link-btn svg {
  width: 16px;
  height: 16px;
}

.link-btn.demo {
  background: var(--primary);
  color: var(--bg-deep);
}

.link-btn.demo:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--accent-glow);
}

.link-btn.github {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--text-main);
}

.link-btn.github:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* Not Found */
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.not-found-content {
  text-align: center;
}

.not-found-content h1 {
  font-family: var(--font-display);
  font-size: 6rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.not-found-content p {
  color: var(--text-muted);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .project-title {
    font-size: 1.8rem;
  }

  .card-content {
    padding: 1.5rem;
  }

  .page-header {
    padding-left: 1rem;
  }
}
</style>
