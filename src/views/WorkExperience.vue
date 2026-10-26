<template>
  <div class="experience-page page-shell">
    <header class="page-intro">
      <p class="eyebrow">Experience / 2018 — Now</p>
      <h1 class="display-title">
        从开发到负责人，<br>
        <em>持续交付。</em>
      </h1>
      <p>
        从 WebGL 全景平台到医疗 AI 产品矩阵，经历过独立开发、架构设计和团队管理。
        我的工作始终围绕一件事：让复杂产品按时、稳定地交付。
      </p>
    </header>

    <section class="experience-list">
      <article v-for="(item, index) in experiences" :key="item.id" class="experience-item">
        <aside class="experience-side">
          <span class="experience-index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="experience-period">{{ item.period }}</span>
          <span v-if="index === 0" class="current-label">Current</span>
        </aside>

        <div class="experience-content">
          <header class="role-header">
            <div>
              <h2>{{ item.company }}</h2>
              <span>{{ item.title }}</span>
            </div>
          </header>

          <ul>
            <li v-for="responsibility in item.responsibilities" :key="responsibility">
              {{ responsibility }}
            </li>
          </ul>

          <div class="tech-stack">
            <span v-for="tech in item.techStack" :key="tech">{{ tech }}</span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { experiences } from '../data/experience'
</script>

<style scoped>
.experience-page {
  max-width: 1120px;
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
  max-width: 680px;
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 1rem;
  line-height: 1.85;
}

.experience-item {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 3rem;
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-line);
}

.experience-side {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.65rem;
}

.experience-index {
  color: var(--color-warm);
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.experience-period {
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.current-label {
  padding: 0.16rem 0.4rem;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.52rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.experience-content {
  min-width: 0;
}

.role-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.role-header h2 {
  margin: 0 0 0.3rem;
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 400;
  line-height: 1.1;
}

.role-header span {
  color: var(--color-ink-soft);
  font-size: 0.78rem;
}

.experience-content ul {
  display: grid;
  gap: 0.85rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
}

.experience-content li {
  position: relative;
  padding-left: 1.35rem;
  color: var(--color-ink-soft);
  font-size: 0.86rem;
  line-height: 1.8;
}

.experience-content li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-line-strong);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-stack span {
  padding: 0.25rem 0.45rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.58rem;
}

@media (max-width: 768px) {
  .experience-page {
    padding-top: 3rem;
  }

  .page-intro {
    padding-bottom: 3rem;
  }

  .page-intro h1 {
    margin-bottom: 1.8rem;
    font-size: clamp(1.9rem, 10vw, 3.6rem);
  }

  .experience-item {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    padding: 2rem 0;
  }

  .experience-side {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .role-header h2 {
    font-size: 1.85rem;
  }

  .experience-content li {
    font-size: 0.8rem;
    line-height: 1.72;
  }
}
</style>
