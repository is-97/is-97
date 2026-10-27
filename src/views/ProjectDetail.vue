<template>
  <div class="project-detail" v-if="project">
    <!-- 顶部 Banner -->
    <div class="hero-banner">
      <ProjectVisual :project="project" variant="hero" />
      <div class="hero-overlay"></div>

      <button type="button" class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        返回项目列表
      </button>

      <div class="hero-content">
        <div class="hero-meta">
          <span class="meta-id">CASE STUDY / {{ project.id.toUpperCase() }}</span>
        </div>
        <h1 class="project-title">{{ project.name }}</h1>
        <div class="hero-info">
          <span class="info-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {{ project.period }}
          </span>
          <span class="info-sep">//</span>
          <span class="info-item tech-count">{{ project.techStack.length }} 项技术栈</span>
          <span class="info-sep">//</span>
          <span class="info-item ach-count">{{ project.achievements.length }} 项核心交付</span>
        </div>
        <div v-if="project.highlights?.length" class="hero-highlights">
          <span v-for="highlight in project.highlights" :key="highlight" class="hero-highlight">
            {{ highlight }}
          </span>
        </div>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="detail-body">
      <div class="case-summary">
        <div class="case-summary-item">
          <span class="summary-label">ROLE</span>
          <strong>{{ narrative.role }}</strong>
        </div>
        <div class="case-summary-item">
          <span class="summary-label">SCOPE</span>
          <strong>{{ narrative.scope }}</strong>
        </div>
        <div class="case-summary-item">
          <span class="summary-label">OUTCOME</span>
          <strong>{{ narrative.outcome }}</strong>
        </div>
      </div>

      <!-- 项目描述 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">01</span>
          <h2 class="section-title">背景与挑战</h2>
          <div class="section-line"></div>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="challenge-panel">
          <span class="challenge-label">核心挑战 / WHY IT MATTERS</span>
          <p>{{ narrative.challenge }}</p>
        </div>
      </div>

      <!-- 关键决策 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">02</span>
          <h2 class="section-title">关键决策</h2>
          <div class="section-line"></div>
        </div>
        <div class="decisions-grid">
          <article
            v-for="(decision, i) in narrative.decisions"
            :key="decision.title"
            class="decision-card"
          >
            <div class="decision-topline">
              <span class="decision-index">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="decision-outcome">{{ decision.outcome }}</span>
            </div>
            <h3>{{ decision.title }}</h3>
            <p>{{ decision.detail }}</p>
          </article>
        </div>
      </div>

      <!-- 结果指标 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">03</span>
          <h2 class="section-title">交付成果</h2>
          <div class="section-line"></div>
        </div>
        <div class="results-grid">
          <div v-for="result in narrative.results" :key="result.label" class="result-metric">
            <div class="result-value" :class="{ 'is-text': result.value.length > 3 }">
              {{ result.value }}<span v-if="result.unit">{{ result.unit }}</span>
            </div>
            <div class="result-label">{{ result.label }}</div>
            <p v-if="result.detail">{{ result.detail }}</p>
          </div>
        </div>
      </div>

      <!-- 主要成就 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">04</span>
          <h2 class="section-title">核心交付明细</h2>
          <div class="section-line"></div>
        </div>
        <div class="achievements-grid">
          <div
            v-for="(achievement, i) in project.achievements"
            :key="i"
            class="achievement-card"
          >
            <div class="achievement-index">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="achievement-body">
              <span class="achievement-text">{{ achievement }}</span>
            </div>
            <div class="achievement-glow"></div>
          </div>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">05</span>
          <h2 class="section-title">技术栈</h2>
          <div class="section-line"></div>
        </div>
        <div class="tech-stack">
          <span v-for="(tech, i) in project.techStack" :key="i" class="tech-tag">
            <span class="tag-dot"></span>
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- 相关链接 -->
      <div class="detail-section" v-if="hasLinks">
        <div class="section-header">
          <span class="section-num">06</span>
          <h2 class="section-title">相关链接</h2>
          <div class="section-line"></div>
        </div>
        <div class="links">
          <a v-if="project.links?.demo" :href="project.links.demo" target="_blank" rel="noopener noreferrer" class="link-btn demo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            在线预览
          </a>
          <a v-if="project.links?.github" :href="project.links.github" target="_blank" rel="noopener noreferrer" class="link-btn github">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <!-- 私有项目提示 -->
      <div class="detail-section" v-if="!hasLinks">
        <div class="private-notice">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>该项目为私有项目，暂未公开源码</span>
        </div>
      </div>

      <router-link
        v-if="nextProject"
        class="next-case"
        :to="{ name: 'project-detail', params: { id: nextProject.id } }"
      >
        <div>
          <p class="eyebrow">Next Case</p>
          <h2>{{ nextProject.name }}</h2>
        </div>
        <span class="next-arrow" aria-hidden="true">→</span>
      </router-link>
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
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '../data/projects'
import { getProjectNarrative } from '../data/projectNarratives'
import ProjectVisual from '../components/ProjectVisual.vue'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  return projects.find(item => item.id === route.params.id) || null
})

const narrative = computed(() => getProjectNarrative(project.value))

const hasLinks = computed(() => {
  return Boolean(project.value?.links?.demo || project.value?.links?.github)
})

const nextProject = computed(() => {
  const index = projects.findIndex(item => item.id === project.value?.id)
  if (index < 0) return null
  return projects[(index + 1) % projects.length]
})

const goBack = () => {
  router.push({ name: 'projects' })
}
</script>

<style scoped>
.project-detail {
  width: min(calc(100% - 48px), 1120px);
  margin: 0 auto;
  padding: 4rem 0 3rem;
}

.hero-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 360px;
  padding: 2rem 2.4rem 2.4rem;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: var(--color-surface);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(251, 250, 246, 0.98) 0%, rgba(251, 250, 246, 0.82) 46%, rgba(251, 250, 246, 0.08) 100%),
    linear-gradient(180deg, transparent 45%, rgba(251, 250, 246, 0.58) 100%);
  pointer-events: none;
}

.back-btn {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  align-self: flex-start;
  min-height: 44px;
  padding: 0 0.85rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  background: rgba(251, 250, 246, 0.72);
  color: var(--color-ink-soft);
  cursor: pointer;
  font-size: 0.72rem;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.back-btn:hover {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.back-btn svg {
  width: 14px;
  height: 14px;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin-top: 3.5rem;
}

.hero-meta {
  margin-bottom: 0.8rem;
}

.meta-id {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
}

.project-title {
  margin: 0 0 1rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 5.4vw, 4.8rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 0.98;
}

.hero-info {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
}

.info-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

.info-sep {
  color: var(--color-line-strong);
}

.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.1rem;
}

.hero-highlight {
  padding: 0.28rem 0.55rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  background: rgba(251, 250, 246, 0.72);
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.62rem;
}

.detail-body {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 4rem;
}

.case-summary {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1.35fr;
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-line);
}

.case-summary-item {
  min-width: 0;
  padding: 1.2rem 1.2rem 1.3rem 0;
}

.case-summary-item:not(:first-child) {
  padding-left: 1.2rem;
  border-left: 1px solid var(--color-line);
}

.summary-label {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
}

.case-summary-item strong {
  color: var(--color-ink);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.55;
}

.detail-section {
  position: relative;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.4rem;
}

.section-num {
  color: var(--color-warm);
  font-family: var(--font-mono);
  font-size: 0.66rem;
}

.section-title {
  margin: 0;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2.5vw, 2rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: var(--color-line);
}

.project-description {
  margin: 0;
  padding: 1.35rem 1.5rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  background: var(--color-surface);
  color: var(--color-ink-soft);
  font-size: 0.94rem;
  line-height: 1.85;
}

.challenge-panel {
  margin-top: 1rem;
  padding: 1.35rem 1.5rem;
  border: 1px solid var(--color-line);
  border-left: 3px solid var(--color-accent);
  background: rgba(251, 250, 246, 0.58);
}

.challenge-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.07em;
}

.challenge-panel p {
  margin: 0;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.45;
}

.decisions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.9rem;
}

.decision-card {
  min-width: 0;
  padding: 1.25rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  background: var(--color-surface);
  transition: border-color 0.2s ease;
}

.decision-card:hover {
  border-color: var(--color-line-strong);
}

.decision-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.decision-index {
  color: var(--color-warm);
  font-family: var(--font-mono);
  font-size: 0.62rem;
}

.decision-outcome {
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  text-align: right;
}

.decision-card h3 {
  margin: 0 0 0.6rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 400;
  line-height: 1.2;
}

.decision-card p {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 0.78rem;
  line-height: 1.7;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.9rem;
}

.result-metric {
  padding: 1.2rem;
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-line);
  background: rgba(251, 250, 246, 0.46);
}

.result-value {
  color: var(--color-accent);
  font-family: var(--font-display);
  font-size: 2.9rem;
  line-height: 1;
}

.result-value.is-text {
  font-size: 1.85rem;
  line-height: 1.2;
}

.result-value span {
  margin-left: 0.18rem;
  color: var(--color-ink-faint);
  font-family: var(--font-body);
  font-size: 0.65rem;
}

.result-label {
  margin-top: 0.7rem;
  color: var(--color-ink);
  font-size: 0.8rem;
  font-weight: 600;
}

.result-metric p {
  margin: 0.28rem 0 0;
  color: var(--color-ink-faint);
  font-size: 0.7rem;
  line-height: 1.55;
}

.achievements-grid {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-ink);
}

.achievement-card {
  position: relative;
  display: flex;
  gap: 1.2rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-line);
}

.achievement-index {
  min-width: 38px;
  padding-top: 0.15rem;
  color: var(--color-warm);
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

.achievement-body {
  flex: 1;
}

.achievement-text {
  color: var(--color-ink-soft);
  font-size: 0.9rem;
  line-height: 1.75;
}

.achievement-glow {
  display: none;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.34rem 0.62rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.tag-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 42px;
  padding: 0 0.9rem;
  border: 1px solid var(--color-ink);
  border-radius: 2px;
  color: var(--color-ink);
  font-size: 0.76rem;
  text-decoration: none;
}

.link-btn svg {
  width: 14px;
  height: 14px;
}

.link-btn.demo {
  background: var(--color-ink);
  color: var(--color-paper);
}

.link-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.private-notice {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 1rem 0;
  border-top: 1px solid var(--color-line);
  color: var(--color-ink-faint);
  font-size: 0.8rem;
}

.private-notice svg {
  flex-shrink: 0;
}

.next-case {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-ink);
  text-decoration: none;
}

.next-case h2 {
  margin: 0.45rem 0 0;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3.4rem);
  font-weight: 400;
  line-height: 1;
}

.next-arrow {
  flex: none;
  color: var(--color-accent);
  font-size: 1.7rem;
  transition: transform 0.2s ease;
}

.next-case:hover .next-arrow {
  transform: translateX(5px);
}

.not-found {
  display: grid;
  place-items: center;
  min-height: 60vh;
  padding: 4rem 1rem;
  text-align: center;
}

.not-found-content h1 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 7rem;
  font-weight: 400;
}

.not-found-content p {
  margin: 0 0 1.5rem;
  color: var(--color-ink-soft);
}

@media (max-width: 900px) {
  .project-detail {
    width: min(calc(100% - 32px), 1120px);
  }

  .hero-content {
    max-width: 82%;
  }

  .case-summary {
    grid-template-columns: 1fr;
  }

  .case-summary-item,
  .case-summary-item:not(:first-child) {
    padding: 0.9rem 0;
    border-left: 0;
    border-bottom: 1px solid var(--color-line);
  }

  .case-summary-item:last-child {
    border-bottom: 0;
  }
}

@media (max-width: 768px) {
  .project-detail {
    padding-top: 2rem;
  }

  .hero-banner {
    min-height: 320px;
    padding: 1.2rem 1rem 1.5rem;
  }

  .hero-overlay {
    background: linear-gradient(180deg, rgba(251, 250, 246, 0.05) 0%, rgba(251, 250, 246, 0.96) 72%);
  }

  .hero-content {
    max-width: 100%;
    margin-top: 6.5rem;
  }

  .project-title {
    font-size: clamp(2.2rem, 12vw, 3.2rem);
  }

  .hero-info {
    gap: 0.45rem;
  }

  .info-sep {
    display: none;
  }

  .detail-body {
    gap: 3rem;
    margin-top: 3rem;
  }

  .section-header {
    gap: 0.6rem;
  }

  .section-title {
    font-size: 1.45rem;
  }

  .project-description,
  .challenge-panel {
    padding: 1rem;
  }

  .challenge-panel p {
    font-size: 1.15rem;
  }

  .decisions-grid,
  .results-grid {
    grid-template-columns: 1fr;
  }

  .decision-card,
  .result-metric {
    padding: 1rem;
  }

  .achievement-card {
    gap: 0.75rem;
    padding: 1rem 0;
  }

  .achievement-text {
    font-size: 0.82rem;
    line-height: 1.65;
  }

  .not-found-content h1 {
    font-size: 5rem;
  }

  .next-case {
    gap: 1rem;
    padding-top: 1.5rem;
  }

  .next-case h2 {
    font-size: 1.8rem;
  }
}
</style>
