<template>
  <div class="cyber-2048" ref="gameContainer" tabindex="0" @keydown="handleKeyDown">
    <!-- 头部计分板与控制栏 -->
    <div class="game-header">
      <div class="title-wrap">
        <h3 class="game-title">CYBER 2048</h3>
        <span class="game-subtitle">TECH EVOLUTION MATRIX</span>
      </div>

      <div class="scores-wrap">
        <div class="score-card">
          <span class="score-label">SCORE</span>
          <span class="score-val">{{ score }}</span>
        </div>
        <div class="score-card best">
          <span class="score-label">BEST</span>
          <span class="score-val">{{ bestScore }}</span>
        </div>
        <button class="reset-btn" @click="initGame" title="重新开始">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          RESET
        </button>
      </div>
    </div>

    <!-- 游戏棋盘区域 -->
    <div
      class="board-container"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div class="board-grid">
        <!-- 4x4 背景网格单元 -->
        <div v-for="i in 16" :key="`bg-${i}`" class="grid-cell"></div>
      </div>

      <!-- 动态方块层 -->
      <div class="tiles-layer">
        <div
          v-for="tile in activeTiles"
          :key="tile.id"
          class="tile"
          :class="[
            `tile-${tile.value}`,
            { 'is-new': tile.isNew, 'is-merged': tile.isMerged }
          ]"
          :style="getTileStyle(tile)"
        >
          <div class="tile-inner">
            <span class="tile-val">{{ tile.value }}</span>
            <span class="tile-tech">{{ getTechLabel(tile.value) }}</span>
          </div>
          <div class="tile-glow"></div>
        </div>
      </div>

      <!-- 游戏结束覆盖层 -->
      <div v-if="gameOver" class="overlay game-over">
        <div class="overlay-content">
          <span class="overlay-icon">⚡</span>
          <h4>CIRCUIT OVERLOAD</h4>
          <p>算力核心过载 · 最终得分: {{ score }}</p>
          <button class="action-btn" @click="initGame">重新启动 (REBOOT)</button>
        </div>
      </div>

      <!-- 获胜覆盖层 -->
      <div v-if="won && !keepPlaying" class="overlay game-won">
        <div class="overlay-content">
          <span class="overlay-icon">🌟</span>
          <h4>AGI SINGULARITY REACHED!</h4>
          <p>已达成 2048 赛博觉醒！</p>
          <div class="btn-group">
            <button class="action-btn secondary" @click="keepPlaying = true">继续无尽演化</button>
            <button class="action-btn" @click="initGame">新一轮演算</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作提示 -->
    <div class="game-footer">
      <div class="key-hints">
        <span class="key-hint">⌨️ 方向键 / W A S D</span>
        <span class="key-hint">📱 手机支持滑动手势</span>
      </div>
      <div class="evolution-legend">
        <span>当前最高科技: <strong>{{ highestTech }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const techMap = {
  2: '晶体管',
  4: '汇编指令',
  8: 'C/C++ 底层',
  16: 'Rust 内存安全',
  32: 'Vue/React 生态',
  64: '全栈 Node/V8',
  128: 'WebGL/3D 空间',
  256: 'Neural 神经网络',
  512: 'Transformer 大模型',
  1024: 'Quantum 量子芯片',
  2048: 'AGI 赛博觉醒',
  4096: '超光速算力矩阵'
}

const score = ref(0)
const bestScore = ref(0)
const gameOver = ref(false)
const won = ref(false)
const keepPlaying = ref(false)
const board = ref([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
])

let tileUniqueId = 0
const activeTiles = ref([])

const getTechLabel = (val) => techMap[val] || '未知科技'

const highestTech = computed(() => {
  let max = 0
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board.value[r][c] > max) max = board.value[r][c]
    }
  }
  return max ? `${max} (${getTechLabel(max)})` : '暂无'
})

const getTileStyle = (tile) => {
  const percent = 25
  const top = tile.row * percent
  const left = tile.col * percent
  return {
    top: `${top}%`,
    left: `${left}%`
  }
}

const syncActiveTiles = (mergedCoords = []) => {
  const newTilesList = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const val = board.value[r][c]
      if (val > 0) {
        const isMerged = mergedCoords.some(m => m.r === r && m.c === c)
        newTilesList.push({
          id: ++tileUniqueId,
          value: val,
          row: r,
          col: c,
          isNew: false,
          isMerged
        })
      }
    }
  }
  activeTiles.value = newTilesList
}

const addRandomTile = () => {
  const emptyCells = []
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board.value[r][c] === 0) {
        emptyCells.push({ r, c })
      }
    }
  }
  if (emptyCells.length === 0) return

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  const value = Math.random() < 0.9 ? 2 : 4
  board.value[randomCell.r][randomCell.c] = value

  activeTiles.value.push({
    id: ++tileUniqueId,
    value,
    row: randomCell.r,
    col: randomCell.c,
    isNew: true,
    isMerged: false
  })
}

const initGame = () => {
  board.value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  score.value = 0
  gameOver.value = false
  won.value = false
  keepPlaying.value = false
  activeTiles.value = []
  tileUniqueId = 0

  addRandomTile()
  addRandomTile()
}

// 核心移动与合并算法
const slideAndMerge = (row) => {
  const arr = row.filter(val => val !== 0)
  let gained = 0
  const mergedIndices = []

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2
      gained += arr[i]
      mergedIndices.push(i)
      arr.splice(i + 1, 1)
      if (arr[i] === 2048 && !won.value) won.value = true
    }
  }

  while (arr.length < 4) {
    arr.push(0)
  }

  return { newRow: arr, gainedScore: gained, mergedIndices }
}

const move = (direction) => {
  if (gameOver.value) return

  let hasChanged = false
  let scoreGained = 0
  const mergedCoords = []

  if (direction === 'left') {
    for (let r = 0; r < 4; r++) {
      const { newRow, gainedScore, mergedIndices } = slideAndMerge(board.value[r])
      scoreGained += gainedScore
      mergedIndices.forEach(c => mergedCoords.push({ r, c }))
      if (JSON.stringify(board.value[r]) !== JSON.stringify(newRow)) hasChanged = true
      board.value[r] = newRow
    }
  } else if (direction === 'right') {
    for (let r = 0; r < 4; r++) {
      const reversed = [...board.value[r]].reverse()
      const { newRow, gainedScore, mergedIndices } = slideAndMerge(reversed)
      scoreGained += gainedScore
      const restored = newRow.reverse()
      mergedIndices.forEach(c => mergedCoords.push({ r, c: 3 - c }))
      if (JSON.stringify(board.value[r]) !== JSON.stringify(restored)) hasChanged = true
      board.value[r] = restored
    }
  } else if (direction === 'up') {
    for (let c = 0; c < 4; c++) {
      const col = [board.value[0][c], board.value[1][c], board.value[2][c], board.value[3][c]]
      const { newRow, gainedScore, mergedIndices } = slideAndMerge(col)
      scoreGained += gainedScore
      mergedIndices.forEach(r => mergedCoords.push({ r, c }))
      for (let r = 0; r < 4; r++) {
        if (board.value[r][c] !== newRow[r]) hasChanged = true
        board.value[r][c] = newRow[r]
      }
    }
  } else if (direction === 'down') {
    for (let c = 0; c < 4; c++) {
      const col = [board.value[3][c], board.value[2][c], board.value[1][c], board.value[0][c]]
      const { newRow, gainedScore, mergedIndices } = slideAndMerge(col)
      scoreGained += gainedScore
      mergedIndices.forEach(revR => mergedCoords.push({ r: 3 - revR, c }))
      const restored = newRow.reverse()
      for (let r = 0; r < 4; r++) {
        if (board.value[r][c] !== restored[r]) hasChanged = true
        board.value[r][c] = restored[r]
      }
    }
  }

  if (hasChanged) {
    score.value += scoreGained
    if (score.value > bestScore.value) {
      bestScore.value = score.value
      localStorage.setItem('cyber_2048_best', bestScore.value)
    }
    syncActiveTiles(mergedCoords)
    setTimeout(() => {
      addRandomTile()
      checkGameOver()
    }, 80)
  }
}

const checkGameOver = () => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (board.value[r][c] === 0) return
      if (r < 3 && board.value[r][c] === board.value[r + 1][c]) return
      if (c < 3 && board.value[r][c] === board.value[r][c + 1]) return
    }
  }
  gameOver.value = true
}

const handleKeyDown = (e) => {
  const activeTag = document.activeElement?.tagName
  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return

  const key = e.key.toLowerCase()
  if (['arrowleft', 'a'].includes(key)) {
    e.preventDefault()
    move('left')
  } else if (['arrowright', 'd'].includes(key)) {
    e.preventDefault()
    move('right')
  } else if (['arrowup', 'w'].includes(key)) {
    e.preventDefault()
    move('up')
  } else if (['arrowdown', 's'].includes(key)) {
    e.preventDefault()
    move('down')
  }
}

// 触摸手势滑动
let touchStartX = 0
let touchStartY = 0

const handleTouchStart = (e) => {
  if (e.touches.length > 0) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }
}

const handleTouchEnd = (e) => {
  if (e.changedTouches.length > 0) {
    const deltaX = e.changedTouches[0].clientX - touchStartX
    const deltaY = e.changedTouches[0].clientY - touchStartY
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (Math.max(absX, absY) > 30) {
      if (absX > absY) {
        move(deltaX > 0 ? 'right' : 'left')
      } else {
        move(deltaY > 0 ? 'down' : 'up')
      }
    }
  }
}

onMounted(() => {
  const savedBest = localStorage.getItem('cyber_2048_best')
  if (savedBest) bestScore.value = parseInt(savedBest, 10) || 0
  initGame()
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.cyber-2048 {
  display: flex;
  flex-direction: column;
  background: rgba(10, 12, 24, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  outline: none;
  max-width: 480px;
  margin: 0 auto;
  user-select: none;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.game-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
  margin: 0;
}

.game-subtitle {
  font-size: 0.65rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
  letter-spacing: 0.15em;
}

.scores-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-card {
  background: rgba(20, 25, 45, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  text-align: center;
  min-width: 60px;
}

.score-card.best {
  border-color: rgba(0, 240, 255, 0.3);
}

.score-label {
  font-size: 0.6rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
  display: block;
}

.score-val {
  font-family: var(--font-display, monospace);
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}

.reset-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 0, 85, 0.15);
  border: 1px solid rgba(255, 0, 85, 0.4);
  color: #ff0055;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: rgba(255, 0, 85, 0.3);
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.4);
}

.board-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgba(5, 8, 18, 0.95);
  border: 1px solid rgba(0, 240, 255, 0.25);
  border-radius: 12px;
  padding: 10px;
  overflow: hidden;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
}

.grid-cell {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.tiles-layer {
  position: absolute;
  inset: 10px;
}

.tile {
  position: absolute;
  width: calc(25% - 7.5px);
  height: calc(25% - 7.5px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: top 0.1s ease-in-out, left 0.1s ease-in-out;
  padding: 4px;
}

.tile-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.tile-val {
  font-family: var(--font-display, monospace);
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.1;
}

.tile-tech {
  font-size: 0.6rem;
  opacity: 0.85;
  transform: scale(0.85);
  white-space: nowrap;
}

/* 科技进化色系 */
.tile-2 { background: rgba(0, 240, 255, 0.15); border: 1px solid #00f0ff; color: #00f0ff; }
.tile-4 { background: rgba(0, 255, 136, 0.2); border: 1px solid #00ff88; color: #00ff88; }
.tile-8 { background: rgba(255, 170, 0, 0.25); border: 1px solid #ffaa00; color: #ffaa00; }
.tile-16 { background: rgba(255, 77, 0, 0.3); border: 1px solid #ff4d00; color: #ff6a00; }
.tile-32 { background: rgba(255, 0, 85, 0.35); border: 1px solid #ff0055; color: #ff0055; }
.tile-64 { background: rgba(192, 132, 252, 0.4); border: 1px solid #c084fc; color: #c084fc; box-shadow: 0 0 12px rgba(192, 132, 252, 0.4); }
.tile-128 { background: rgba(112, 0, 255, 0.45); border: 1px solid #7000ff; color: #a855f7; box-shadow: 0 0 15px rgba(112, 0, 255, 0.5); }
.tile-256 { background: rgba(0, 240, 255, 0.5); border: 1px solid #00f0ff; color: #ffffff; box-shadow: 0 0 18px rgba(0, 240, 255, 0.6); }
.tile-512 { background: rgba(0, 255, 136, 0.6); border: 1px solid #00ff88; color: #000; box-shadow: 0 0 20px rgba(0, 255, 136, 0.7); }
.tile-1024 { background: rgba(255, 215, 0, 0.7); border: 1px solid #ffd700; color: #000; box-shadow: 0 0 25px rgba(255, 215, 0, 0.8); }
.tile-2048 { background: linear-gradient(135deg, #ff0055, #00f0ff); border: 2px solid #fff; color: #fff; box-shadow: 0 0 30px rgba(0, 240, 255, 0.9); animation: neonPulse 1s infinite alternate; }

@keyframes neonPulse {
  0% { transform: scale(1); filter: brightness(1); }
  100% { transform: scale(1.04); filter: brightness(1.3); }
}

.tile.is-new {
  animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.tile.is-merged {
  animation: pulseMerge 0.25s ease;
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pulseMerge {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* 覆盖层 */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 16, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  animation: fadeIn 0.3s ease;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.overlay-icon {
  font-size: 2.5rem;
}

.overlay h4 {
  font-family: var(--font-display, sans-serif);
  font-size: 1.1rem;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
}

.action-btn {
  background: var(--primary, #00f0ff);
  color: #000;
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px var(--primary, #00f0ff);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.game-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  font-size: 0.72rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
  flex-wrap: wrap;
  gap: 8px;
}

.evolution-legend strong {
  color: var(--primary, #00f0ff);
}
</style>
