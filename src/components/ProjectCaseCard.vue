<template>
  <article class="project-case-card" :class="{ 'is-featured': featured }" :style="cardStyle">
    <router-link
      class="case-hit-area"
      :to="{ name: 'project-detail', params: { id: project.id } }"
      :aria-label="`查看项目：${project.name}`"
    ></router-link>

    <div class="case-visual">
      <ProjectVisual :project="project" :variant="featured ? 'featured' : 'card'" :sequence="index + 1" />
    </div>

    <div class="case-content">
      <div class="case-meta">
        <span class="case-index">CASE {{ String(index + 1).padStart(2, '0') }}</span>
        <span class="case-period">{{ project.period }}</span>
      </div>

      <h3 class="case-title">{{ project.name }}</h3>
      <p class="case-description">{{ project.description }}</p>

      <ul v-if="project.highlights?.length" class="case-highlights">
        <li v-for="highlight in visibleHighlights" :key="highlight">
          <span class="highlight-mark"></span>
          <span>{{ highlight }}</span>
        </li>
      </ul>

      <div class="case-tech">
        <span v-for="tech in project.techStack.slice(0, 3)" :key="tech" class="case-tech-tag">{{ tech }}</span>
        <span v-if="project.techStack.length > 3" class="case-tech-tag more">+{{ project.techStack.length - 3 }}</span>
      </div>

      <div class="case-footer">
        <span class="case-cta">
          READ CASE
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
        <span class="case-state">PRIVATE CASE</span>
      </div>
    </div>

    <span class="case-border-glow"></span>
    <span class="case-corner tl"></span>
    <span class="case-corner br"></span>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import ProjectVisual from './ProjectVisual.vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
})

const highlightLimit = computed(() => props.featured ? 3 : 2)
const visibleHighlights = computed(() => (props.project.highlights || []).slice(0, highlightLimit.value))
const cardStyle = computed(() => ({
  '--case-a': props.project.visual?.accent || 'var(--primary)',
  '--case-b': props.project.visual?.secondary || 'var(--secondary)'
}))
</script>

<style scoped>
.project-case-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-line);
  border-radius: 8px;
  background: var(--color-surface);
  transition: border-color 0.22s ease, transform 0.22s ease;
}

.project-case-card:hover,
.project-case-card:focus-within {
  border-color: var(--color-line-strong);
  transform: translateY(-3px);
}

.project-case-card.is-featured {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
}

.case-hit-area {
  position: absolute;
  inset: 0;
  z-index: 7;
  border-radius: inherit;
}

.case-hit-area:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: -3px;
}

.case-visual {
  position: relative;
  flex: none;
  height: 205px;
  overflow: hidden;
  border-bottom: 1px solid var(--color-line);
}

.is-featured .case-visual {
  height: 100%;
  min-height: 390px;
  border-right: 1px solid var(--color-line);
  border-bottom: 0;
}

.case-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.45rem 1.5rem 1.35rem;
}

.is-featured .case-content {
  padding: 2.2rem 2.3rem;
}

.case-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
  color: var(--color-ink-faint);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.case-index {
  color: var(--case-a);
}

.case-period {
  text-align: right;
}

.case-title {
  margin: 0 0 0.75rem;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 2.2vw, 2.15rem);
  font-weight: 400;
  letter-spacing: -0.018em;
  line-height: 1.08;
}

.is-featured .case-title {
  font-size: clamp(2rem, 3vw, 2.8rem);
}

.case-description {
  display: -webkit-box;
  margin: 0 0 1.1rem;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: var(--color-ink-soft);
  font-size: 0.86rem;
  line-height: 1.7;
}

.is-featured .case-description {
  -webkit-line-clamp: 4;
  max-width: 58ch;
}

.case-highlights {
  display: grid;
  gap: 0.45rem;
  margin: 0 0 1.15rem;
  padding: 0;
  list-style: none;
}

.case-highlights li {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  color: var(--color-ink-soft);
  font-size: 0.77rem;
  line-height: 1.5;
}

.highlight-mark {
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-top: 1px solid var(--case-a);
  border-right: 1px solid var(--case-a);
  transform: rotate(45deg) translateY(-1px);
}

.case-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
}

.case-tech-tag {
  padding: 0.18rem 0.4rem;
  border: 1px solid var(--color-line);
  border-radius: 2px;
  color: var(--color-ink-soft);
  font-family: var(--font-mono);
  font-size: 0.62rem;
}

.case-tech-tag.more {
  border-color: transparent;
  color: var(--color-ink-faint);
}

.case-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.15rem;
  padding-top: 0.95rem;
  border-top: 1px solid var(--color-line);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.07em;
}

.case-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-accent);
}

.case-cta svg {
  width: 13px;
  height: 13px;
  transition: transform 0.2s ease;
}

.project-case-card:hover .case-cta svg,
.project-case-card:focus-within .case-cta svg {
  transform: translateX(4px);
}

.case-state {
  color: var(--color-ink-faint);
}

.case-border-glow,
.case-corner {
  display: none;
}

@media (max-width: 768px) {
  .project-case-card.is-featured {
    display: flex;
  }

  .case-visual,
  .is-featured .case-visual {
    height: 176px;
    min-height: 0;
    border-right: 0;
    border-bottom: 1px solid var(--color-line);
  }

  .case-content,
  .is-featured .case-content {
    padding: 1.15rem;
  }

  .case-title,
  .is-featured .case-title {
    font-size: 1.65rem;
  }

  .case-description,
  .is-featured .case-description {
    -webkit-line-clamp: 3;
    font-size: 0.82rem;
  }

  .project-case-card:hover,
  .project-case-card:focus-within {
    transform: none;
  }
}
</style>
