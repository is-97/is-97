<template>
  <div class="holo-projects" :class="{ loaded: isLoaded }">
    <div class="page-header">
      <div class="header-content">
        <div class="holo-badge">
          <span class="badge-icon">&#9673;</span>
          <span class="badge-text">ACCESS GRANTED</span>
        </div>
        <h1 class="page-title">
          <span class="glitch-text" data-text="PROJECT_ARCHIVE">PROJECT_ARCHIVE</span>
        </h1>
        <div class="header-meta">
          <span class="meta-item">ID: USER_9527</span>
          <span class="meta-sep">//</span>
          <span class="meta-item">LEVEL: 5</span>
          <span class="meta-sep">//</span>
          <span class="meta-item">STATUS: ACTIVE</span>
        </div>
      </div>
      <div class="header-scanner"></div>
    </div>

    <div class="projects-grid">
      <div v-for="(project, index) in projects" :key="project.id"
           class="project-capsule"
           @click="openProject(project)"
           :style="{ '--delay': index * 0.1 + 's' }">

        <div class="capsule-glass"></div>
        <div class="capsule-border"></div>

        <div class="project-thumbnail" :style="thumbnailStyle(project)">
          <div class="thumb-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          </div>
          <span class="thumb-label">PROJECT {{ String(index + 1).padStart(2, '0') }}</span>
        </div>

        <div class="capsule-content">
          <div class="project-header">
            <div class="header-left">
              <h2 class="project-name">{{ project.name }}</h2>
            </div>
          </div>

          <div class="project-body">
            <div class="project-period">
              <span class="icon">&#9201;</span> {{ project.period }}
            </div>
            <p class="description">{{ project.description }}</p>

            <div class="tech-stack-mini">
              <span v-for="tech in project.techStack.slice(0, 3)" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
              <span v-if="project.techStack.length > 3" class="tech-tag more">+{{ project.techStack.length - 3 }}</span>
            </div>

            <div class="project-actions">
              <a v-if="project.links?.demo" :href="project.links.demo" target="_blank" rel="noopener noreferrer" class="action-link demo" @click.stop>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                DEMO
              </a>
              <a v-if="project.links?.github" :href="project.links.github" target="_blank" rel="noopener noreferrer" class="action-link github" @click.stop>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                SOURCE
              </a>
              <span v-if="!project.links?.demo && !project.links?.github" class="action-link disabled">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                PRIVATE
              </span>
            </div>
          </div>
        </div>

        <div class="deco-corner tl"></div>
        <div class="deco-corner br"></div>
        <div class="scan-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { projects } from '../data/projects'

const isLoaded = ref(false)
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const openProject = (project) => {
  router.push(`/projects/${project.id}`)
}

const thumbnailStyle = (project) => {
  if (project.imageCover) {
    return {
      backgroundImage: `linear-gradient(135deg, rgba(10,10,30,0.5), rgba(10,10,30,0.75)), url(${project.imageCover})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return { background: project.imageColor || 'linear-gradient(135deg, #1a1a2e, #0f0f1a)' }
}
</script>

<style scoped>
.project-thumbnail {
  width: 100%;
  height: 180px;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  z-index: 2;
}
.project-thumbnail::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.6));
  pointer-events: none;
}
.thumb-icon {
  color: rgba(255, 255, 255, 0.3);
  z-index: 1;
}
.thumb-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
  z-index: 1;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}
.action-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
}
.action-link.demo {
  background: rgba(0, 240, 255, 0.1);
  border-color: rgba(0, 240, 255, 0.3);
  color: #00f0ff;
}
.action-link.demo:hover {
  background: rgba(0, 240, 255, 0.2);
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.3);
}
.action-link.github {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
}
.action-link.github:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.action-link.disabled {
  background: rgba(255, 170, 0, 0.05);
  border-color: rgba(255, 170, 0, 0.2);
  color: rgba(255, 170, 0, 0.6);
  cursor: default;
}

.holo-projects {
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.holo-projects.loaded {
  opacity: 1;
  transform: translateY(0);
}

.page-header {
  margin-bottom: 5rem;
  position: relative;
  padding: 3rem;
  background: rgba(0, 240, 255, 0.02);
  border: 1px solid rgba(0, 240, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.page-header::before,
.page-header::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(0, 240, 255, 0.5);
  transition: all 0.3s;
}

.page-header::before { top: 0; left: 0; border-right: none; border-bottom: none; }
.page-header::after { bottom: 0; right: 0; border-left: none; border-top: none; }

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.holo-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(0, 240, 255, 0.1);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 20px;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: #00f0ff;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.badge-icon {
  animation: blink 2s infinite;
}

.page-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  color: #fff;
  text-transform: uppercase;
}

.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch-text::before {
  color: #00f0ff;
  z-index: -1;
  animation: glitch-effect 3s infinite;
}

.glitch-text::after {
  color: #ff0055;
  z-index: -2;
  animation: glitch-effect 2s infinite reverse;
}

.header-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.meta-sep {
  color: #00f0ff;
  opacity: 0.5;
}

.header-scanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #00f0ff;
  box-shadow: 0 0 10px #00f0ff;
  opacity: 0.5;
  animation: scan-vertical 4s infinite linear;
}

@keyframes scan-vertical {
  0% { top: 0; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

@keyframes glitch-effect {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.projects-grid {
  column-count: 3;
  column-gap: 2rem;
  padding: 0 1rem;
}

.project-capsule {
  position: relative;
  background: rgba(10, 20, 30, 0.4);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: slideUp 0.6s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(30px);
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  margin-bottom: 2rem;
  backface-visibility: hidden;
  cursor: pointer;
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

.capsule-glass {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(10px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  z-index: 0;
  border-radius: 20px;
}

.capsule-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  z-index: 1;
  pointer-events: none;
  transition: border-color 0.3s ease;
}

.project-capsule:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.project-capsule:hover .capsule-border {
  border-color: rgba(0, 240, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.capsule-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-header {
  margin-bottom: 1rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-capsule:hover .project-name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.project-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 6px;
}

.description {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.tech-stack-mini {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.tech-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  padding: 0.3rem 0.6rem;
  border-radius: 10px;
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.2);
  color: rgba(0, 240, 255, 0.8);
  transition: all 0.3s ease;
}

.tech-tag.more {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
}

.project-capsule:hover
.deco-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #00f0ff;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 3;
}

.project-capsule:hover .deco-corner {
  opacity: 1;
}

.deco-corner.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.deco-corner.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent, rgba(0, 240, 255, 0.1), transparent);
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.project-capsule:hover .scan-line {
  animation: cardScan 2s infinite;
  opacity: 1;
}

@keyframes cardScan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@media (max-width: 1200px) {
  .projects-grid {
    column-count: 2;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .projects-grid {
    column-count: 1;
  }
}
</style>