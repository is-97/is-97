<template>
  <div class="projects-page page-shell">
    <header class="page-intro">
      <p class="eyebrow">Selected Work / {{ projects.length }} Projects</p>
      <h1 class="display-title">
        项目不是页面集合，<br>
        <em>是系统。</em>
      </h1>
      <div class="intro-grid">
        <p>
          这些案例覆盖医疗 AI 产品矩阵、企业数据平台、实时可视化与 WebGL 创作工具。
          我关注的不是把功能堆出来，而是让架构、交互和交付结果形成完整闭环。
        </p>
        <dl>
          <div>
            <dt>Period</dt>
            <dd>2018 — 2026</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Frontend Lead</dd>
          </div>
          <div>
            <dt>Domain</dt>
            <dd>Medical AI / Data / WebGL</dd>
          </div>
        </dl>
      </div>
    </header>

    <div class="projects-grid">
      <ProjectCaseCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup>
import ProjectCaseCard from '../components/ProjectCaseCard.vue'
import { projects } from '../data/projects'
</script>

<style scoped>
.projects-page {
  padding-top: 5rem;
}

.page-intro {
  padding-bottom: 4.5rem;
  border-bottom: 1px solid var(--color-ink);
}

.page-intro h1 {
  max-width: none;
  margin: 1.2rem 0 2.5rem;
  font-size: clamp(3.8rem, 7.3vw, 7rem);
}

.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(300px, 0.9fr);
  gap: 4rem;
  align-items: end;
}

.intro-grid > p {
  max-width: 640px;
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 1rem;
  line-height: 1.85;
}

.intro-grid dl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 0;
  padding-top: 1.2rem;
  border-top: 1px solid var(--color-line);
}

.intro-grid dt {
  margin-bottom: 0.35rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.intro-grid dd {
  margin: 0;
  color: var(--color-ink-soft);
  font-size: 0.72rem;
  line-height: 1.5;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  padding-top: 3rem;
}

@media (max-width: 900px) {
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .projects-page {
    padding-top: 3rem;
  }

  .page-intro {
    padding-bottom: 3rem;
  }

  .page-intro h1 {
    margin-bottom: 2rem;
    font-size: clamp(1.9rem, 10vw, 3.6rem);
  }

  .intro-grid dl {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .projects-grid {
    gap: 1rem;
    padding-top: 2rem;
  }
}
</style>
