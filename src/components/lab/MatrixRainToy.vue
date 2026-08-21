<template>
  <div class="matrix-toy-container" ref="containerRef" :class="{ 'is-fullscreen': isFullscreen }">
    <!-- 控制面板栏 -->
    <div class="toy-toolbar">
      <div class="tool-left">
        <span class="status-pulse"></span>
        <span class="toolbar-title">MATRIX // DIGITAL STREAM</span>
      </div>

      <div class="tool-controls">
        <!-- 字符模式 -->
        <div class="control-group">
          <label>字符集:</label>
          <select v-model="charsetKey" class="cyber-select">
            <option value="matrix">日文矩阵 (Matrix)</option>
            <option value="binary">二进制 01 (Binary)</option>
            <option value="hex">16进制 (Hex)</option>
            <option value="cyber">赛博符文 (Cyber)</option>
          </select>
        </div>

        <!-- 荧光颜色 -->
        <div class="control-group">
          <label>光效:</label>
          <div class="color-palette">
            <button
              v-for="c in colorOptions"
              :key="c.name"
              class="color-btn"
              :class="{ active: currentColor.name === c.name }"
              :style="{ backgroundColor: c.headColor, borderColor: c.tailColor }"
              :title="c.name"
              @click="currentColor = c"
            ></button>
          </div>
        </div>

        <!-- 下落速度 -->
        <div class="control-group">
          <label>流速: {{ speedMultiplier }}x</label>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            v-model.number="speedMultiplier"
            class="cyber-range"
          />
        </div>

        <!-- 全屏按钮 -->
        <button class="tool-btn" @click="toggleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏沉浸'">
          <svg v-if="!isFullscreen" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Canvas 画布 -->
    <div class="canvas-wrapper" ref="canvasWrapperRef">
      <canvas
        ref="canvasRef"
        class="matrix-canvas"
        @mousemove="handleCanvasMouseMove"
        @click="handleCanvasClick"
      ></canvas>
      <div class="canvas-hint">
        <span class="hint-icon">💡</span>
        <span>移动或点击鼠标可产生字符冲击波与扰动波纹</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const containerRef = ref(null)
const canvasWrapperRef = ref(null)
const canvasRef = ref(null)
const isFullscreen = ref(false)

const charsetKey = ref('matrix')
const speedMultiplier = ref(1.0)

const colorOptions = [
  { name: '经典黑客绿', headColor: '#ffffff', tailColor: '#00ff66', glow: 'rgba(0, 255, 102, 0.6)' },
  { name: '赛博青蓝', headColor: '#e0ffff', tailColor: '#00f0ff', glow: 'rgba(0, 240, 255, 0.6)' },
  { name: '暗夜幽紫', headColor: '#ffffff', tailColor: '#c084fc', glow: 'rgba(192, 132, 252, 0.6)' },
  { name: '烈焰故障红', headColor: '#ffffff', tailColor: '#ff0055', glow: 'rgba(255, 0, 85, 0.6)' }
]

const currentColor = ref(colorOptions[0])

const charsets = {
  matrix: 'ｦｱｳｴｵｶｷｹｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890:・.=*+-<>',
  binary: '0101010101010101',
  hex: '0123456789ABCDEF',
  cyber: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*!<>{}[]'
}

let ctx = null
let animationId = null
let drops = []
let fontSize = 16
let columns = 0
let shockwaves = []

const initCanvas = () => {
  const canvas = canvasRef.value
  const wrapper = canvasWrapperRef.value
  if (!canvas || !wrapper) return

  ctx = canvas.getContext('2d')
  const width = wrapper.clientWidth
  const height = isFullscreen.value ? (window.innerHeight - 56) : 400

  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  fontSize = 16
  columns = Math.max(1, Math.floor(width / fontSize))
  drops = []

  for (let i = 0; i < columns; i++) {
    drops[i] = {
      y: Math.random() * -30, // 适度错落下落
      speed: 0.8 + Math.random() * 0.8,
      leadChar: getRandomChar()
    }
  }
}

const getRandomChar = () => {
  const chars = charsets[charsetKey.value] || charsets.matrix
  return chars[Math.floor(Math.random() * chars.length)]
}

const draw = () => {
  const canvas = canvasRef.value
  const wrapper = canvasWrapperRef.value
  if (!canvas || !wrapper || !ctx) return

  const width = parseFloat(canvas.style.width) || wrapper.clientWidth
  const height = parseFloat(canvas.style.height) || 400

  // 半透明黑色背景形成残影
  ctx.fillStyle = 'rgba(5, 5, 16, 0.12)'
  ctx.fillRect(0, 0, width, height)

  ctx.font = `${fontSize}px 'Courier New', monospace`

  // 绘制字符流
  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i]
    const x = i * fontSize
    const y = drop.y * fontSize

    // 只有在屏幕范围内时才绘制
    if (y >= 0 && y <= height + fontSize) {
      const char = getRandomChar()
      ctx.fillStyle = currentColor.value.headColor
      ctx.shadowBlur = 8
      ctx.shadowColor = currentColor.value.glow
      ctx.fillText(char, x, y)

      ctx.fillStyle = currentColor.value.tailColor
      ctx.shadowBlur = 3
      ctx.fillText(drop.leadChar, x, y - fontSize)

      drop.leadChar = char
    }

    // 计算鼠标扰动
    let extraSpeed = 0
    shockwaves.forEach(sw => {
      const dist = Math.hypot(x - sw.x, y - sw.y)
      if (dist < sw.radius && dist > sw.radius - 40) {
        extraSpeed += (1 - dist / sw.radius) * 4
      }
    })

    // 下落更新
    drop.y += (drop.speed + extraSpeed) * speedMultiplier.value

    // 到底重置
    if (y > height && Math.random() > 0.975) {
      drop.y = 0
      drop.speed = 0.8 + Math.random() * 0.8
    }
  }

  // 绘制和更新冲击波
  for (let s = shockwaves.length - 1; s >= 0; s--) {
    const sw = shockwaves[s]
    sw.radius += 8
    sw.alpha -= 0.02
    if (sw.alpha <= 0 || sw.radius > 300) {
      shockwaves.splice(s, 1)
      continue
    }

    ctx.save()
    ctx.beginPath()
    ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
    ctx.strokeStyle = currentColor.value.tailColor
    ctx.globalAlpha = sw.alpha
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.restore()
  }

  animationId = requestAnimationFrame(draw)
}

const handleCanvasMouseMove = (e) => {
  if (Math.random() < 0.2) {
    const rect = canvasRef.value.getBoundingClientRect()
    shockwaves.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 5,
      alpha: 0.5
    })
  }
}

const handleCanvasClick = (e) => {
  const rect = canvasRef.value.getBoundingClientRect()
  shockwaves.push({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    radius: 10,
    alpha: 0.9
  })
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  setTimeout(initCanvas, 60)
}

const handleResize = () => {
  initCanvas()
}

onMounted(() => {
  initCanvas()
  draw()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
})

watch([charsetKey, currentColor], () => {
  // 切换选项直接生效
})
</script>

<style scoped>
.matrix-toy-container {
  display: flex;
  flex-direction: column;
  background: rgba(10, 12, 24, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(0, 240, 255, 0.05);
  position: relative;
}

.matrix-toy-container.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  border-radius: 0;
  height: 100vh;
  width: 100vw;
  background: #050510;
}

.toy-toolbar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: rgba(15, 20, 35, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  flex-wrap: wrap;
  gap: 12px;
}

.tool-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff88;
  box-shadow: 0 0 8px #00ff88;
  animation: pulse 1.5s infinite alternate;
}

@keyframes pulse {
  0% { opacity: 0.4; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}

.toolbar-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
}

.tool-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.cyber-select {
  background: rgba(20, 30, 50, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.3);
  color: #fff;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.75rem;
  outline: none;
}

.color-palette {
  display: flex;
  gap: 6px;
}

.color-btn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.color-btn.active {
  transform: scale(1.25);
  box-shadow: 0 0 8px currentColor;
}

.cyber-range {
  width: 80px;
  accent-color: var(--primary, #00f0ff);
  cursor: pointer;
}

.tool-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.tool-btn:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: var(--primary, #00f0ff);
  color: var(--primary, #00f0ff);
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  background: #050510;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: crosshair;
  overflow: hidden;
}

.matrix-toy-container.is-fullscreen .canvas-wrapper {
  height: calc(100vh - 60px);
}

.matrix-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.canvas-hint {
  position: absolute;
  bottom: 12px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.45);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  pointer-events: none;
}
</style>
