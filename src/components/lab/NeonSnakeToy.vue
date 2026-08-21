<template>
  <div class="snake-toy-container">
    <div class="snake-header">
      <div class="header-left">
        <h3 class="snake-title">NEON SNAKE</h3>
        <span class="snake-sub">RETRO ARCADE FX</span>
      </div>

      <div class="header-right">
        <div class="stat-pill">
          <span class="lbl">SCORE:</span>
          <span class="val">{{ score }}</span>
        </div>
        <div class="stat-pill best">
          <span class="lbl">BEST:</span>
          <span class="val">{{ bestScore }}</span>
        </div>
        <button class="ctrl-btn" @click="toggleSpeed">
          速度: {{ speedMode === 'fast' ? '⚡ 极速' : '🏎️ 常规' }}
        </button>
        <button class="ctrl-btn reset" @click="resetGame">
          重玩
        </button>
      </div>
    </div>

    <!-- Canvas 画布容器 -->
    <div class="canvas-box" ref="boxRef">
      <canvas ref="canvasRef" class="snake-canvas"></canvas>

      <!-- 游戏开始/暂停/死亡提示遮罩 -->
      <div v-if="gameState !== 'playing'" class="snake-overlay">
        <div class="overlay-modal">
          <div class="modal-icon">{{ gameState === 'dead' ? '💀' : '🕹️' }}</div>
          <h4>{{ gameState === 'dead' ? 'SYSTEM BREACHED (GAME OVER)' : 'NEON SNAKE READY' }}</h4>
          <p v-if="gameState === 'dead'">本次积分: {{ score }} · 历史最高: {{ bestScore }}</p>
          <p v-else>使用键盘方向键 / WASD 控制流光蛇吞噬能量核心</p>
          <button class="start-btn" @click="startGame">
            {{ gameState === 'dead' ? '重新接入 (RETRY)' : '启动程序 (START)' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端虚拟按键方向盘 -->
    <div class="mobile-dpad">
      <button class="dpad-btn up" @click="setDirection('UP')">▲</button>
      <div class="dpad-mid">
        <button class="dpad-btn left" @click="setDirection('LEFT')">◀</button>
        <button class="dpad-btn right" @click="setDirection('RIGHT')">▶</button>
      </div>
      <button class="dpad-btn down" @click="setDirection('DOWN')">▼</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const boxRef = ref(null)
const canvasRef = ref(null)

const score = ref(0)
const bestScore = ref(0)
const gameState = ref('idle') // 'idle', 'playing', 'dead'
const speedMode = ref('normal') // 'normal', 'fast'

const GRID_SIZE = 20
let tileCountX = 20
let tileCountY = 20

let snake = []
let food = { x: 5, y: 5, type: 'normal' }
let velocity = { x: 1, y: 0 }
let nextVelocity = { x: 1, y: 0 }
let particles = []

let timer = null
let ctx = null

const toggleSpeed = () => {
  speedMode.value = speedMode.value === 'normal' ? 'fast' : 'normal'
  if (gameState.value === 'playing') {
    clearInterval(timer)
    timer = setInterval(gameLoop, speedMode.value === 'fast' ? 70 : 110)
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  const box = boxRef.value
  if (!canvas || !box) return

  const width = Math.min(box.clientWidth, 480)
  const height = width

  const dpr = window.devicePixelRatio || 1
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  tileCountX = Math.floor(width / GRID_SIZE)
  tileCountY = Math.floor(height / GRID_SIZE)
  draw()
}

const spawnFood = () => {
  let valid = false
  while (!valid) {
    const rx = Math.floor(Math.random() * tileCountX)
    const ry = Math.floor(Math.random() * tileCountY)
    const onSnake = snake.some(s => s.x === rx && s.y === ry)
    if (!onSnake) {
      food = {
        x: rx,
        y: ry,
        type: Math.random() < 0.25 ? 'super' : 'normal',
        pulse: 0
      }
      valid = true
    }
  }
}

const createExplosion = (x, y, color) => {
  for (let i = 0; i < 16; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 4 + 1
    particles.push({
      x: x * GRID_SIZE + GRID_SIZE / 2,
      y: y * GRID_SIZE + GRID_SIZE / 2,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 3 + 1,
      color,
      alpha: 1
    })
  }
}

const startGame = () => {
  snake = [
    { x: 6, y: 10 },
    { x: 5, y: 10 },
    { x: 4, y: 10 }
  ]
  velocity = { x: 1, y: 0 }
  nextVelocity = { x: 1, y: 0 }
  score.value = 0
  particles = []
  gameState.value = 'playing'
  spawnFood()

  clearInterval(timer)
  timer = setInterval(gameLoop, speedMode.value === 'fast' ? 70 : 110)
}

const resetGame = () => {
  clearInterval(timer)
  gameState.value = 'idle'
  startGame()
}

const setDirection = (dir) => {
  if (gameState.value !== 'playing') return
  if (dir === 'UP' && velocity.y === 0) nextVelocity = { x: 0, y: -1 }
  if (dir === 'DOWN' && velocity.y === 0) nextVelocity = { x: 0, y: 1 }
  if (dir === 'LEFT' && velocity.x === 0) nextVelocity = { x: -1, y: 0 }
  if (dir === 'RIGHT' && velocity.x === 0) nextVelocity = { x: 1, y: 0 }
}

const gameLoop = () => {
  velocity = { ...nextVelocity }
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y }

  // 穿墙模式或撞墙死亡 (此处为撞墙死亡)
  if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
    die()
    return
  }

  // 撞到自己
  if (snake.some(s => s.x === head.x && s.y === head.y)) {
    die()
    return
  }

  snake.unshift(head)

  // 吃到食物
  if (head.x === food.x && head.y === food.y) {
    const isSuper = food.type === 'super'
    const gained = isSuper ? 30 : 10
    score.value += gained
    if (score.value > bestScore.value) {
      bestScore.value = score.value
      localStorage.setItem('neon_snake_best', bestScore.value)
    }

    createExplosion(food.x, food.y, isSuper ? '#ff0055' : '#00f0ff')
    spawnFood()
  } else {
    snake.pop()
  }

  draw()
}

const die = () => {
  clearInterval(timer)
  gameState.value = 'dead'
  createExplosion(snake[0].x, snake[0].y, '#ff0055')
  draw()
}

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const width = parseFloat(canvas.style.width)
  const height = parseFloat(canvas.style.height)

  // 背景
  ctx.fillStyle = '#050814'
  ctx.fillRect(0, 0, width, height)

  // 赛博网格底纹
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
  ctx.lineWidth = 1
  for (let x = 0; x < width; x += GRID_SIZE) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let y = 0; y < height; y += GRID_SIZE) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }

  // 绘制食物
  if (gameState.value === 'playing') {
    const isSuper = food.type === 'super'
    const color = isSuper ? '#ff0055' : '#00f0ff'
    ctx.save()
    ctx.shadowBlur = 15
    ctx.shadowColor = color
    ctx.fillStyle = color
    ctx.beginPath()
    const centerX = food.x * GRID_SIZE + GRID_SIZE / 2
    const centerY = food.y * GRID_SIZE + GRID_SIZE / 2
    ctx.arc(centerX, centerY, GRID_SIZE / 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // 绘制霓虹蛇身
  snake.forEach((segment, index) => {
    const isHead = index === 0
    ctx.save()
    if (isHead) {
      ctx.shadowBlur = 18
      ctx.shadowColor = '#00ff88'
      ctx.fillStyle = '#00ff88'
    } else {
      const alpha = Math.max(0.3, 1 - index / (snake.length + 5))
      ctx.shadowBlur = 8
      ctx.shadowColor = `rgba(0, 240, 255, ${alpha})`
      ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`
    }

    ctx.fillRect(
      segment.x * GRID_SIZE + 1.5,
      segment.y * GRID_SIZE + 1.5,
      GRID_SIZE - 3,
      GRID_SIZE - 3
    )
    ctx.restore()
  })

  // 绘制并更新爆炸粒子
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.x += p.vx
    p.y += p.vy
    p.alpha -= 0.03

    if (p.alpha <= 0) {
      particles.splice(i, 1)
      continue
    }

    ctx.save()
    ctx.globalAlpha = p.alpha
    ctx.shadowBlur = 10
    ctx.shadowColor = p.color
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const handleKey = (e) => {
  const activeTag = document.activeElement?.tagName
  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return

  const key = e.key.toLowerCase()
  if (['arrowup', 'w'].includes(key)) {
    e.preventDefault()
    setDirection('UP')
  } else if (['arrowdown', 's'].includes(key)) {
    e.preventDefault()
    setDirection('DOWN')
  } else if (['arrowleft', 'a'].includes(key)) {
    e.preventDefault()
    setDirection('LEFT')
  } else if (['arrowright', 'd'].includes(key)) {
    e.preventDefault()
    setDirection('RIGHT')
  }
}

onMounted(() => {
  const savedBest = localStorage.getItem('neon_snake_best')
  if (savedBest) bestScore.value = parseInt(savedBest, 10) || 0

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('keydown', handleKey)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>
.snake-toy-container {
  display: flex;
  flex-direction: column;
  background: rgba(10, 12, 24, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  padding: 16px;
  max-width: 520px;
  margin: 0 auto;
}

.snake-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.snake-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 1rem;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
  margin: 0;
}

.snake-sub {
  font-size: 0.6rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-pill {
  background: rgba(20, 25, 45, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  display: flex;
  gap: 4px;
}

.stat-pill.best {
  border-color: rgba(0, 240, 255, 0.3);
}

.stat-pill .lbl {
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.stat-pill .val {
  color: #fff;
  font-weight: bold;
}

.ctrl-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: var(--primary, #00f0ff);
}

.ctrl-btn.reset {
  color: #ff0055;
  border-color: rgba(255, 0, 85, 0.3);
}

.canvas-box {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #050814;
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 12px;
  overflow: hidden;
}

.snake-canvas {
  display: block;
}

.snake-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 16, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  z-index: 5;
}

.overlay-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.modal-icon {
  font-size: 2.2rem;
}

.overlay-modal h4 {
  font-family: var(--font-display, sans-serif);
  font-size: 1rem;
  color: var(--primary, #00f0ff);
}

.overlay-modal p {
  font-size: 0.75rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.start-btn {
  background: var(--primary, #00f0ff);
  color: #000;
  border: none;
  font-weight: bold;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 6px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 12px var(--primary, #00f0ff);
}

/* 移动端 D-pad */
.mobile-dpad {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 14px;
}

.dpad-mid {
  display: flex;
  gap: 30px;
}

.dpad-btn {
  width: 44px;
  height: 44px;
  background: rgba(20, 30, 50, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.4);
  color: #00f0ff;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobile-dpad {
    display: flex;
  }
}
</style>
