<template>
  <div class="projects">
    <div class="project-grid">
      <div class="project-card" v-for="(project, index) in projects" :key="index">
        <img :src="project.image" :alt="project.name">
        <div class="project-content">
          <h3>{{ project.name }}</h3>
          <p class="project-role">{{ project.role }}</p>
          <p class="project-desc">{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="(tech, idx) in project.technologies" :key="idx">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    name: 'small-assembly',
    role: '开源贡献者',
    description: '一些实用的小插件集合，提供了多个可复用的前端组件和工具函数。',
    image: 'https://picsum.photos/400/200?random=1',
    technologies: ['JavaScript', 'Vue.js', 'CSS3', 'Webpack']
  },
  {
    name: 'screenOrientation',
    role: '技术维护',
    description: '移动端网页强制横/竖屏解决方案，支持多种场景和设备适配。',
    image: 'https://picsum.photos/400/200?random=2',
    technologies: ['HTML5', 'JavaScript', 'Mobile Adaptation']
  },
  {
    name: 'disable-devtool',
    role: '项目贡献者',
    description: '网页开发者工具禁用方案，提供了多种安全防护策略。',
    image: 'https://picsum.photos/400/200?random=3',
    technologies: ['JavaScript', 'Security', 'Browser API']
  }
]
</script>

<style scoped>
.projects {
  padding: 1rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

h3 {
  margin: 0;
  color: #333;
}

.project-role {
  color: #1890ff;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.project-desc {
  color: #666;
  margin: 1rem 0;
  line-height: 1.5;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tech span {
  background: #e6f7ff;
  color: #1890ff;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style> 