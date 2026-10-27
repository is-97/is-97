<template>
  <div class="not-found page-shell">
    <p class="eyebrow">Error / 404</p>
    <h1 class="display-title">页面走丢了。</h1>
    <p>你访问的地址不存在，或者内容已经被移动。</p>
    <router-link to="/" class="back-link">返回首页 →</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 68vh;
  max-width: 1120px;
}

.not-found h1 {
  margin: 1rem 0;
  font-size: clamp(4rem, 10vw, 8rem);
}

.not-found > p:not(.eyebrow) {
  margin: 0 0 1.5rem;
  color: var(--color-ink-soft);
}

.back-link {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  min-height: 44px;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-decoration: none;
}
</style>
