<template>
  <div class="experience">
    <div class="timeline">
      <div class="timeline-item" v-for="(job, index) in jobs" :key="index">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>{{ job.company }}</h3>
          <p class="position">{{ job.position }}</p>
          <p class="period">{{ job.period }}</p>
          <ul class="responsibilities">
            <li v-for="(item, idx) in job.responsibilities" :key="idx">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const jobs = [
  {
    company: '科技有限公司',
    position: '前端工程师',
    period: '2020年6月 - 至今',
    responsibilities: [
      '负责公司核心产品的前端架构设计和开发',
      '带领团队完成多个重要项目的开发和交付',
      '优化前端性能，提升用户体验',
      '指导初级工程师，促进团队技术成长'
    ]
  },
  {
    company: '互联网科技公司',
    position: '前端工程师',
    period: '2018年3月 - 2020年5���',
    responsibilities: [
      '参与电商平台的开发和维护',
      '实现复杂的交互功能和动画效果',
      '解决跨浏览器兼容性问题',
      '编写技术文档和开发规范'
    ]
  }
]
</script>

<style scoped>
.experience {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  background: #1890ff;
}

.timeline-item {
  position: relative;
  padding-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: -2.4rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #1890ff;
  border: 4px solid #fff;
}

.timeline-content {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

h3 {
  margin: 0;
  color: #1890ff;
}

.position {
  font-weight: 500;
  color: #333;
  margin: 0.5rem 0;
}

.period {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.responsibilities {
  margin: 0;
  padding-left: 1.2rem;
  color: #666;
}

.responsibilities li {
  margin-bottom: 0.5rem;
}
</style> 