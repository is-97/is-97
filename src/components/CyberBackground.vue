<template>
  <div class="holographic-bg">
    <div class="aurora-mesh"></div>
    <div class="stars"></div>
    <div class="grid-overlay"></div>
  </div>
</template>

<script setup>
// 纯 CSS 实现，性能更优
</script>

<style scoped>
.holographic-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background: #050510; /* 深空底色 */
  overflow: hidden;
}

/* 极光流光 */
.aurora-mesh {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(at 20% 20%, rgba(0, 240, 255, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 20%, rgba(112, 0, 255, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 80%, rgba(0, 255, 136, 0.1) 0px, transparent 50%),
    radial-gradient(at 20% 80%, rgba(0, 100, 255, 0.15) 0px, transparent 50%);
  filter: blur(80px);
  animation: meshFlow 30s infinite linear;
  opacity: 0.8;
}

@keyframes meshFlow {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

/* 星尘粒子 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(1px 1px at 20px 30px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 50px 160px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 130px 80px, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1.5px 1.5px at 160px 120px, rgba(0, 240, 255, 0.8), transparent);
  background-size: 300px 300px;
  opacity: 0.3;
  animation: starFloat 100s linear infinite;
}

@keyframes starFloat {
  0% { transform: translateY(0); }
  100% { transform: translateY(-300px); }
}

/* 空间透视网格 */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 150px 150px;
  transform: perspective(1000px) rotateX(10deg) scale(1.5);
  transform-origin: top;
  opacity: 0.2;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, black 0%, transparent 80%);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 80%);
}
</style>
