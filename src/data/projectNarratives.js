export const projectNarratives = {
  'proj-0': {
    role: '前端负责人 / 架构设计',
    scope: '7 个子系统 · 3 端覆盖',
    outcome: '统一入口与实时医疗科研链路',
    challenge: '项目不是一套单页应用，而是门户、SSO、科研工具、AI 助手、生信分析、移动端和培训系统共同组成的医疗科研产品矩阵。真正的难点在于异构技术栈之间的一致体验、身份权限和数据链路。',
    decisions: [
      {
        title: '先统一身份与权限底座',
        detail: '以 SSO、RBAC 和会员体系连接各子系统，把入口、工单与细粒度权限放在同一层治理。',
        outcome: 'SSO / RBAC'
      },
      {
        title: '按业务场景选择技术栈',
        detail: '门户使用 React，科研工具使用 Vue，移动端采用 UniApp，不为了统一而牺牲交付效率。',
        outcome: '多栈协同'
      },
      {
        title: '拆分实时交互链路',
        detail: '流式对话使用 SSE，任务通知与多角色协同使用 WebSocket，避免不同实时场景互相拖累。',
        outcome: 'SSE / WS'
      }
    ],
    results: [
      { value: '07', unit: '个', label: '子系统', detail: '统一门户、SSO 与权限控制' },
      { value: '03', unit: '端', label: '终端覆盖', detail: 'Web、H5 / 小程序、APP' },
      { value: '实时', label: '交互链路', detail: 'SSE 与 WebSocket 并行' }
    ]
  },
  'proj-medical-ai-rd': {
    role: '前端架构 / 多子系统交付',
    scope: '4 个子系统 · 50+ API',
    outcome: '从模型训练到推理部署的完整 MLOps 链路',
    challenge: '医疗影像模型从数据集到上线要经过训练、评估、部署和推理多个角色。平台必须同时服务算法工程师、租户管理员和临床用户，并把复杂 DAG 编排、GPU 资源和模型服务放进清晰的前端工作流。',
    decisions: [
      {
        title: '动态路由承载多租户',
        detail: '根据菜单配置生成内部路由、外链和 Iframe 页面，并用通用 CRUD 模板降低重复开发。',
        outcome: 'DYNAMIC ROUTE'
      },
      {
        title: '可视化 DAG 与代码编辑并存',
        detail: 'React Flow 负责流水线结构，Monaco Editor 承载高级配置，Redux Toolkit 管理复杂编辑状态。',
        outcome: 'DAG / MONACO'
      },
      {
        title: '把部署稳定性纳入前端交付',
        detail: '四个子系统统一 Docker 与 K8s 部署，使用多副本、健康探针和滚动更新实现无损发版。',
        outcome: 'K8S / ZERO DOWN'
      }
    ],
    results: [
      { value: '04', unit: '个', label: '前端子系统', detail: '门户、编排器、后台、对话平台' },
      { value: '50+', label: 'API 接口', detail: '模型商城与部署全流程' },
      { value: '0', unit: '停机', label: '滚动更新', detail: 'readiness / liveness 探针' }
    ]
  },
  'proj-1': {
    role: '前端开发',
    scope: '多模态 · 实时流式',
    outcome: '让生成过程可见、可等待、可继续',
    challenge: 'AIGC 产品的核心体验不是提交表单，而是生成过程中的等待感。多模态结果不断返回，前端需要同时处理流式内容、连接状态和结果预览，避免页面陷入黑盒。',
    decisions: [
      {
        title: '让生成过程持续可见',
        detail: '围绕流式返回设计增量渲染界面，让用户能感知任务正在推进，而不是停在空白加载页。',
        outcome: 'STREAMING UI'
      },
      {
        title: 'WebSocket 维持低延迟链路',
        detail: '将生成状态和前后端事件通过双向连接同步，减少轮询带来的延迟与无效请求。',
        outcome: 'WEBSOCKET'
      },
      {
        title: '统一多模态结果预览',
        detail: '把不同生成结果收进一致的预览容器和操作区，降低跨内容类型的理解成本。',
        outcome: 'MULTIMODAL'
      }
    ],
    results: [
      { value: '流式', label: '内容生成', detail: '实时呈现增量结果' },
      { value: '低延迟', label: '交互链路', detail: 'WebSocket 双向通信' },
      { value: '多模态', label: '结果预览', detail: '统一生成与展示体验' }
    ]
  },
  'proj-2': {
    role: '数据可视化开发',
    scope: '实时 KPI · ECharts',
    outcome: '让海量指标在高频刷新下保持可读',
    challenge: '监控大屏需要同时展示实时指标、趋势图和地图下钻。数据刷新频率高、图表类型多，如果计算和渲染都堆在主线程，复杂联动会让交互明显卡顿。',
    decisions: [
      {
        title: '把数据计算移出主线程',
        detail: '使用 Web Worker 处理海量数据聚合与转换，主线程只负责必要的视图更新。',
        outcome: 'WEB WORKER'
      },
      {
        title: '用组件库约束图表复杂度',
        detail: '封装可配置可视化组件，统一图表类型、交互规则与视觉参数，减少重复实现。',
        outcome: 'ECHARTS LIB'
      },
      {
        title: '把地图下钻做成联动状态',
        detail: '将区域、时间与指标筛选组合成统一状态，驱动图表和地图同步更新。',
        outcome: 'LINKED VIEW'
      }
    ],
    results: [
      { value: '+50%', label: '渲染性能', detail: '复杂数据计算优化' },
      { value: '实时', label: 'KPI 监控', detail: '高频数据刷新与联动' },
      { value: '多维', label: '分析视图', detail: '地图下钻与图表联动' }
    ]
  },
  'proj-3': {
    role: '前端架构',
    scope: '7 个子系统 · 微前端',
    outcome: '在历史系统上重建统一数据门户',
    challenge: '企业数据门户要整合多个历史子系统，同时加入智能数据助手和低代码能力。难点在于技术栈并存、权限边界复杂，以及如何让非研发角色也能快速搭建业务表单。',
    decisions: [
      {
        title: 'Qiankun 管理应用边界',
        detail: '用微前端拆分子系统生命周期和路由，让不同技术栈共享统一门户与访问控制。',
        outcome: 'QIANkun'
      },
      {
        title: '用自然语言降低查询门槛',
        detail: '集成智能数据助手，把自然语言问题转换为数据查询入口，减少复杂筛选器依赖。',
        outcome: 'AI QUERY'
      },
      {
        title: '把表单能力配置化',
        detail: '搭建拖拽式低代码引擎，将字段、校验和布局从重复编码转化为配置资产。',
        outcome: 'LOW-CODE'
      }
    ],
    results: [
      { value: '07', unit: '个', label: '子系统', detail: '统一技术底座与入口' },
      { value: 'NLP', label: '数据查询', detail: '自然语言转数据访问' },
      { value: '拖拽', label: '表单搭建', detail: '低代码引擎承载业务配置' }
    ]
  },
  'proj-4': {
    role: '前端开发 / 性能优化',
    scope: '万级表格 · 审批流程',
    outcome: '让重后台在数据量增长后仍然顺手',
    challenge: '绩效系统同时包含员工考评、工时审批和报表统计。万级数据表格、重复查询和复杂审批状态会迅速放大渲染与请求成本，性能问题会直接变成管理流程的等待时间。',
    decisions: [
      {
        title: '大表格使用虚拟滚动',
        detail: '只渲染可视区域内的行，将万级数据列表的 DOM 数量保持在可控范围。',
        outcome: 'VIRTUAL LIST'
      },
      {
        title: '请求去重与缓存',
        detail: '统一请求入口，对重复请求和短期稳定数据做合并与缓存，降低服务器压力。',
        outcome: 'CACHE / DEDUPE'
      },
      {
        title: '构建体积纳入验收',
        detail: '通过 Webpack 拆包、依赖分析和首屏资源优化，让复杂后台保持可接受的加载速度。',
        outcome: '-40% BUNDLE'
      }
    ],
    results: [
      { value: '10k+', label: '数据行', detail: '虚拟滚动支撑大表格' },
      { value: '-40%', label: '首屏体积', detail: '构建与依赖优化' },
      { value: '缓存', label: '请求治理', detail: '去重与短期缓存机制' }
    ]
  },
  'proj-6': {
    role: '核心模块开发',
    scope: '300+ 藏品源 · 交易',
    outcome: '把内容浏览、交易和沟通串成闭环',
    challenge: '数字藏品交易不仅要有内容浏览，还要处理抢购、支付、订单状态和买卖双方沟通。任何一个状态不同步，都会直接影响交易信任。',
    decisions: [
      {
        title: '把交易状态做成明确闭环',
        detail: '围绕下单、支付和结算拆分前端状态，保证每个页面都能读取一致的交易上下文。',
        outcome: 'TRADE FLOW'
      },
      {
        title: 'IM 嵌入交易场景',
        detail: '集成即时通信 SDK，支持买卖家实时沟通和多媒体消息，减少交易外跳。',
        outcome: 'IM SDK'
      },
      {
        title: '优先处理高并发抢购',
        detail: '对抢购状态、库存反馈和支付结果做独立处理，避免高并发交互阻塞主流程。',
        outcome: 'HIGH CONCURRENCY'
      }
    ],
    results: [
      { value: '300+', label: '藏品源', detail: '多来源数字内容聚合' },
      { value: 'IM', label: '实时沟通', detail: '买卖双方站内消息' },
      { value: '闭环', label: '交易链路', detail: '下单、支付与结算' }
    ]
  },
  'proj-7': {
    role: '全栈小程序开发',
    scope: '电商 · 预约 · 会员',
    outcome: '用云开发快速完成垂直行业闭环',
    challenge: '宠物服务小程序需要覆盖商品、预约、会员积分和分享传播，但团队希望用尽量少的后端投入快速验证业务。核心是让全栈链路足够短，同时保留可运营的会员体系。',
    decisions: [
      {
        title: '微信云开发承载全栈',
        detail: '使用云数据库、云函数和云存储完成业务闭环，减少独立后端搭建与联调成本。',
        outcome: 'CLOUD BASE'
      },
      {
        title: 'Canvas 生成动态海报',
        detail: '把商品、会员和活动信息组合成可分享海报，降低用户主动传播的操作门槛。',
        outcome: 'CANVAS SHARE'
      },
      {
        title: '会员积分驱动复购',
        detail: '将积分、抽奖与预约服务绑定到用户账户，为运营提供可持续的触达抓手。',
        outcome: 'MEMBER LOOP'
      }
    ],
    results: [
      { value: '云开发', label: '全栈架构', detail: '快速完成业务闭环' },
      { value: 'Canvas', label: '分享海报', detail: '个性化内容生成' },
      { value: '会员', label: '运营体系', detail: '积分、抽奖与预约' }
    ]
  },
  'proj-8': {
    role: '跨端前端开发',
    scope: 'UniApp · 3D · 区块链',
    outcome: '让数字资产同时拥有展示、确权和多端入口',
    challenge: '元宇宙社区需要同时处理内容展示、3D 数字藏品和链上确权。移动端性能有限，多端适配和 3D 渲染很容易成为体验瓶颈。',
    decisions: [
      {
        title: 'UniApp 统一多端入口',
        detail: '用一套业务代码覆盖多端，将平台差异封装在组件和原生插件桥接层。',
        outcome: 'UNIAPP'
      },
      {
        title: '3D 展示按移动端约束设计',
        detail: '控制渲染负载和资源尺寸，在视觉表现与移动端流畅度之间做取舍。',
        outcome: '3D / MOBILE'
      },
      {
        title: '链上能力只暴露必要状态',
        detail: '对接百度超级链处理资产确权与流转，前端只保留用户可理解的状态和操作。',
        outcome: 'ON-CHAIN'
      }
    ],
    results: [
      { value: '多端', label: '统一入口', detail: 'UniApp 与原生插件桥接' },
      { value: '3D', label: '藏品展示', detail: '移动端性能约束下的渲染' },
      { value: '链上', label: '资产确权', detail: '数字资产流转状态' }
    ]
  },
  'proj-9': {
    role: 'WebGL 前端开发',
    scope: '全景引擎 · 可视化编辑',
    outcome: '把 360° 内容创作交还给非技术用户',
    challenge: '全景漫游平台既要稳定渲染大尺寸场景，又要让用户通过拖拽完成热点、场景和跳转配置。大图加载、编辑器状态与实时预览是三个相互牵制的技术难点。',
    decisions: [
      {
        title: 'Three.js 渲染核心独立',
        detail: '将相机、场景、热点和交互封装为独立渲染层，避免编辑器状态侵入渲染逻辑。',
        outcome: 'THREE.JS'
      },
      {
        title: '把场景编辑变成配置模型',
        detail: '用结构化数据描述场景和热点，使拖拽编辑、预览与发布共享同一份配置。',
        outcome: 'CONFIG MODEL'
      },
      {
        title: '大图分块加载',
        detail: '按视口和场景需求加载全景资源，降低首屏传输量与单次解码压力。',
        outcome: 'TILED LOAD'
      }
    ],
    results: [
      { value: '360°', label: '全景渲染', detail: 'Three.js 场景与热点交互' },
      { value: '拖拽', label: '可视化编辑', detail: '非技术用户搭建场景' },
      { value: '分块', label: '资源加载', detail: '大图按需传输与解码' }
    ]
  }
}

export const getProjectNarrative = (project) => {
  if (!project) return null
  return projectNarratives[project.id] || {
    role: '前端开发',
    scope: `${project.techStack?.length || 0} 项技术栈`,
    outcome: project.highlights?.[0] || project.description,
    challenge: project.description,
    decisions: (project.highlights || []).map((highlight, index) => ({
      title: highlight,
      detail: project.achievements?.[index] || '围绕核心业务目标完成前端交付。',
      outcome: 'DELIVERED'
    })),
    results: (project.highlights || []).map(highlight => ({
      value: 'KEY',
      label: highlight,
      detail: ''
    }))
  }
}
