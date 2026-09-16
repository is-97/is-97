export const profile = {
  name: 'SHI ZHENXING',
  title: 'FRONTEND LEAD',
  bio: '8 年前端开发经验，现任前端负责人。\n专注医疗 AI 领域全栈产品矩阵架构，擅长多技术栈协同与工程化体系搭建。',
  email: 's_shizhenxing@163.com',
  github: 'https://github.com/is-97',
  website: 'https://10to3.cc.cd',
  avatar: null,
  stats: [
    { value: 8, label: 'YEARS EXP', pad: 2, suffix: '' },
    { value: 15, label: 'PROJECTS', pad: 0, suffix: '+' },
    { value: 25, label: 'STACKS', pad: 0, suffix: '+' }
  ]
}

export const skills = [
  {
    category: 'Frontend',
    icon: '⚡',
    color: '#00f0ff',
    description: 'Framework & UI Engineering',
    items: [
      { name: 'React 19 / React Router 7', level: 96 },
      { name: 'Vue 3 / Vue 2', level: 98 },
      { name: 'Svelte 5 / SvelteKit', level: 88 },
      { name: 'TypeScript 5.x', level: 95 },
      { name: 'Ant Design / Element Plus', level: 95 }
    ]
  },
  {
    category: 'Engineering',
    icon: '🛠',
    color: '#7000ff',
    description: 'Architecture & DevOps',
    items: [
      { name: 'Vite 8 / Webpack 5', level: 95 },
      { name: 'Docker / K8s / Nginx', level: 88 },
      { name: 'CI/CD Pipelines', level: 90 },
      { name: 'Micro-Frontend / RBAC', level: 90 },
      { name: 'UniApp Cross-Platform', level: 88 }
    ]
  },
  {
    category: 'Visualization',
    icon: '🔮',
    color: '#ff0055',
    description: 'Data Viz & Editor Engineering',
    items: [
      { name: 'React Flow / D3.js', level: 92 },
      { name: 'ECharts / Plotly.js', level: 90 },
      { name: 'Three.js / WebGL', level: 88 },
      { name: 'Monaco Editor', level: 88 },
      { name: 'SSE / WebSocket', level: 92 }
    ]
  }
]
