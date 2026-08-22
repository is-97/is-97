<template>
  <footer class="cyber-footer" ref="footerContainer">
    <div class="footer-content" ref="footerContent">
      <!-- 左侧：滚动日志 -->
      <div class="footer-section logs-section">
        <div class="section-label">>> SYSTEM_LOGS</div>
        <div class="logs-container">
          <div
            v-for="(log, i) in logs"
            :key="i"
            class="log-line"
            :style="{ opacity: (i + 1) / logs.length }"
          >
            <span class="log-time">[{{ log.time }}]</span>
            <span class="log-text">{{ log.text }}</span>
          </div>
        </div>
      </div>

      <!-- 中间：核心标识 -->
      <div class="footer-section center-section">
        <div
          class="holo-seal"
          ref="sealEl"
          @mouseenter="onSealEnter"
          @mouseleave="onSealLeave"
        >
          <div class="seal-ring" ref="sealRing"></div>
          <div class="seal-core">SZX</div>
        </div>
        <div class="copyright">
          <span>© 2024 SZX_PORTFOLIO</span>
          <span class="version">SYS.VER.4.0</span>
        </div>
      </div>

      <!-- 右侧：通讯链路 -->
      <div class="footer-section comms-section">
        <div class="section-label">>> COMMS_LINK</div>
        <div class="links-grid">
          <a href="https://github.com/is-97" target="_blank" rel="noopener noreferrer" class="cyber-link">
            <span class="link-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </span>
            <span class="link-label">GITHUB</span>
            <span class="link-status connected">CONNECTED</span>
          </a>
          <a href="mailto:s_shizhenxing@163.com" class="cyber-link">
            <span class="link-icon">✉</span>
            <span class="link-label">EMAIL</span>
            <span class="link-status standing-by">READY</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 底部装饰线 -->
    <div class="footer-scanner"></div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap, isReducedMotion } from '../utils/gsap'

const footerContainer = ref(null)
const footerContent = ref(null)
const sealEl = ref(null)
const sealRing = ref(null)

let gsapCtx = null
let sealSpinTween = null

const logs = ref([
  { time: '00:00', text: 'System initialized...' },
  { time: '00:01', text: 'Loading modules...' },
  { time: '00:02', text: 'Network connected.' }
])

let logInterval

const generateLog = () => {
  const now = new Date()
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
  const messages = [
    'Scanning memory...',
    'Optimizing render...',
    'Updating coordinates...',
    'Syncing data stream...',
    'Packet received.',
    'Heartbeat signal OK.'
  ]
  const text = messages[Math.floor(Math.random() * messages.length)]

  logs.value.push({ time: timeStr, text })
  if (logs.value.length > 4) logs.value.shift()
}

const onSealEnter = () => {
  if (sealSpinTween) {
    gsap.to(sealSpinTween, { timeScale: 4, duration: 0.5 })
  }
}

const onSealLeave = () => {
  if (sealSpinTween) {
    gsap.to(sealSpinTween, { timeScale: 1, duration: 0.8 })
  }
}

onMounted(() => {
  logInterval = setInterval(generateLog, 2500)

  if (isReducedMotion()) return

  gsapCtx = gsap.context(() => {
    // 滚动到底部触发错落进场
    if (footerContent.value) {
      const sections = footerContent.value.querySelectorAll('.footer-section')
      gsap.fromTo(sections,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerContainer.value,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )
    }

    // 印章平滑旋转
    if (sealRing.value) {
      sealSpinTween = gsap.to(sealRing.value, {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none'
      })
    }
  }, footerContainer.value)
})

onBeforeUnmount(() => {
  clearInterval(logInterval)
  if (sealSpinTween) sealSpinTween.kill()
  if (gsapCtx) {
    gsapCtx.revert()
  }
})
</script>

<style scoped>
.cyber-footer {
  width: 100%;
  border-top: 1px solid transparent;
  border-image: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.25) 30%, rgba(0, 240, 255, 0.25) 70%, transparent) 1;
  background: linear-gradient(to top, rgba(4, 6, 15, 0.6) 0%, transparent 100%);
  padding: 3rem 0 2.5rem;
  margin-top: 5rem;
  position: relative;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 0 2rem;
  align-items: center;
}

/* 区域标签 */
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(0, 240, 255, 0.6);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

/* 日志区域 */
.logs-section {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
}

.log-line {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  color: rgba(255, 255, 255, 0.75);
  transition: opacity 0.3s;
}

.log-time {
  color: rgba(0, 240, 255, 0.7);
}

/* 中间区域 */
.center-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.holo-seal {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  cursor: pointer;
}

.seal-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 240, 255, 0.4);
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
}

.seal-core {
  font-weight: 700;
  font-size: 1.1rem;
  color: #00f0ff;
  letter-spacing: 0.1em;
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.6);
}

.copyright {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.version {
  font-size: 0.7rem;
  color: rgba(0, 240, 255, 0.5);
  letter-spacing: 0.2em;
}

/* 通讯链路 */
.comms-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.links-grid {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.cyber-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  padding: 0.55rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: 200px;
  justify-content: space-between;
}

.cyber-link:hover {
  border-color: #00f0ff;
  background: rgba(0, 240, 255, 0.12);
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  transform: translateX(-4px);
}

.link-status {
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.link-status.connected { color: #00ff88; }
.link-status.standing-by { color: #ffaa00; }

/* 装饰 */
.footer-scanner {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f0ff, transparent);
  animation: scan 4s infinite linear;
}

@keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

/* 响应式 */
@media (max-width: 768px) {
  .cyber-footer {
    padding: 1.5rem 0;
    margin-top: 2rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
    text-align: center;
  }

  .logs-section {
    display: none;
  }

  .center-section {
    order: 1;
  }

  .holo-seal {
    width: 50px;
    height: 50px;
    margin-bottom: 0.6rem;
  }

  .copyright {
    font-size: 0.72rem;
  }

  .version {
    font-size: 0.62rem;
  }

  .comms-section {
    align-items: center;
    order: 2;
  }

  .section-label {
    font-size: 0.65rem;
    margin-bottom: 0.6rem;
  }

  .links-grid {
    flex-direction: row;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cyber-link {
    width: auto;
    min-width: 130px;
    padding: 0.4rem 0.7rem;
    font-size: 0.78rem;
    gap: 0.5rem;
  }

  .link-status {
    font-size: 0.6rem;
  }
}
</style>
