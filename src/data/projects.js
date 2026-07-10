export const projects = [
  {
    id: 'proj-0',
    name: '医疗 AI 赋能综合平台',
    period: '2024.11 - 至今',
    description: '面向医疗科研领域的 AI 赋能综合平台，由 7 个子系统组成，覆盖门户入口、SSO 认证、科研工具链、AI 智能助手、生信分析、移动端及教育培训，服务医疗机构科研全流程。',
    achievements: [
      'AI 赋能门户平台（React 19 + Vite 8）：构建算力中心、模型中心、应用中心、培训中心等模块，集成阿里云播放器与 SSO 登录，支持 K8s 部署与 WebP 图片自动优化。',
      '智能医学科研平台（Vue 3 + Element Plus）：实现文献检索/AI 阅读/智能对话、专利多模式搜索（简单/高级/图像/语义）、新药情报库、GEO 基因数据库、8 种实验计算器、AI 辅助论文写作，基于 SSE 流式对话。',
      'AI 智能助手平台（React 18 + UmiJS）：开发多角色 AI 对话、知识库问答、数据源管理（文件/API/数据库）、自定义可视化仪表盘，WebSocket 实时推送。',
      '生信分析平台（React 19 + Plotly.js）：设计 8 步单细胞测序分析工作流，火山图/散点图/小提琴图交互式可视化，路由级防离开拦截保障任务安全。',
      'SSO 统一认证中心（Vue 2 + Element UI）：单点登录、RBAC 权限控制、会员体系（微信/支付宝支付）、工单系统，自定义权限指令细粒度访问控制。',
      '移动端科研助手（UniApp + Vue 3）：一套代码覆盖 H5/微信小程序/APP 三端，AI 流式对话、文献检索收藏，Token 自动刷新调度器保障登录态。',
      '教育培训管理系统（Vue 2 + Webpack 5）：课程管理、讲师管理、课程大纲编排、VOD 视频点播等后台功能。'
    ],
    image: '/project-medical-ai.png',
    imageCover: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)',
    techStack: ['React 19', 'Vue 3', 'Vue 2', 'UniApp', 'TypeScript', 'Plotly.js', 'SSE', 'WebSocket', 'K8s'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-medical-ai-rd',
    name: '医疗 AI 研发与推理平台',
    period: '2024.11 - 至今',
    description: '面向医疗影像领域的全链路 AI 研发与推理平台，覆盖从模型商城、流水线训练、模型评估到推理部署的完整 MLOps 链路。平台采用多前端微服务架构，包含用户端门户、流水线编排编辑器、管理后台和大模型对话平台四个子系统，服务于多租户场景下的医疗 AI 产学研全流程。',
    achievements: [
      '用户端门户（React 17 + Webpack 5 + Ant Design 4 + MobX）：构建 AI 模型商城，实现模型浏览/搜索/收藏/部署全流程（50+ API 接口）；设计动态路由系统，根据后端菜单配置自动生成路由（内部路由/外链/Iframe 三种模式）与通用 CRUD 页面模板（ADUGTemplate）；实现 SSO 集成、用户积分体系、模型评估任务、推理服务管理、数据集分片上传、API Key 管理等核心模块；封装统一 Axios 请求层，支持 CSS 变量多主题运行时切换与中英双语国际化。',
      '流水线编排编辑器（React 17 + CRACO + Redux Toolkit + React Flow + Monaco Editor）：基于 React Flow 实现可视化 ML 流水线 DAG 编辑器，支持组件拖拽编排、节点参数配置、运行进度实时展示；集成 Monaco Editor 提供代码编辑能力；开发训练报告可视化模块（Loss 曲线图、Bland-Altman 一致性分析图）；基于 Redux Toolkit 设计 7 个领域切片管理复杂编辑器状态。',
      '管理后台（React 19 + Vite 8 + Ant Design 6 + Zustand + React Query + React Router 7）：从零搭建架构，设计三级 RBAC 权限体系（运维/多租户超管/租户）；开发 GPU 调度管理模块（资源面板、利用率图表、资源分配表）；实现多租户计费对账、合同管理、存储管理等功能；封装统一 API Client 与 React Query 服务端状态缓存管理。',
      '大模型对话平台（Svelte 5 + SvelteKit + Vite + Tailwind CSS 4）：基于 Open WebUI 二次开发定制化部署；配置 Nginx 静态资源分层缓存策略优化首屏加载；完成 K8s 容器化部署，配置健康探针与滚动更新策略实现零停机发版。',
      'DevOps 与部署：四个子系统均通过 Docker + K8s 部署，统一阿里云 ACR 镜像仓库；编写 PowerShell CI/CD 脚本支持 stg/prd 多环境构建推送；K8s 采用 2 副本 + RollingUpdate 策略，配置 readiness/liveness 探针保证高可用。'
    ],
    image: '/project-medical-ai-rd.png',
    imageCover: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0a1a2e 0%, #1a3a5e 100%)',
    techStack: ['React 19', 'Svelte 5', 'TypeScript', 'Vite 8', 'Webpack 5', 'React Flow', 'Monaco Editor', 'D3.js', 'Three.js', 'ECharts', 'Zustand', 'Redux Toolkit', 'React Query', 'K8s', 'Docker'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-1',
    name: 'AIGC 内容生成平台',
    period: '2025.01 - 2025.03',
    description: '基于深度学习的 AIGC 内容生成系统，支持多模态内容自动化生产。',
    achievements: [
      '构建响应式 AI 交互界面，支持实时流式内容生成。',
      '整合 WebSocket 实现低延迟的前后端数据传输。',
      '设计多模态内容预览组件，优化生成结果展示体验。'
    ],
    image: '/project-aigc.png',
    imageCover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%)',
    techStack: ['React', 'WebSocket', 'RESTful API', 'AIGC'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-2',
    name: '数据可视化监控大屏',
    period: '2023.01 - 2023.12',
    description: '企业级 KPI 监控大屏，提供实时数据洞察与决策支持。',
    achievements: [
      '基于 Web Worker 优化海量数据计算，渲染性能提升 50%。',
      '封装高复用性可视化组件库，支持动态配置图表类型。',
      '实现复杂的地图下钻与多维数据联动分析功能。'
    ],
    image: '/project-dashboard.png',
    imageCover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0a1a2e 0%, #1b3a5c 100%)',
    techStack: ['Vue3', 'Web Worker', 'ECharts', 'Performance'],
    links: {
      demo: null,
      github: 'https://github.com'
    }
  },
  {
    id: 'proj-3',
    name: '企业数据门户平台',
    period: '2022.11 - 2024.03',
    description: '集数据资产管理、访问控制与预测分析于一体的中后台平台。',
    achievements: [
      '采用 Qiankun 微前端架构整合 7 个子系统，统一技术底座。',
      '集成 ChatGPT 打造智能数据助手，实现自然语言查询数据。',
      '搭建企业级低代码引擎，支持拖拽生成业务表单。'
    ],
    image: '/project-portal.png',
    imageCover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 100%)',
    techStack: ['Micro-Frontend', 'Vue3', 'React', 'ChatGPT'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-4',
    name: '绩效管理系统（PMS）',
    period: '2023.06 - 2024.06',
    description: '全流程绩效管理系统，覆盖员工考评、工时审批与报表统计。',
    achievements: [
      '实现虚拟滚动列表，解决万级数据表格渲染卡顿问题。',
      '构建请求去重与缓存机制，显著降低服务器负载。',
      '配置 Webpack 构建优化，首屏加载体积减少 40%。'
    ],
    image: '/project-pms.png',
    imageCover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #1a0f0a 0%, #3a2b1b 100%)',
    techStack: ['Vue3', 'Virtual List', 'Webpack', 'Optimization'],
    links: {
      demo: null,
      github: 'https://github.com'
    }
  },
  {
    id: 'proj-6',
    name: '元宇宙 NFT 交易平台',
    period: '2021.10 - 2022.10',
    description: '二次元 NFT 数字藏品交易平台，聚合 300+ 藏品源。',
    achievements: [
      '独立开发全站核心模块，包括交易撮合与支付结算流程。',
      '集成 IM SDK 实现买卖家实时沟通与多媒体消息发送。',
      '优化高并发下的抢购体验，确保交易数据的一致性。'
    ],
    image: '/project-nft.png',
    imageCover: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #1a0a1a 0%, #2b1b3a 100%)',
    techStack: ['Vue', 'Web3', 'IM SDK', 'Payment'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-7',
    name: '宠物一站式服务小程序',
    period: '2022.05 - 2022.10',
    description: '一站式宠物服务小程序，涵盖电商、预约与会员管理。',
    achievements: [
      '基于微信云开发构建全栈业务，大幅缩短开发周期。',
      '开发动态海报生成组件，利用 Canvas 实现个性化分享。',
      '集成会员积分与抽奖系统，提升用户留存与活跃度。'
    ],
    image: '/project-pet.png',
    imageCover: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0f1a0f 0%, #1a3a1a 100%)',
    techStack: ['Mini Program', 'Vant Weapp', 'Cloud Base'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-8',
    name: '元宇宙内容社区门户',
    period: '2021.04 - 2022.06',
    description: '基于区块链的元宇宙内容社区，支持数字资产铸造与展示。',
    achievements: [
      '使用 UniApp 实现多端适配，并进行原生插件开发与桥接。',
      '集成 3D 渲染引擎展示数字藏品，优化移动端渲染性能。',
      '对接百度超级链，实现数字资产的链上确权与流转。'
    ],
    image: '/project-metaverse.png',
    imageCover: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
    techStack: ['UniApp', 'Vite', 'Blockchain', '3D'],
    links: {
      demo: null,
      github: null
    }
  },
  {
    id: 'proj-9',
    name: '3DVR 全景漫游创作平台',
    period: '2018.04 - 2021.03',
    description: '基于 WebGL 的全景漫游创作平台，支持可视化场景编辑。',
    achievements: [
      '基于 Three.js 独立开发全景渲染引擎，支持热点交互与场景切换。',
      '设计可视化编辑器架构，实现拖拽式场景搭建与配置。',
      '优化全景图加载策略，采用分块加载提升大图浏览体验。'
    ],
    image: '/project-vr.png',
    imageCover: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80&auto=format',
    imageColor: 'linear-gradient(135deg, #0a0a1a 0%, #1a2b3c 100%)',
    techStack: ['Three.js', 'React', 'WebGL', 'Editor'],
    links: {
      demo: null,
      github: null
    }
  }
]
