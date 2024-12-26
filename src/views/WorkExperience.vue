<template>
  <div class="experience-card">
    <h2>工作经历</h2>
    <div class="timeline">
      <div v-for="(item, index) in experiences" :key="index" class="experience-item" :class="{ 'fade-in': true }" :style="{ '--delay': `${index * 0.2}s` }">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3 class="company-name">{{ item.company }}</h3>
          <p class="job-title">{{ item.title }}</p>
          <p class="work-period">{{ item.period }}</p>
          <div class="responsibilities">
            <h4>工作职责</h4>
            <ul>
              <li v-for="(resp, rIndex) in item.responsibilities" :key="rIndex">{{ resp }}</li>
            </ul>
          </div>
          <div class="tech-stack">
            <span v-for="(tech, tIndex) in item.techStack" :key="tIndex">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const experiences = [
  {
    company: '上海意臣信息科技有限公司',
    title: '前端开发工程师',
    period: '2022.11 - 2024.05',
    responsibilities: [
      '领导前端团队开发和维护公司前端项目，运用 Vue2、Vue3、React 等技术栈，结合微前端解决方案 Qiankun，打造高效稳定的前端应用。',
      '设计并搭建公司前端项目的 NPM 私有仓库，搭建公司低代码平台，提高团队的开发效率和代码一致性。',
      '制定项目代码规范，包括命名、风格、注释等，以保证代码质量和一致性。',
      '处理技术难点的攻关，解决技术挑战，确保项目顺利推进。'
    ],
    techStack: ['Vue2', 'Vue3', 'React', 'Qiankun']
  },
  {
    company: '钱谷网络科技（上海）有限公司',
    title: '前端开发工程师',
    period: '2021.04 - 2022.10',
    responsibilities: [
      '领导并执行公司项目的全面前端设计与开发，包括 PC 端、移动端应用的开发与优化，以确保项目符合公司要求并实现最佳用户体验。',
      '运用 HTML5 技术，结合 Vue3、UniApp、React Native、Flutter、Cocos Creator 等多种前端开发框架，精准开发和部署手机端应用，从设计到上线，无缝衔接。',
      '负责与后端团队密切协作，高效完成功能的集成与调试工作，同时处理上架安卓应用、处理马甲包套壳等相关任务，确保应用通过审核并成功上线，为公司业务持续发展提供技术保障。'
    ],
    techStack: ['HTML5', 'Vue3', 'UniApp', 'React Native', 'Flutter', 'Cocos Creator']
  },
  {
    company: '上海盎维信息技术有限公司',
    title: '前端开发工程师',
    period: '2018.04 - 2021.03',
    responsibilities: [
      '使用 React 技术栈，开发公司官网前端页面，负责设计和实现网站的布局和交互。',
      '搭建 3D 全景平台，运用相关技术如 Three.js，实现网站的 3D 全景展示功能，提升用户体验。',
      '负责与团队合作，协调前端与后端开发工作，确保网站功能的顺利实现和发布。'
    ],
    techStack: ['React', 'Three.js']
  }
];
</script>

<style scoped>
.experience-card {
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px var(--shadow-color);
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    var(--primary-color) 0%,
    color-mix(in srgb, var(--primary-color) 50%, transparent) 100%
  );
}

.experience-item {
  position: relative;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s ease-out forwards;
  animation-delay: var(--delay);
}

.timeline-dot {
  position: absolute;
  left: -2.5rem;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  background: var(--primary-color);
  border-radius: 50%;
  border: 2px solid var(--surface-color);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary-color) 30%, transparent);
}

.timeline-content {
  background: color-mix(in srgb, var(--surface-color) 95%, transparent);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px var(--shadow-color);
}

.timeline-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow-color);
  border-color: var(--primary-color);
}

.company-name {
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(120deg, var(--primary-color), color-mix(in srgb, var(--primary-color) 70%, transparent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.job-title {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-weight: 500;
}

.work-period {
  color: var(--primary-color);
  font-size: 0.9rem;
  padding: 0.4rem 1rem;
  background: color-mix(in srgb, var(--primary-color) 10%, transparent);
  border-radius: 20px;
  display: inline-block;
  margin: 0.5rem 0;
  border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent);
}

.responsibilities {
  margin: 1.2rem 0;
}

.responsibilities h4 {
  color: var(--text-primary);
  font-size: 1.1rem;
  margin: 0 0 1rem;
  position: relative;
  padding-left: 1rem;
}

.responsibilities h4::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 4px;
  height: 1.2em;
  background: var(--primary-color);
  transform: translateY(-50%);
  border-radius: 2px;
}

.responsibilities ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.responsibilities li {
  color: var(--text-secondary);
  padding: 1rem 1rem 1rem 2.2rem;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  line-height: 1.6;
  position: relative;
  background: color-mix(in srgb, var(--surface-color) 50%, transparent);
  border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--border-color) 50%, transparent);
  transition: all 0.3s ease;
}

.responsibilities li:hover {
  background: color-mix(in srgb, var(--primary-color) 5%, var(--surface-color));
  border-color: color-mix(in srgb, var(--primary-color) 30%, transparent);
}

.responsibilities li::before {
  content: '▹';
  position: absolute;
  left: 0.8rem;
  color: var(--primary-color);
  font-size: 1.2rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.2rem;
}

.tech-stack span {
  background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  color: var(--primary-color);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid color-mix(in srgb, var(--primary-color) 20%, transparent);
  transition: all 0.3s ease;
  cursor: default;
}

.tech-stack span:hover {
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  transform: translateY(-2px);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .experience-card {
    padding: 1.2rem;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-dot {
    left: -1.6rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .timeline-content {
    padding: 1rem;
  }

  .company-name {
    font-size: 1.1rem;
  }

  .job-title {
    font-size: 1rem;
  }

  .responsibilities li {
    font-size: 0.9rem;
    padding: 0.8rem 0.8rem 0.8rem 2rem;
  }

  .tech-stack {
    gap: 0.6rem;
  }

  .tech-stack span {
    font-size: 0.8rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>