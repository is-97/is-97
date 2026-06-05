export const profile = {
  name: 'SHI ZHENXING',
  title: 'FRONTEND ARCHITECT',
  bio: '专注于构建高性能、高交互的现代 Web 应用。\n追求代码的优雅与极致的用户体验。',
  email: 's_shizhenxing@163.com',
  github: 'https://github.com/is-97',
  website: 'https://is-97.vercel.app',
  avatar: null,
  stats: [
    { value: 7, label: 'YEARS EXP', pad: 2, suffix: '' },
    { value: 50, label: 'PROJECTS', pad: 0, suffix: '+' },
    { value: 20, label: 'STACKS', pad: 0, suffix: '+' }
  ]
}

export const skills = [
  {
    category: 'Frontend',
    icon: '⚡',
    color: '#00f0ff',
    description: 'Architecture & UI Engineering',
    items: [
      { name: 'Vue 3 / Nuxt 3', level: 98 },
      { name: 'React 18 / Next.js', level: 95 },
      { name: 'TypeScript 5.x', level: 95 },
      { name: 'Tailwind / UnoCSS', level: 92 },
      { name: 'Vite / Turbopack', level: 90 }
    ]
  },
  {
    category: 'Engineering',
    icon: '🛠',
    color: '#7000ff',
    description: 'Infrastructure & Performance',
    items: [
      { name: 'Rust / WebAssembly', level: 85 },
      { name: 'Docker / K8s', level: 88 },
      { name: 'CI/CD Pipelines', level: 92 },
      { name: 'Node.js / Bun', level: 90 },
      { name: 'Micro-Frontend', level: 88 }
    ]
  },
  {
    category: 'Visualization',
    icon: '🔮',
    color: '#ff0055',
    description: '3D Graphics & Creative Coding',
    items: [
      { name: 'Three.js / R3F', level: 95 },
      { name: 'WebGL / GLSL', level: 90 },
      { name: 'Blender', level: 85 },
      { name: 'Generative Art', level: 88 },
      { name: 'D3.js', level: 85 }
    ]
  }
]
