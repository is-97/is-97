<template>
  <div class="holo-projects" :class="{ loaded: isLoaded }">
    <div class="page-header">
      <div class="header-content">
        <div class="holo-badge">
          <span class="badge-icon">◉</span>
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
      <div v-for="(project, index) in projects" :key="index"
           class="project-capsule"
           @click="openProject(project)"
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
              <span class="icon">⏱</span> {{ project.period }}
            </div>
            <p class="description">{{ project.description }}</p>
            <div class="click-hint">>> CLICK TO READ DATA</div>
          </div>
        </div>

        <!-- 装饰元素 -->
        <div class="deco-corner tl"></div>
        <div class="deco-corner br"></div>
        <div class="scan-line"></div>
      </div>
    </div>

    <!-- 全息模态框 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedProject" class="holo-modal-overlay" @click="closeProject">
          <div class="holo-modal" @click.stop>
          <div class="modal-glass"></div>
          <div class="modal-border"></div>
          <button class="close-btn" @click="closeProject">×</button>

          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title-group">
                <h2 class="modal-title">{{ selectedProject.name }}</h2>
                <span class="modal-period">{{ selectedProject.period }}</span>
              </div>
              <div class="tech-stack-large">
                <span v-for="(tech, i) in selectedProject.techStack" :key="i" class="tech-tag large">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="modal-body">
              <div class="section-label">>> SYSTEM_ANALYSIS</div>
              <p class="modal-desc">{{ selectedProject.description }}</p>

              <div class="section-label">>> KEY_ACHIEVEMENTS</div>
              <ul class="achievements-list">
                <li v-for="(achievement, i) in selectedProject.achievements" :key="i">
                  <span class="bullet">⟐</span>
                  <span class="text">{{ achievement }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- 模态框装饰 -->
          <div class="modal-scanner"></div>
        </div>
      </div>
    </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)
const selectedProject = ref(null)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const openProject = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden' // 禁止背景滚动
}

const closeProject = () => {
  selectedProject.value = null
  document.body.style.overflow = '' // 恢复滚动
}

const projects = [
  {
    name: 'AI-Generated Content Platform',
    period: '2024.09 - 2024.11',
    description: '基于深度学习的 AIGC 内容生成系统，支持多模态内容自动化生产。',
    achievements: [
      '构建响应式 AI 交互界面，支持实时流式内容生成。',
      '整合 WebSocket 实现低延迟的前后端数据传输。',
      '设计多模态内容预览组件，优化生成结果展示体验。'
    ],
    techStack: ['React', 'WebSocket', 'RESTful API', 'AIGC']
  },
  {
    name: 'Data Visualization Dashboard',
    period: '2022.11 - 2024.11',
    description: '企业级 KPI 监控大屏，提供实时数据洞察与决策支持。',
    achievements: [
      '基于 Web Worker 优化海量数据计算，渲染性能提升 50%。',
      '封装高复用性可视化组件库，支持动态配置图表类型。',
      '实现复杂的地图下钻与多维数据联动分析功能。'
    ],
    techStack: ['Vue3', 'Web Worker', 'ECharts', 'Performance']
  },
  {
    name: 'Enterprise Data Portal',
    period: '2022.11 - 2024.11',
    description: '集数据资产管理、访问控制与预测分析于一体的中后台平台。',
    achievements: [
      '采用 Qiankun 微前端架构整合 7 个子系统，统一技术底座。',
      '集成 ChatGPT 打造智能数据助手，实现自然语言查询数据。',
      '搭建企业级低代码引擎，支持拖拽生成业务表单。'
    ],
    techStack: ['Micro-Frontend', 'Vue3', 'React', 'ChatGPT']
  },
  {
    name: 'PMS Performance System',
    period: '2022.11 - 2024.11',
    description: '全流程绩效管理系统，覆盖员工考评、工时审批与报表统计。',
    achievements: [
      '实现虚拟滚动列表，解决万级数据表格渲染卡顿问题。',
      '构建请求去重与缓存机制，显著降低服务器负载。',
      '配置 Webpack 构建优化，首屏加载体积减少 40%。'
    ],
    techStack: ['Vue3', 'Virtual List', 'Webpack', 'Optimization']
  },
  {
    name: 'OneStar Data Platform',
    period: '2022.11 - 2024.11',
    description: '移动端销售数据查询平台，支持多维度业务数据实时分析。',
    achievements: [
      '设计动态路由权限系统，实现细粒度的页面与按钮级控制。',
      '使用 RxJS 处理复杂的跨组件状态流转与数据共享。',
      '封装富文本组件，支持多媒体内容的高效上传与展示。'
    ],
    techStack: ['Vue2', 'RxJS', 'H5', 'RBAC']
  },
  {
    name: 'Meta Market NFT',
    period: '2021.04 - 2022.11',
    description: '二次元 NFT 数字藏品交易平台，聚合 300+ 藏品源。',
    achievements: [
      '独立开发全站核心模块，包括交易撮合与支付结算流程。',
      '集成 IM SDK 实现买卖家实时沟通与多媒体消息发送。',
      '优化高并发下的抢购体验，确保交易数据的一致性。'
    ],
    techStack: ['Vue', 'Web3', 'IM SDK', 'Payment']
  },
  {
    name: 'Pet Care Mini Program',
    period: '2022.10 - 2022.10',
    description: '一站式宠物服务小程序，涵盖电商、预约与会员管理。',
    achievements: [
      '基于微信云开发构建全栈业务，大幅缩短开发周期。',
      '开发动态海报生成组件，利用 Canvas 实现个性化分享。',
      '集成会员积分与抽奖系统，提升用户留存与活跃度。'
    ],
    techStack: ['Mini Program', 'Vant Weapp', 'Cloud Base']
  },
  {
    name: 'Metaverse Portal',
    period: '2021.04 - 2022.10',
    description: '基于区块链的元宇宙内容社区，支持数字资产铸造与展示。',
    achievements: [
      '使用 UniApp 实现多端适配，并进行原生插件开发与桥接。',
      '集成 3D 渲染引擎展示数字藏品，优化移动端渲染性能。',
      '对接百度超级链，实现数字资产的链上确权与流转。'
    ],
    techStack: ['UniApp', 'Vite', 'Blockchain', '3D']
  },
  {
    name: '3DVR Panorama Platform',
    period: '2018.04 - 2021.03',
    description: '基于 WebGL 的全景漫游创作平台，支持可视化场景编辑。',
    achievements: [
      '基于 Three.js 独立开发全景渲染引擎，支持热点交互与场景切换。',
      '设计可视化编辑器架构，实现拖拽式场景搭建与配置。',
      '优化全景图加载策略，采用分块加载提升大图浏览体验。'
    ],
    techStack: ['Three.js', 'React', 'WebGL', 'Editor']
  }
]
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
}

.capsule-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  z-index: 1;
  pointer-events: none;
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

.click-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #00f0ff;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s;
  margin-top: auto;
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

/* --- 全息模态框 --- */
.holo-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 5, 10, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.holo-modal {
  position: relative;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  background: rgba(10, 20, 30, 0.9);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
  z-index: 0;
}

.modal-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 20px;
  z-index: 1;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);
  pointer-events: none;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: #00f0ff;
  transform: rotate(90deg);
}

.modal-content {
  position: relative;
  z-index: 2;
  padding: 3rem;
  overflow-y: auto;
}

.modal-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}

.modal-period {
  font-family: 'JetBrains Mono', monospace;
  color: #00f0ff;
}

.tech-stack-large {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.tech-tag.large {
  padding: 0.5rem 1.2rem;
  font-size: 0.9rem;
  border-radius: 20px;
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: #fff;
  background: rgba(0, 240, 255, 0.1);
}

.modal-body {
  color: rgba(255, 255, 255, 0.9);
}

.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #00f0ff;
  margin: 2rem 0 1rem 0;
  letter-spacing: 0.1em;
}

.modal-desc {
  font-size: 1.1rem;
  line-height: 1.7;
}

.achievements-list {
  list-style: none;
  padding: 0;
}

.achievements-list li {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border-left: 2px solid rgba(0, 240, 255, 0.3);
}

.bullet {
  color: #00f0ff;
  font-weight: bold;
}

/* 模态框动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .holo-modal {
  animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-leave-active .holo-modal {
  animation: modalPop 0.3s ease reverse;
}

@keyframes modalPop {
  0% { transform: scale(0.9) translateY(20px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
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

  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.8rem;
  }
}
</style>
