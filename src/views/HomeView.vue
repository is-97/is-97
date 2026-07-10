<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ThreeScene from '../components/ThreeScene.vue'
import CountUp from '../components/CountUp.vue'
import TypeText from '../components/TypeText.vue'
import { profile, skills } from '../data/profile'

const activeSkill = ref(0)
const isLargeScreen = ref(true)

let resizeTimeout = null
const checkScreenSize = () => {
  isLargeScreen.value = window.innerWidth > 1024
}

const handleResize = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(checkScreenSize, 150)
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (resizeTimeout) clearTimeout(resizeTimeout)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="deep-home">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-layout">
        <div class="hero-text">
          <div class="identity-badge">FRONTEND ARCHITECT</div>
          <h1 class="name-title" data-text="SHI ZHENXING">
            SHI<br>ZHENXING
          </h1>
          <div class="bio-text">
            <TypeText
              :text="profile.bio"
              :delay="800"
              :speed="50"
            />
          </div>

          <div class="action-group">
            <a :href="'mailto:' + profile.email" class="btn-primary">
              <span>CONTACT ME</span>
            </a>
            <a :href="profile.github" target="_blank" class="btn-ghost">
              <span>GITHUB</span>
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <ThreeScene v-if="isLargeScreen" />
          <div class="visual-circle"></div>
        </div>
      </div>
    </section>

    <!-- Stats Grid -->
    <section class="stats-section">
      <div v-for="(stat, index) in profile.stats" :key="index" class="stat-item">
        <div class="stat-value">
          <CountUp
            :to="stat.value"
            :pad="stat.pad"
            :suffix="stat.suffix"
            :delay="index * 200 + 500"
          />
        </div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
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
        <div class="skill-detail-card">
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
                  <CountUp :to="item.level" suffix="%" :duration="1500" />
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
  animation: titleFadeIn 1s ease-out forwards;
}

.name-title::before,
.name-title::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0b0d14;
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

@keyframes titleFadeIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
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
  transition: all 0.3s ease;
  letter-spacing: 0.1em;
}

.btn-primary {
  background: var(--text-main);
  color: #000;
  font-weight: 600;
}

.btn-primary:hover {
  background: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
}

.btn-ghost {
  border: 1px solid var(--border-light);
  color: var(--text-main);
}

.btn-ghost:hover {
  border-color: var(--text-main);
  background: rgba(255, 255, 255, 0.05);
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
  width: 500px;
  height: 500px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  z-index: 1;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 3rem 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
  margin-bottom: 6rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
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
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--text-main);
}

.skill-tab.active {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--text-main);
  color: var(--text-main);
}

.tab-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Skill Detail Card */
.skill-detail-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(20px);
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
  opacity: 0.7;
}

.progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.2, 0.8, 0.2, 1);
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
  }

  .skill-tab {
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .name-title {
    font-size: 3rem;
  }

  .stats-section {
    grid-template-columns: 1fr;
    gap: 1rem;
    border: none;
  }

  .stat-item {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 12px;
  }

  .skill-list {
    grid-template-columns: 1fr;
  }
}
</style>
