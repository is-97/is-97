<template>
  <div class="soundbox-toy">
    <div class="soundbox-header">
      <div class="header-info">
        <h3 class="soundbox-title">CYBER SOUND SYNTHESIZER</h3>
        <span class="soundbox-sub">WEB AUDIO API OSCILLOSCOPE MATRIX</span>
      </div>

      <div class="header-controls">
        <div class="vol-control">
          <span class="vol-label">VOL: {{ Math.round(masterVolume * 100) }}%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            v-model.number="masterVolume"
            class="cyber-slider"
          />
        </div>
      </div>
    </div>

    <!-- 实时音频示波器 -->
    <div class="oscilloscope-wrap">
      <canvas ref="scopeCanvas" class="scope-canvas"></canvas>
      <div class="scope-overlay">
        <span class="scope-tag">REALTIME SPECTRUM / OSCILLATOR</span>
        <span class="scope-hz">{{ lastPlayedFreq ? `${lastPlayedFreq} Hz` : 'STANDBY' }}</span>
      </div>
    </div>

    <!-- 音效预设打击垫 Pads -->
    <div class="pads-grid">
      <button
        v-for="sfx in soundPresets"
        :key="sfx.id"
        class="sound-pad"
        :class="{ active: activePad === sfx.id }"
        @click="playSound(sfx)"
      >
        <div class="pad-icon">{{ sfx.icon }}</div>
        <div class="pad-content">
          <span class="pad-name">{{ sfx.name }}</span>
          <span class="pad-desc">{{ sfx.desc }}</span>
        </div>
        <div class="pad-wave-anim"></div>
      </button>
    </div>

    <!-- 键盘演奏提示 -->
    <div class="soundbox-footer">
      <span class="hint-text">💡 点击打击垫或按键盘数字键 [1 - 8] 触发高能合成音效</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scopeCanvas = ref(null)
const masterVolume = ref(0.7)
const activePad = ref(null)
const lastPlayedFreq = ref(null)

let audioCtx = null
let analyserNode = null
let animationId = null

const soundPresets = [
  { id: 'laser', key: '1', name: '激光脉冲', desc: '高能光束打击', icon: '⚡', type: 'sawtooth', fStart: 880, fEnd: 110, dur: 0.18 },
  { id: 'powerup', key: '2', name: '能量觉醒', desc: '指数上升充能', icon: '🔋', type: 'triangle', fStart: 220, fEnd: 880, dur: 0.35 },
  { id: 'coin', key: '3', name: '8-Bit 晶体', desc: '复古投币音', icon: '💎', type: 'square', fStart: 987, fEnd: 1318, dur: 0.25 },
  { id: 'warp', key: '4', name: '曲率跃迁', desc: '超时空折跃', icon: '🚀', type: 'sine', fStart: 120, fEnd: 1400, dur: 0.5 },
  { id: 'alarm', key: '5', name: '入侵警报', desc: '红区警告脉冲', icon: '🚨', type: 'sawtooth', fStart: 600, fEnd: 300, dur: 0.3 },
  { id: 'subdrop', key: '6', name: '重低音下潜', desc: '深渊共振低频', icon: '💥', type: 'sine', fStart: 180, fEnd: 35, dur: 0.6 },
  { id: 'scan', key: '7', name: '全息声呐', desc: '高频矩阵扫描', icon: '📡', type: 'triangle', fStart: 1500, fEnd: 750, dur: 0.22 },
  { id: 'blip', key: '8', name: '极客反馈', desc: '微型按键回馈', icon: '👾', type: 'sine', fStart: 600, fEnd: 900, dur: 0.08 }
]

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    audioCtx = new AudioContextClass()
    analyserNode = audioCtx.createAnalyser()
    analyserNode.fftSize = 256
    analyserNode.connect(audioCtx.destination)
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

const playSound = (sfx) => {
  try {
    const ctx = getAudioContext()
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = sfx.type
    osc.frequency.setValueAtTime(sfx.fStart, now)
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, sfx.fEnd), now + sfx.dur)

    lastPlayedFreq.value = `${sfx.fStart} -> ${sfx.fEnd}`

    // 增益包络
    const peakGain = 0.4 * masterVolume.value
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(peakGain, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, now + sfx.dur)

    osc.connect(gain)
    gain.connect(analyserNode)

    osc.start(now)
    osc.stop(now + sfx.dur + 0.05)

    activePad.value = sfx.id
    setTimeout(() => {
      if (activePad.value === sfx.id) activePad.value = null
    }, 200)
  } catch (err) {
    console.error('Audio play error:', err)
  }
}

// 示波器绘制循环
const renderScope = () => {
  const canvas = scopeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.fillStyle = 'rgba(5, 8, 20, 0.25)'
  ctx.fillRect(0, 0, width, height)

  // 赛博网格
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()

  if (analyserNode) {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyserNode.getByteTimeDomainData(dataArray)

    ctx.lineWidth = 2
    ctx.strokeStyle = '#00f0ff'
    ctx.shadowBlur = 10
    ctx.shadowColor = '#00f0ff'
    ctx.beginPath()

    const sliceWidth = width / bufferLength
    let x = 0

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0
      const y = (v * height) / 2

      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)

      x += sliceWidth
    }

    ctx.lineTo(width, height / 2)
    ctx.stroke()
  } else {
    // 待机静息波形
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)'
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()
  }

  animationId = requestAnimationFrame(renderScope)
}

const handleKeyDown = (e) => {
  const activeTag = document.activeElement?.tagName
  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return

  const matched = soundPresets.find(s => s.key === e.key)
  if (matched) {
    playSound(matched)
  }
}

onMounted(() => {
  const canvas = scopeCanvas.value
  if (canvas) {
    canvas.width = canvas.clientWidth || 400
    canvas.height = 120
  }
  renderScope()
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.soundbox-toy {
  background: rgba(10, 12, 24, 0.85);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.soundbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.soundbox-title {
  font-family: var(--font-display, 'Syncopate', sans-serif);
  font-size: 0.95rem;
  color: var(--primary, #00f0ff);
  letter-spacing: 0.1em;
  margin: 0;
}

.soundbox-sub {
  font-size: 0.62rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.vol-control {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.6));
}

.cyber-slider {
  width: 80px;
  accent-color: var(--primary, #00f0ff);
  cursor: pointer;
}

.oscilloscope-wrap {
  position: relative;
  width: 100%;
  height: 110px;
  background: #030611;
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.scope-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.scope-overlay {
  position: absolute;
  top: 8px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  font-family: monospace;
}

.scope-hz {
  color: #00ff88;
}

.pads-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 10px;
}

.sound-pad {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(20, 28, 50, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  color: #fff;
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: all 0.15s ease;
}

.sound-pad:hover {
  background: rgba(30, 42, 75, 0.85);
  border-color: var(--primary, #00f0ff);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2);
}

.sound-pad.active {
  background: rgba(0, 240, 255, 0.3);
  border-color: #fff;
  transform: scale(0.97);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.6);
}

.pad-icon {
  font-size: 1.4rem;
}

.pad-content {
  display: flex;
  flex-direction: column;
}

.pad-name {
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
}

.pad-desc {
  font-size: 0.62rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
}

.soundbox-footer {
  font-size: 0.72rem;
  color: var(--text-muted, rgba(255, 255, 255, 0.5));
  text-align: center;
}
</style>
