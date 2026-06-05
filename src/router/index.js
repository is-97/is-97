import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta?.title ? `SZX | ${to.meta.title}` : 'SZX | Cyber Dimension'
})

export default router
