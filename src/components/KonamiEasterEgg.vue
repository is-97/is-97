<template>
  <div v-if="isActive" class="konami-overlay" @click="closeEgg">
    <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
    
    <div class="konami-modal" @click.stop>
      <div class="modal-glow"></div>
      <div class="modal-badge">
        <span class="pulse-dot"></span>
        <span>EASTER EGG // UNLOCKED</span>
      </div>

      <h2 class="modal-title">👾 GOD MODE ACTIVATED!</h2>
      <p class="modal-desc">
        你成功输入了传奇科乐美秘籍：<br>
        <span class="code-sequence">↑ ↑ ↓ ↓ ← → ← → B A</span>
      </p>

      <div class="buff-list">
        <div class="buff-item">
          <span class="buff-icon">⚡</span>
          <span class="buff-text">算力过载 +999%</span>
        </div>
        <div class="buff-item">
          <span class="buff-icon">🛡️</span>
          <span class="buff-text">Bug 防御结界生效</span>
        </div>
        <div class="buff-item">
          <span class="buff-icon">✨</span>
          <span class="buff-text">全站赛博霓虹共振</span>
        </div>
      </div>

      <button class="accept-btn" @click="closeEgg">接入量子协议 (CONTINUE)</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isActive = ref(false)
const confettiCanvas = ref(null)

const konamiSequence = [
  'arrowup', 'arrowup',
  'arrowdown', 'arrowdown',
  'arrowleft', 'arrowright',
  'arrowleft', 'arrowright',
  'b', 'a'
]

let currentSequence = []
let particles = []
let animId = null

const handleKeyDown = (e) => {
  const activeTag = document.activeElement?.tagName
  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return

  const key = e.key.toLowerCase()
  currentSequence.push(key)

  if (currentSequence.length > konamiSequence.length) {
    currentSequence.shift()
  }

  if (currentSequence.join(',') === konamiSequence.join(',')) {
    triggerEasterEgg()
    currentSequence = []
  }
}

const triggerEasterEgg = () => {
  isActive.value = true
  setTimeout(initConfetti, 50)
}

const closeEgg = () => {
  isActive.value = false
  if (animId) cancelAnimationFrame(animId)
}

const initConfetti = () => {
  const canvas = confettiCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  particles = []
  const colors = ['#00f0ff', '#ff0055', '#7000ff', '#00ff88', '#ffaa00', '#ffffff']

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.8) * 22,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.35,
      alpha: 1
    })
  }

  const renderConfetti = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.vy += p.gravity
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.rotSpeed
      p.alpha -= 0.006

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, p.alpha)
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5)
      ctx.restore()
    })

    particles = particles.filter(p => p.alpha > 0)
    if (particles.length > 0 && isActive.value) {
      animId = requestAnimationFrame(renderConfetti)
    }
  }

  renderConfetti()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (animId) cancelAnimationFrame(animId)
})
</script>

<style scoped>
.konami-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 5, 16, 0.88);
  backdrop-filter: blur(14px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.confetti-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.konami-modal {
  position: relative;
  background: rgba(15, 20, 38, 0.95);
  border: 1px solid rgba(0, 240, 255, 0.4);
  border-radius: 20px;
  padding: 30px;
  max-width: 440px;
  width: 100%;
  text-align: center;
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.3), inset 0 0 30px rgba(0, 240, 255, 0.05);
  z-index: 2;
  animation: popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: #00f0ff;
  font-size: 0.68rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ff88;
}

.modal-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 8px;
  text-shadow: 0 0 15px rgba(0, 240, 255, 0.6);
}

.modal-desc {
  font-size: 0.82rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.7));
  line-height: 1.6;
  margin-bottom: 20px;
}

.code-sequence {
  display: inline-block;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  color: #00ff88;
  font-family: monospace;
  font-weight: bold;
  margin-top: 4px;
}

.buff-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  text-align: left;
}

.buff-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.78rem;
  color: #fff;
}

.buff-icon {
  font-size: 1.1rem;
}

.accept-btn {
  background: linear-gradient(135deg, #00f0ff, #7000ff);
  color: #fff;
  border: none;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 20px rgba(0, 240, 255, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}

.accept-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 240, 255, 0.6);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
