<template>
  <div class="holo-experience">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-text">CAREER_LOG</span>
        <span class="title-deco">/// SYSTEM.WORK_HISTORY</span>
      </h1>
    </div>

    <div class="timeline-container">
      <!-- 激光光束 -->
      <div class="laser-beam"></div>

      <div v-for="(item, index) in experiences" :key="item.id"
           class="experience-item"
           :style="{ '--delay': index * 0.15 + 's' }">

        <!-- 时间节点 -->
        <div class="timeline-node">
          <div class="node-core"></div>
          <div class="node-ring"></div>
          <div class="date-label">{{ item.period }}</div>
        </div>

        <!-- 经历卡片 -->
        <div class="experience-card">
          <div class="card-glass"></div>
          <div class="card-content">
            <div class="card-header">
              <h2 class="company-name">{{ item.company }}</h2>
              <span class="job-title">{{ item.title }}</span>
            </div>

            <div class="divider"></div>

            <ul class="responsibilities-list">
              <li v-for="(resp, rIndex) in item.responsibilities" :key="rIndex">
                <span class="bullet">›</span>
                <span class="text">{{ resp }}</span>
              </li>
            </ul>

            <div class="tech-stack">
              <span v-for="(tech, tIndex) in item.techStack" :key="tIndex" class="tech-chip">
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- 全息装饰 -->
          <div class="corner tl"></div>
          <div class="corner br"></div>
          <div class="scan-highlight"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { experiences } from '../data/experience'
</script>

<style scoped>
/* Rajdhani 字体已在 index.html 中统一加载 */

.holo-experience {
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
  padding: 2rem 0;
  max-width: 1000px;
  margin: 0 auto;
}

/* 标题 */
.page-header {
  margin-bottom: 4rem;
  padding-left: 3rem;
  border-left: 4px solid #00f0ff;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.1), transparent);
}

.page-title {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.title-text {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}

.title-deco {
  font-size: 1rem;
  color: #00f0ff;
  letter-spacing: 0.2em;
  opacity: 0.8;
}

/* 时间轴容器 */
.timeline-container {
  position: relative;
  padding: 2rem 0 2rem 100px;
}

/* 激光光束 */
.laser-beam {
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(0, 240, 255, 0.3);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.5);
}

.laser-beam::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background: linear-gradient(to bottom, #00f0ff, transparent);
  animation: beamFlow 3s infinite linear;
}

@keyframes beamFlow {
  0% { top: -20%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* 经历项 */
.experience-item {
  position: relative;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateX(30px);
  animation: slideIn 0.6s ease forwards;
  animation-delay: var(--delay);
}

@keyframes slideIn {
  to { opacity: 1; transform: translateX(0); }
}

/* 节点 */
.timeline-node {
  position: absolute;
  left: -74px;
  top: 0;
  display: flex;
  align-items: center;
}

.node-core {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff, 0 0 20px #00f0ff;
  z-index: 2;
}

.node-ring {
  position: absolute;
  left: -6px;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(0, 240, 255, 0.5);
  border-radius: 50%;
  animation: pulseRing 2s infinite;
}

.date-label {
  position: absolute;
  right: 25px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #00f0ff;
  white-space: nowrap;
  background: rgba(0, 10, 20, 0.8);
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid rgba(0, 240, 255, 0.3);
}

@keyframes pulseRing {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* 卡片 */
.experience-card {
  position: relative;
  background: rgba(10, 20, 30, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 2rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-glass {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(10px);
  z-index: -1;
}

.experience-card:hover {
  border-color: rgba(0, 240, 255, 0.4);
  background: rgba(10, 20, 30, 0.6);
  transform: translateX(10px);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
}

.card-header {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
}

.company-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.job-title {
  font-size: 1.1rem;
  color: #00f0ff;
  letter-spacing: 0.05em;
  background: rgba(0, 240, 255, 0.1);
  padding: 4px 12px;
  border-radius: 2px;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 240, 255, 0.5), transparent);
  margin-bottom: 1.5rem;
}

.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.responsibilities-list li {
  display: flex;
  gap: 10px;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.bullet {
  color: #00f0ff;
  font-weight: bold;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.tech-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  transition: all 0.3s;
}

.experience-card:hover .tech-chip {
  color: #00f0ff;
  border-color: #00f0ff;
  box-shadow: 0 0 8px rgba(0, 240, 255, 0.2);
}

/* 装饰元素 */
.corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #00f0ff;
  transition: all 0.3s;
  opacity: 0.5;
}

.corner.tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.corner.br { bottom: 0; right: 0; border-left: none; border-top: none; }

.experience-card:hover .corner {
  width: 20px;
  height: 20px;
  opacity: 1;
  box-shadow: 0 0 10px #00f0ff;
}

.scan-highlight {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transform: skewX(-20deg);
  transition: left 0.5s;
}

.experience-card:hover .scan-highlight {
  left: 200%;
  transition: left 1s ease-in-out;
}

/* 响应式 */
@media (max-width: 768px) {
  .holo-experience {
    padding: 1rem 0;
  }

  .page-header {
    padding-left: 1.2rem;
    margin-bottom: 2.5rem;
    border-left-width: 3px;
  }

  .title-text {
    font-size: 2rem;
  }

  .title-deco {
    font-size: 0.75rem;
  }

  .timeline-container {
    padding-left: 30px;
  }

  .laser-beam {
    left: 10px;
  }

  .timeline-node {
    left: -20px;
    top: -25px;
  }

  .date-label {
    left: 25px;
    right: auto;
    font-size: 0.75rem;
    padding: 2px 6px;
  }

  .experience-item {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }

  .experience-card {
    padding: 1.2rem;
    border-radius: 10px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .company-name {
    font-size: 1.3rem;
  }

  .job-title {
    font-size: 0.85rem;
    padding: 3px 8px;
  }

  .divider {
    margin-bottom: 1rem;
  }

  .responsibilities-list li {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    gap: 8px;
  }

  .tech-stack {
    gap: 0.5rem;
  }

  .tech-chip {
    font-size: 0.7rem;
    padding: 3px 8px;
  }

  .experience-card:hover {
    transform: none;
  }
}
</style>
