<template>
  <div class="not-found">
    <div class="error-code">404</div>
    <div class="error-message">PAGE_NOT_FOUND</div>
    <p class="error-desc">您访问的页面不存在或已被移除</p>
    <router-link to="/" class="back-link">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      返回首页
    </router-link>
  </div>
</template>

<script setup>
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
  transition: all 0.3s ease;
}

.back-link:hover {
  border-color: var(--primary);
  color: var(--primary);
  box-shadow: 0 0 15px var(--accent-glow);
  transform: translateY(-2px);
}
</style>
