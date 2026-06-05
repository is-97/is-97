<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let ctx = null
let particles = []
let mouse = { x: null, y: null }

class Particle {
  constructor(canvas) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 2 + 0.5
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        this.x -= dx * 0.01
        this.y -= dy * 0.01
      }
    }

    if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = `rgba(0, 240, 255, ${this.opacity})`
    context.fill()
  }
}

function connectParticles(context, canvas) {
  const maxDist = 120
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.15
        context.beginPath()
        context.strokeStyle = `rgba(0, 240, 255, ${opacity})`
        context.lineWidth = 0.5
        context.moveTo(particles[i].x, particles[i].y)
        context.lineTo(particles[j].x, particles[j].y)
        context.stroke()
      }
    }
  }
}

function animate() {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  particles.forEach(p => {
    p.update()
    p.draw(ctx)
  })

  connectParticles(ctx, canvasRef.value)
  animationId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100)
  particles = []
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas))
  }
}

function handleMouseMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function handleMouseLeave() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resizeCanvas()
  animate()

  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}
</style>
