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

    <!-- 瀑布流网格 -->
    <div class="projects-grid">
      <div v-for="(project, index) in projects" :key="project.id"
           class="project-capsule"
           @click="openProject(project.id)"
           :style="{ '--delay': index * 0.1 + 's' }">

        <div class="capsule-glass"></div>
        <div class="capsule-border"></div>

        <div class="capsule-content">
          <div class="project-header">
            <div class="header-left">
              <span class="project-index">{{ String(index + 1).padStart(2, '0') }}</span>
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

            <div class="click-hint">>> CLICK TO READ DATA</div>
          </div>
        </div>

        <!-- 装饰元素 -->
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

const openProject = (id) => {
  router.push(`/projects/${id}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap');

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

/* 标题区域 */
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

/* 瀑布流布局 */
.projects-grid {
  column-count: 3;
  column-gap: 2rem;
  padding: 0 1rem;
}

/* 全息胶囊卡片 */
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

.project-index {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.1);
  line-height: 1;
  transition: color 0.3s;
}

.project-capsule:hover .project-index {
  color: rgba(0, 240, 255, 0.2);
}

.project-name {
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

.click-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #00f0ff;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
  margin-top: auto;
  padding-top: 0.5rem;
}

.project-capsule:hover .click-hint {
  opacity: 1;
  transform: translateX(0);
}

/* 装饰元素 */
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

/* 响应式 */
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
