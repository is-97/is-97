<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import ThreeScene from '../components/ThreeScene.vue'
import CountUp from '../components/CountUp.vue'
import TypeText from '../components/TypeText.vue'
import { profile, skills } from '../data/profile'
import { gsap, isReducedMotion } from '../utils/gsap'

const activeSkill = ref(0)
const isLargeScreen = ref(true)

// DOM 引用
const homeContainer = ref(null)
const identityBadge = ref(null)
const nameTitle = ref(null)
const actionGroup = ref(null)
const visualCircle = ref(null)
const statsSection = ref(null)
const skillsSection = ref(null)
const skillDetailCard = ref(null)

let gsapCtx = null
let resizeTimeout = null

const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 1024
}

const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(checkScreenSize, 150)
}

// 技能面板切换动画
const animateSkillPanel = () => {
  if (isReducedMotion() || !skillDetailCard.value) return

  nextTick(() => {
    const card = skillDetailCard.value
    const icon = card.querySelector('.header-icon')
    const textInfo = card.querySelector('.header-info')
    const skillItems = card.querySelectorAll('.skill-bar-item')
    const progressFills = card.querySelectorAll('.progress-fill')

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // 卡片整体微缩放刷新
    tl.fromTo(card,
      { y: 10, opacity: 0.7 },
      { y: 0, opacity: 1, duration: 0.35 }
    )

    // 图标旋转弹性进入
    if (icon) {
      tl.fromTo(icon,
        { scale: 0.6, rotate: -20, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' },
        '-=0.25'
      )
    }

    if (textInfo) {
      tl.fromTo(textInfo,
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35 },
        '-=0.35'
      )
    }

    // 技能项错落滑入
    if (skillItems.length > 0) {
      tl.fromTo(skillItems,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 },
        '-=0.2'
      )
    }

    // 进度条平滑填充
    if (progressFills.length > 0) {
      progressFills.forEach((fill, idx) => {
        const targetWidth = skills[activeSkill.value]?.items[idx]?.level || 0
        gsap.fromTo(fill,
          { width: '0%' },
          {
            width: `${targetWidth}%`,
            duration: 0.9,
            delay: idx * 0.05,
            ease: 'power3.out'
          }
        )
      })
    }
  })
}

// 监听技能切换
watch(activeSkill, () => {
  animateSkillPanel()
})

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', handleResize)

  if (isReducedMotion()) return

  // 创建 GSAP 上下文，便于组件卸载时统一销毁
  gsapCtx = gsap.context(() => {
    // 1. Hero 剧场式进场时间线
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (identityBadge.value) {
      heroTl.fromTo(identityBadge.value,
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }
      )
    }

    if (nameTitle.value) {
      heroTl.fromTo(nameTitle.value,
        { y: 40, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: 'power4.out' },
        '-=0.4'
      )
    }

    if (actionGroup.value) {
      const btns = actionGroup.value.querySelectorAll('.btn-primary, .btn-ghost')
      heroTl.fromTo(btns,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.3'
      )
    }

    // 光圈呼吸与缓慢旋转动效
    if (visualCircle.value) {
      gsap.to(visualCircle.value, {
        scale: 1.08,
        opacity: 0.3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
      gsap.to(visualCircle.value, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'none'
      })
    }

    // 2. Stats Section 滚动触发
    if (statsSection.value) {
      const statItems = statsSection.value.querySelectorAll('.stat-item')
      gsap.fromTo(statItems,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsSection.value,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // 3. Skills Section 滚动触发
    if (skillsSection.value) {
      const header = skillsSection.value.querySelector('.section-header')
      const navTabs = skillsSection.value.querySelectorAll('.skill-tab')

      if (header) {
        gsap.fromTo(header,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsSection.value,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      if (navTabs.length > 0) {
        gsap.fromTo(navTabs,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsSection.value,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      // 初次加载卡片
      animateSkillPanel()
    }
  }, homeContainer.value)
})

onBeforeUnmount(() => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  window.removeEventListener('resize', handleResize)
  if (gsapCtx) {
    gsapCtx.revert()
  }
})
</script>

<template>
  <div class="deep-home" ref="homeContainer">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-layout">
        <div class="hero-text">
          <div class="identity-badge" ref="identityBadge">FRONTEND ARCHITECT</div>
          <h1 class="name-title" ref="nameTitle" data-text="SHI ZHENXING">
            SHI<br>ZHENXING
          </h1>
          <div class="bio-text">
            <TypeText
              :text="profile.bio"
              :delay="600"
              :speed="45"
            />
          </div>

          <div class="action-group" ref="actionGroup">
            <a :href="'mailto:' + profile.email" class="btn-primary">
              <span>CONTACT ME</span>
            </a>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="btn-ghost">
              <span>GITHUB</span>
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <ThreeScene v-if="isLargeScreen" />
          <div class="visual-circle" ref="visualCircle"></div>
        </div>
      </div>
    </section>

    <!-- Stats Grid -->
    <section class="stats-section" ref="statsSection">
      <div v-for="(stat, index) in profile.stats" :key="index" class="stat-item">
        <div class="stat-value">
          <CountUp
            :to="stat.value"
            :pad="stat.pad"
            :suffix="stat.suffix"
            :delay="index * 150 + 200"
          />
        </div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section" ref="skillsSection">
      <div class="section-header">
        <h2>TECHNICAL<span class="text-gradient">STACK</span></h2>
      </div>

      <div class="skills-layout">
        <!-- Categories -->
        <div class="skills-nav">
          <button
            v-for="(skill, index) in skills"
            :key="index"
            class="skill-tab"
            :class="{ active: activeSkill === index }"
            @click="activeSkill = index"
          >
            <span class="tab-indicator" :style="{ background: skill.color }"></span>
            {{ skill.category }}
          </button>
        </div>

        <!-- Detail Panel -->
        <div class="skill-detail-card" ref="skillDetailCard">
          <div class="card-header">
            <div class="header-icon" :style="{ color: skills[activeSkill].color }">
              {{ skills[activeSkill].icon }}
            </div>
            <div class="header-info">
              <h3>{{ skills[activeSkill].category }}</h3>
              <p>{{ skills[activeSkill].description }}</p>
            </div>
          </div>

          <div class="skill-list">
            <div v-for="(item, i) in skills[activeSkill].items" :key="i" class="skill-bar-item">
              <div class="skill-meta">
                <span>{{ item.name }}</span>
                <span class="skill-percent">
                  <CountUp :to="item.level" suffix="%" :duration="1000" />
                </span>
              </div>
              <div class="progress-track">
                <div
                  class="progress-fill"
                  :style="{
                    width: item.level + '%',
                    background: skills[activeSkill].color
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.deep-home {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 4rem;
}

/* Hero Section */
.hero-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 4rem;
  margin-bottom: 8rem;
}

.identity-badge {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: var(--primary);
  letter-spacing: 0.2em;
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 100px;
  margin-bottom: 2rem;
  background: rgba(0, 240, 255, 0.05);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
}

.name-title {
  font-family: var(--font-display);
  font-size: 5rem;
  line-height: 0.9;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
  position: relative;
  letter-spacing: -0.02em;
}

.name-title::before,
.name-title::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.name-title::before {
  left: 2px;
  text-shadow: -1px 0 #00f0ff;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.name-title::after {
  left: -2px;
  text-shadow: -1px 0 #ff0055;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(30px, 9999px, 10px, 0); }
  5% { clip: rect(68px, 9999px, 81px, 0); }
  10% { clip: rect(7px, 9999px, 83px, 0); }
  15% { clip: rect(24px, 9999px, 8px, 0); }
  20% { clip: rect(93px, 9999px, 5px, 0); }
  25% { clip: rect(23px, 9999px, 58px, 0); }
  30% { clip: rect(59px, 9999px, 79px, 0); }
  35% { clip: rect(40px, 9999px, 14px, 0); }
  40% { clip: rect(36px, 9999px, 58px, 0); }
  45% { clip: rect(55px, 9999px, 96px, 0); }
  50% { clip: rect(11px, 9999px, 49px, 0); }
  55% { clip: rect(66px, 9999px, 26px, 0); }
  60% { clip: rect(10px, 9999px, 7px, 0); }
  65% { clip: rect(20px, 9999px, 91px, 0); }
  70% { clip: rect(78px, 9999px, 20px, 0); }
  75% { clip: rect(22px, 9999px, 34px, 0); }
  80% { clip: rect(43px, 9999px, 43px, 0); }
  85% { clip: rect(65px, 9999px, 99px, 0); }
  90% { clip: rect(16px, 9999px, 36px, 0); }
  95% { clip: rect(20px, 9999px, 38px, 0); }
  100% { clip: rect(64px, 9999px, 66px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(28px, 9999px, 95px, 0); }
  5% { clip: rect(62px, 9999px, 93px, 0); }
  10% { clip: rect(48px, 9999px, 40px, 0); }
  15% { clip: rect(100px, 9999px, 19px, 0); }
  20% { clip: rect(95px, 9999px, 25px, 0); }
  25% { clip: rect(67px, 9999px, 85px, 0); }
  30% { clip: rect(87px, 9999px, 9px, 0); }
  35% { clip: rect(32px, 9999px, 61px, 0); }
  40% { clip: rect(8px, 9999px, 20px, 0); }
  45% { clip: rect(65px, 9999px, 22px, 0); }
  50% { clip: rect(63px, 9999px, 3px, 0); }
  55% { clip: rect(15px, 9999px, 78px, 0); }
  60% { clip: rect(30px, 9999px, 99px, 0); }
  65% { clip: rect(54px, 9999px, 57px, 0); }
  70% { clip: rect(39px, 9999px, 66px, 0); }
  75% { clip: rect(70px, 9999px, 35px, 0); }
  80% { clip: rect(25px, 9999px, 97px, 0); }
  85% { clip: rect(17px, 9999px, 72px, 0); }
  90% { clip: rect(96px, 9999px, 84px, 0); }
  95% { clip: rect(49px, 9999px, 83px, 0); }
  100% { clip: rect(16px, 9999px, 7px, 0); }
}

.bio-text {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 500px;
  min-height: 3.2em;
}

.action-group {
  display: flex;
  gap: 1.5rem;
}

.btn-primary, .btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  height: 50px;
  font-family: var(--font-display);
  font-size: 0.9rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  letter-spacing: 0.1em;
}

.btn-primary {
  background: var(--text-main);
  color: #000;
  font-weight: 600;
}

.btn-primary:hover {
  background: var(--primary);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.5);
}

.btn-ghost {
  border: 1px solid var(--border-light);
  color: var(--text-main);
}

.btn-ghost:hover {
  border-color: var(--primary);
  background: rgba(0, 240, 255, 0.08);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.visual-circle {
  position: absolute;
  width: 480px;
  height: 480px;
  border: 1px dashed rgba(0, 240, 255, 0.2);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
  box-shadow: inset 0 0 30px rgba(0, 240, 255, 0.05);
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2.5rem 0;
  margin-bottom: 6rem;
}

.stat-item {
  text-align: center;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
}

.stat-value {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(0, 240, 255, 0.3);
}

.stat-label {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: var(--text-muted);
}

/* Skills Section */
.section-header {
  margin-bottom: 3rem;
}

.section-header h2 {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--text-main);
}

.text-gradient {
  color: var(--primary);
  margin-left: 1rem;
}

.skills-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 3rem;
}

.skills-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-tab {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: transparent;
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  text-align: left;
}

.skill-tab:hover {
  border-color: rgba(0, 240, 255, 0.4);
  color: var(--text-main);
  transform: translateX(4px);
}

.skill-tab.active {
  background: rgba(0, 240, 255, 0.08);
  border-color: var(--primary);
  color: var(--text-main);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.15);
  transform: translateX(6px);
}

.tab-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 8px currentColor;
}

/* Skill Detail Card */
.skill-detail-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.header-icon {
  font-size: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid var(--border-light);
}

.header-info h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.header-info p {
  color: var(--text-muted);
}

.skill-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.skill-bar-item {
  margin-bottom: 1rem;
}

.skill-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.skill-percent {
  font-family: var(--font-mono);
  opacity: 0.8;
  color: var(--primary);
}

.progress-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  box-shadow: 0 0 10px currentColor;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bio-text {
    margin: 0 auto 2rem;
  }

  .hero-visual {
    display: none;
  }

  .skills-layout {
    grid-template-columns: 1fr;
  }

  .skills-nav {
    flex-direction: row;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }

  .skills-nav::-webkit-scrollbar {
    display: none;
  }

  .skill-tab {
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .deep-home {
    padding-top: 2rem;
  }

  .hero-section {
    margin-bottom: 3rem;
  }

  .hero-layout {
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .identity-badge {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
    margin-bottom: 1.5rem;
  }

  .name-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }

  .bio-text {
    font-size: 0.95rem;
    margin-bottom: 2rem;
    max-width: 100%;
    padding: 0 0.5rem;
  }

  .action-group {
    gap: 1rem;
    width: 100%;
    flex-direction: column;
  }

  .btn-primary, .btn-ghost {
    width: 100%;
    height: 46px;
    font-size: 0.85rem;
  }

  /* 统计区域：双列网格 */
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    padding: 1.5rem 0;
    margin-bottom: 3rem;
  }

  .stat-item {
    background: var(--bg-card);
    padding: 1.2rem 0.5rem;
    border-radius: 12px;
    border: 1px solid var(--border-light);
  }

  .stat-value {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 0.65rem;
  }

  /* 技能区域 */
  .section-header {
    margin-bottom: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .text-gradient {
    margin-left: 0.5rem;
  }

  .skills-layout {
    gap: 1rem;
  }

  .skill-tab {
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
    gap: 0.5rem;
  }

  .skill-detail-card {
    padding: 1.2rem;
    border-radius: 12px;
  }

  .card-header {
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .header-icon {
    width: 48px;
    height: 48px;
    font-size: 1.6rem;
    border-radius: 10px;
  }

  .header-info h3 {
    font-size: 1.1rem;
    margin-bottom: 0.2rem;
  }

  .header-info p {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .skill-list {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .skill-meta {
    font-size: 0.82rem;
  }
}

@media (max-width: 380px) {
  .name-title {
    font-size: 2rem;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }
}
</style>
