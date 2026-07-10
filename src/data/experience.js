export const experiences = [
  {
    id: 'exp-0',
    company: '上海汇智灵曦数字科技有限公司',
    title: '前端负责人',
    period: '2024.11 - 至今',
    responsibilities: [
      '负责前端团队的技术管理与项目统筹，带领团队同时推进医疗 AI 赋能综合平台与医疗 AI 研发推理平台两大产品矩阵（共 11 个子系统）的架构设计与落地交付。',
      '主导「医疗 AI 研发与推理平台」多前端微服务架构设计，覆盖 React 17/19、Svelte 5、TypeScript 等多技术栈，制定子系统间通信规范与统一鉴权方案（SSO），保障多租户场景下的安全隔离。',
      '主导「医疗 AI 赋能综合平台」技术选型与架构搭建，统筹 Vue 2/3、React 18/19、UniApp 等异构技术栈的协作开发，建立组件复用体系与 API 请求层统一封装标准。',
      '从零搭建管理后台架构，设计三级 RBAC 权限体系（运维/多租户超管/租户），开发 GPU 调度管理、多租户计费对账等核心管理模块。',
      '推动 DevOps 工程化建设，统一 Docker + K8s 容器化部署流程，编写 CI/CD 脚本支持多环境构建推送，配置健康探针与滚动更新策略实现零停机发版。',
      '建立前端代码规范与 Code Review 机制，封装通用 CRUD 页面模板与可视化编辑器（React Flow DAG / D3.js 流水线），大幅提升团队开发效率。'
    ],
    techStack: ['React 19', 'Svelte 5', 'Vue 3', 'TypeScript', 'UniApp', 'Vite', 'K8s', 'Docker', 'React Flow', 'Monaco Editor', 'D3.js', 'Plotly.js', 'RBAC', 'Micro-Frontend']
  },
  {
    id: 'exp-1',
    company: '上海意臣信息科技有限公司',
    title: '前端负责人',
    period: '2022.11 - 2024.11',
    responsibilities: [
      '主导公司微前端架构重构，基于 Qiankun 整合 Vue2/3 及 React 技术栈，实现子应用无缝接入。',
      '搭建企业级低代码平台，设计可视化拖拽编辑器，提升内部系统开发效率 40% 以上。',
      '建立前端工程化体系，制定代码规范与 CI/CD 流程，统管 NPM 私有仓库。',
      '攻克复杂场景下的性能瓶颈，优化长列表渲染与大数据可视化交互体验。'
    ],
    techStack: ['Vue3', 'React', 'Qiankun', 'LowCode', 'Architecture']
  },
  {
    id: 'exp-2',
    company: '钱谷网络科技（上海）有限公司',
    title: '独立前端开发',
    period: '2021.04 - 2022.10',
    responsibilities: [
      '独立负责公司全部前端开发工作，一人撑起 Web / H5 / App 多端应用的全流程交付，确保跨平台一致性体验。',
      '运用 UniApp 与 Flutter 混合开发技术，高效交付高性能移动端应用。',
      '负责应用上架全流程（Android/iOS），处理马甲包混淆与过审技术难题。'
    ],
    techStack: ['UniApp', 'Flutter', 'Hybrid App', 'Vue3']
  },
  {
    id: 'exp-3',
    company: '上海盎维信息技术有限公司',
    title: '前端开发工程师',
    period: '2018.04 - 2021.03',
    responsibilities: [
      '基于 Three.js 独立开发 3D 全景展示平台，实现高性能 WebGL 渲染引擎，支持热点交互、场景切换与分块加载优化。',
      '设计可视化编辑器架构，实现拖拽式场景搭建与配置，降低运营人员使用门槛。',
      '构建公司官网及后台管理系统，负责从设计还原到接口联调的全流程开发。',
      '封装基础组件库与工具函数，统一团队开发规范，提升后续项目交付效率。'
    ],
    techStack: ['Three.js', 'WebGL', 'React', 'Visualization']
  }
]
