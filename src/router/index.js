import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { projects } from '../data/projects'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/WorkExperience.vue'),
      meta: { title: '工作经历' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
      meta: { title: '项目案例' }
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetail.vue'),
      meta: { title: '项目详情' }
    },
    {
      path: '/lab',
      name: 'lab',
      component: () => import('../views/LabView.vue'),
      meta: { title: '实验室' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: { title: '404' }
    }
  ]
})

const routeDescriptions = {
  home: 'SZX（史振兴）的个人作品集，专注医疗 AI 产品矩阵、企业级 Web 架构与复杂系统交付。',
  experience: '史振兴的工作经历：从 WebGL 与可视化开发，到前端负责人和医疗 AI 产品矩阵交付。',
  projects: '医疗 AI、企业数据平台、实时可视化与 WebGL 创作工具的前端项目案例。',
  lab: 'Canvas、Web Audio、物理模拟与终端交互的前端实验。'
}

router.beforeEach((to) => {
  const project = to.name === 'project-detail'
    ? projects.find(item => item.id === to.params.id)
    : null
  const title = project?.name || to.meta?.title
  const description = project?.description || routeDescriptions[to.name]

  document.title = title ? `SZX | ${title}` : 'SZX | Frontend Lead'

  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }

  const path = to.path === '/' ? '/' : to.path.replace(/\/$/, '')
  const canonical = document.querySelector('link[rel="canonical"]')
    || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }))
  canonical.href = `https://10to3.cc.cd${path}`

  const robots = document.querySelector('meta[name="robots"]')
  if (robots) {
    robots.content = to.name === 'not-found'
      ? 'noindex,nofollow'
      : 'index,follow,max-image-preview:large'
  }
})

export default router
