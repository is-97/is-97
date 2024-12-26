<script setup>
import avatarImg from '../assets/007eWV7mly8hi0swmrl3oj30u00u0gpf.jpg'
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
    
    <div class="summary-card">
      <h2>个人简介</h2>
      <div class="summary-content">
        <div class="summary-text">
          👋 Hi there! 我是 <strong>史振兴</strong>，一位充满激情的前端工程师，专注于构建优秀的用户体验。
          在过去7年的职业生涯中，我深度参与了多个大型企业级应用的开发，运用 <strong>Vue</strong> 和 <strong>React</strong> 生态系统打造高性能的现代化 Web 应用。
          我在微前端架构设计、性能优化、跨平台开发等领域积累了丰富的实战经验，并成功帮助多个团队解决技术难题。
          作为一名技术爱好者，我持续关注前端领域的创新技术，并积极将这些技术应用到实际项目中。
          同时，我也是开源社区的积极贡献者，热衷于分享技术经验和最佳实践。
        </div>
        <div class="summary-points">
          <div class="point">
            <i class="fas fa-laptop-code"></i>
            <div class="point-text">
              <h4>全栈开发</h4>
              <p>前端开发为主，具备后端开发能力，能独立完成完整项目开发</p>
            </div>
          </div>
          <div class="point">
            <i class="fas fa-mobile-alt"></i>
            <div class="point-text">
              <h4>跨端开发</h4>
              <p>熟悉多端开发技术，可开发Web、移动端、小程序等多平台应用</p>
            </div>
          </div>
          <div class="point">
            <i class="fas fa-chart-line"></i>
            <div class="point-text">
              <h4>数据可视化</h4>
              <p>擅长数据可视化和3D开发，能构建复杂的数据展示界面</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-cards">
      <div class="detail-card skills-section">
        <h2><i class="fas fa-code"></i> 专业技能</h2>
        <div class="skills-container">
          <div class="skill-category">
            <h3>前端开发</h3>
            <p class="skill-description">熟练运用HTML5、CSS3、JavaScript、ES6，以及前端开发技术，包括Less和Sass预编译语言</p>
            <div class="skill-items">
              <div class="skill-item">
                <div class="skill-header">
                  <span>HTML5 / CSS3</span>
                  <span class="skill-level">95%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 95%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>JavaScript / ES6</span>
                  <span class="skill-level">95%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 95%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Less / Sass</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>框架技术</h3>
            <p class="skill-description">掌握Vue2.0、Vue3.0、Angular.js、React.js等主流框架，了解MVC&MVVM设计模式和模块化开发流程</p>
            <div class="skill-items">
              <div class="skill-item">
                <div class="skill-header">
                  <span>Vue2.0 / Vue3.0</span>
                  <span class="skill-level">95%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 95%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>React.js</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Angular.js</span>
                  <span class="skill-level">85%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>可视化开发</h3>
            <p class="skill-description">熟悉Three.js、WebGL、Echarts、AntV-G2等技术，绘制图形和构建统计图表；了解并使用过Cocos Creator和LayaAir等游戏引擎</p>
            <div class="skill-items">
              <div class="skill-item">
                <div class="skill-header">
                  <span>Three.js / WebGL</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Echarts / AntV-G2</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Cocos / LayaAir</span>
                  <span class="skill-level">80%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 80%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>工程化工具</h3>
            <p class="skill-description">熟练使用Webpack、Gulp、Vite等前端打包构建工具，并完成Nginx的配置；使用GIT和SVN版本控制工具，促进团队高效开发</p>
            <div class="skill-items">
              <div class="skill-item">
                <div class="skill-header">
                  <span>Webpack / Vite</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Git / SVN</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Nginx</span>
                  <span class="skill-level">85%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>跨端开发</h3>
            <p class="skill-description">熟悉uni-app、React Native、Flutter等移动端混合开发技术</p>
            <div class="skill-items">
              <div class="skill-item">
                <div class="skill-header">
                  <span>uni-app</span>
                  <span class="skill-level">90%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 90%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>React Native</span>
                  <span class="skill-level">85%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Flutter</span>
                  <span class="skill-level">80%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 80%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-category">
            <h3>后端技能</h3>
            <p class="skill-description">熟悉Node.js和Java，能够设计MySQL和Oracle数据库业务表，实现基本后端业务</p>
            <div class="skill-items">
              <div class="skill-item">
                <div class="skill-header">
                  <span>Node.js</span>
                  <span class="skill-level">85%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 85%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>Java</span>
                  <span class="skill-level">80%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 80%"></div>
                </div>
              </div>
              <div class="skill-item">
                <div class="skill-header">
                  <span>MySQL / Oracle</span>
                  <span class="skill-level">80%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" style="width: 80%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-card">
        <h2>教育背景</h2>
        <div class="education-item">
          <h3>河南工业大学</h3>
          <p class="period">2014 - 2018</p>
          <p class="major">计算机科学与技术 | 本科</p>
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

/* 卡片基础样式 */
.profile-card,
.summary-card,
.detail-card {
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

/* 个人简介 */
.summary-card h2,
.detail-card h2 {
  font-size: 2rem;
  margin: 0 0 2rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.summary-content {
  display: grid;
  gap: 2.5rem;
}

.summary-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.summary-text strong {
  color: var(--primary-color);
  font-weight: 600;
}

.summary-points {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.point {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  gap: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.point:hover {
  transform: translateY(-5px);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.03)
  );
}

.point i {
  font-size: 2rem;
  color: var(--primary-color);
  opacity: 0.9;
}

.point-text h4 {
  color: var(--text-primary);
  font-size: 1.2rem;
  margin: 0 0 0.8rem;
}

.point-text p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* 技能部分 */
.skills-container {
  display: grid;
  gap: 2.5rem;
}

.skill-category {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2rem;
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skill-category:nth-child(1) { animation-delay: 0.1s; }
.skill-category:nth-child(2) { animation-delay: 0.2s; }
.skill-category:nth-child(3) { animation-delay: 0.3s; }
.skill-category:nth-child(4) { animation-delay: 0.4s; }

.skill-category:hover {
  background: rgba(255, 255, 255, 0.04);
}

.skill-category h3 {
  color: var(--text-primary);
  font-size: 1.4rem;
  margin: 0 0 1rem;
}

.skill-description {
  color: var(--text-secondary);
  margin: 0 0 1.5rem;
  line-height: 1.6;
}

.skill-items {
  display: grid;
  gap: 1.2rem;
}

.skill-item {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  color: var(--text-secondary);
}

.skill-level {
  color: var(--primary-color);
  font-weight: 500;
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 教育背景 */
.education-item {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.education-item:hover {
  transform: translateX(10px);
  background: rgba(255, 255, 255, 0.04);
}

.education-item h3 {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
}

.education-item p {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.education-item .period {
  color: var(--primary-color);
  font-weight: 500;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.detail-cards {
  display: grid;
  gap: 2rem;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
    gap: 2rem;
  }

  .avatar {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }

  .info h1 {
    font-size: 2.2rem;
  }

  .contact {
    grid-template-columns: 1fr;
  }

  .summary-points {
    grid-template-columns: 1fr;
  }

  .skill-category {
    padding: 1.5rem;
  }

  .summary-card,
  .detail-card {
    padding: 1.5rem;
  }
}
</style>