<template>
  <canvas ref="canvasRef" class="cursor-trail-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { isReducedMotion } from '../utils/gsap'

const canvasRef = ref(null)
let ctx = null
let animationId = null
let sparks = []
let mouse = { x: -100, y: -100 }

const colors = ['#00f0ff', '#7000ff', '#ff0055', '#00ff88']

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')
}

const addSpark = (x, y) => {
  for (let i = 0; i < 2; i++) {
    sparks.push({
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    })
  }
}

const handleMouseMove = (e) => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  addSpark(e.clientX, e.clientY)
}

const render = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i]
    s.x += s.vx
    s.y += s.vy
    s.alpha -= 0.03
    s.radius *= 0.96

    if (s.alpha <= 0 || s.radius < 0.2) {
      sparks.splice(i, 1)
      continue
    }

    ctx.save()
    ctx.globalAlpha = s.alpha
    ctx.fillStyle = s.color
    ctx.shadowBlur = 6
    ctx.shadowColor = s.color
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  animationId = requestAnimationFrame(render)
}

onMounted(() => {
  if (isReducedMotion() || window.innerWidth <= 768) return

  initCanvas()
  render()
  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('resize', initCanvas)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('resize', initCanvas)
})
</script>

<style scoped>
.cursor-trail-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99998;
  width: 100vw;
  height: 100vh;
}
</style>
