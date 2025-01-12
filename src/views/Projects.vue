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
    name: 'AI-Generated Content (AIGC) 内容生成平台',
    period: '2024.09 - 2024.11',
    description: '基于深度学习与自然语言处理技术，开发了一套 AI 生成内容（AIGC）系统，能够自动生成高质量的文本、图像及多模态内容。',
    achievements: [
      '设计并开发响应式前端界面，支持多端（Web、移动端）访问，提升用户体验。',
      '使用 React 构建动态交互组件，如表单输入、内容展示、生成结果预览等。',
      '与后端团队协作，通过 RESTful API 或 WebSocket 实现前后端数据交互，确保生成内容的实时展示与更新。',
      '优化前端性能，减少页面加载时间，提升用户操作流畅度。',
      '实现用户权限管理、内容编辑与下载功能，满足不同用户需求。',
      '使用可视化工具（如图表库）展示生成内容的统计数据与分析结果。'
    ],
    techStack: ['React', 'WebSocket', 'RESTful API', '性能优化', '数据可视化']
  },
  {
    name: '门户报表大屏（PC）',
    period: '2022.11 - 2024.11',
    description: '综合性的数据可视化系统，旨在为用户提供全面的 KPI（关键绩效指标）监控与分析。',
    achievements: [
      '从 0 到 1 搭建项目，完成全部功能开发，并通过 FTP 部署项目上线，确保系统稳定运行。',
      '使用自定义 Hooks 封装公共方法，抽离公共组件，结合组件化开发和自定义指令，显著提升开发效率。',
      '针对大量数据渲染场景，采用 Web Worker 创建多线程处理数据渲染，优化页面性能，提升用户体验。',
      '基于 Promise 二次封装 axios 请求方法，统一管理请求拦截器和响应器，增强代码可维护性和扩展性。',
      '实现多种数据可视化图表（如中国地图、柱状图、折线图等），支持用户动态筛选和查看 KPI 数据。'
    ],
    techStack: ['Vue3', 'Web Worker', 'Axios', '数据可视化', '性能优化']
  },
  {
    name: '数据门户（PC，H5）',
    period: '2022.11 - 2024.11',
    description: '综合数据洞察、访问控制、后台管理、数据补录、数据资产及 Enmolar 数据预测的数据中后台平台。',
    achievements: [
      '使用 qiankun 微前端架构，将基于 Vue2、Vue3 和 React18 技术栈的 7 个独立项目整合为一个统一的数据门户平台，提升系统可维护性和扩展性。',
      '开发智能聊天系统，结合 WebSocket 技术和 ChatGPT，为用户提供精准的数据分析支持，提升用户体验。',
      '重新设计黑白主题方案，封装公共组件支持动态切换 Element UI 框架主题色，满足用户个性化需求。',
      '设计并搭建公司私有 npm UI 框架 y-ui，降低多个项目之间的耦合度，提升开发效率。',
      '搭建公司内部低代码平台 y-render，支持自动生成 Vue2.0 和 React18 常用代码，减少重复开发工作量。'
    ],
    techStack: ['Vue3', 'React18', '微前端', 'WebSocket', '低代码']
  },
  {
    name: 'PMS绩效管理系统（PC，H5）',
    period: '2022.11 - 2024.11',
    description: '旨在提升企业绩效管理效率的全面解决方案，涵盖员工信息、客户信息、部门信息管理等功能。',
    achievements: [
      '独立封装公共组件 lazy-tree 和 lazy-table，采用虚拟列表技术解决大数据渲染卡顿问题，显著提升页面性能。',
      '独立封装公共请求文件 request-stop，解决接口重复请求问题，优化网络请求效率。',
      '在 Webpack 中配置 Babel 和 Loader，开启 gzip 压缩和 etag 标记等缓存优化措施，缩小压缩包体积，提升首屏加载速度。',
      '实现员工、客户、部门、项目等信息的管理功能，支持动态配置和高效查询。',
      '开发工时审批、绩效统计等核心模块，为企业提供全面的绩效管理解决方案。'
    ],
    techStack: ['Vue3', 'Webpack', '性能优化', '虚拟列表']
  },
  {
    name: 'OneStar（H5）',
    period: '2022.11 - 2024.11',
    description: '数据平台，能够实时获取、处理和分析大量数据，帮助员工查询各城市及销售区域的日常数据。',
    achievements: [
      '使用 Vue2 和原生 JavaScript 封装公共富文本输入框，支持多图片上传和大文本提交功能，提升用户输入体验。',
      '通过 addRouter 实现动态路由和自定义指令，精确控制每个用户的页面权限和按钮权限，确保系统安全性。',
      '使用 RxJS 封装传值呼机，实现项目之间数据共享，提升数据交互效率。',
      '开发数据查询和分析模块，支持员工实时查看各城市及销售区域的日常数据，助力决策制定。',
      '实现权限管理功能，支持根据角色动态分配权限，满足不同用户的需求。'
    ],
    techStack: ['Vue2', 'RxJS', '权限管理', '动态路由']
  },
  {
    name: '元市场（H5）',
    period: '2021.04 - 2022.11',
    description: 'NFT 数字藏品的第三方交易平台，旨在打造独特的二次元社区，支持 300 多家藏品平台的买卖家交易。',
    achievements: [
      '独立完成前端所有页面的开发工作，包括首页、商品详情、交易流程、个人中心等模块。',
      '独立负责全部页面的接口联调工作，确保前后端数据交互的准确性和实时性。',
      '设计并实现买卖家聊天功能，集成环信 SDK，支持文字、图片和视频的发送与接收，提升用户沟通体验。',
      '独立实现从商品发布、买家下单支付到买家收货的全流程功能，确保交易流程的完整性和用户体验的流畅性。',
      '实现保证金缴纳、实名认证、我的收藏等附加功能，完善平台服务体系。'
    ],
    techStack: ['Vue', 'WebSocket', '即时通讯', 'NFT']
  },
  {
    name: '小它宠物（小程序）',
    period: '2022.10 - 2022.10',
    description: '综合性宠物服务小程序，提供商品购买、预约洗护、会员服务等功能，支持分享和推广。',
    achievements: [
      '使用 vant-weapp 组件库开发小程序前端页面，实现动态会员码功能和抽奖功能，提升用户活跃度。',
      '实现在线下单、购物车管理、洗护预约等核心功能，并开发“我的订单”和“商城订单”模块，完善用户交易体验。',
      '开发小程序海报组件，支持生成朋友圈分享海报并保存为图片，助力社交传播与用户增长。',
      '使用 mp-html 渲染 HTML 内容，结合 Apache ECharts 实现数据可视化，提升页面交互性与数据展示效果。',
      '基于微信云开发和云托管技术，快速搭建业务逻辑，提高开发效率并降低运维成本。'
    ],
    techStack: ['小程序', 'Vant Weapp', '云开发', '电商系统']
  },
  {
    name: '联合宇宙（H5）',
    period: '2021.04 - 2022.10',
    description: '集数字艺术创新、元宇宙空间打造及内容生态社区创建于一体的元宇宙门户网站。',
    achievements: [
      '独立完成公司手机 App 的详细设计、代码开发与测试，高质量交付项目，搭建产品架构并实现核心功能。',
      '攻克技术难题，持续优化产品技术体验，负责项目全流程实施（开发、打包、上架及优化）。',
      '使用 Vue3、Vant 3 组件库和 Vite 构建工具进行移动端开发，采用 uniapp 套壳模式实现安卓端适配，并与 iOS 端实现传参、支付、截屏、下载等交互功能。',
      '实现数字多媒体铸造、NFT 盲盒、私人藏品室等核心功能，支持用户上传与展示 3D 作品、数字音乐等内容。',
      '基于百度超级链底层技术，搭建联盟区块链+内容+社区的元宇宙空间，提供跨域转赠和开放 API 接口，支持第三方应用接入。'
    ],
    techStack: ['Vue3', 'Vant', 'Vite', 'uniapp', '元宇宙']
  },
  {
    name: '口令红包（H5）',
    period: '2021.04 - 2022.10',
    description: '基于 H5 的红包领取应用，用户通过输入特定兑换口令即可领取红包。',
    achievements: [
      '使用 Vue3、Vant 3 和 Vite 搭建项目结构，实现高效开发和快速构建。',
      '独立完成前端页面开发与后端接口联调，确保数据交互的准确性和实时性。',
      '实现通过 URL Scheme 从打卡 App 唤醒 H5 页面并完成跳转和回调领奖功能，提升用户体验。',
      '配合 App 内置打卡功能，持续优化页面 UI 和交互设计，针对用户体验和性能进行大量改进，包括加载速度、动画流畅度等。',
      '通过加密和混淆技术保障口令安全，有效防止恶意猜解和攻击，提升系统安全性。'
    ],
    techStack: ['Vue3', 'Vant', 'Vite', 'H5', '加密技术']
  },
  {
    name: '简赚宝（H5）',
    period: '2021.04 - 2022.10',
    description: '网赚类 H5 应用平台，用户通过完成签到、分享推广等简单任务即可获取收益。',
    achievements: [
      '负责 PC 端和移动端前端页面的开发与适配，确保多端兼容性和响应式布局。',
      '完成前端与后端数据的联调，实现任务发布、收益计算、红包领取等核心功能。',
      '优化用户体验，引入图片懒加载、静态资源 CDN 加速、页面动画效果及骨架屏技术，提升页面加载速度和交互流畅度。',
      '使用 uniapp 进行多渠道打包，支持快速发布至不同平台，并集成 gtag.js（谷歌监控）和友盟 SDK，实现数据监控与分析。',
      '通过性能优化和功能迭代，提升用户留存率和平台活跃度，使项目成为公司主要收入来源之一。'
    ],
    techStack: ['Vue3', 'uniapp', 'CDN', '性能优化', '数据监控']
  },
  {
    name: 'ASO榜单提升系统（H5）',
    period: '2021.04 - 2022.10',
    description: '专注于提升 APP 在应用商店排行榜和搜索结果排名的平台。',
    achievements: [
      '搭建基于 Vue3 的项目脚手架，集成全家桶框架（Vuex、Vue Router 等），优化首屏性能并引入性能监控工具，提升页面加载速度和用户体验。',
      '主导技术选型与架构设计，设计异步加载业务组件和动态路由方案，显著提升系统性能和用户交互流畅度。',
      '使用 Uniapp 实现安卓和 iOS 套壳应用，封装 H5 与原生 Android/iOS 的互调方法，支持跨平台功能扩展。',
      '在安卓端实现无感更新和强制更新功能，提高应用稳定性和安全性，确保用户始终使用最新版本。',
      '实现数据分析模块，利用专业工具对用户搜索行为、点击行为等数据进行深度分析，提供实质性优化建议。'
    ],
    techStack: ['Vue3', 'Uniapp', '性能优化', '动态路由', '数据分析']
  },
  {
    name: '超清桌面壁纸 (React Native)',
    period: '2021.08 - 2021.09',
    description: '基于 React Native 的超清桌面壁纸应用，支持用户浏览、下载和设置高清壁纸。',
    achievements: [
      '使用 React Native 开发跨平台移动应用，兼容 iOS 和 Android，实现壁纸浏览、下载和设置功能。',
      '设计并实现壁纸分类、搜索功能，支持用户按关键词、颜色、风格等筛选壁纸，提升用户体验。',
      '集成图片懒加载和缓存机制，优化壁纸加载速度，减少用户等待时间，提升应用性能。',
      '实现用户收藏、历史记录功能，支持个性化壁纸推荐，提高用户留存率。',
      '通过 Redux 管理应用状态，确保数据流清晰、逻辑可维护，提升开发效率。'
    ],
    techStack: ['React Native', 'Redux', '图片懒加载', '缓存机制']
  },
  {
    name: '3DVR 全景平台（PC）',
    period: '2018.04 - 2021.03',
    description: '基于 Three.js 和 Canvas 的 3DVR 全景平台，支持用户创建、管理和交互式浏览全景项目。',
    achievements: [
      '独立开发基于 Three.js 和 Canvas 的 3DVR 全景平台，实现 3D 场景渲染与动态效果制作，提供沉浸式交互体验。',
      '使用 React 和 MobX 搭建前端架构，结合 Ant Design 设计用户界面，确保界面美观且交互流畅。',
      '实现用户菜单和路由权限系统，支持自定义菜单、按钮及多种项目类型创建，新增时间轴、场景对比等功能，提升用户操作体验和内容管理效率。',
      '完成平台注册、登录、项目创建、场景管理等核心功能开发，并实现充值、支付等业务逻辑，确保平台商业化功能的完整性和用户体验。',
      '通过代码优化和资源加载策略，提升 3D 场景渲染性能，设计响应式布局兼容多端设备，最终交付功能完善的 3DVR 全景平台。'
    ],
    techStack: ['Three.js', 'React', 'MobX', '3D渲染', '权限管理']
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