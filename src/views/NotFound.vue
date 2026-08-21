<template>
  <div class="not-found" ref="container">
    <div class="error-code" ref="codeEl">404</div>
    <div class="error-message" ref="msgEl">PAGE_NOT_FOUND</div>
    <p class="error-desc" ref="descEl">您访问的页面不存在或已被移除</p>
    <router-link to="/" class="back-link" ref="linkEl">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      返回首页
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, isReducedMotion } from '../utils/gsap'

const container = ref(null)
const codeEl = ref(null)
const msgEl = ref(null)
const descEl = ref(null)
const linkEl = ref(null)

let gsapCtx = null

onMounted(() => {
  if (isReducedMotion()) return

  gsapCtx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (codeEl.value) {
      tl.fromTo(codeEl.value,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }
      )
      // 404 持续上下浮动
      gsap.to(codeEl.value, {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }

    if (msgEl.value) {
      tl.fromTo(msgEl.value,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
    }

    if (descEl.value) {
      tl.fromTo(descEl.value,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
    }

    if (linkEl.value) {
      tl.fromTo(linkEl.value,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.2'
      )
    }
  }, container.value)
})

onBeforeUnmount(() => {
  if (gsapCtx) {
    gsapCtx.revert()
  }
})
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  font-family: 'Rajdhani', sans-serif;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary);
  text-shadow: 0 0 30px var(--accent-glow);
  line-height: 1;
  letter-spacing: 0.05em;
  will-change: transform;
}

.error-message {
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: var(--text-main);
  margin-bottom: 1rem;
}

.error-desc {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  color: var(--text-main);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: rgba(0, 240, 255, 0.05);
}

.back-link:hover {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 0 20px var(--accent-glow);
  transform: translateY(-3px) scale(1.03);
}
</style>
