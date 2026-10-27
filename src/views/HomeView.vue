<template>
  <div class="home-page page-shell">
    <section class="hero">
      <div class="hero-topline">
        <span>Portfolio / 2026</span>
        <span>Shanghai, CN</span>
      </div>

      <div class="hero-stage">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow">Frontend Lead · 8 Years</p>
          <h1 class="display-title hero-title">
            复杂系统，<br>
            <em>清晰交付。</em>
          </h1>

          <p class="hero-lead">{{ profile.bio }}</p>

          <div class="hero-actions">
            <router-link to="/projects" class="action primary">查看项目案例</router-link>
            <a :href="`mailto:${profile.email}`" class="action secondary">联系我</a>
          </div>
        </div>

        <SystemMap class="hero-system-map" />
      </div>

      <div class="hero-facts">
        <div v-for="(stat, index) in profile.stats" :key="stat.label" class="hero-fact">
          <strong>{{ stat.value }}{{ stat.suffix }}</strong>
          <span>{{ statLabels[index] }}</span>
        </div>
      </div>
    </section>

    <section class="selected-work">
      <header class="section-heading">
        <div>
          <p class="eyebrow">Selected Work / 01</p>
          <h2 class="display-title">代表性项目</h2>
        </div>
        <p class="section-intro">
          从医疗 AI 产品矩阵到实时数据平台，关注架构复杂度、交付质量与真实业务结果。
        </p>
      </header>

      <div class="work-list">
        <article v-for="(project, index) in selectedProjects" :key="project.id" class="work-row">
          <router-link
            class="work-hit"
            :to="{ name: 'project-detail', params: { id: project.id } }"
            :aria-label="`查看项目：${project.name}`"
          ></router-link>

          <span class="work-index">{{ String(index + 1).padStart(2, '0') }}</span>

          <div class="work-copy">
            <div class="work-meta">
              <span>{{ project.period }}</span>
              <span>{{ project.visual?.caption }}</span>
            </div>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
            <div class="work-tags">
              <span v-for="tech in project.techStack.slice(0, 4)" :key="tech">{{ tech }}</span>
            </div>
          </div>

          <div class="work-visual">
            <ProjectVisual :project="project" variant="card" :sequence="index + 1" />
          </div>

          <span class="work-arrow" aria-hidden="true">↗</span>
        </article>
      </div>

      <router-link to="/projects" class="text-link">
        查看全部 {{ projects.length }} 个项目
        <span aria-hidden="true">→</span>
      </router-link>
    </section>

    <section class="capabilities">
      <header class="section-heading">
        <div>
          <p class="eyebrow">Capabilities / 02</p>
          <h2 class="display-title">能力范围</h2>
        </div>
        <p class="section-intro">
          覆盖前端架构、工程化与数据可视化，能够从技术选型一直负责到生产交付。
        </p>
      </header>

      <div class="capability-grid">
        <article v-for="(skill, index) in skills" :key="skill.category" class="capability-card">
          <div class="capability-head">
            <span :style="{ color: skill.color }">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ skill.category }}</h3>
          </div>
          <p>{{ skill.description }}</p>
          <ul>
            <li v-for="item in skill.items" :key="item.name">
              <div class="skill-line">
                <span>{{ item.name }}</span>
                <small>{{ item.level }}</small>
              </div>
              <div class="skill-track">
                <span :style="{ width: `${item.level}%`, background: skill.color }"></span>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="contact-block">
      <p class="eyebrow">Contact / 03</p>
      <h2 class="display-title">有复杂产品要做？<br><em>聊聊。</em></h2>
      <a :href="`mailto:${profile.email}`" class="contact-email">{{ profile.email }}</a>
      <div class="contact-links">
        <a :href="profile.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a :href="profile.website" target="_blank" rel="noopener noreferrer">Website</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import ProjectVisual from '../components/ProjectVisual.vue'
import SystemMap from '../components/SystemMap.vue'
import { projects } from '../data/projects'
import { profile, skills } from '../data/profile'

const featuredIds = ['proj-0', 'proj-medical-ai-rd', 'proj-2']
const selectedProjects = featuredIds
  .map(id => projects.find(project => project.id === id))
  .filter(Boolean)

const statLabels = ['年经验', '项目交付', '技术栈']
</script>

<style scoped>
.home-page {
  padding-top: 5.5rem;
}

.hero-copy > * {
  animation: hero-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-copy > :nth-child(2) {
  animation-delay: 0.06s;
}

.hero-copy > :nth-child(3) {
  animation-delay: 0.12s;
}

.hero-copy > :nth-child(4) {
  animation-delay: 0.18s;
}

.hero-system-map {
  animation: hero-rise 0.85s 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero-facts {
  animation: hero-rise 0.75s 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero {
  padding-bottom: 4.5rem;
  border-bottom: 1px solid var(--color-line);
}

.hero-topline {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.75rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-eyebrow {
  margin-bottom: 1.3rem;
}

.hero-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(400px, 0.7fr);
  gap: clamp(2.5rem, 4vw, 4.5rem);
  align-items: stretch;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.hero-title {
  max-width: 760px;
  font-size: clamp(4.2rem, 7.4vw, 7.2rem);
}

.hero-lead {
  max-width: 610px;
  margin: 2rem 0 0;
  color: var(--color-ink-soft);
  font-size: clamp(1rem, 1.45vw, 1.16rem);
  line-height: 1.85;
  white-space: pre-line;
}

.hero-facts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--color-line);
}

.hero-fact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.hero-fact strong {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 400;
  line-height: 1;
}

.hero-fact span {
  color: var(--color-ink-faint);
  font-size: 0.68rem;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 1.15rem;
  border: 1px solid var(--color-ink);
  border-radius: 2px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.action.primary {
  background: var(--color-ink);
  color: var(--color-paper);
}

.action.primary:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.action.secondary {
  border-color: var(--color-line-strong);
  color: var(--color-ink-soft);
}

.action.secondary:hover {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.selected-work,
.capabilities {
  padding-top: 6rem;
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.65fr);
  gap: 3rem;
  align-items: end;
  margin-bottom: 2rem;
}

.section-heading h2 {
  margin-top: 0.5rem;
  font-size: clamp(2.8rem, 5.5vw, 5rem);
}

.section-intro {
  max-width: 460px;
  margin: 0 0 0.35rem auto;
  color: var(--color-ink-soft);
  font-size: 0.9rem;
  line-height: 1.75;
}

.work-list {
  border-top: 1px solid var(--color-ink);
}

.work-row {
  position: relative;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 220px 26px;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--color-line);
  transition: background 0.2s ease;
}

.work-row:hover {
  background: rgba(251, 250, 246, 0.5);
}

.work-hit {
  position: absolute;
  inset: 0;
  z-index: 4;
}

.work-hit:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -3px;
}

.work-index {
  color: var(--color-warm);
  font-family: var(--font-mono);
  font-size: 0.68rem;
}

.work-copy {
  min-width: 0;
}

.work-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.55rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.work-copy h3 {
  margin: 0 0 0.45rem;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 2.8vw, 2.4rem);
  font-weight: 400;
  line-height: 1.05;
}

.work-copy p {
  max-width: 64ch;
  margin: 0 0 0.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: var(--color-ink-soft);
  font-size: 0.82rem;
  line-height: 1.65;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.work-tags span {
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.62rem;
}

.work-tags span:not(:last-child)::after {
  content: '·';
  margin-left: 0.4rem;
}

.work-visual {
  position: relative;
  height: 132px;
  overflow: hidden;
  border: 1px solid var(--color-line);
}

.work-visual :deep(.visual-chrome) {
  top: 9px;
  right: 9px;
  left: 9px;
  font-size: 0.43rem;
}

.work-visual :deep(.chrome-code) {
  display: none;
}

.work-visual :deep(.visual-canvas) {
  inset: 19% 2% 19%;
  height: 62%;
}

.work-visual :deep(.visual-footer) {
  display: none;
}

.work-arrow {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 1px solid var(--color-line);
  border-radius: 50%;
  color: var(--color-ink-soft);
  font-size: 0.8rem;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.work-row:hover .work-arrow {
  border-color: var(--color-ink);
  color: var(--color-ink);
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  margin-top: 1.4rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  text-decoration: none;
}

.text-link span {
  transition: transform 0.2s ease;
}

.text-link:hover span {
  transform: translateX(4px);
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--color-ink);
  border-bottom: 1px solid var(--color-line);
}

.capability-card {
  padding: 1.7rem 1.6rem 2rem;
}

.capability-card:not(:last-child) {
  border-right: 1px solid var(--color-line);
}

.capability-head {
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  margin-bottom: 0.65rem;
}

.capability-head span {
  font-family: var(--font-mono);
  font-size: 0.62rem;
}

.capability-head h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 400;
}

.capability-card > p {
  margin: 0 0 1.6rem;
  color: var(--color-ink-faint);
  font-size: 0.74rem;
}

.capability-card ul {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-line {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.42rem;
  color: var(--color-ink-soft);
  font-size: 0.78rem;
}

.skill-line small {
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.58rem;
}

.skill-track {
  height: 2px;
  overflow: hidden;
  background: var(--color-line);
}

.skill-track span {
  display: block;
  height: 100%;
}

.contact-block {
  margin-top: 7rem;
  padding: 4rem 0 1rem;
  border-top: 1px solid var(--color-ink);
}

.contact-block h2 {
  max-width: 900px;
  margin: 1rem 0 2rem;
  font-size: clamp(3.4rem, 8vw, 7.4rem);
}

.contact-email {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--color-ink);
  font-size: clamp(1rem, 2vw, 1.4rem);
  text-decoration-line: underline;
  text-decoration-color: var(--color-line-strong);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.35em;
}

.contact-email:hover {
  color: var(--color-accent);
  text-decoration-color: currentColor;
}

.contact-links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-top: 1.5rem;
}

.contact-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  text-decoration: none;
}

.contact-links a:hover {
  color: var(--color-accent);
}

@media (prefers-reduced-motion: reduce) {
  .hero-copy > *,
  .hero-system-map,
  .hero-facts {
    animation: none;
  }
}

@media (max-width: 1024px) {
  .hero-stage {
    grid-template-columns: minmax(0, 1fr) minmax(330px, 0.68fr);
    gap: 2rem;
  }

  .section-heading {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-intro {
    margin-left: 0;
  }

  .work-row {
    grid-template-columns: 36px minmax(0, 1fr) 180px 24px;
    gap: 1rem;
  }

  .capability-card {
    padding: 1.5rem 1.2rem 1.8rem;
  }
}

@media (max-width: 960px) {
  .hero-stage {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-copy {
    display: block;
  }

  .hero-system-map {
    width: min(100%, 560px);
    margin-inline: auto;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding-top: 3rem;
  }

  .hero {
    padding-bottom: 3.5rem;
  }

  .hero-topline {
    margin-bottom: 3rem;
  }

  .hero-stage {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .hero-copy {
    display: block;
  }

  .hero-title {
    font-size: clamp(3.6rem, 16vw, 5.6rem);
  }

  .hero-system-map {
    width: min(100%, 540px);
    margin-inline: auto;
  }

  .hero-lead {
    margin-top: 1.8rem;
  }

  .hero-facts {
    gap: 0.6rem;
    margin-top: 2.5rem;
  }

  .hero-fact strong {
    font-size: 1.8rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .selected-work,
  .capabilities {
    padding-top: 4rem;
  }

  .work-row {
    grid-template-columns: 28px minmax(0, 1fr) 24px;
    padding: 1.25rem 0;
  }

  .work-visual {
    display: none;
  }

  .work-copy p {
    -webkit-line-clamp: 3;
  }

  .capability-grid {
    grid-template-columns: 1fr;
  }

  .capability-card:not(:last-child) {
    border-right: 0;
    border-bottom: 1px solid var(--color-line);
  }

  .contact-block {
    margin-top: 4.5rem;
    padding-top: 3rem;
  }

  .contact-block h2 {
    font-size: clamp(2.2rem, 10vw, 4rem);
  }
}
</style>
