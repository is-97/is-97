<template>
  <div class="graviton-toy">
    <!-- 控制栏 -->
    <div class="graviton-toolbar">
      <div class="title-group">
        <h3 class="graviton-title">GRAVITON // FORCE FIELD</h3>
        <span class="graviton-sub">2D PARTICLE PHYSICS SIMULATION</span>
      </div>

      <div class="modes-group">
        <button
          v-for="m in fieldModes"
          :key="m.id"
          class="mode-btn"
          :class="{ active: currentMode === m.id }"
          @click="currentMode = m.id"
        >
          <span class="mode-icon">{{ m.icon }}</span>
          <span class="mode-name">{{ m.name }}</span>
        </button>

        <button class="reset-btn" @click="resetParticles" title="重置粒子">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Canvas 物理画布 -->
    <div class="canvas-container" ref="containerRef">
      <canvas
        ref="canvasRef"
        class="graviton-canvas"
        @mousemove="handleMouseMove"
        @mousedown="isMouseDown = true"
        @mouseup="isMouseDown = false"
        @mouseleave="isMouseIn = false"
        @mouseenter="isMouseIn = true"
      ></canvas>

      <div class="hud-overlay">
        <span class="hud-item">PARTICLES: {{ particleCount }}</span>
        <span class="hud-item">FORCE: {{ currentMode.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref(null)
const canvasRef = ref(null)

const currentMode = ref('blackhole') // 'blackhole', 'repulse', 'vortex', 'fluid'
const particleCount = 800
const isMouseDown = ref(false)
const isMouseIn = ref(false)

const fieldModes = [
  { id: 'blackhole', name: '黑洞吸引', icon: '🌌' },
  { id: 'repulse', name: '超新星斥力', icon: '💥' },
  { id: 'vortex', name: '涡旋角动量', icon: '🌀' },
  { id: 'fluid', name: '量子混沌', icon: '🌊' }
]

let ctx = null
let animationId = null
let particles = []
let mouse = { x: -1000, y: -1000 }

const initParticles = (width, height) => {
  particles = []
  const colors = ['#00f0ff', '#7000ff', '#ff0055', '#00ff88', '#ffffff']

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: Math.random() * 0.7 + 0.3
    })
  }
}

const resetParticles = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  initParticles(parseFloat(canvas.style.width), parseFloat(canvas.style.height))
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const width = container.clientWidth
  const height = 400

  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  initParticles(width, height)
}

const handleMouseMove = (e) => {
  const rect = canvasRef.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
  isMouseIn.value = true
}

const updatePhysics = (width, height) => {
  const targetX = isMouseIn.value ? mouse.x : width / 2
  const targetY = isMouseIn.value ? mouse.y : height / 2

  particles.forEach(p => {
    const dx = targetX - p.x
    const dy = targetY - p.y
    const dist = Math.hypot(dx, dy)
    const angle = Math.atan2(dy, dx)

    const minForceDist = Math.max(dist, 20)
    let forceMagnitude = 800 / (minForceDist * minForceDist)
    if (isMouseDown.value) forceMagnitude *= 3

    if (currentMode.value === 'blackhole') {
      p.vx += Math.cos(angle) * forceMagnitude
      p.vy += Math.sin(angle) * forceMagnitude
    } else if (currentMode.value === 'repulse') {
      p.vx -= Math.cos(angle) * forceMagnitude * 1.5
      p.vy -= Math.sin(angle) * forceMagnitude * 1.5
    } else if (currentMode.value === 'vortex') {
      // 切向力 + 弱引力
      p.vx += Math.cos(angle + Math.PI / 2) * forceMagnitude * 1.8 + Math.cos(angle) * (forceMagnitude * 0.4)
      p.vy += Math.sin(angle + Math.PI / 2) * forceMagnitude * 1.8 + Math.sin(angle) * (forceMagnitude * 0.4)
    } else if (currentMode.value === 'fluid') {
      p.vx += (Math.random() - 0.5) * 0.6 + Math.cos(angle) * (forceMagnitude * 0.2)
      p.vy += (Math.random() - 0.5) * 0.6 + Math.sin(angle) * (forceMagnitude * 0.2)
    }

    // 阻尼摩擦力
    p.vx *= 0.96
    p.vy *= 0.96

    p.x += p.vx
    p.y += p.vy

    // 边界回弹/循环
    if (p.x < 0) { p.x = width; }
    if (p.x > width) { p.x = 0; }
    if (p.y < 0) { p.y = height; }
    if (p.y > height) { p.y = 0; }
  })
}

const render = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const width = parseFloat(canvas.style.width)
  const height = parseFloat(canvas.style.height)

  // 黑色半透明残影
  ctx.fillStyle = 'rgba(5, 7, 18, 0.2)'
  ctx.fillRect(0, 0, width, height)

  updatePhysics(width, height)

  // 绘制粒子
  particles.forEach(p => {
    ctx.save()
    ctx.fillStyle = p.color
    ctx.globalAlpha = p.baseAlpha
    ctx.shadowBlur = 8
    ctx.shadowColor = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })

  // 绘制力场中心微光
  if (isMouseIn.value) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(mouse.x, mouse.y, isMouseDown.value ? 25 : 15, 0, Math.PI * 2)
    ctx.strokeStyle = currentMode.value === 'repulse' ? '#ff0055' : '#00f0ff'
    ctx.lineWidth = 1.5
    ctx.shadowBlur = 15
    ctx.shadowColor = ctx.strokeStyle
    ctx.stroke()
    ctx.restore()
  }

  animationId = requestAnimationFrame(render)
}

onMounted(() => {
  resizeCanvas()
  render()
  window.addEventListener('resize', resizeCanvas)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.graviton-toy {
  background: rgba(10, 12, 24, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.graviton-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: rgba(15, 20, 35, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 10px;
}

.graviton-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 0.85rem;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
  margin: 0;
}

.graviton-sub {
  font-size: 0.6rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.modes-group {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.mode-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:hover {
  border-color: #00f0ff;
  color: #00f0ff;
}

.mode-btn.active {
  background: rgba(0, 240, 255, 0.2);
  border-color: var(--primary, #00f0ff);
  color: var(--primary, #00f0ff);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
}

.reset-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #050712;
  cursor: crosshair;
}

.graviton-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.hud-overlay {
  position: absolute;
  top: 10px;
  left: 14px;
  display: flex;
  gap: 14px;
  font-family: monospace;
  font-size: 0.68rem;
  color: rgba(0, 240, 255, 0.6);
  pointer-events: none;
}
</style>
