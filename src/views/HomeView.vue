<script setup>
import { ref } from 'vue'
import avatarImg from '../assets/007eWV7mly8hi0swmrl3oj30u00u0gpf.jpg'

const skills = [
  {
    category: '前端开发',
    icon: 'fas fa-code',
    color: '#3498db',
    mastery: 95,
    description: '精通现代前端开发技术栈，构建高性能的用户界面',
    items: [
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'JavaScript/ES6+', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Less/Sass', level: 90 },
      { name: 'WebComponents', level: 85 }
    ]
  },
  {
    category: '框架技术',
    icon: 'fas fa-layer-group',
    color: '#2ecc71',
    mastery: 90,
    description: '精通主流前端框架，了解MVC&MVVM设计模式',
    items: [
      { name: 'Vue.js 2/3', level: 95 },
      { name: 'React.js', level: 85 },
      { name: 'Angular.js', level: 80 },
      { name: 'TypeScript', level: 90 },
      { name: 'Node.js', level: 85 }
    ]
  },
  {
    category: '可视化开发',
    icon: 'fas fa-chart-bar',
    color: '#e74c3c',
    mastery: 85,
    description: '擅长数据可视化和3D开发，构建复杂的数据展示界面',
    items: [
      { name: 'Three.js', level: 85 },
      { name: 'WebGL', level: 80 },
      { name: 'Echarts', level: 90 },
      { name: 'AntV-G2', level: 85 },
      { name: 'D3.js', level: 80 }
    ]
  },
  {
    category: '工程化工具',
    icon: 'fas fa-tools',
    color: '#9b59b6',
    mastery: 90,
    description: '熟练使用现代前端工程化工具，确保高效开发',
    items: [
      { name: 'Webpack', level: 90 },
      { name: 'Vite', level: 90 },
      { name: 'Git/SVN', level: 95 },
      { name: 'CI/CD', level: 85 },
      { name: 'Docker', level: 80 }
    ]
  }
]

const activeSkill = ref(skills[0])

const coreStrengths = [
  { 
    title: '全栈开发能力', 
    description: '前后端全栈开发经验，能独立完成完整项目开发', 
    icon: 'fas fa-code-branch',
    color: '#3498db'
  },
  { 
    title: '工程化思维', 
    description: '注重代码质量和开发效率，熟练使用现代化工具链', 
    icon: 'fas fa-tools',
    color: '#2ecc71'
  },
  { 
    title: '技术视野广阔', 
    description: '持续学习新技术，涵盖Web、移动、游戏、AI等领域', 
    icon: 'fas fa-brain',
    color: '#e74c3c'
  },
  { 
    title: '项目经验丰富', 
    description: '参与过多个大型项目，具备出色的问题解决能力', 
    icon: 'fas fa-project-diagram',
    color: '#9b59b6'
  }
]
</script>

<template>
  <div class="home">
    <div class="profile-card">
      <div class="avatar">
        <img :src="avatarImg" alt="头像">
      </div>
      <div class="info">
        <h1>史振兴</h1>
        <p class="title">前端开发工程师</p>
        <p class="motto">💭 study hard and make progress every day</p>
        <div class="contact">
          <p><i class="fas fa-phone"></i> 18595729506</p>
          <p><i class="fas fa-envelope"></i> s_shizhenxing@163.com</p>
          <p><i class="fas fa-map-marker-alt"></i> 中国上海</p>
          <a href="https://github.com/is-97" target="_blank" class="github-link">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 个人简介卡片 -->
    <div class="intro-card">
      <div class="card-header">
        <h2><i class="fas fa-user-circle"></i>个人简介</h2>
        <div class="experience-badge">
          <span class="badge-number">7</span>
          <span class="badge-text">年前端开发经验</span>
        </div>
      </div>

      <div class="intro-content">
        <div class="intro-text">
          <h3>全栈开发工程师</h3>
          <p>专注于构建高性能的现代化 Web 应用</p>
        </div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">50<span>+</span></div>
            <div class="stat-label">项目经验</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10<span>+</span></div>
            <div class="stat-label">技术领域</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">20<span>+</span></div>
            <div class="stat-label">技术栈</div>
          </div>
        </div>

        <div class="strengths-grid">
          <div v-for="(strength, index) in coreStrengths" 
               :key="index"
               class="strength-card"
               :style="{ '--card-color': strength.color }">
            <div class="strength-icon">
              <i :class="strength.icon"></i>
            </div>
            <div class="strength-content">
              <h4>{{ strength.title }}</h4>
              <p>{{ strength.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 技能展示卡片 -->
    <div class="skills-card">
      <div class="card-header">
        <h2><i class="fas fa-code"></i>专业技能</h2>
      </div>

      <div class="skills-content">
        <div class="skills-nav">
          <button v-for="skill in skills"
                  :key="skill.category"
                  :class="['skill-tab', { active: skill === activeSkill }]"
                  :style="{ '--tab-color': skill.color }"
                  @click="activeSkill = skill">
            <i :class="skill.icon"></i>
            <span>{{ skill.category }}</span>
          </button>
        </div>

        <div class="skill-details">
          <div class="skill-header">
            <div class="skill-title">
              <h3>{{ activeSkill.category }}</h3>
              <p>{{ activeSkill.description }}</p>
            </div>
            <div class="mastery-meter">
              <span class="mastery-label">掌握程度</span>
              <div class="mastery-bar">
                <div class="mastery-fill" :style="{ width: activeSkill.mastery + '%' }"></div>
              </div>
              <span class="mastery-value">{{ activeSkill.mastery }}%</span>
            </div>
          </div>

          <div class="skill-grid">
            <div v-for="(item, index) in activeSkill.items"
                 :key="index"
                 class="skill-item"
                 :style="{ '--item-color': activeSkill.color }">
              <div class="skill-info">
                <span class="skill-name">{{ item.name }}</span>
                <span class="skill-level">{{ item.level }}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: item.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础布局 */
.home {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

/* 个人信息区域 */
.profile-card {
  display: flex;
  gap: 3rem;
  align-items: center;
  background: linear-gradient(
    145deg,
    var(--surface-color),
    color-mix(in srgb, var(--surface-color) 90%, var(--primary-color))
  );
}

.avatar {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar:hover {
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  object-fit: cover;
  border: 4px solid var(--surface-color);
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.1),
    0 0 0 10px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.avatar img:hover {
  transform: scale(1.05);
  border-radius: 50%;
}

.info {
  flex: 1;
}

.info h1 {
  font-size: 2.8rem;
  margin: 0;
  background: linear-gradient(120deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.title {
  font-size: 1.4rem;
  color: var(--primary-color);
  margin: 0.5rem 0;
  font-weight: 600;
  opacity: 0.9;
}

.motto {
  color: var(--text-secondary);
  font-style: italic;
  margin: 1rem 0;
  font-size: 1.1rem;
  opacity: 0.8;
}

.contact {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact p,
.contact .github-link {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--text-secondary);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  margin: 0;
  height: 45px;
  box-sizing: border-box;
  word-break: break-all;
  font-size: 0.9rem;
}

.contact p:hover,
.contact .github-link:hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.1);
}

.contact i {
  color: var(--primary-color);
  font-size: 1.2rem;
  opacity: 0.9;
  min-width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.contact .github-link {
  text-decoration: none;
}

.contact .github-link:hover {
  color: var(--primary-color);
}

.contact p span,
.contact .github-link span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .contact {
    grid-template-columns: 1fr;
  }
}

/* 卡片基础样式 */
.profile-card,
.intro-card,
.skills-card {
  background: var(--surface-color);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header h2 {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0;
  font-size: 1.8rem;
  color: var(--text-primary);
}

.card-header h2 i {
  color: var(--primary-color);
}

/* 个人简介样式 */
.intro-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.intro-text h3 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
  color: var(--text-primary);
}

.intro-text p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0;
}

.experience-badge {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.badge-number {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
}

.badge-text {
  color: var(--text-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-number span {
  font-size: 1.8rem;
  opacity: 0.8;
}

.stat-label {
  color: var(--text-secondary);
}

/* 核心优势样式 */
.strengths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.strength-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.strength-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--card-color);
}

.strength-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  font-size: 1.2rem;
  color: var(--card-color);
  flex-shrink: 0;
}

.strength-content {
  flex: 1;
}

.strength-content h4 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.strength-content p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* 技能展示样式 */
.skills-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.skills-nav {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: none;
}

.skills-nav::-webkit-scrollbar {
  display: none;
}

.skill-tab {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: none;
  border-radius: 12px;
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.skill-tab i {
  font-size: 1.2rem;
  color: var(--tab-color);
}

.skill-tab.active {
  background: var(--tab-color);
  color: white;
  transform: translateY(-2px);
}

.skill-tab.active i {
  color: white;
}

.skill-details {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.skill-title h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.skill-title p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.95rem;
}

.mastery-meter {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mastery-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.mastery-bar {
  width: 150px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.mastery-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.mastery-value {
  color: var(--primary-color);
  font-weight: 600;
  min-width: 3ch;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.skill-name {
  color: var(--text-primary);
  font-weight: 500;
}

.skill-level {
  color: var(--item-color);
  font-weight: 600;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--item-color);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .profile-card,
  .intro-card,
  .skills-card {
    padding: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .intro-text {
    text-align: center;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .strengths-grid {
    grid-template-columns: 1fr;
  }

  .skills-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin: 0 -1.5rem;
    padding: 0 1.5rem 1rem;
  }

  .skill-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .mastery-meter {
    width: 100%;
    justify-content: space-between;
  }

  .skill-grid {
    grid-template-columns: 1fr;
  }
}
</style>