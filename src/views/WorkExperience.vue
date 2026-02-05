<template>
  <div class="holo-experience" :class="{ loaded: isLoaded }">
    <div class="page-header">
      <h1 class="page-title">
        <span class="title-text">CAREER_LOG</span>
        <span class="title-deco">/// SYSTEM.WORK_HISTORY</span>
      </h1>
    </div>

    <div class="timeline-container">
      <!-- 激光光束 -->
      <div class="laser-beam"></div>

      <div v-for="(item, index) in experiences" :key="index"
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
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const experiences = [
  {
    company: '上海意臣信息科技有限公司',
    title: '前端开发工程师',
    period: '2022.11 - 2024.11',
    responsibilities: [
      '主导公司微前端架构重构，基于 Qiankun 整合 Vue2/3 及 React 技术栈，实现子应用无缝接入。',
      '搭建企业级低代码平台，设计可视化拖拽编辑器，提升内部系统开发效率 40% 以上。',
      '建立前端工程化体系，制定代码规范与 CI/CD 流程，统管 NPM 私有仓库。',
      '攻克复杂场景下的性能瓶颈，优化长列表渲染与大数据可视化交互体验。'
    ],
    techStack: ['Vue3', 'React', 'Qiankun', 'LowCode', 'Architecture']
  },
  {
    company: '钱谷网络科技（上海）有限公司',
    title: '前端开发工程师',
    period: '2021.04 - 2022.10',
    responsibilities: [
      '全栈式负责公司多端应用开发（Web / H5 / App），确保跨平台一致性体验。',
      '运用 UniApp 与 Flutter 混合开发技术，高效交付高性能移动端应用。',
      '负责应用上架全流程（Android/iOS），处理马甲包混淆与过审技术难题。'
    ],
    techStack: ['UniApp', 'Flutter', 'Hybrid App', 'Vue3']
  },
  {
    company: '上海盎维信息技术有限公司',
    title: '前端开发工程师',
    period: '2018.04 - 2021.03',
    responsibilities: [
      '基于 Three.js 开发 3D 全景展示平台，实现高性能 WebGL 渲染与交互。',
      '构建公司官网及后台管理系统，负责从设计还原到接口联调的全流程开发。'
    ],
    techStack: ['Three.js', 'WebGL', 'React', 'Visualization']
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap');

.holo-experience {
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
  padding: 2rem 0;
  max-width: 1000px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.holo-experience.loaded {
  opacity: 1;
  transform: translateY(0);
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
  left: -74px; /* 调整位置以对齐光束 */
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
  overflow: hidden; /* 裁剪扫描光 */
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
  .timeline-container {
    padding-left: 20px;
  }

  .laser-beam {
    left: 0;
  }

  .timeline-node {
    left: -6px;
    top: -30px;
  }

  .date-label {
    left: 20px;
    right: auto;
  }

  .experience-item {
    margin-top: 3rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
