<template>
  <div class="skills">
    <div class="skill-category" v-for="(category, index) in skillCategories" :key="index">
      <h2>{{ category.title }}</h2>
      <div class="skill-grid">
        <div class="skill-item" v-for="(skill, idx) in category.skills" :key="idx">
          <div class="skill-name">{{ skill.name }}</div>
          <div class="skill-bar">
            <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
          </div>
          <div class="skill-level">{{ skill.level }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const skillCategories = [
  {
    title: '前端技术栈',
    skills: [
      { name: 'JavaScript (ES6+)', level: 90 },
      { name: 'Vue 3 (Composition API)', level: 95 },
      { name: 'React (Hooks)', level: 85 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'TypeScript', level: 85 }
    ]
  },
  {
    title: '开发工具',
    skills: [
      { name: 'VS Code', level: 95 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Webpack & Vite', level: 85 },
      { name: 'npm & Yarn', level: 90 },
      { name: 'Docker', level: 75 }
    ]
  },
  {
    title: '其他技能',
    skills: [
      { name: 'CSS预处理器 (Sass, LESS)', level: 85 },
      { name: 'Web性能优化', level: 80 },
      { name: '前端架构设计', level: 75 },
      { name: '模块化开发', level: 85 }
    ]
  }
]
</script>

<style scoped>
.skills {
  display: grid;
  gap: 2rem;
}

.skill-category {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #1890ff;
  padding-bottom: 0.5rem;
  display: inline-block;
}

.skill-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.skill-item {
  display: grid;
  grid-template-columns: 120px 1fr 50px;
  gap: 1rem;
  align-items: center;
}

.skill-name {
  font-weight: 500;
  color: #333;
}

.skill-bar {
  background: #f0f0f0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: #1890ff;
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

.skill-level {
  color: #666;
  font-size: 0.9rem;
  text-align: right;
}
</style> 