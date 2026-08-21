import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { ScrollTrigger } from '../utils/gsap'

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
      meta: { title: '项目' }
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetail.vue'),
      meta: { title: '项目详情' }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/Chat.vue'),
      meta: { title: 'AI 助手' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: { title: '404' }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title ? `SZX | ${to.meta.title}` : 'SZX | Cyber Dimension'
})

router.afterEach(() => {
  // 路由切换后自动重新计算全站 ScrollTrigger 触发点位置，避免高度变化造成的触发误差
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 150)
})

export default router
