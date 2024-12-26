<template>
  <div class="projects-card">
    <h2>重点项目经历</h2>
    <div class="projects-list">
      <div v-for="(project, index) in projects" :key="index" 
           class="project-item" 
           :class="{ 'fade-in': true }" 
           :style="{ '--delay': `${index * 0.1}s` }">
        <div class="project-content">
          <div class="project-header">
            <div class="project-title">
              <h3>{{ project.name }}</h3>
              <span class="project-period">{{ project.period }}</span>
            </div>
          </div>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-achievements">
            <h4><i class="achievement-icon">🎯</i>主要成就</h4>
            <ul>
              <li v-for="(achievement, aIndex) in project.achievements" 
                  :key="aIndex">{{ achievement }}</li>
            </ul>
          </div>
          <div class="tech-stack">
            <span v-for="(tech, tIndex) in project.techStack" 
                  :key="tIndex">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    name: '数据门户平台',
    period: '2023.12 - 2024.10',
    description: '综合数据洞察平台，集成数据分析、访问控制、资产管理等功能，提供统一的数据体验。',
    achievements: [
      '用 qiankun 微前端架构整合 Vue2、Vue3 和 React18 的多个独立项目',
      '开发智能聊天系统，集成 WebSocket 和 ChatGPT 实现数据分析',
      '设计并搭建 npm 私有 UI 框架 y-ui 和低代码平台 y-render',
      '实现黑白主题动态切换，封装可配置的 Element UI 主题组件'
    ],
    techStack: ['Vue3', 'React', '微前端', 'WebSocket', '低代码']
  },
  {
    name: '3D视觉智能系统',
    period: '2018.04 - 2021.03',
    description: '基于无人机拍摄技术的3D建模平台，实现城市、工地、园区等场景的快速建模。',
    achievements: [
      '独立开发于 Three.js 的 3D VR 全景平台',
      '实现细粒度的用户权限管理和自定义菜单系统',
      '开发时间轴和场景对比等创新功能',
      '使用 React + MobX 构建高性能的用户界面'
    ],
    techStack: ['Three.js', 'React', 'WebGL', 'Canvas']
  },
  {
    name: 'PMS绩效管理系统',
    period: '2022.11 - 2024.10',
    description: '企业级绩效管理解决方案，涵盖员工、客户、部门管理及项目执行等多个模块。',
    achievements: [
      '封装 lazy-tree 和 lazy-table 组件，解决大数据渲染性能问题',
      '开发 request-stop 请求管理工具，优化接口调用',
      '实现多级缓存策略，显著提升首屏加载速度'
    ],
    techStack: ['Vue3', 'Webpack', '性能优化']
  },
  {
    name: '星巴克OneStar数据平台',
    period: '2023.06 - 2024.10',
    description: '企业级数据分析平台，实现实时数据处理和精准分析，支持多维度权限管理和数据查询。',
    achievements: [
      '封装支持多图片上传的富文本编辑器组件',
      '实现基于 addRouter 的动态路由和精确的权限控制系统',
      '使用 RxJS 开发数据共享机制，优化项目间通信'
    ],
    techStack: ['Vue 2', 'RxJS', '权限管理']
  },
  {
    name: 'ASO榜单提升系统',
    period: '2021.04 - 2022.11',
    description: '专业的 APP 商店优化平台提供关键词优化、排名监控、数据分析等全方位服务。',
    achievements: [
      '基于 Vue 3 搭建项目架构，优化首屏性能',
      '设计异步加载方案，实现组件按需加载',
      '使用 Uniapp 开发跨平台应用，实现 Android/iOS 套壳',
      '实现应用无感更新和强制更新功能'
    ],
    techStack: ['Vue 3', 'Uniapp', '性能优化']
  },
  {
    name: '元市场数字藏品平台',
    period: '2021.04 - 2022.11',
    description: 'NFT 数字藏品交易台，支持 300+ 平台藏品交易，提供完整的交易流程和安全保障。',
    achievements: [
      '独立完成前端开发和接口联调工作',
      '集成环信 SDK 实现即时通讯功能',
      '设计并实现完整的商品交易流程'
    ],
    techStack: ['Vue', 'WebSocket', '即时通讯']
  },
  {
    name: '车辆在线定核损系统',
    period: '2020.01 - 2021.06',
    description: '保险理赔核损管理系统，涵盖系统配置、规则设定、定损、查询以及 KPI 等五大功能模块。实现车辆信息统计和自动审核。',
    achievements: [
      '采用 Vue 和 AngularJS 混合开发模式，实现系统平滑升级',
      '设计可配置的业务模块和表单系统，提高系统灵活性',
      '使用 Echarts 开发地图、柱状图、折线图等多种数据可视化图表',
      '实现自动化数据刷新机制，确保数据实时性'
    ],
    techStack: ['Vue', 'AngularJS', 'Echarts', '数据可视化', '自动化运维']
  },
  {
    name: '移动端应用集合',
    period: '2021.08 - 2022.11',
    description: '包含天气通、超清桌面壁纸、简赚宝等多个移动端项目，涵盖天气服务、壁纸下载、任务奖励等功能。',
    achievements: [
      '使用 React Native + Redux 开发跨平台应用，实现多端统一体验',
      '集成 OpenWeatherMap API 实现精准天气预报和预警功能',
      '使用 AWS S3 云存储优化图片资源管理，提升加载速度',
      '实现智能图片压缩和缓存策略，优化用户体验',
      '集成环信 SDK 实现即时通讯，谷歌广告 SDK 实现广告投放'
    ],
    techStack: ['React Native', 'Redux', 'AWS', '云服务', 'SDK集成']
  },
  {
    name: '小它宠物小程序',
    period: '2022.10 - 2022.11',
    description: '综合性宠物服务小程序，提供商品购买、预约洗护、会员服务等功能，支持分享和推广。',
    achievements: [
      '基于 vant-weapp 开发小程序界面和功能',
      '实现商城系统和预约服务的完整流程',
      '开发动态会员码和抽奖功能',
      '使用 Vue 开发技术，提升开发效率'
    ],
    techStack: ['小程序', 'Vant Weapp', '云开发', '电商系统']
  }
];
</script>

<style scoped>
.projects-card {
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px var(--shadow-color);
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.projects-card h2 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(120deg, var(--primary-color), color-mix(in srgb, var(--primary-color) 70%, transparent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: var(--delay);
}

.project-content {
  background: color-mix(in srgb, var(--surface-color) 95%, transparent);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.8rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.project-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow-color);
  border-color: var(--primary-color);
}

.project-header {
  margin-bottom: 1.2rem;
}

.project-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-title h3 {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin: 0;
  font-weight: 600;
}

.project-period {
  color: var(--primary-color);
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent);
  transition: all 0.3s ease;
}

.project-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin: 1rem 0;
  padding: 1.2rem;
  background: color-mix(in srgb, var(--surface-color) 50%, transparent);
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--border-color) 50%, transparent);
}

.project-achievements {
  margin: 1.5rem 0;
}

.project-achievements h4 {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.achievement-icon {
  font-style: normal;
  font-size: 1.2rem;
}

.project-achievements ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.project-achievements li {
  color: var(--text-secondary);
  padding: 1rem 1rem 1rem 2rem;
  font-size: 0.95rem;
  position: relative;
  background: color-mix(in srgb, var(--surface-color) 50%, transparent);
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--border-color) 30%, transparent);
  transition: all 0.3s ease;
}

.project-achievements li:hover {
  background: color-mix(in srgb, var(--primary-color) 5%, var(--surface-color));
  border-color: color-mix(in srgb, var(--primary-color) 30%, transparent);
  transform: translateX(4px);
}

.project-achievements li::before {
  content: '▹';
  position: absolute;
  left: 0.8rem;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid color-mix(in srgb, var(--border-color) 50%, transparent);
}

.tech-stack span {
  background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  color: var(--primary-color);
  padding: 0.4rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent);
  transition: all 0.3s ease;
  cursor: default;
}

.tech-stack span:hover {
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .projects-card {
    padding: 1.5rem;
  }

  .projects-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .project-content {
    padding: 1.2rem;
  }

  .project-title {
    gap: 0.8rem;
  }

  .project-title h3 {
    font-size: 1.2rem;
  }

  .project-period {
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
  }

  .project-desc {
    font-size: 0.95rem;
    padding: 1rem;
  }

  .project-achievements li {
    font-size: 0.9rem;
    padding: 0.8rem 0.8rem 0.8rem 1.8rem;
  }

  .tech-stack {
    gap: 0.6rem;
  }

  .tech-stack span {
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>