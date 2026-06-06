export const projects = [
  {
    id: 'proj-1',
    name: 'AI-Generated Content Platform',
    period: '2024.09 - 2024.11',
    description: '基于深度学习的 AIGC 内容生成系统，支持多模态内容自动化生产。',
    achievements: [
      '构建响应式 AI 交互界面，支持实时流式内容生成。',
      '整合 WebSocket 实现低延迟的前后端数据传输。',
      '设计多模态内容预览组件，优化生成结果展示体验。'
    ],
    image: '/project-aigc.png',
    imageColor: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%)',
    techStack: ['React', 'WebSocket', 'RESTful API', 'AIGC'],
    links: {
      demo: 'https://is-97.vercel.app',
      github: null
    }
  },
  {
    id: 'proj-2',
    name: 'Data Visualization Dashboard',
    period: '2022.11 - 2024.11',
    description: '企业级 KPI 监控大屏，提供实时数据洞察与决策支持。',
    achievements: [
      '基于 Web Worker 优化海量数据计算，渲染性能提升 50%。',
      '封装高复用性可视化组件库，支持动态配置图表类型。',
      '实现复杂的地图下钻与多维数据联动分析功能。'
    ],
    image: '/project-dashboard.png',
    imageColor: 'linear-gradient(135deg, #0a1a2e 0%, #1b3a5c 100%)',
    techStack: ['Vue3', 'Web Worker', 'ECharts', 'Performance'],
    links: {
      demo: null,
      github: 'https://github.com'
    }
  },
  {
    id: 'proj-3',
    name: 'Enterprise Data Portal',
    period: '2022.11 - 2024.11',
    description: '集数据资产管理、访问控制与预测分析于一体的中后台平台。',
    achievements: [
      '采用 Qiankun 微前端架构整合 7 个子系统，统一技术底座。',
      '集成 ChatGPT 打造智能数据助手，实现自然语言查询数据。',
      '搭建企业级低代码引擎，支持拖拽生成业务表单。'
    ],
    image: '/project-portal.png',
    imageColor: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 100%)',
    techStack: ['Micro-Frontend', 'Vue3', 'React', 'ChatGPT'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-4',
    name: 'PMS Performance System',
    period: '2022.11 - 2024.11',
    description: '全流程绩效管理系统，覆盖员工考评、工时审批与报表统计。',
    achievements: [
      '实现虚拟滚动列表，解决万级数据表格渲染卡顿问题。',
      '构建请求去重与缓存机制，显著降低服务器负载。',
      '配置 Webpack 构建优化，首屏加载体积减少 40%。'
    ],
    image: '/project-pms.png',
    imageColor: 'linear-gradient(135deg, #1a0f0a 0%, #3a2b1b 100%)',
    techStack: ['Vue3', 'Virtual List', 'Webpack', 'Optimization'],
    links: {
      demo: null,
      github: 'https://github.com'
    }
  },
  {
    id: 'proj-5',
    name: 'OneStar Data Platform',
    period: '2022.11 - 2024.11',
    description: '移动端销售数据查询平台，支持多维度业务数据实时分析。',
    achievements: [
      '设计动态路由权限系统，实现细粒度的页面与按钮级控制。',
      '使用 RxJS 处理复杂的跨组件状态流转与数据共享。',
      '封装富文本组件，支持多媒体内容的高效上传与展示。'
    ],
    image: '/project-onestar.png',
    imageColor: 'linear-gradient(135deg, #0a1a0f 0%, #1b3a2b 100%)',
    techStack: ['Vue2', 'RxJS', 'H5', 'RBAC'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-6',
    name: 'Meta Market NFT',
    period: '2021.04 - 2022.11',
    description: '二次元 NFT 数字藏品交易平台，聚合 300+ 藏品源。',
    achievements: [
      '独立开发全站核心模块，包括交易撮合与支付结算流程。',
      '集成 IM SDK 实现买卖家实时沟通与多媒体消息发送。',
      '优化高并发下的抢购体验，确保交易数据的一致性。'
    ],
    image: '/project-nft.png',
    imageColor: 'linear-gradient(135deg, #1a0a1a 0%, #2b1b3a 100%)',
    techStack: ['Vue', 'Web3', 'IM SDK', 'Payment'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-7',
    name: 'Pet Care Mini Program',
    period: '2022.10 - 2022.10',
    description: '一站式宠物服务小程序，涵盖电商、预约与会员管理。',
    achievements: [
      '基于微信云开发构建全栈业务，大幅缩短开发周期。',
      '开发动态海报生成组件，利用 Canvas 实现个性化分享。',
      '集成会员积分与抽奖系统，提升用户留存与活跃度。'
    ],
    image: '/project-pet.png',
    imageColor: 'linear-gradient(135deg, #0f1a0f 0%, #1a3a1a 100%)',
    techStack: ['Mini Program', 'Vant Weapp', 'Cloud Base'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-8',
    name: 'Metaverse Portal',
    period: '2021.04 - 2022.10',
    description: '基于区块链的元宇宙内容社区，支持数字资产铸造与展示。',
    achievements: [
      '使用 UniApp 实现多端适配，并进行原生插件开发与桥接。',
      '集成 3D 渲染引擎展示数字藏品，优化移动端渲染性能。',
      '对接百度超级链，实现数字资产的链上确权与流转。'
    ],
    image: '/project-metaverse.png',
    imageColor: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
    techStack: ['UniApp', 'Vite', 'Blockchain', '3D'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-9',
    name: '3DVR Panorama Platform',
    period: '2018.04 - 2021.03',
    description: '基于 WebGL 的全景漫游创作平台，支持可视化场景编辑。',
    achievements: [
      '基于 Three.js 独立开发全景渲染引擎，支持热点交互与场景切换。',
      '设计可视化编辑器架构，实现拖拽式场景搭建与配置。',
      '优化全景图加载策略，采用分块加载提升大图浏览体验。'
    ],
    image: '/project-vr.png',
    imageColor: 'linear-gradient(135deg, #0a0a1a 0%, #1a2b3c 100%)',
    techStack: ['Three.js', 'React', 'WebGL', 'Editor'],
    links: {
      demo: 'https://is-97.vercel.app',
      github: 'https://github.com/is-97'
    }
  }
]
