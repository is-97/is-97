<template>
  <div class="project-detail" v-if="project" ref="detailContainer">
    <!-- 顶部 Banner -->
    <div class="hero-banner" :style="heroStyle" ref="heroBanner">
      <div class="hero-overlay"></div>
      <div class="hero-scan-line"></div>

      <button class="back-btn" @click="goBack" ref="backBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        返回项目列表
      </button>

      <div class="hero-content">
        <div class="hero-meta">
          <span class="meta-id">PROJECT // {{ project.id.toUpperCase() }}</span>
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
          <span class="info-item ach-count">{{ project.achievements.length }} 项核心成果</span>
        </div>
      </div>

      <div class="hero-corners">
        <span class="corner tl"></span>
        <span class="corner tr"></span>
        <span class="corner bl"></span>
        <span class="corner br"></span>
      </div>
    </div>

    <!-- 主体内容 -->
    <div class="detail-body">
      <!-- 项目描述 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">01</span>
          <h2 class="section-title">项目概述</h2>
          <div class="section-line"></div>
        </div>
        <p class="project-description">{{ project.description }}</p>
      </div>

      <!-- 主要成就 -->
      <div class="detail-section">
        <div class="section-header">
          <span class="section-num">02</span>
          <h2 class="section-title">核心成果</h2>
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
          <span class="section-num">03</span>
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
          <span class="section-num">04</span>
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
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { projects } from '../data/projects'
import { gsap, isReducedMotion } from '../utils/gsap'

const route = useRoute()
const router = useRouter()

const detailContainer = ref(null)
const heroBanner = ref(null)
const backBtn = ref(null)

let gsapCtx = null
const brokenCovers = ref(new Set())

const project = computed(() => {
  return projects.find(p => p.id === route.params.id) || null
})

const hasLinks = computed(() => {
  return project.value?.links?.demo || project.value?.links?.github
})

const heroStyle = computed(() => {
  if (!project.value) return {}
  const p = project.value
  if (p.imageCover && !brokenCovers.value.has(p.id)) {
    const img = new Image()
    img.onerror = () => {
      brokenCovers.value.add(p.id)
      brokenCovers.value = new Set(brokenCovers.value)
    }
    img.src = p.imageCover
    return {
      backgroundImage: `linear-gradient(135deg, rgba(5,5,16,0.7), rgba(5,5,16,0.9)), url(${p.imageCover})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
  }
  return { background: p.imageColor || 'linear-gradient(135deg, #1a1a2e, #0f0f1a)' }
})

const goBack = () => {
  router.push('/projects')
}

onMounted(() => {
  if (isReducedMotion() || !project.value) return

  nextTick(() => {
    gsapCtx = gsap.context(() => {
      // 1. 顶部 Banner 进场
      if (heroBanner.value) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(heroBanner.value,
          { y: -20, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7 }
        )

        const title = heroBanner.value.querySelector('.project-title')
        const meta = heroBanner.value.querySelector('.hero-meta')
        const info = heroBanner.value.querySelector('.hero-info')

        if (meta) tl.fromTo(meta, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4 }, '-=0.4')
        if (title) tl.fromTo(title, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        if (info) tl.fromTo(info, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
      }

      // 2. 详情各个 Section 滚动错落展开
      const sections = document.querySelectorAll('.detail-section')
      sections.forEach((sec) => {
        const header = sec.querySelector('.section-header')
        const cards = sec.querySelectorAll('.achievement-card')
        const tags = sec.querySelectorAll('.tech-tag')
        const linkBtns = sec.querySelectorAll('.link-btn')

        const secTl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        })

        if (header) {
          secTl.fromTo(header,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
          )
        }

        if (cards.length > 0) {
          secTl.fromTo(cards,
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
            '-=0.2'
          )
        }

        if (tags.length > 0) {
          secTl.fromTo(tags,
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'back.out(1.5)' },
            '-=0.2'
          )
        }

        if (linkBtns.length > 0) {
          secTl.fromTo(linkBtns,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
            '-=0.2'
          )
        }
      })
    }, detailContainer.value)
  })
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
  }
})
</script>

<style scoped>
.project-detail {
  padding: 1.5rem 0 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* ── Hero Banner ── */
.hero-banner {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  padding: 2rem 2.5rem 2.5rem;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--border-light);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(5, 5, 16, 0.85) 100%);
  pointer-events: none;
}

.hero-scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary);
  box-shadow: 0 0 10px var(--primary);
  opacity: 0.4;
  animation: heroScan 5s infinite linear;
}

@keyframes heroScan {
  0% { top: 0; opacity: 0; }
  10% { opacity: 0.4; }
  90% { opacity: 0.4; }
  100% { top: 100%; opacity: 0; }
}

.back-btn {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  align-self: flex-start;
}

.back-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(0, 0, 0, 0.6);
  transform: translateX(-4px);
  box-shadow: 0 0 15px var(--accent-glow);
}

.back-btn svg {
  width: 16px;
  height: 16px;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-meta {
  margin-bottom: 0.6rem;
}

.meta-id {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--primary);
  letter-spacing: 0.15em;
  opacity: 0.85;
}

.project-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.6);
  line-height: 1.2;
}

.hero-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.info-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

.info-sep {
  color: var(--primary);
  opacity: 0.5;
}

/* Hero Corners */
.hero-corners .corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--primary);
  opacity: 0.5;
  z-index: 3;
}
.hero-corners .corner.tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
.hero-corners .corner.tr { top: 12px; right: 12px; border-left: none; border-bottom: none; }
.hero-corners .corner.bl { bottom: 12px; left: 12px; border-right: none; border-top: none; }
.hero-corners .corner.br { bottom: 12px; right: 12px; border-left: none; border-top: none; }

/* ── Detail Body ── */
.detail-body {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.detail-section {
  position: relative;
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  padding: 3px 8px;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--border-light), transparent);
}

/* Project Description */
.project-description {
  color: var(--text-muted);
  line-height: 1.8;
  font-size: 1rem;
  padding: 1.2rem 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-light);
  backdrop-filter: blur(10px);
}

/* ── Achievements Grid ── */
.achievements-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.achievement-card {
  position: relative;
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.achievement-card:hover {
  border-color: var(--border-hover);
  background: var(--bg-card-hover);
  transform: translateX(8px);
}

.achievement-index {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary);
  opacity: 0.4;
  min-width: 40px;
  line-height: 1;
  padding-top: 2px;
  transition: opacity 0.3s;
}

.achievement-card:hover .achievement-index {
  opacity: 0.9;
}

.achievement-body {
  flex: 1;
}

.achievement-text {
  color: var(--text-main);
  line-height: 1.7;
  font-size: 0.95rem;
}

.achievement-glow {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--primary);
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s;
}

.achievement-card:hover .achievement-glow {
  opacity: 1;
  box-shadow: 0 0 12px var(--primary);
}

/* ── Tech Stack ── */
.tech-stack {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 0.9rem;
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  border-radius: 20px;
  color: var(--primary);
  font-size: 0.85rem;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.3s ease;
}

.tag-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 6px var(--primary);
}

.tech-tag:hover {
  background: rgba(0, 240, 255, 0.15);
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 4px 12px var(--accent-glow);
}

/* ── Links ── */
.links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.link-btn svg {
  width: 16px;
  height: 16px;
}

.link-btn.demo {
  background: var(--primary);
  color: var(--bg-deep);
  font-weight: 600;
}

.link-btn.demo:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--accent-glow);
}

.link-btn.github {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--text-main);
}

.link-btn.github:hover {
  border-color: var(--primary);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2);
}

/* ── Private Notice ── */
.private-notice {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.5rem;
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.private-notice svg {
  color: var(--warning, #ffaa00);
  flex-shrink: 0;
}

/* ── Not Found ── */
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

/* ── Responsive ── */
@media (max-width: 768px) {
  .project-detail {
    padding: 0.5rem 0 2rem;
  }

  .hero-banner {
    padding: 1.2rem 1rem 1.5rem;
    min-height: 180px;
    border-radius: 14px;
    margin-bottom: 1.5rem;
  }

  .back-btn {
    padding: 0.4rem 0.7rem;
    font-size: 0.78rem;
    border-radius: 6px;
  }

  .back-btn svg {
    width: 14px;
    height: 14px;
  }

  .meta-id {
    font-size: 0.68rem;
  }

  .project-title {
    font-size: 1.35rem;
    margin: 0 0 0.6rem 0;
  }

  .hero-info {
    gap: 0.4rem;
  }

  .info-item {
    font-size: 0.68rem;
    gap: 4px;
  }

  .info-item svg {
    width: 12px;
    height: 12px;
  }

  .info-sep {
    display: none;
  }

  .hero-corners .corner {
    width: 12px;
    height: 12px;
  }

  .hero-corners .corner.tl { top: 8px; left: 8px; }
  .hero-corners .corner.tr { top: 8px; right: 8px; }
  .hero-corners .corner.bl { bottom: 8px; left: 8px; }
  .hero-corners .corner.br { bottom: 8px; right: 8px; }

  .detail-body {
    gap: 1.5rem;
  }

  .section-header {
    gap: 0.6rem;
    margin-bottom: 1rem;
  }

  .section-num {
    font-size: 0.7rem;
    padding: 2px 6px;
  }

  .section-title {
    font-size: 0.88rem;
  }

  .project-description {
    padding: 1rem;
    font-size: 0.88rem;
    line-height: 1.6;
    border-radius: 10px;
  }

  .achievement-card {
    padding: 0.9rem 1rem;
    gap: 0.7rem;
    border-radius: 10px;
  }

  .achievement-card:hover {
    transform: none;
  }

  .achievement-index {
    font-size: 1rem;
    min-width: 28px;
  }

  .achievement-text {
    font-size: 0.82rem;
    line-height: 1.5;
  }

  .tech-tag {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
  }

  .link-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.82rem;
    border-radius: 8px;
  }

  .private-notice {
    padding: 0.8rem 1rem;
    font-size: 0.82rem;
  }

  .not-found-content h1 {
    font-size: 4rem;
  }
}
</style>
